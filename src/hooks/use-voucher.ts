import axiosInstance from '@/app/axios/axios';
import { showToast } from '@/utils/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { VoucherItems, VoucherType } from 'types/voucher';

export const useVouchers = (page: number) => {
  return useQuery<VoucherItems>({
    queryKey: ['vouchers', page],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/voucher?page=${page}`);
      return response.data;
    }
  });
};

export const useCreateVoucher = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (newVoucher: VoucherType) => {
      const response = await axiosInstance.post('/api/voucher', newVoucher);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['vouchers'] });
      showToast('success', 'Created successfully');
      router.push('/dashboard/vouchers');
    },
    onError: (error: any) => {
      console.error('Error creating voucher:', error);
      showToast('error', error.response.data.message);
    }
  });
};

export const useVoucher = (voucherId: number) => {
  return useQuery<VoucherType>({
    queryKey: ['vouchers', voucherId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/voucher/${voucherId}`);
      return response.data;
    }
  });
};

export const useUpdateVoucher = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async ({
      id,
      updatedVoucher
    }: {
      id: number;
      updatedVoucher: VoucherType;
    }) => {
      const response = await axiosInstance.put(
        `/api/voucher/${id}`,
        updatedVoucher
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vouchers'] });
      showToast('success', 'Updated successfully');
      router.push('/dashboard/vouchers');
    },
    onError: (error: any) => {
      console.error('Error updating voucher:', error);
      showToast('error', error.response.data.message);
    }
  });
};

export const useDeleteVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(`/api/voucher/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vouchers'] });
      showToast('success', 'Deleted successfully');
    },
    onError: (error: any) => {
      console.error('Error deleting voucher:', error);
      showToast('error', error.response.data.message);
    }
  });
};

export const useUserVouchers = () => {
  return useQuery<VoucherType[]>({
    queryKey: ['vouchers'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/voucher/me`);
      return response.data;
    }
  });
};

export const useClaimVoucher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (voucherId: number) => {
      const response = await axiosInstance.post('/api/voucher/claim', {
        voucherId
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vouchers'] });
      queryClient.invalidateQueries({ queryKey: ['userVouchers'] });
      showToast('success', 'Voucher claimed successfully');
    },
    onError: (error: any) => {
      console.error('Error claiming voucher:', error);
      showToast(
        'error',
        error.response?.data?.message || 'Failed to claim voucher'
      );
    }
  });
};
