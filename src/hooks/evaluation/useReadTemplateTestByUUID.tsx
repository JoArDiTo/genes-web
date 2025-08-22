import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from '../useAxiosPrivate';
import type { ApiResponse, TemplateTestByUUIDResponse } from '@/interfaces';

export const useReadTemplateTestByUUID = (uuid: string) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['template-test', uuid],
    queryFn: async () => {
      if (!uuid) throw new Error('UUID is required to fetch the template test');
      const response = await axiosPrivate.get(`/evaluation/templates/${uuid}`);
      const data = response.data as ApiResponse<TemplateTestByUUIDResponse>;
      return data;
    },
    enabled: !!uuid,
  });
};
