import { Box, Table, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import type {
  ProfileResponse as StudentResponse,
  PaginationResponse,
} from '@/interfaces';
import { Pagination } from '../ui';
import SkeletonTable from '../ui/SkeletonTable';

interface RowProps {
  student: StudentResponse;
  index: number;
  handleStudentClick: (student: StudentResponse) => void;
}

const Row = ({ student, index, handleStudentClick }: RowProps) => (
  <Table.Row
    key={index}
    onClick={(e) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) return;
      handleStudentClick(student);
    }}
    bg={index % 2 === 0 ? 'white' : 'gray.100'}
    cursor="pointer"
    _hover={{
      bg: 'blue.100',
    }}
  >
    <Table.Cell textAlign="center">{index}</Table.Cell>
    <Table.Cell>
      <Text fontWeight="medium" color="gray.800">
        {student.person.firstName} {student.person.paternalSurname}{' '}
        {student.person.maternalSurname}
      </Text>
    </Table.Cell>
    <Table.Cell textAlign="center">{student.academic?.grade ?? '-'}</Table.Cell>
    <Table.Cell textAlign="center">
      {student.academic?.section ?? '-'}
    </Table.Cell>
    <Table.Cell textAlign="center">{student.academic?.level ?? '-'}</Table.Cell>
    <Table.Cell textAlign="center">
      {student.person.gender === 'MALE'
        ? 'Masculino'
        : student.person.gender === 'FEMALE'
          ? 'Femenino'
          : student.person.gender}
    </Table.Cell>
  </Table.Row>
);

interface StudentAvailablesTableProps {
  isLoading: boolean;
  students: StudentResponse[];
  pagination: PaginationResponse;
  handleStudentClick: (student: StudentResponse) => void;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
}

export const StudentAvailablesTable = ({
  isLoading,
  students,
  pagination,
  handleStudentClick,
  onLimitChange,
  onPageChange,
}: StudentAvailablesTableProps) => {
  // Calcula el índice global según página y límite
  const startIndex = useMemo(
    () => (isLoading ? 0 : (pagination.page - 1) * pagination.limit),
    [isLoading, pagination?.page, pagination?.limit],
  );

  const pageSizeOptions = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '50', value: 50 },
  ];
  const totalCount = isLoading ? 0 : pagination?.total;
  const pageSize = isLoading ? pageSizeOptions[1].value : pagination?.limit;
  const currentPage = isLoading ? 1 : pagination?.page;

  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
      overflow="hidden"
    >
      <Table.ScrollArea borderRadius="lg">
        <Table.Root variant="outline">
          <Table.Header bg="gray.50">
            <Table.Row>
              <Table.ColumnHeader
                textAlign="center"
                fontWeight="semibold"
                color="gray.700"
              >
                N°
              </Table.ColumnHeader>
              <Table.ColumnHeader fontWeight="semibold" color="gray.700">
                Nombre completo
              </Table.ColumnHeader>
              <Table.ColumnHeader
                textAlign="center"
                fontWeight="semibold"
                color="gray.700"
              >
                Grado
              </Table.ColumnHeader>
              <Table.ColumnHeader
                textAlign="center"
                fontWeight="semibold"
                color="gray.700"
              >
                Sección
              </Table.ColumnHeader>
              <Table.ColumnHeader
                textAlign="center"
                fontWeight="semibold"
                color="gray.700"
              >
                Nivel
              </Table.ColumnHeader>
              <Table.ColumnHeader
                textAlign="center"
                fontWeight="semibold"
                color="gray.700"
              >
                Género
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {isLoading ? (
              <SkeletonTable columns={6} />
            ) : students.length > 0 ? (
              students.map((student, idx) => (
                <Row
                  key={idx}
                  student={student}
                  index={startIndex + idx + 1}
                  handleStudentClick={handleStudentClick}
                />
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={6} textAlign="center" py={8}>
                  No hay estudiantes disponibles
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
      <Pagination
        count={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        pageSizeOptions={pageSizeOptions}
        onPageChange={onPageChange}
        onPageSizeChange={(value) => {
          onLimitChange(value);
          onPageChange(1);
        }}
      />
    </Box>
  );
};
