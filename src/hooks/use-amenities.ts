import axiosInstance from '@/app/axios/axios';
import { showToast } from '@/utils/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AmenitiesType, AmenityItems } from 'types/amenities';

export const useAmenities = (page: number) => {
  return useQuery<AmenityItems>({
    queryKey: ['amenities', page],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/amenities?page=${page}`);
      return response.data;
    }
  });
};

export const useCreateAmenity = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (newAmenity: AmenitiesType) => {
      const response = await axiosInstance.post('/api/amenities', newAmenity);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['amenities'] });
      showToast('success', 'Created successfully');
      router.push('/dashboard/amenities');
    },
    onError: (error: any) => {
      console.error('Error creating amenity:', error);
      showToast('error', error.response.data.message);
    }
  });
};

export const useAmenity = (amenityId: number) => {
  return useQuery<AmenitiesType>({
    queryKey: ['amenity', amenityId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/amenities/${amenityId}`);
      return response.data;
    }
  });
};

export const useUpdateAmenity = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async ({
      id,
      updatedAmenity
    }: {
      id: number;
      updatedAmenity: AmenitiesType;
    }) => {
      const response = await axiosInstance.put(
        `/api/amenities/${id}`,
        updatedAmenity
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['amenities'] });
      showToast('success', 'Updated successfully');
      router.push('/dashboard/amenities');
    },
    onError: (error: any) => {
      console.error('Error updating amenity:', error);
      showToast('error', error.response.data.message);
    }
  });
};

export const useDeleteAmenity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(`/api/amenities/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['amenities'] });
      showToast('success', 'Deleted successfully');
    },
    onError: (error: any) => {
      console.error('Error deleting amenity:', error);
      showToast('error', error.response.data.message);
    }
  });
};
