import axiosInstance from '@/app/axios/axios';
import { showToast } from '@/utils/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserItems, UserType } from 'types/user';

export const useUsers = (page: number) => {
  return useQuery<UserItems>({
    queryKey: ['users', page],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/users?page=${page}`);
      return response.data;
    }
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newUser: UserType) => {
      const response = await axiosInstance.post('/api/users', newUser);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      showToast('success', 'Registered successfully');
    },
    onError: (error: any) => {
      console.error('Error creating user:', error);
      showToast('error', error.response.data.message);
    }
  });
};

export const useUser = (userId: number) => {
  return useQuery<UserType>({
    queryKey: ['users', userId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/users/${userId}`);
      return response.data;
    }
  });
};

export const useUpdateUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      updateduser
    }: {
      id: number;
      updateduser: UserType;
    }) => {
      const response = await axiosInstance.put(`/api/users/${id}`, updateduser);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showToast('success', 'User updated successfully');
    },
    onError: (error: any) => {
      console.error('Error updating user:', error);
      showToast('error', error.response.data.message);
    }
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(`/api/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showToast('success', 'User deleted successfully');
    },
    onError: (error: any) => {
      console.error('Error deleting users:', error);
      showToast('error', error.response.data.message);
    }
  });
};

export const useUserProfile = () => {
  return useQuery<UserType>({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/users/profile`);
      return response.data;
    }
  });
};
