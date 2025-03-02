import pool from '@/lib/db';
import { UserType } from 'types/user';

const User = {
  emailExists: async (email: string) => {
    try {
      const [rows]: any = await pool.query(
        'SELECT COUNT(*) AS count FROM tbl_users WHERE email = ?',
        [email]
      );
      return rows[0].count > 0;
    } catch (error) {
      console.error('Error checking email existence', error);
      throw error;
    }
  },

  findEmail: async (email: string) => {
    try {
      const [rows]: any = await pool.query(
        'SELECT * FROM tbl_users WHERE email = ?',
        [email]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error checking email', error);
      throw error;
    }
  },

  usernameExists: async (username: string) => {
    try {
      const [rows]: any = await pool.query(
        'SELECT COUNT(*) AS count FROM tbl_users WHERE username = ?',
        [username]
      );
      return rows[0].count > 0;
    } catch (error) {
      console.error('Error checking email existence', error);
      throw error;
    }
  },
  create: async (data: UserType) => {
    try {
      const { username, email, password, full_name, phone, user_type } = data;
      const [rows] = await pool.query(
        'INSERT INTO tbl_users (username, email, password, full_name, phone, user_type) VALUES (?, ?, ?, ?, ?, ?)',
        [username, email, password, full_name, phone, user_type]
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
        `SELECT * FROM tbl_users WHERE user_type = 'User' LIMIT ? OFFSET ?`,
        [limit, offset]
      );

      const [countResult]: any = await pool.query(
        'SELECT COUNT(*) as total FROM tbl_users'
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
        'SELECT * FROM tbl_users WHERE id = ?',
        [id]
      );
      return rows[0];
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  update: async (id: number, data: UserType) => {
    try {
      const { username, full_name, phone } = data;
      const [rows] = await pool.query(
        'UPDATE tbl_users SET username = ?, full_name = ?, phone = ? WHERE id = ?',
        [username, full_name, phone, id]
      );
      return rows;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  delete: async (id: number) => {
    try {
      const [rows] = await pool.query('DELETE FROM tbl_users WHERE id =?', [
        id
      ]);
      return rows;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
};

export default User;
