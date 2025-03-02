import Amenities from '@/models/Amenities';
import { NextResponse } from 'next/server';
import { AmenitiesType } from 'types/amenities';
import { z } from 'zod';

const amenitySchema = z.object({
  amenity_name: z.string().min(1, 'Amenity name is required')
});
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const amenity = await Amenities.getById(Number(id));

    return NextResponse.json(amenity);
  } catch (error) {
    console.error('Error getting amenity', error);
    return NextResponse.json(
      { message: 'Failed to getting amenity' },

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

    await Amenities.update(Number(id), data);

    return NextResponse.json(
      { message: 'Updated Successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error updating amenity', error);
    return NextResponse.json(
      { message: 'Error updating amenity' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const amenity = await Amenities.getById(Number(id));
    if (!amenity) {
      return NextResponse.json(
        { message: 'Amenity not found' },
        { status: 404 }
      );
    }

    await Amenities.delete(Number(id));

    return NextResponse.json(
      { message: 'Amenity deleted!' },
      {
        status: 200
      }
    );
  } catch (error) {
    console.error('Error soft deleting amenity', error);
    return NextResponse.json(
      { message: 'Failed to soft deleting amenity' },

      {
        status: 500
      }
    );
  }
}
