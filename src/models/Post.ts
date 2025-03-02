import pool from '@/lib/db';
import { PostType } from 'types/post';
import PostAmenities from './PostAmenities';

const Post = {
  create: async (data: PostType) => {
    try {
      const {
        category_id,
        title,
        description,
        location,
        price,
        price_per_night,
        price_currency,
        seasonal_price,
        discount_price
      } = data;
      const [rows] = await pool.query(
        'INSERT INTO tbl_posts (category_id, title, description, location, price,price_per_night, price_currency,seasonal_price, discount_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          category_id,
          title,
          description,
          location,
          price,
          price_per_night,
          price_currency,
          seasonal_price,
          discount_price
        ]
      );
      return rows;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getAll: async (limit: number, page: number, categoryName?: string) => {
    try {
      const offset = (page - 1) * limit;

      let query = `SELECT p.*, c.category_name
                 FROM tbl_posts p
                 LEFT JOIN tbl_categories c ON p.category_id = c.id`;

      const queryParams: any[] = [];

      if (categoryName) {
        query += ` WHERE c.category_name LIKE ?`;
        queryParams.push(`%${categoryName}%`);
      }

      query += ` LIMIT ? OFFSET ?`;
      queryParams.push(limit, offset);

      const [postResults]: any = await pool.query(query, queryParams);

      const postIds = postResults.map((p: any) => p.id);
      let images = [];
      if (postIds.length) {
        const [imageResults]: any = await pool.query(
          `SELECT post_id, image_url FROM tbl_images WHERE post_id IN (?)`,
          [postIds]
        );
        images = imageResults.reduce((acc: any, row: any) => {
          if (!acc[row.post_id]) {
            acc[row.post_id] = [];
          }
          acc[row.post_id].push(row.image_url);
          return acc;
        }, {});
      }

      const finalResults = postResults.map((post: any) => ({
        ...post,
        images: images[post.id] || []
      }));

      const countQuery = `SELECT COUNT(*) as total FROM tbl_posts p
                        LEFT JOIN tbl_categories c ON p.category_id = c.id
                        ${categoryName ? 'WHERE c.category_name LIKE ?' : ''}`;

      const [countResult]: any = await pool.query(
        countQuery,
        categoryName ? [`%${categoryName}%`] : []
      );

      const total = countResult[0]?.total || 0;

      return {
        items: finalResults,
        total_items: total,
        total_page: Math.ceil(total / limit),
        offset
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }, 

  getById: async (id: number) => {
    try {
      const [results]: any = await pool.query(
        `SELECT p.*, i.image_url
         FROM tbl_posts p
         LEFT JOIN tbl_images i ON p.id = i.post_id
         WHERE p.id = ?`,
        [id]
      );

      if (results.length === 0) {
        return null;
      }

      const post = results.reduce((acc: any, row: any) => {
        const postId = row.id;
        if (!acc[postId]) {
          acc[postId] = { ...row, images: [] };
        }
        if (row.image_url) {
          acc[postId].images.push(row.image_url);
        }
        return acc;
      }, {});

      const finalPost: any = Object.values(post)[0];

      // Get Amenities
      const amenities = await PostAmenities.getAmenitiesByPostId(Number(id));
      finalPost.amenities = amenities;

      return finalPost;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  update: async (id: number, data: PostType) => {
    try {
      const {
        category_id,
        title,
        description,
        location,
        price,
        price_per_night,
        price_currency,
        seasonal_price,
        discount_price
      } = data;
      const [rows] = await pool.query(
        'UPDATE tbl_posts SET category_id = ?, title = ?, description = ?, location = ?, price = ?, price_per_night = ?, price_currency = ?, seasonal_price = ?, discount_price = ? WHERE id = ?',
        [
          category_id,
          title,
          description,
          location,
          price,
          price_per_night,
          price_currency,
          seasonal_price,
          discount_price,
          id
        ]
      );
      return rows;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  delete: async (id: number) => {
    try {
      const [rows] = await pool.query('DELETE FROM tbl_posts WHERE id =?', [
        id
      ]);
      return rows;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  search: async (query: string, limit: number, page: number) => {
    try {
      const offset = (page - 1) * limit;

      let searchQuery = `
        SELECT p.*, i.image_url, c.category_name
        FROM tbl_posts p
        LEFT JOIN tbl_images i ON p.id = i.post_id
        LEFT JOIN tbl_categories c ON p.category_id = c.id
        WHERE p.title LIKE ? OR p.description LIKE ? OR p.location LIKE ?
        LIMIT ? OFFSET ?
      `;

      const searchParams = [
        `%${query}%`,
        `%${query}%`,
        `%${query}%`,
        limit,
        offset
      ];

      const [results]: any = await pool.query(searchQuery, searchParams);

      // COUNT Query
      const countQuery = `
        SELECT COUNT(*) as total 
        FROM tbl_posts p
        WHERE p.title LIKE ? OR p.description LIKE ? OR p.location LIKE ?
      `;

      const [countResult]: any = await pool.query(countQuery, [
        `%${query}%`,
        `%${query}%`,
        `%${query}%`
      ]);

      const total = countResult[0]?.total || 0;

      const postsWithImages = results.reduce((acc: any, row: any) => {
        const postId = row.id;
        if (!acc[postId]) {
          acc[postId] = { ...row, images: [] };
        }
        if (row.image_url) {
          acc[postId].images.push(row.image_url);
        }
        return acc;
      }, {});

      const finalResults = Object.values(postsWithImages);

      return {
        items: finalResults,
        total_items: total,
        total_page: Math.ceil(total / limit),
        offset
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
};

export default Post;
