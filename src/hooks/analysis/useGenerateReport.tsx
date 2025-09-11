import { useMutation } from '@tanstack/react-query';
import { useAxiosPrivate } from '../useAxiosPrivate';
import type {
  AiReportResponse,
  ApiResponse,
  GenerateReportRequest,
} from '@/interfaces';

export const useGenerateReport = () => {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: async (payload: GenerateReportRequest) => {
      const res = await axiosPrivate.post('/analysis/generate-report', payload);
      const data = res.data as ApiResponse<AiReportResponse>;
      return data;
    },
  });
};
