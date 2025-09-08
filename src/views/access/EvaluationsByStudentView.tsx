import { MyEvaluationsTable } from '@/components/tables';
import { Avatar } from '@/components/ui';
import ResponsiveBreadcrumb from '@/components/ui/ResponsiveBreadcrumb';
import { useReadEvaluationsByStudent } from '@/hooks/evaluation';
import { UseReadStudentById } from '@/hooks/users';
import type {
  MyEvaluationResponse,
  ProfileResponse as StudentUserResponse,
} from '@/interfaces';
import { EncryptedStorage, Encryptor } from '@/lib';
import {
  Box,
  Card,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';

export const EvaluationsByStudentView = () => {
  const { id } = useParams<{ id: string }>();

  const decoded = decodeURIComponent(id!);
  const decrypted = Encryptor.decrypt(decoded) as number;

  const studentStorage = EncryptedStorage.load('studentStorage') as {
    fullName: string;
    email: string;
    imageUrl: string;
    level: string;
    grade: number;
    section: string;
  };
  const navigate = useNavigate();

  const { data: dataStudentUser, isLoading: isLoadingStudentUser } =
    UseReadStudentById(decrypted);

  const { data: dataEvaluations, isLoading: isLoadingEvaluations } =
    useReadEvaluationsByStudent(decrypted);

  if (!studentStorage) return void navigate(-1);

  const studentResult = dataStudentUser?.result as StudentUserResponse;

  const evaluationResults = dataEvaluations?.results as MyEvaluationResponse[];

  const handleEvaluationClick = (testUUID: string) => {
    void navigate(`evaluacion/${testUUID}`);
  };

  const BreadcrumbItems = [
    { label: 'Estudiantes', to: '/estudiantes' },
    { label: studentStorage.fullName },
  ];

  return (
    <Stack gap="8" mx="auto">
      <ResponsiveBreadcrumb items={BreadcrumbItems} />
      <Card.Root
        border="1px solid"
        borderColor="gray.200"
        borderRadius="lg"
        overflow="hidden"
      >
        <Card.Header bg="blue.50" py="6" px="6">
          <Flex align="center" gap="6">
            <Avatar
              size="2xl"
              name={studentStorage.fullName}
              src={studentStorage.imageUrl}
              border="2px solid"
              borderColor="blue.200"
              bg="white"
            />
            <Box>
              <Heading size="lg" color="blue.800" mb="1">
                {studentStorage.fullName}
              </Heading>
              <Text color="gray.600" fontSize="md">
                {studentStorage.email}
              </Text>
              <Text color="gray.500" fontSize="sm">
                {studentStorage.grade}° DE {studentStorage.level} -{' '}
                {studentStorage.section}
              </Text>
            </Box>
          </Flex>
        </Card.Header>
        <Card.Body py="6" px="6">
          <SimpleGrid columns={[1, 2, 3]} gap="4">
            <Box>
              <Text fontWeight="semibold" color="gray.700">
                Documento
              </Text>
              <Text color="gray.600">
                {studentResult?.person?.documentType}:{' '}
                {studentResult?.person?.documentNumber}
              </Text>
            </Box>
            <Box>
              <Text fontWeight="semibold" color="gray.700">
                Género
              </Text>
              <Text color="gray.600">
                {studentResult?.person?.gender === 'MALE'
                  ? 'Masculino'
                  : studentResult?.person?.gender === 'FEMALE'
                    ? 'Femenino'
                    : 'Otro'}
              </Text>
            </Box>
            <Box>
              <Text fontWeight="semibold" color="gray.700">
                Fecha de nacimiento
              </Text>
              <Text color="gray.600">
                {studentResult?.person?.birthDate &&
                  new Date(studentResult.person.birthDate).toLocaleDateString()}
              </Text>
            </Box>
            <Box>
              <Text fontWeight="semibold" color="gray.700">
                Dirección
              </Text>
              <Text color="gray.600">{studentResult?.person?.address}</Text>
            </Box>
            <Box>
              <Text fontWeight="semibold" color="gray.700">
                Teléfono
              </Text>
              <Text color="gray.600">{studentResult?.person?.phoneNumber}</Text>
            </Box>
            <Box>
              <Text fontWeight="semibold" color="gray.700">
                Rol
              </Text>
              <Text color="gray.600">
                {studentResult?.user?.role === 'STUDENT'
                  ? 'Estudiante'
                  : studentResult?.user?.role}
              </Text>
            </Box>
          </SimpleGrid>
        </Card.Body>
      </Card.Root>
      <MyEvaluationsTable
        tests={evaluationResults}
        isLoading={isLoadingEvaluations && isLoadingStudentUser}
        handleEvaluationClick={handleEvaluationClick}
      />
    </Stack>
  );
};
