'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateCategory } from '@/hooks/use-category';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CategoryType } from 'types/category';

export default function NewCategoryDialog() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CategoryType>({
    defaultValues: {
      category_name: '',
      description: ''
    }
  });
  const createCategory = useCreateCategory();

  const onSubmit = async (values: CategoryType) => {
    try {
      await createCategory.mutateAsync(values);
      reset();
      setOpen(false);
    } catch (error) {
      console.error('Error during category creation', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='default' size='sm'>
          ＋ Add New Category
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new category.
          </DialogDescription>
        </DialogHeader>
        <form
          id='category-form'
          className='grid gap-4 py-4'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input
              {...register('category_name', {
                required: 'Category name is required'
              })}
              placeholder='Category title...'
              className='col-span-4'
            />
            {errors.category_name && (
              <p className='text-xs text-red-500'>
                {errors.category_name.message}
              </p>
            )}
          </div>
          <div>
            <Textarea
              {...register('description')}
              placeholder='Description...'
              className='col-span-4'
            />
          </div>
          <DialogFooter>
            <Button type='submit' size='sm' disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Category'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
