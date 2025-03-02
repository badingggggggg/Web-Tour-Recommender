'use client';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable as PostTable } from '@/components/ui/table/data-table';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { postColumns } from './post-tables/post-columns';
import { usePosts } from '@/hooks/use-post';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PostPage() {
  const { data: posts, isLoading, error } = usePosts(1);

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Posts' description='Manage Posts' />{' '}
          <Link href='/dashboard/post/new'>
            <Button variant='default' size='sm'>
              ＋ Add New Post
            </Button>
          </Link>
        </div>
        <Separator />

        {isLoading ? (
          <DataTableSkeleton columnCount={3} rowCount={10} />
        ) : error ? (
          <p className='text-red-500'>Failed to load posts</p>
        ) : (
          <PostTable
            columns={postColumns}
            data={posts?.items || []}
            totalItems={posts?.total_items ?? 0}
          />
        )}
      </div>
    </PageContainer>
  );
}
