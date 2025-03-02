import Voucher from '@/models/Voucher';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const voucherSchema = z.object({
  user_id: z.number().min(1, 'User ID is required'),
  code: z.string().min(1, 'Code is required'),
  amount: z.number().min(1, 'Amount is required'),
  expiry_date: z.string().min(1, 'Expiry date is required')
});

// Validate an array of vouchers
const vouchersSchema = z.array(voucherSchema);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const result = vouchersSchema.safeParse(data);

    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        message: err.message,
        path: err.path
      }));

      return NextResponse.json({ message: errors[0].message }, { status: 400 });
    }

    const vouchers = await Voucher.create(data);

    return NextResponse.json(
      { message: 'Vouchers created successfully', vouchers },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating vouchers:', error);
    return NextResponse.json(
      { message: 'Error creating vouchers' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '20', 10);
    const page = parseInt(url.searchParams.get('page') || '1', 10);

    const vouchers = await Voucher.getAll(limit, page);

    return NextResponse.json(vouchers);
  } catch (error) {
    console.error('Error fetching vouchers', error);
    return NextResponse.json(
      { message: 'Error fetching vouchers' },
      { status: 500 }
    );
  }
}
