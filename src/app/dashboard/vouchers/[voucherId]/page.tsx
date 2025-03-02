'use client';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useEffect } from 'react';
import { useUpdateVoucher, useVoucher } from '@/hooks/use-voucher';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

const formSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .transform((value) => Number(value) || 0),
  expiry_date: z.string().min(1, 'Expiry date is required'),
  is_redeemed: z.string()
});

export default function Page() {
  const { voucherId } = useParams();
  const { data, isLoading, error } = useVoucher(Number(voucherId));
  const { mutateAsync: updateVoucher } = useUpdateVoucher();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      expiry_date: '',
      is_redeemed: '0'
    }
  });

  const { setValue } = form;
  useEffect(() => {
    if (data) {
      setValue('amount', String(data.amount ?? '0') as any);
      setValue('is_redeemed', String(data.is_redeemed ?? '0'));
      if (data.expiry_date) {
        const formattedDate = new Date(data.expiry_date)
          .toISOString()
          .split('T')[0];
        setValue('expiry_date', formattedDate);
      }
    }
  }, [data, setValue]);

  const onSubmit = async (values: any) => {
    try {
      await updateVoucher({
        id: Number(voucherId),
        updatedVoucher: {
          amount: Number(values.amount),
          expiry_date: values.expiry_date,
          is_redeemed: Number(values.is_redeemed)
        }
      });
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  if (isLoading) return <PageContainer>Loading...</PageContainer>;
  if (error) return <PageContainer>Error: {error.message}</PageContainer>;

  return (
    <PageContainer scrollable>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Update Voucher' description='Edit Voucher details' />
        </div>
        <Separator />

        {data?.full_name && <h1>Name: {data?.full_name}</h1>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            {/* Amount Input */}
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input {...field} type='number' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Expiry Date Input */}
            <FormField
              control={form.control}
              name='expiry_date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input {...field} type='date' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Redeem Status Select */}
            <FormField
              control={form.control}
              name='is_redeemed'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Redeem Status</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select status' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='0'>Not Redeemed</SelectItem>
                      <SelectItem value='1'>Redeemed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type='submit' disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Updating...' : 'Update Voucher'}
            </Button>
          </form>
        </Form>
      </div>
    </PageContainer>
  );
}
