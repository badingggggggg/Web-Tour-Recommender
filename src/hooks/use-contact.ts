import axiosInstance from '@/app/axios/axios';
import { showToast } from '@/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ContactType } from 'types/contact';

export const useSendContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newContact: ContactType) => {
      const response = await axiosInstance.post('/api/contact', newContact);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contact'] });
      showToast('success', 'Message sent successfully');
    },
    onError: (error: any) => {
      console.error('Error creating message:', error);
      showToast('error', error.response.data.message);
    }
  });
};
