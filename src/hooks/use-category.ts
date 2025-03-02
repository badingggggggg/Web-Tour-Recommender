import axiosInstance from '@/app/axios/axios';
import { showToast } from '@/utils/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { CategoryItems, CategoryType } from 'types/category';

export const useCategories = (page: number) => {
  return useQuery<CategoryItems>({
    queryKey: ['categories', page],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/category?page=${page}`);
      return response.data;
    }
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCategory: CategoryType) => {
      const response = await axiosInstance.post('/api/category', newCategory);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      showToast('success', 'Category created successfully');
    },
    onError: (error: any) => {
      console.error('Error creating category:', error);
      showToast('error', error.response.data.message);
    }
  });
};

export const useCategory = (categoryId: number) => {
  return useQuery<CategoryType>({
    queryKey: ['category', categoryId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/category/${categoryId}`);
      return response.data;
    }
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async ({
      id,
      updatedCategory
    }: {
      id: number;
      updatedCategory: CategoryType;
    }) => {
      const response = await axiosInstance.put(
        `/api/category/${id}`,
        updatedCategory
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      showToast('success', 'Category updated successfully');
      router.push('/dashboard/categories');
    },
    onError: (error: any) => {
      console.error('Error updating category:', error);
      showToast('error', error.response.data.message);
    }
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(`/api/category/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      showToast('success', 'Category deleted successfully');
    },
    onError: (error: any) => {
      console.error('Error deleting category:', error);
      showToast('error', error.response.data.message);
    }
  });
};
