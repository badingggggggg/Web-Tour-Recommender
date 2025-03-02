'use client';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable as CategoryTable } from '@/components/ui/table/data-table';
import { useCategories } from '@/hooks/use-category';
import NewCategoryDialog from './new-category-dialog';
import { categoryColumns } from './category-tables/category-columns';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';

export default function CategoriesPage() {
  const { data: categories, isLoading, error } = useCategories(1);

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Categories' description='Manage Categories' />
          <NewCategoryDialog />
        </div>
        <Separator />

        {isLoading ? (
          <DataTableSkeleton columnCount={3} rowCount={10} />
        ) : error ? (
          <p className='text-red-500'>Failed to load categories</p>
        ) : (
          <CategoryTable
            columns={categoryColumns}
            data={categories?.items || []}
            totalItems={categories?.total_items ?? 0}
          />
        )}
      </div>
    </PageContainer>
  );
}
