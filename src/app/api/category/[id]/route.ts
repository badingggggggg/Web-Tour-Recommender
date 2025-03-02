import Category from '@/models/Category';
import { NextResponse } from 'next/server';
import { CategoryType } from 'types/category';
import { z } from 'zod';
const categorySchema = z.object({
  category_name: z.string().min(1, 'Category is required')
});

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const category = await Category.getById(Number(id));

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error getting category', error);
    return NextResponse.json(
      { message: 'Failed to getting category' },

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

    const data: CategoryType = await request.json();

    const result = categorySchema.safeParse(data);

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

    await Category.update(Number(id), data);

    return NextResponse.json(
      { message: 'Updated Successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error updating category', error);
    return NextResponse.json(
      { message: 'Error updating category' },
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

    const post = await Category.getById(Number(id));
    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    await Category.delete(Number(id));

    return NextResponse.json(
      { message: 'Category deleted!' },
      {
        status: 200
      }
    );
  } catch (error) {
    console.error('Error soft deleting category', error);
    return NextResponse.json(
      { message: 'Failed to soft deleting category' },

      {
        status: 500
      }
    );
  }
}
