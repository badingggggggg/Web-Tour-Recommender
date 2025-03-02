import User from '@/models/User';
import { NextResponse } from 'next/server';
import { UserType } from 'types/user';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const userSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  full_name: z.string().min(1, 'Full name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  user_type: z.string().optional()
});

export async function POST(request: Request) {
  try {
    let data: UserType = await request.json();

    data = { ...data, user_type: data.user_type || 'User' };

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

    const emailExists = await User.emailExists(String(data.email));
    if (emailExists) {
      return NextResponse.json(
        {
          message: 'Email already exists'
        },
        {
          status: 401
        }
      );
    }

    const usernameExists = await User.usernameExists(String(data.username));
    if (usernameExists) {
      return NextResponse.json(
        {
          message: 'Username already exists'
        },
        {
          status: 401
        }
      );
    }

    const hashedPassword = await bcrypt.hash(String(data.password), 10);
    data.password = hashedPassword;

    const createdUser: any = await User.create(data);

    return NextResponse.json(createdUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user', error);
    return NextResponse.json(
      { message: 'Error creating user' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '20', 10);
    const page = parseInt(url.searchParams.get('page') || '1', 10);

    const users = await User.getAll(limit, page);

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users', error);
    return NextResponse.json(
      { message: 'Error fetching users' },
      { status: 500 }
    );
  }
}
