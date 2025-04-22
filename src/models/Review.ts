import pool from '@/lib/db';
import { ReviewType } from 'types/review';

const Review = {
  create: async (data: ReviewType) => {
    try {
      const { user_id, post_id, rating, comment } = data;
      const [rows]: any = await pool.query(
        'INSERT INTO tbl_reviews (user_id, post_id, rating, comment) VALUES (?, ?, ?, ?)',
        [user_id, post_id, rating, comment]
      );
      return {
        id: rows.insertId,
        user_id,
        post_id,
        rating,
        comment
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  getById: async (id: number) => {
    try {
      const [rows]: any = await pool.query(
        `SELECT 
           r.rating, r.comment, r.created_at, 
           u.full_name
         FROM tbl_reviews r
         JOIN tbl_users u ON r.user_id = u.id
         WHERE r.post_id = ?`,
        [id]
      );
      return rows;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  getAverageRatingsByPostIds: async (postIds: number[]) => {
    if (postIds.length === 0) return {};

    try {
      const [rows]: any = await pool.query(
        `SELECT post_id, AVG(rating) AS average_rating 
         FROM tbl_reviews 
         WHERE post_id IN (?) 
         GROUP BY post_id`,
        [postIds]
      );

      return rows.reduce((acc: any, row: any) => {
        acc[row.post_id] = Number(row.average_rating);
        return acc;
      }, {});
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
};

export default Review;
