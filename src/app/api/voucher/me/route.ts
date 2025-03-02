import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/utils/authOptions';
import Voucher from '@/models/Voucher';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Unauthorized: No session' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const userVoucher = await Voucher.getByUserId(Number(userId));

    return NextResponse.json(userVoucher);
  } catch (error) {
    console.error('Error getting voucher', error);
    return NextResponse.json(
      { message: 'Failed to get voucher' },
      { status: 500 }
    );
  }
}
