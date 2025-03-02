import Category from '@/models/Category';
import { NextResponse } from 'next/server';
import { CategoryType } from 'types/category';
import { z } from 'zod';

const categorySchema = z.object({
  category_name: z.string().min(1, 'Category is required')
});

export async function POST(request: Request) {
  try {
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

    const categoryExists = await Category.categoryExists(data.category_name);
    if (categoryExists) {
      return NextResponse.json(
        {
          message: 'Category already exists'
        },
        {
          status: 401
        }
      );
    }

    const createdCategory: any = await Category.create(data);

    return NextResponse.json(createdCategory, { status: 201 });
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

    const categories = await Category.getAll(limit, page);

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories', error);
    return NextResponse.json(
      { message: 'Error fetching categories' },
      { status: 500 }
    );
  }
}
