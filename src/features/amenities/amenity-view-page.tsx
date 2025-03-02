'use client';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable as AmenityTable } from '@/components/ui/table/data-table';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useAmenities } from '@/hooks/use-amenities';
import Link from 'next/link';
import { amenityColumns } from './amenity-table/amenity-columns';

export default function AmenityPage() {
  const { data: amenities, isLoading, error } = useAmenities(1);

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Amenities' description='Manage Categories' />
          <Link href='/dashboard/amenities/new'>
            <Button variant='default' size='sm'>
              ＋ Add New
            </Button>
          </Link>
        </div>
        <Separator />

        {isLoading ? (
          <DataTableSkeleton columnCount={3} rowCount={10} />
        ) : error ? (
          <p className='text-red-500'>Failed to load amenities</p>
        ) : (
          <AmenityTable
            columns={amenityColumns}
            data={amenities?.items || []}
            totalItems={amenities?.total_items ?? 0}
          />
        )}
      </div>
    </PageContainer>
  );
}
