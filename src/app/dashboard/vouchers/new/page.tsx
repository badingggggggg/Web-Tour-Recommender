'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useUsers } from '@/hooks/use-user';
import { useCreateVoucher } from '@/hooks/use-voucher';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Define form validation schema using Zod
const formSchema = z.object({
  selectedUsers: z
    .array(z.number().min(1, 'User is required'))
    .min(1, 'At least one user must be selected'),
  code: z.string().min(1, 'Code is required'),
  amount: z
    .union([z.number().min(1, 'Amount is required'), z.nan()])
    .optional(),
  expiry_date: z.string().min(1, 'Expiry date is required')
});

export default function VoucherForm() {
  const { data: users, isLoading } = useUsers(1);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedUsers: [],
      code: '',
      amount: 0,
      expiry_date: ''
    }
  });

  const createVoucher = useCreateVoucher();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const vouchers = data.selectedUsers.map((user_id) => ({
        user_id,
        code: data.code,
        amount: data.amount,
        expiry_date: data.expiry_date
      }));

      await createVoucher.mutateAsync(vouchers as any);
    } catch (error) {
      console.error('Error during voucher creation', error);
    }
  };

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          Add Vouchers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* User List with Checkboxes */}
            {isLoading ? (
              <div className='text-center'>Loading Users...</div>
            ) : (
              <FormField
                control={form.control}
                name='selectedUsers'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Users</FormLabel>
                    <FormControl>
                      <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                        {users?.items.map((user) => (
                          <label
                            key={user.id}
                            className='flex cursor-pointer items-center space-x-2 rounded-md border p-2'
                          >
                            <Checkbox
                              checked={field.value.includes(Number(user.id))}
                              onCheckedChange={(checked) => {
                                field.onChange(
                                  checked
                                    ? [...field.value, user.id]
                                    : field.value.filter((id) => id !== user.id)
                                );
                              }}
                            />
                            <span>{user.full_name}</span>
                          </label>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Voucher Details */}
            <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Voucher Code</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter Code...' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      value={field.value === 0 ? '' : field.value}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === '' ? undefined : Number(value)
                        );
                      }}
                      placeholder='Amount'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='expiry_date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input type='date' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type='submit' disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
