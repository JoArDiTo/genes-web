import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from '../useAxiosPrivate';
import type { ApiResponse, MyEvaluationResponse } from '@/interfaces';

export const useReadMyEvaluations = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['my-evaluations'],
    queryFn: async () => {
      const response = await axiosPrivate.get(
        '/evaluation/tests-performed/my-evaluations',
      );
      const data = response.data as ApiResponse<MyEvaluationResponse>;
      return data;
    },
  });
};
