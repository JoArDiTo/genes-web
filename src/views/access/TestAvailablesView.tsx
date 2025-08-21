import { TestsAvailablesTable } from '@/components/tables';
import { useReadTemplateTests } from '@/hooks/evaluation';
import type { TemplateTestResponse } from '@/interfaces';
import { Box, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export const TestAvailablesView = () => {
  const navigate = useNavigate();

  const { data: dataTemplateTests, isLoading: isLoadingTemplateTest } =
    useReadTemplateTests();

  if (isLoadingTemplateTest) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="xl" color="red.500" />
      </Flex>
    );
  }

  const results = dataTemplateTests?.results as TemplateTestResponse[];

  const handleTestClick = (uuid: string) => {
    void navigate(`/cuestionarios/${uuid}`);
  };

  return (
    <Stack gap="6" p="6">
      <Box>
        <Heading size="xl" color="gray.800" mb="2">
          Tests Disponibles
        </Heading>
        <Text color="gray.600" fontSize="lg">
          Explora los tests psicológicos disponibles para evaluación
        </Text>
      </Box>

      <TestsAvailablesTable
        tests={results || []}
        handleTestClick={handleTestClick}
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
