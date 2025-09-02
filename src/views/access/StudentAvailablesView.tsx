import { StudentAvailablesTable } from '@/components/tables';
import { useReadStudents } from '@/hooks/users';
import {
  type Pagination,
  type PaginationResponse,
  type ProfileResponse as StudentResponse,
} from '@/interfaces';
import { Box, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const StudentAvailablesView = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<Pagination>({
    page: 1,
    limit: 10,
  });

  const { data: dataStudents, isLoading: isLoadingStudents } =
    useReadStudents(params);

  if (isLoadingStudents) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="xl" color="red.500" />
      </Flex>
    );
  }

  const results = dataStudents?.results as StudentResponse[];
  const pagination = dataStudents?.pagination as PaginationResponse;

  const handleStudentClick = (uuid: string) => {
    void navigate(`/estudiantes/${uuid}`);
  };

  const handleChangePage = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeLimit = (newLimit: number) => {
    setParams((prev) => ({ ...prev, limit: newLimit }));
  };

  return (
    <Stack gap="6" p="6">
      <Box>
        <Heading size="xl" color="gray.800" mb="2">
          Estudiantes Disponibles
        </Heading>
        <Text color="gray.600" fontSize="lg">
          Explora los tests psicológicos disponibles para evaluación
        </Text>
      </Box>

      <StudentAvailablesTable
        students={results || []}
        pagination={pagination}
        handleStudentClick={handleStudentClick}
        onLimitChange={handleChangeLimit}
        onPageChange={handleChangePage}
      />

      {results && results.length > 0 && (
        <Box
          p="4"
          bg="blue.50"
          borderRadius="lg"
          border="1px solid"
          borderColor="blue.200"
        >
          <Text fontSize="sm" color="blue.700">
            <Text as="span" fontWeight="semibold">
              {pagination.total}
            </Text>{' '}
            {pagination.total === 1
              ? 'estudiante encontrado'
              : 'estudiantes encontrados'}
          </Text>
        </Box>
      )}
    </Stack>
  );
};
