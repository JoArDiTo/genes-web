import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from '../useAxiosPrivate';
import type { ApiResponse, ObservationResponse } from '@/interfaces';

export const useReadObservationsByTest = (id: number) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['observations', id],
    queryFn: async () => {
      if (!id) throw new Error('Id is required to fetch the observations');
      const response = await axiosPrivate.get(
        `/analysis/observations/by-test/${id}`,
      );
      const data = response.data as ApiResponse<ObservationResponse>;
      return data;
    },
    enabled: !!id,
  });
};
