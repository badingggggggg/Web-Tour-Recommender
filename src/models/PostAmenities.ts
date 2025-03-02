import pool from '@/lib/db';

const PostAmenities = {
  create: async (post_id: number, amenity_id: number) => {
    try {
      const [rows] = await pool.query(
        'INSERT INTO tbl_post_amenities (post_id, amenity_id) VALUES (?, ?)',
        [post_id, amenity_id]
      );
      return rows;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  bulkInsert: async (post_id: number, amenity_ids: number[]) => {
    try {
      if (amenity_ids.length === 0) return { message: 'No amenities provided' };

      const values = amenity_ids
        .map((amenity_id) => `(${post_id}, ${amenity_id})`)
        .join(',');
      const query = `INSERT INTO tbl_post_amenities (post_id, amenity_id) VALUES ${values}`;

      const [rows] = await pool.query(query);
      return rows;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  getAmenitiesByPostId: async (post_id: number) => {
    try {
      const [rows] = await pool.query(
        `SELECT a.id, a.amenity_name 
         FROM tbl_amenities a
         JOIN tbl_post_amenities pa ON a.id = pa.amenity_id
         WHERE pa.post_id = ?`,
        [post_id]
      );
      return rows;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  delete: async (post_id: number, amenity_id: number) => {
    try {
      const [rows] = await pool.query(
        'DELETE FROM tbl_post_amenities WHERE post_id = ? AND amenity_id = ?',
        [post_id, amenity_id]
      );
      return rows;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  deleteAllByPostId: async (post_id: number) => {
    try {
      const [rows] = await pool.query(
        'DELETE FROM tbl_post_amenities WHERE post_id = ?',
        [post_id]
      );
      return rows;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
};

export default PostAmenities;
