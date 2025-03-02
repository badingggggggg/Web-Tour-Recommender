'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Ticket } from 'lucide-react';
import { useClaimVoucher, useUserVouchers } from '@/hooks/use-voucher';
import { format } from 'date-fns';
import { LoadingSpinner } from '@/components/common/Loader';

export default function UserDashboard() {
  const { data, isLoading, error } = useUserVouchers();
  const claimVoucher = useClaimVoucher();

  const handleClaim = (id: number) => {
    claimVoucher.mutateAsync(id);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  // Filter vouchers
  const unclaimedVouchers =
    data?.filter((voucher) => voucher.is_claimed === 0) || [];
  const claimedVouchers =
    data?.filter((voucher) => voucher.is_claimed === 1) || [];

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold'>Welcome to Your Dashboard</h1>
        <p className='text-muted-foreground'>
          Here you can find all the vouchers available for you to claim.
        </p>
      </div>

      {/* Available Vouchers */}
      <h2 className='mb-4 text-xl font-semibold'>Available Vouchers</h2>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5'>
        {unclaimedVouchers.length > 0 ? (
          unclaimedVouchers.map((voucher) => (
            <Card key={voucher.id} className='overflow-hidden'>
              <CardContent className='p-4'>
                <p className='text-sm text-muted-foreground'>{voucher.code}</p>
                <p className='mt-2 font-semibold text-green-500'>
                  PHP {voucher.amount}
                </p>
                <Button
                  className='mt-4 w-full'
                  onClick={() => handleClaim(Number(voucher.id))}
                >
                  <Ticket className='mr-2 h-5 w-5' />
                  Claim Voucher
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className='col-span-full text-center text-muted-foreground'>
            No available vouchers.
          </p>
        )}
      </div>

      {/* Claimed Vouchers Section */}
      {claimedVouchers.length > 0 && (
        <div className='mt-10'>
          <h2 className='mb-4 text-xl font-semibold'>Claimed Vouchers</h2>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5'>
            {claimedVouchers.map((voucher) => (
              <Card
                key={voucher.id}
                className='overflow-hidden border-green-500'
              >
                <CardContent className='p-4'>
                  <p className='text-sm text-muted-foreground'>
                    {voucher.code}
                  </p>
                  <p className='mt-2 font-semibold text-green-500'>
                    PHP {voucher.amount}
                  </p>

                  <p className='mt-1 text-xs text-gray-500'>
                    Claimed on:{' '}
                    {voucher.claimed_at
                      ? format(new Date(voucher.claimed_at), 'PPP p')
                      : 'N/A'}
                  </p>
                  <Button
                    disabled
                    className='mt-4 w-full bg-gray-300 text-gray-600'
                  >
                    <CheckCircle className='mr-2 h-5 w-5' />
                    Claimed
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
