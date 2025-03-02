import User from '@/models/User';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Unauthorized: No session' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const user = await User.getById(Number(userId));

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error getting profile', error);
    return NextResponse.json(
      { message: 'Failed to getting profile' },

      {
        status: 500
      }
    );
  }
}
