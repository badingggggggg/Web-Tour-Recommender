'use client';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useUsers } from '@/hooks/use-user';
import { DataTable as UserTable } from '@/components/ui/table/data-table';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { userColumns } from '@/features/users/components/user-columns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function UserPage() {
  const { data: categories, isLoading, error } = useUsers(1);

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Users' description='Manage Users' />
          <Link href='/dashboard/users/new'>
            <Button variant='default' size='sm'>
              ＋ Add New User
            </Button>
          </Link>
        </div>
        <Separator />

        {isLoading ? (
          <DataTableSkeleton columnCount={3} rowCount={10} />
        ) : error ? (
          <p className='text-red-500'>Failed to load categories</p>
        ) : (
          <UserTable
            columns={userColumns}
            data={categories?.items || []}
            totalItems={categories?.total_items ?? 0}
          />
        )}
      </div>
    </PageContainer>
  );
}
