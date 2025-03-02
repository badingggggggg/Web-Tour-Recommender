'use client';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useEffect } from 'react';
import { useUpdateUsers, useUserProfile } from '@/hooks/use-user';
import { UserType } from 'types/user';
import { useSession } from 'next-auth/react';

export default function UpdateUser() {
  const { data, isLoading, error } = useUserProfile();
  const { mutateAsync: updateUser } = useUpdateUsers();
  const { data: session } = useSession();
  const userId = session?.user.id;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<UserType>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      full_name: '',
      phone: ''
    }
  });

  useEffect(() => {
    if (data) {
      setValue('username', data.username);
      setValue('full_name', data.full_name);
      setValue('phone', data.phone);
      setValue('email', data.email);
    }
  }, [data, setValue]);

  const onSubmit = async (values: any) => {
    try {
      await updateUser({
        id: Number(userId),
        updateduser: {
          username: values.username,
          full_name: values.full_name,
          phone: values.phone
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
          <Heading title='My Profile' description='Manage Details' />
        </div>
        <Separator />

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className='text-red-500'>Failed to load user</p>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='max-w-md space-y-4'
          >
            <div title='Cannot update email'>
              <label className='block text-sm font-medium'>Email</label>
              <Input {...register('email')} disabled />
            </div>
            <div>
              <label className='block text-sm font-medium'>Username</label>
              <Input
                {...register('username', {
                  required: 'Username is required'
                })}
                placeholder='Enter username'
              />
              {errors.username && (
                <p className='text-xs text-red-500'>
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium'>Full Name</label>
              <Input
                {...register('full_name', {
                  required: 'Full name is required'
                })}
                placeholder='Enter full name'
              />
              {errors.full_name && (
                <p className='text-xs text-red-500'>
                  {errors.full_name.message}
                </p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium'>Phone Number</label>
              <Input
                {...register('phone', {
                  required: 'Phone Number is required'
                })}
                placeholder='Enter Phone Number'
              />
              {errors.phone && (
                <p className='text-xs text-red-500'>{errors.phone.message}</p>
              )}
            </div>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update'}
            </Button>
          </form>
        )}
      </div>
    </PageContainer>
  );
}
