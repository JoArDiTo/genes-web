import { useMutation } from '@tanstack/react-query';
import { useAxiosPrivate } from '../useAxiosPrivate';
import type { ApiResponse, CreateTestPerformedRequest } from '@/interfaces';

export const useCreateTestPerformed = () => {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: async ({ id, payload }: CreateTestPerformedRequest) => {
      const response = await axiosPrivate.post(
        `/evaluation/templates/${id}/perform`,
        payload,
      );
      const data = response.data as ApiResponse<null>;
      return data;
    },
  });
};
