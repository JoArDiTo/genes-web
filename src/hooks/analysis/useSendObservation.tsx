import { useMutation } from '@tanstack/react-query';
import { useAxiosPrivate } from '../useAxiosPrivate';
import type { ApiResponse, SendObservationRequest } from '@/interfaces';

export const useSendObservation = () => {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: async (payload: SendObservationRequest) => {
      const res = await axiosPrivate.post('/analysis/observations', payload);
      const data = res.data as ApiResponse<null>;
      return data;
    },
  });
};
