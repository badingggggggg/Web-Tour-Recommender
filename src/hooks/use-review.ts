import axiosInstance from '@/app/axios/axios';
import { showToast } from '@/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReviewType } from 'types/review';

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newReview: ReviewType) => {
      const response = await axiosInstance.post('/api/review', newReview);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      showToast('success', 'Created successfully');
    },
    onError: (error: any) => {
      console.error('Error creating review:', error);
      showToast('error', error.response.data.message);
    }
  });
};
