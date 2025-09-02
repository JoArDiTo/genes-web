import {
  type ApiResponse,
  type Pagination,
  type ProfileResponse as StudentResponse,
} from '@/interfaces';
import { useAxiosPrivate } from '../useAxiosPrivate';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useReadStudents = ({ page = 1, limit = 10 }: Pagination) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['students', page, limit],
    queryFn: async () => {
      const response = await axiosPrivate.get('/users/students', {
        params: { page, limit },
      });
      const data = response.data as ApiResponse<StudentResponse>;
      return data;
    },
    placeholderData: keepPreviousData,
  });
};
