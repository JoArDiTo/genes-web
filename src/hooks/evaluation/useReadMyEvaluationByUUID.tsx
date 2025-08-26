import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from '../useAxiosPrivate';
import type { ApiResponse, MyEvaluationResponse } from '@/interfaces';

export const useReadMyEvaluationByUUID = (uuid: string) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['my-evaluation', uuid],
    queryFn: async () => {
      if (!uuid)
        throw new Error('UUID is required to fetch the test performed');
      const response = await axiosPrivate.get(
        `/evaluation/tests-performed/${uuid}`,
      );
      const data = response.data as ApiResponse<MyEvaluationResponse>;
      return data;
    },
    enabled: !!uuid,
  });
};
