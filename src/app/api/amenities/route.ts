import Amenities from '@/models/Amenities';
import { NextResponse } from 'next/server';
import { AmenitiesType } from 'types/amenities';
import { z } from 'zod';

const amenitySchema = z.object({
  amenity_name: z.string().min(1, 'Amenity name is required')
});

export async function POST(request: Request) {
  try {
    const data: AmenitiesType = await request.json();

    const result = amenitySchema.safeParse(data);

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

    const createdAmenity: any = await Amenities.create(data);

    return NextResponse.json(createdAmenity, { status: 201 });
  } catch (error) {
    console.error('Error creating category', error);
    return NextResponse.json(
      { message: 'Error creating category' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '20', 10);
    const page = parseInt(url.searchParams.get('page') || '1', 10);

    const amenities = await Amenities.getAll(limit, page);

    return NextResponse.json(amenities);
  } catch (error) {
    console.error('Error fetching amenities', error);
    return NextResponse.json(
      { message: 'Error fetching amenities' },
      { status: 500 }
    );
  }
}
