'use client';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { useCategory, useUpdateCategory } from '@/hooks/use-category';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useEffect } from 'react';
import { CategoryType } from 'types/category';

export default function Page() {
  const { categoryId } = useParams();
  const { data, isLoading, error } = useCategory(Number(categoryId));
  const { mutateAsync: updateCategory } = useUpdateCategory();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<CategoryType>({
    defaultValues: {
      category_name: '',
      description: ''
    }
  });

  useEffect(() => {
    if (data) {
      setValue('category_name', data.category_name);
      setValue('description', data.description);
    }
  }, [data, setValue]);

  const onSubmit = async (values: any) => {
    try {
      await updateCategory({
        id: Number(categoryId),
        updatedCategory: {
          category_name: values.category_name,
          description: values.description
        }
      });
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <PageContainer scrollable>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Update Category'
            description='Edit category details'
          />
        </div>
        <Separator />

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className='text-red-500'>Failed to load categories</p>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='max-w-md space-y-4'
          >
            <div>
              <label className='block text-sm font-medium'>Category Name</label>
              <Input
                {...register('category_name', {
                  required: 'Category name is required'
                })}
                placeholder='Enter category name'
              />
              {errors.category_name && (
                <p className='text-xs text-red-500'>
                  {errors.category_name.message}
                </p>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium'>Description</label>
              <Input
                {...register('description')}
                placeholder='Enter description'
              />
            </div>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Category'}
            </Button>
          </form>
        )}
      </div>
    </PageContainer>
  );
}
