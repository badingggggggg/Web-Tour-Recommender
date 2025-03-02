import axiosInstance from '@/app/axios/axios';
import { showToast } from '@/utils/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { PostItems, PostType } from 'types/post';

export const usePosts = (page: number, categoryName?: string) => {
  return useQuery<PostItems>({
    queryKey: ['posts', page, categoryName],
    queryFn: async () => {
      const query = categoryName
        ? `?page=${page}&category_name=${categoryName}`
        : `?page=${page}`;
      const response = await axiosInstance.get(`/api/post${query}`);
      return response.data;
    }
  });
};
export const usePost = (postId: number) => {
  return useQuery<PostType>({
    queryKey: ['posts', postId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/post/${postId}`);
      return response.data;
    }
  });
};
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(`/api/post/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      showToast('success', 'Post deleted successfully');
    },
    onError: (error: any) => {
      console.error('Error deleting post:', error);
      showToast('error', error.response.data.message);
    }
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (newPost: PostType) => {
      const response = await axiosInstance.post('/api/post', newPost, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      showToast('success', 'Post created successfully');
      router.push('/dashboard/post');
    },
    onError: (error: any) => {
      console.error('Error creating post:', error);
      showToast('error', error.response.data.message);
    }
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async ({
      id,
      updatedPost
    }: {
      id: number;
      updatedPost: PostType;
    }) => {
      const response = await axiosInstance.put(`/api/post/${id}`, updatedPost);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      showToast('success', 'Post updated successfully');
      router.push('/dashboard/post');
    },
    onError: (error: any) => {
      console.error('Error updating post', error);
      showToast('error', error.response.data.message);
    }
  });
};

export const useSearchPost = (
  query: string,
  page: number,
  limit: number = 20
) => {
  return useQuery<PostItems>({
    queryKey: ['searchPosts', query, page],
    queryFn: async () => {
      if (!query)
        return { items: [], total_items: 0, total_page: 0, offset: 0 };

      const response = await axiosInstance.get(
        `/api/post/search?query=${query}&page=${page}&limit=${limit}`
      );
      return response.data;
    },
    enabled: !!query
  });
};
