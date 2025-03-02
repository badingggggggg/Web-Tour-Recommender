import pool from '@/lib/db';

const Dashboard = {
  getTotalUsers: async () => {
    try {
      const [rows]: any = await pool.query(
        `SELECT COUNT(*) as total FROM tbl_users WHERE user_type = 'User'`
      );
      return rows[0]?.total || 0;
    } catch (error: any) {
      console.error('Error fetching total users:', error);
      throw new Error(error.message);
    }
  },

  getTotalRedeemedVouchers: async () => {
    try {
      const [rows]: any = await pool.query(
        'SELECT COUNT(*) as total FROM tbl_vouchers WHERE is_redeemed = 1'
      );
      return rows[0]?.total || 0;
    } catch (error: any) {
      console.error('Error fetching total redeemed vouchers:', error);
      throw new Error(error.message);
    }
  },

  getTotalCategories: async () => {
    try {
      const [rows]: any = await pool.query(
        'SELECT COUNT(*) as total FROM tbl_categories'
      );
      return rows[0]?.total || 0;
    } catch (error: any) {
      console.error('Error fetching total categories:', error);
      throw new Error(error.message);
    }
  },

  getTotalPosts: async () => {
    try {
      const [rows]: any = await pool.query(
        'SELECT COUNT(*) as total FROM tbl_posts'
      );
      return rows[0]?.total || 0;
    } catch (error: any) {
      console.error('Error fetching total posts:', error);
      throw new Error(error.message);
    }
  },

  getRecentUsers: async () => {
    try {
      const [rows]: any = await pool.query(`
        SELECT id, username, email, full_name, created_at
        FROM tbl_users
        WHERE user_type = 'User'
        ORDER BY created_at DESC
        LIMIT 5
      `);
      return rows;
    } catch (error: any) {
      console.error('Error fetching recent users:', error);
      throw new Error(error.message);
    }
  },

  getUserRegistrationsByDay: async () => {
    try {
      const [rows]: any = await pool.query(`
        SELECT DATE(created_at) as reg_date, COUNT(*) as count
        FROM tbl_users
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at) ASC
      `);
      return rows;
    } catch (error: any) {
      console.error('Error fetching user registrations by day:', error);
      throw new Error(error.message);
    }
  },

  getCategoryDistribution: async () => {
    try {
      const [rows]: any = await pool.query(`
        SELECT c.category_name, COUNT(p.id) as count
        FROM tbl_categories c
        LEFT JOIN tbl_posts p ON c.id = p.category_id
        GROUP BY c.category_name
      `);
      return rows;
    } catch (error: any) {
      console.error('Error fetching category distribution:', error);
      throw new Error(error.message);
    }
  }
};

export default Dashboard;
