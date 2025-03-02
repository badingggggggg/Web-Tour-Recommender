import PostAmenities from '@/models/PostAmenities';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const postAmenitiesSchema = z.object({
  post_id: z.number().min(1, 'Post ID is required'),
  amenity_ids: z.array(z.number()).min(1, 'At least one amenity is required')
});

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const result = postAmenitiesSchema.safeParse(data);

    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        message: err.message,
        path: err.path
      }));

      return NextResponse.json({ message: errors[0].message }, { status: 400 });
    }

    const { post_id, amenity_ids } = data;

    const insertedAmenities = await PostAmenities.bulkInsert(
      post_id,
      amenity_ids
    );

    return NextResponse.json(
      { message: 'Amenities added successfully', insertedAmenities },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding amenities', error);
    return NextResponse.json(
      { message: 'Error adding amenities' },
      { status: 500 }
    );
  }
}
