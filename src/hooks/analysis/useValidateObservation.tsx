import { useMutation } from '@tanstack/react-query';
import { useAxiosPrivate } from '../useAxiosPrivate';
import type {
  AiValidationResponse,
  ApiResponse,
  ValidateObservationRequest,
} from '@/interfaces';

export const useValidateObservation = () => {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: async (payload: ValidateObservationRequest) => {
      const res = await axiosPrivate.post(
        '/analysis/validate-observation',
        payload,
      );
      const data = res.data as ApiResponse<AiValidationResponse>;
      return data;
    },
  });
};
