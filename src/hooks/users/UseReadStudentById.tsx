import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from '../useAxiosPrivate';
import type {
  ProfileResponse as StudentResponse,
  ApiResponse,
} from '@/interfaces';

export const UseReadStudentById = (id: string) => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ['student-by-id', id],
    queryFn: async () => {
      if (!id) throw new Error('ID is required to fetch the student');
      const response = await axiosPrivate.get(`/users/students/${id}`);
      const data = response.data as ApiResponse<StudentResponse>;
      return data;
    },
    enabled: !!id,
  });
};
