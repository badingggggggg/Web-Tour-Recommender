import pool from '@/lib/db';
import { AmenitiesType } from 'types/amenities';

const Amenities = {
  create: async (data: AmenitiesType) => {
    try {
      const { amenity_name } = data;
      const [rows] = await pool.query(
        'INSERT INTO tbl_amenities (amenity_name) VALUES (?)',
        [amenity_name]
      );
      return rows;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  getAll: async (limit: number, page: number) => {
    try {
      const offset = (page - 1) * limit;

      const [results] = await pool.query(
        'SELECT * FROM tbl_amenities  LIMIT ? OFFSET ?',
        [limit, offset]
      );

      const [countResult]: any = await pool.query(
        'SELECT COUNT(*) as total FROM tbl_amenities '
      );

      const total = countResult[0]?.total || 0;

      return {
        items: results,
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
      const [rows]: any = await pool.query(
        'SELECT * FROM tbl_amenities  WHERE id = ?',
        [id]
      );
      return rows[0];
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  update: async (id: number, data: AmenitiesType) => {
    try {
      const { amenity_name } = data;
      const [rows] = await pool.query(
        'UPDATE tbl_amenities  SET amenity_name = ? WHERE id = ?',
        [amenity_name, id]
      );
      return rows;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  delete: async (id: number) => {
    try {
      const [rows] = await pool.query(
        'DELETE FROM tbl_amenities  WHERE id =?',
        [id]
      );
      return rows;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
};

export default Amenities;
