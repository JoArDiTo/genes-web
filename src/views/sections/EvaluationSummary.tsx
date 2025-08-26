import type { AnswersResponse } from '@/interfaces';
import { Box, Card, Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';

export const EvaluationSummary = ({
  answers,
}: {
  answers: AnswersResponse[];
}) => {
  return (
    <Card.Root boxShadow="md" border="1px solid" borderColor="gray.200">
      <Card.Header
        bg="gray.50"
        p="6"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Flex align="center" gap="4">
          <Icon as={MdCheckCircle} fontSize="2xl" color="green.500" />
          <Heading size="md" color="gray.800">
            Respuestas del estudiante
          </Heading>
        </Flex>
      </Card.Header>
      <Card.Body p="6">
        <Stack gap="4">
          {answers.map((ans, idx) => (
            <Box
              key={idx}
              p="4"
              borderRadius="md"
              bg="white"
              border="1px solid"
              borderColor="gray.100"
              boxShadow="sm"
            >
              <Text fontWeight="semibold" color="gray.700" mb="1">
                {idx + 1}. {ans.question}
              </Text>
              <Text color="blue.600" fontWeight="medium">
                Respuesta: {ans.alternative}
              </Text>
            </Box>
          ))}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};
