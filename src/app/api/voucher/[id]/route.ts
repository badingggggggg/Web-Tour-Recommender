import Voucher from '@/models/Voucher';
import { NextResponse } from 'next/server';
import { VoucherType } from 'types/voucher';
import { z } from 'zod';
const voucherSchema = z.object({
  amount: z.number().min(1, 'Amount is required'),
  expiry_date: z.string().min(1, 'Expiry date is required')
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const voucher = await Voucher.getById(Number(id));

    return NextResponse.json(voucher);
  } catch (error) {
    console.error('Error getting voucher', error);
    return NextResponse.json(
      { message: 'Failed to getting voucher' },

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

    const data: VoucherType = await request.json();

    const result = voucherSchema.safeParse(data);

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

    await Voucher.update(Number(id), data);

    return NextResponse.json(
      { message: 'Updated Successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error updating voucher', error);
    return NextResponse.json(
      { message: 'Error updating voucher' },
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

    const voucher = await Voucher.getById(Number(id));
    if (!voucher) {
      return NextResponse.json(
        { message: 'Voucher not found' },
        { status: 404 }
      );
    }

    await Voucher.delete(Number(id));

    return NextResponse.json(
      { message: 'Voucher deleted!' },
      {
        status: 200
      }
    );
  } catch (error) {
    console.error('Error soft deleting Voucher', error);
    return NextResponse.json(
      { message: 'Failed to soft deleting Voucher' },

      {
        status: 500
      }
    );
  }
}
