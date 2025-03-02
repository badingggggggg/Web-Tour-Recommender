import pool from '@/lib/db';
import { CategoryType } from 'types/category';

const Category = {
  categoryExists: async (email: string) => {
    try {
      const [rows]: any = await pool.query(
        'SELECT COUNT(*) AS count FROM tbl_categories WHERE category_name = ?',
        [email]
      );
      return rows[0].count > 0;
    } catch (error) {
      console.error('Error checking category name existence', error);
      throw error;
    }
  },
  create: async (data: CategoryType) => {
    try {
      const { category_name, description } = data;
      const [rows] = await pool.query(
        'INSERT INTO tbl_categories (category_name, description) VALUES (?, ?)',
        [category_name, description]
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
        'SELECT * FROM tbl_categories LIMIT ? OFFSET ?',
        [limit, offset]
      );

      const [countResult]: any = await pool.query(
        'SELECT COUNT(*) as total FROM tbl_categories'
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
        'SELECT * FROM tbl_categories WHERE id = ?',
        [id]
      );
      return rows[0];
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  update: async (id: number, data: CategoryType) => {
    try {
      const { category_name, description } = data;
      const [rows] = await pool.query(
        'UPDATE tbl_categories SET category_name = ?, description = ? WHERE id = ?',
        [category_name, description, id]
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
        'DELETE FROM tbl_categories WHERE id =?',
        [id]
      );
      return rows;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
};

export default Category;
