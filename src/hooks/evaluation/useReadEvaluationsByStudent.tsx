import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from '../useAxiosPrivate';
import type { ApiResponse, MyEvaluationResponse } from '@/interfaces';

export const useReadEvaluationsByStudent = (studentId: number) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['evaluations-by-student', studentId],
    queryFn: async () => {
      if (!studentId)
        throw new Error('Student ID is required to fetch the tests performed');
      const response = await axiosPrivate.get(
        `/evaluation/tests-performed/student/${studentId}`,
      );
      const data = response.data as ApiResponse<MyEvaluationResponse>;
      return data;
    },
    enabled: !!studentId,
  });
};
