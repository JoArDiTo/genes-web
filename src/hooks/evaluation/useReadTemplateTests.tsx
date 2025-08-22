import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from '../useAxiosPrivate';
import type { ApiResponse, TemplateTestResponse } from '@/interfaces';

export const useReadTemplateTests = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['template-tests'],
    queryFn: async () => {
      const response = await axiosPrivate.get('/evaluation/templates');
      const data = response.data as ApiResponse<TemplateTestResponse>;
      return data;
    },
  });
};
