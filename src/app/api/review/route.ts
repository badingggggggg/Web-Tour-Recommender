import Review from '@/models/Review';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { ReviewType } from 'types/review';
import { z } from 'zod';

const reviewSchema = z.object({
  post_id: z.number().min(1, 'Post ID is required'),
  rating: z.number().min(1, 'Rating is required'),
  comment: z.string().min(1, 'Comment is required')
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const data: ReviewType = await request.json();

    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Unauthorized: No session' },
        { status: 401 }
      );
    }

    const result = reviewSchema.safeParse(data);

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

    const userId = session.user.id;

    const createdReview: any = await Review.create({
      ...data,
      user_id: Number(userId)
    });

    return NextResponse.json(createdReview, { status: 201 });
  } catch (error) {
    console.error('Error creating review', error);
    return NextResponse.json(
      { message: 'Error creating review' },
      { status: 500 }
    );
  }
}
