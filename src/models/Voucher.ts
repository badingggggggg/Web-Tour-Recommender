import pool from '@/lib/db';
import { VoucherType } from 'types/voucher';

const Voucher = {
  create: async (vouchers: VoucherType[]) => {
    try {
      if (!vouchers.length) {
        throw new Error('No vouchers provided');
      }

      const values = vouchers.map(({ user_id, code, amount, expiry_date }) => [
        user_id,
        code,
        amount,
        expiry_date
      ]);

      const query =
        'INSERT INTO tbl_vouchers (user_id, code, amount, expiry_date) VALUES ?';

      const [result] = await pool.query(query, [values]);

      return result;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getAll: async (limit: number, page: number) => {
    try {
      const offset = (page - 1) * limit;

      const [results] = await pool.query(
        `SELECT v.*, u.full_name, u.email
         FROM tbl_vouchers v
         INNER JOIN tbl_users u ON v.user_id = u.id
         LIMIT ? OFFSET ?`,
        [limit, offset]
      );

      const [countResult]: any = await pool.query(
        'SELECT COUNT(*) as total FROM tbl_vouchers'
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
        `SELECT v.*, u.full_name, u.email
         FROM tbl_vouchers v
         INNER JOIN tbl_users u ON v.user_id = u.id
         WHERE v.id = ?`,
        [id]
      );
      return rows[0];
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  update: async (id: number, data: VoucherType) => {
    try {
      const { amount, is_redeemed, expiry_date } = data;
      const [rows] = await pool.query(
        'UPDATE tbl_vouchers SET amount = ?, is_redeemed = ?, expiry_date = ? WHERE id = ?',
        [amount, is_redeemed, expiry_date, id]
      );
      return rows;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  delete: async (id: number) => {
    try {
      const [rows] = await pool.query('DELETE FROM tbl_vouchers WHERE id =?', [
        id
      ]);
      return rows;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getByUserId: async (user_id: number) => {
    try {
      const [rows]: any = await pool.query(
        `SELECT v.*, u.full_name, u.email, cv.claimed_at
        FROM tbl_vouchers v
        INNER JOIN tbl_users u ON v.user_id = u.id
        LEFT JOIN tbl_claimed_vouchers cv ON v.id = cv.voucher_id
        WHERE v.user_id = ?`,
        [user_id]
      );

      return rows;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  claimVoucher: async (voucherId: number, userId: number) => {
    try {
      const [voucher]: any = await pool.query(
        `SELECT * FROM tbl_vouchers WHERE id = ? AND is_claimed = FALSE`,
        [voucherId]
      );

      if (voucher.length === 0) {
        throw new Error('Voucher already claimed or does not exist');
      }

      await pool.query(
        `UPDATE tbl_vouchers SET is_claimed = TRUE WHERE id = ?`,
        [voucherId]
      );

      await pool.query(
        `INSERT INTO tbl_claimed_vouchers (voucher_id, user_id) VALUES (?, ?)`,
        [voucherId, userId]
      );

      return { message: 'Voucher successfully claimed' };
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
};

export default Voucher;
