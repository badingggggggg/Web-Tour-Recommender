'use client';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable as VoucherTable } from '@/components/ui/table/data-table';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useVouchers } from '@/hooks/use-voucher';
import { voucherColumns } from './voucher-tables/voucher-columns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function VoucherPage() {
  const { data: vouchers, isLoading, error } = useVouchers(1);
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Vouchers' description='Manage Vouchers' />
          <Link href='/dashboard/vouchers/new'>
            <Button variant='default' size='sm'>
              ＋ Add New Voucher
            </Button>
          </Link>
        </div>
        <Separator />

        {isLoading || !vouchers?.items ? (
          <DataTableSkeleton columnCount={3} rowCount={10} />
        ) : error ? (
          <p className='text-red-500'>Failed to load vouchers</p>
        ) : (
          <VoucherTable
            columns={voucherColumns}
            data={vouchers?.items || []}
            totalItems={vouchers?.total_items ?? 0}
          />
        )}
      </div>
    </PageContainer>
  );
}
