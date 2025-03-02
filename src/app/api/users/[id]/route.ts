import User from '@/models/User';
import { NextResponse } from 'next/server';
import { UserType } from 'types/user';
import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  full_name: z.string().min(1, 'Full name is required'),
  phone: z.string().min(1, 'Phone number is required')
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const user = await User.getById(Number(id));

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error getting user', error);
    return NextResponse.json(
      { message: 'Failed to getting user' },

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

    const data: UserType = await request.json();

    const result = userSchema.safeParse(data);

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

    await User.update(Number(id), data);

    return NextResponse.json(
      { message: 'Updated Successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error updating user', error);
    return NextResponse.json(
      { message: 'Error updating user' },
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

    const user = await User.getById(Number(id));
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    await User.delete(Number(id));

    return NextResponse.json(
      { message: 'User deleted!' },
      {
        status: 200
      }
    );
  } catch (error) {
    console.error('Error soft deleting user', error);
    return NextResponse.json(
      { message: 'Failed to soft deleting user' },

      {
        status: 500
      }
    );
  }
}
