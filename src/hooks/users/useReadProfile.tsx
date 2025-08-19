import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from '../useAxiosPrivate';
import type { ProfileResponse, Response } from '@/interfaces';

export const useReadProfile = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await axiosPrivate.get('/users/profile');
      const data = response.data as Response<ProfileResponse>;
      return data;
    },
  });
};
