import Image from '@/models/Image';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';
import { PostType } from 'types/post';
import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const uploadDir = path.join(process.cwd(), 'public/uploads');
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

const postSchema = z.object({
  category_id: z.number().min(1, 'Category is required'),
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long'),
  location: z.string().min(3, 'Location must be at least 3 characters long'),
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
  price_per_night: z
    .number()
    .min(0, 'Price per night must be greater than or equal to 0'),
  price_currency: z.string().optional(),
  seasonal_price: z
    .number()
    .min(0, 'Seasonal price must be greater than or equal to 0'),
  discount_price: z.number().optional(),
  images: z.array(z.string()).min(2, 'You must upload at least 2 images')
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const category_id = formData.get('category_id') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;
    const price = formData.get('price') as string;
    const price_per_night = formData.get('price_per_night') as string;
    const price_currency = formData.get('price_currency') as string;
    const seasonal_price = formData.get('seasonal_price') as string;
    const discount_price = formData.get('discount_price') as string;
    const images = formData.getAll('images') as File[];

    const postData: PostType = {
      category_id: Number(category_id),
      title,
      description,
      location,
      price: Number(price),
      price_per_night: Number(price_per_night),
      price_currency: price_currency || 'PHP',
      seasonal_price: Number(seasonal_price),
      discount_price: discount_price ? Number(discount_price) : 0,
      images: images.map((image) => image.name)
    };

    const result = postSchema.safeParse(postData);

    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        message: err.message,
        path: err.path
      }));
      console.log('errors', errors);

      if (errors.length > 0) {
        return NextResponse.json(
          { message: errors[0].message },
          { status: 400 }
        );
      }
    }

    const createdPost: any = await Post.create(postData);

    const imagePromises = images.map(async (file: File) => {
      const fileName = `${uuidv4()}_${file.name}`;
      const filePath = path.join(uploadDir, fileName);

      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, buffer);

      await Image.create({
        post_id: Number(createdPost.insertId),
        image_url: `/uploads/${fileName}`
      });
    });

    await Promise.all(imagePromises);

    return NextResponse.json(createdPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post', error);
    return NextResponse.json(
      { message: 'Error creating post' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '100', 10);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const categoryName = url.searchParams.get('category_name') || '';

    const posts = await Post.getAll(limit, page, categoryName);

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts', error);
    return NextResponse.json(
      { message: 'Error fetching posts' },
      { status: 500 }
    );
  }
}
