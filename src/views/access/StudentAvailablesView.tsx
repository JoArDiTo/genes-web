import { StudentAvailablesTable } from '@/components/tables';
import { Button, CustomSelect, Field } from '@/components/ui';
import ResponsiveBreadcrumb from '@/components/ui/ResponsiveBreadcrumb';
import { useDebounce } from '@/hooks';
import { useReadStudents, type StudentsParams } from '@/hooks/users';
import {
  type PaginationResponse,
  type ProfileResponse as StudentResponse,
} from '@/interfaces';
import { EncryptedStorage, Encryptor } from '@/lib';
import {
  Box,
  Card,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { useNavigate } from 'react-router';

export const StudentAvailablesView = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<StudentsParams>({
    page: 1,
    limit: 10,
    name: null,
    section: null,
    grade: null,
    gender: null,
  });

  const { data: dataStudents, isLoading: isLoadingStudents } =
    useReadStudents(params);

  const results = dataStudents?.results as StudentResponse[];
  const pagination = dataStudents?.pagination as PaginationResponse;

  const handleStudentClick = (student: StudentResponse) => {
    const encrypted = Encryptor.encrypt(student.academic?.id as number);
    const encoded = encodeURIComponent(encrypted);
    const { firstName, paternalSurname, maternalSurname } = student.person;
    const { email, imageUrl } = student.user;
    const { level, grade, section } = student.academic!;

    const fullName = `${firstName} ${paternalSurname} ${maternalSurname}`;
    const studentStorage = {
      fullName,
      email,
      imageUrl,
      level,
      grade,
      section,
    };
    EncryptedStorage.save('studentStorage', studentStorage);
    void navigate(`/estudiantes/${encoded}`);
  };

  const handleChangePage = (newPage: number) => {
    setParams((prev) =>
      prev.page !== newPage ? { ...prev, page: newPage } : prev,
    );
  };

  const handleChangeLimit = (newLimit: number) => {
    setParams((prev) =>
      prev.limit !== newLimit ? { ...prev, limit: newLimit } : prev,
    );
  };

  const [filteredName, setFilteredName] = useState('');
  const [filteredGrade, setFilteredGrade] = useState<number | null>(null);
  const [filteredSection, setFilteredSection] = useState('');
  const [filteredGender, setFilteredGender] = useState<string | null>(null);

  const debouncedName = useDebounce(filteredName, 500);
  const debouncedSection = useDebounce(filteredSection, 500);

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      name: debouncedName || null,
      section: debouncedSection || null,
      grade: filteredGrade ?? null,
      gender: filteredGender ?? null,
    }));
    handleChangePage(1);
  }, [debouncedName, debouncedSection, filteredGrade, filteredGender]);

  const GradeOptions = [
    { value: 1, label: '1er Grado' },
    { value: 2, label: '2do Grado' },
    { value: 3, label: '3er Grado' },
    { value: 4, label: '4to Grado' },
    { value: 5, label: '5to Grado' },
  ];

  const GenderOptions = [
    { value: 'MALE', label: 'Masculino' },
    { value: 'FEMALE', label: 'Femenino' },
    { value: 'OTHER', label: 'Otro' },
    { value: 'PREFER_NOT_TO_SAY', label: 'No especificado' },
  ];

  const hasActiveFilters =
    filteredName !== '' ||
    filteredGrade !== null ||
    filteredSection !== '' ||
    filteredGender !== null;

  const cleanFilters = () => {
    setFilteredName('');
    setFilteredGrade(null);
    setFilteredSection('');
    setFilteredGender(null);
  };

  const BreadcrumbItems = [{ label: 'Estudiantes' }];

  return (
    <Stack gap="8" mx="auto">
      <ResponsiveBreadcrumb items={BreadcrumbItems} />
      <Card.Root
        border="1px solid"
        borderColor="gray.200"
        borderRadius="lg"
        overflow="hidden"
      >
        <Card.Header>
          <Flex align="center" justify="space-between" w="full" py="2" px="4">
            <Box>
              <Heading size="xl" color="gray.800" mb="2">
                Estudiantes Disponibles
              </Heading>
              <Text color="gray.600" fontSize="md">
                Explora los tests psicológicos disponibles para evaluación
              </Text>
            </Box>
            {hasActiveFilters && (
              <Button
                size="sm"
                bg="red.50"
                color="red.600"
                border="1px solid"
                borderColor="red.400"
                onClick={cleanFilters}
                _hover={{ bg: 'red.100' }}
              >
                <FiTrash /> Limpiar Filtros
              </Button>
            )}
          </Flex>
        </Card.Header>
        <Card.Body>
          <SimpleGrid columns={2} gap="4" w="full">
            <Field label="Buscar por nombre">
              <Input
                placeholder="Buscar por nombre"
                value={filteredName}
                onChange={(e) => setFilteredName(e.target.value)}
              />
            </Field>
            <Field label="Buscar por sección">
              <Input
                placeholder="Buscar por sección"
                value={filteredSection}
                onChange={(e) => setFilteredSection(e.target.value)}
              />
            </Field>
            <Field label="Buscar por grado">
              <CustomSelect
                placeholder="Buscar por grado"
                value={filteredGrade}
                onChange={(option) =>
                  setFilteredGrade(typeof option === 'number' ? option : null)
                }
                items={GradeOptions}
              />
            </Field>
            <Field label="Buscar por género">
              <CustomSelect
                placeholder="Buscar por género"
                value={filteredGender}
                onChange={(option) =>
                  setFilteredGender(typeof option === 'string' ? option : null)
                }
                items={GenderOptions}
              />
            </Field>
          </SimpleGrid>
        </Card.Body>
      </Card.Root>

      <StudentAvailablesTable
        isLoading={isLoadingStudents}
        students={results}
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
            {pagination.total === 1 ? 'estudiante' : 'estudiantes'} en total
          </Text>
        </Box>
      )}
    </Stack>
  );
};
