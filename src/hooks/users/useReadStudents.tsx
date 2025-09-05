import {
  type ApiResponse,
  type Pagination,
  type ProfileResponse as StudentResponse,
} from '@/interfaces';
import { useAxiosPrivate } from '../useAxiosPrivate';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export interface StudentsParams extends Pagination {
  name: string | null;
  section: string | null;
  grade: number | null;
  gender: string | null;
}

export const useReadStudents = ({
  page = 1,
  limit = 10,
  name = null,
  section = null,
  grade = null,
  gender = null,
}: StudentsParams) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['students', page, limit, name, section, grade, gender],
    queryFn: async () => {
      const response = await axiosPrivate.get('/users/students', {
        params: { page, limit, name, section, grade, gender },
      });
      const data = response.data as ApiResponse<StudentResponse>;
      return data;
    },
    placeholderData: keepPreviousData,
  });
};
