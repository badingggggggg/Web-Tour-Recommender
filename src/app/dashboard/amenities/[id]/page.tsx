'use client';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useEffect } from 'react';
import { useAmenity, useUpdateAmenity } from '@/hooks/use-amenities';
import { AmenitiesType } from 'types/amenities';

export default function Page() {
  const { id } = useParams();
  const { data, isLoading, error } = useAmenity(Number(id));
  const { mutateAsync: updateAmenity } = useUpdateAmenity();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<AmenitiesType>({
    defaultValues: {
      amenity_name: ''
    }
  });

  useEffect(() => {
    if (data) {
      setValue('amenity_name', data.amenity_name);
    }
  }, [data, setValue]);

  const onSubmit = async (values: any) => {
    try {
      await updateAmenity({
        id: Number(id),
        updatedAmenity: {
          amenity_name: values.amenity_name
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
          <Heading title='Update Amenity' description='Edit category details' />
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
                {...register('amenity_name', {
                  required: 'This field is required'
                })}
                placeholder='Enter category name'
              />
              {errors.amenity_name && (
                <p className='text-xs text-red-500'>
                  {errors.amenity_name.message}
                </p>
              )}
            </div>

            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Amenity'}
            </Button>
          </form>
        )}
      </div>
    </PageContainer>
  );
}
