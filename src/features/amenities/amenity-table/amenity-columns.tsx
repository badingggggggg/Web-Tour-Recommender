import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { AlertModal } from '@/components/modal/alert-modal';
import { AmenitiesType } from 'types/amenities';
import { useDeleteAmenity } from '@/hooks/use-amenities';

export const amenityColumns: ColumnDef<AmenitiesType>[] = [
  {
    accessorKey: 'amenity_name',
    header: 'Name'
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: function ActionsCell({ row }) {
      const router = useRouter();
      const [open, setOpen] = useState(false);
      const [loading, setLoading] = useState(false);

      const amenity = row.original;

      const { mutate: deleteAmenity } = useDeleteAmenity();

      const onConfirm = async () => {
        setLoading(true);
        try {
          await deleteAmenity(Number(amenity.id));
        } catch (error) {
          console.error('Delete failed:', error);
        } finally {
          setLoading(false);
          setOpen(false);
        }
      };

      return (
        <div className='flex space-x-2'>
          <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onConfirm}
            loading={loading}
          />
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/dashboard/amenities/${amenity.id}`)
                }
              >
                <Edit className='mr-2 h-4 w-4' /> Update
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className='mr-2 h-4 w-4' /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }
  }
];
