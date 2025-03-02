import axiosInstance from '@/app/axios/axios';
import { useQuery } from '@tanstack/react-query';
export interface CategoryDistribution {
  category_name: string;
  count: number;
}

export interface DashboardData {
  totalUsers: number;
  totalRedeemedVouchers: number;
  totalCategories: number;
  totalPosts: number;
  recentUsers: any[];
  userRegistrations: any[];
  categoryDistribution: CategoryDistribution[];
}

export const useDashboard = () => {
  return useQuery<DashboardData>({
    queryKey: ['overivew'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/overview`);
      return response.data;
    }
  });
};
