import { MyEvaluationsTable } from '@/components/tables';
import { Avatar } from '@/components/ui';
import { useReadEvaluationsByStudent } from '@/hooks/evaluation';
import { UseReadStudentById } from '@/hooks/users';
import type {
  MyEvaluationResponse,
  ProfileResponse as StudentUserResponse,
} from '@/interfaces';
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
  const { userUUID } = useParams<{ userUUID: string }>();
  const navigate = useNavigate();

  const {
    data: dataStudentUser,
    isLoading: isLoadingStudentUser,
    error: errorStudentUser,
  } = UseReadStudentById(userUUID!);

  const studentResult = dataStudentUser?.result as StudentUserResponse;
  const studentId = studentResult?.academic?.id as number;

  const {
    data: dataEvaluations,
    isLoading: isLoadingEvaluations,
    error: errorEvaluations,
  } = useReadEvaluationsByStudent(studentId);

  const evaluationResults = dataEvaluations?.results as MyEvaluationResponse[];

  console.log({ dataStudentUser, isLoadingStudentUser, errorStudentUser });
  console.log({ dataEvaluations, isLoadingEvaluations, errorEvaluations });

  const handleEvaluationClick = (testUUID: string) => {
    void navigate(`evaluacion/${testUUID}`);
  };

  return (
    <Stack gap="8" mx="auto">
      <Card.Root overflow="hidden">
        <Card.Header bg="blue.50" py="6" px="6">
          <Flex align="center" gap="6">
            <Avatar
              size="2xl"
              name={`${studentResult?.person?.firstName ?? ''} ${studentResult?.person?.paternalSurname ?? ''}`}
              src={studentResult?.user?.imageUrl}
              border="2px solid"
              borderColor="blue.200"
              bg="white"
            />
            <Box>
              <Heading size="lg" color="blue.800" mb="1">
                {studentResult?.person?.firstName}{' '}
                {studentResult?.person?.paternalSurname}{' '}
                {studentResult?.person?.maternalSurname}
              </Heading>
              <Text color="gray.600" fontSize="md">
                {studentResult?.user?.email}
              </Text>
              <Text color="gray.500" fontSize="sm">
                {studentResult?.academic?.grade}° DE{' '}
                {studentResult?.academic?.level} -{' '}
                {studentResult?.academic?.section}
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
        tests={evaluationResults || []}
        handleEvaluationClick={handleEvaluationClick}
      />
    </Stack>
  );
};
