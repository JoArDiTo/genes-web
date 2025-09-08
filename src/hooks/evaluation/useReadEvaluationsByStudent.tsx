import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from '../useAxiosPrivate';
import type { ApiResponse, MyEvaluationResponse } from '@/interfaces';

export const useReadEvaluationsByStudent = (id: number) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['evaluations-by-student', id],
    queryFn: async () => {
      if (!id)
        throw new Error('Student ID is required to fetch the tests performed');
      const response = await axiosPrivate.get(
        `/evaluation/tests-performed/student/${id}`,
      );
      const data = response.data as ApiResponse<MyEvaluationResponse>;
      return data;
    },
    enabled: !!id,
  });
};
