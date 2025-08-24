import { MyEvaluationsTable } from '@/components/tables';
import { useReadMyEvaluations } from '@/hooks/evaluation';
import type { MyEvaluationResponse } from '@/interfaces';
import { Box, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export const MyEvaluationsView = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useReadMyEvaluations();

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  const results = data?.results as MyEvaluationResponse[];

  const handleEvaluationClick = (uuid: string) => {
    void navigate(`/evaluacion/${uuid}`);
  };

  return (
    <Stack gap="6" p="6">
      <Box>
        <Heading size="xl" color="gray.800" mb="2">
          Mis Evaluaciones
        </Heading>
        <Text color="gray.600" fontSize="lg">
          Explora tus evaluaciones psicológicas
        </Text>
      </Box>

      <MyEvaluationsTable
        tests={results || []}
        handleEvaluationClick={handleEvaluationClick}
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
              {results.length}
            </Text>{' '}
            {results.length === 1 ? 'test encontrado' : 'tests encontrados'}
          </Text>
        </Box>
      )}
    </Stack>
  );
};
