import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from '../useAxiosPrivate';
import type { ProfileResponse, ApiResponse } from '@/interfaces';

export const useReadProfile = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await axiosPrivate.get('/users/profile');
      const data = response.data as ApiResponse<ProfileResponse>;
      return data;
    },
  });
};
