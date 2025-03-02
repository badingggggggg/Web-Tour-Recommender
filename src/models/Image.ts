import pool from '@/lib/db';

type ImageType = {
  id?: number;
  post_id: number;
  image_url: string;
};

const Image = {
  create: async (data: ImageType) => {
    try {
      const { post_id, image_url } = data;
      const [rows] = await pool.query(
        'INSERT INTO tbl_images (post_id, image_url) VALUES (?, ?)',
        [post_id, image_url]
      );
      return rows;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
};

export default Image;
