import Post from '@/models/Post';
import PostAmenities from '@/models/PostAmenities';
import { NextResponse } from 'next/server';
import { PostType } from 'types/post';
import { z } from 'zod';

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
  amenities: z
    .array(z.number())
    .min(1, 'At least one amenity must be selected.')
});

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const post = await Post.getById(Number(id));
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error getting post', error);
    return NextResponse.json(
      { message: 'Failed to get post' },
      {
        status: 500
      }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const data: PostType = await request.json();
    const result = postSchema.safeParse(data);

    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        message: err.message,
        path: err.path
      }));

      if (errors.length > 0) {
        return NextResponse.json(
          { message: errors[0].message },
          { status: 400 }
        );
      }
    }

    await Post.update(Number(id), {
      ...data
    });

    await PostAmenities.deleteAllByPostId(Number(id));

    if (data.amenities && data.amenities.length > 0) {
      await PostAmenities.bulkInsert(Number(id), data.amenities as any);
    }

    return NextResponse.json(
      { message: 'Updated Successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error updating post', error);
    return NextResponse.json(
      { message: 'Error updating post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const post = await Post.getById(Number(id));
    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    await Post.delete(Number(id));

    return NextResponse.json(
      { message: 'Post deleted!' },
      {
        status: 200
      }
    );
  } catch (error) {
    console.error('Error soft deleting post', error);
    return NextResponse.json(
      { message: 'Failed to soft deleting post' },

      {
        status: 500
      }
    );
  }
}
