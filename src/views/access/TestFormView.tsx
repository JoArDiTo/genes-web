import {
  Box,
  Card,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';
import {
  useCreateTestPerformed,
  useReadTemplateTestByUUID,
} from '@/hooks/evaluation';
import { useState } from 'react';
import {
  Alert,
  Button,
  RadioCardGroup,
  RadioCardItem,
  toaster,
} from '@/components/ui';
import { FaUserEdit } from 'react-icons/fa';
import { useProvideAuth } from '@/hooks';

export const TestFormView = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const { getUserCookie } = useProvideAuth();
  const user = getUserCookie();
  const { data, isLoading, error } = useReadTemplateTestByUUID(uuid ?? '');
  const { mutate: createTestPerformed, isPending } = useCreateTestPerformed();
  const [answers, setAnswers] = useState<
    Record<number, { alternativeId: number; alternativeValue: number }>
  >({});
  const [submitting, setSubmitting] = useState(false);

  const test = data?.result;

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert
        title="Error al cargar el test"
        status="error"
        borderRadius="lg"
        mb={6}
      />
    );
  }

  if (!test) {
    return (
      <Box textAlign="center" py="12">
        <Text fontSize="lg" color="gray.600">
          No se encontró el test solicitado.
        </Text>
      </Box>
    );
  }

  const handleChange = (
    questionId: number,
    alternativeId: number,
    alternativeValue: number,
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { alternativeId, alternativeValue },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const studentId = user?.sub as number;
    const payload = {
      studentId,
      answers: test.questions.map((q) => ({
        questionId: q.id,
        alternativeId: answers[q.id]?.alternativeId ?? null,
        alternativeValue: answers[q.id]?.alternativeValue ?? null,
      })),
    };

    createTestPerformed(
      { id: test.id, payload },
      {
        onSuccess: () => {
          void navigate('/mis-evaluaciones');
          toaster.create({
            title: 'Test enviado',
            description: 'Tus respuestas han sido enviadas con éxito.',
            type: 'success',
          });
        },
        onError: (error) => {
          toaster.create({
            title: 'Error al enviar el test',
            description: error.message,
            type: 'error',
          });
        },
      },
    );
  };

  return (
    <Stack gap="8" mx="auto">
      <Card.Root
        boxShadow="lg"
        borderRadius="2xl"
        border="1px solid"
        borderColor="gray.100"
        overflow="hidden"
      >
        <Card.Header
          bg="blue.50"
          p="6"
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <Heading size="lg" color="blue.700">
            {test.name}
          </Heading>
          <Text color="gray.600" fontSize="md" mt="2">
            {test.description}
          </Text>
          <Flex align="center" mt="3" color="gray.500" fontSize="sm" gap="2">
            <FaUserEdit /> Autor: {test.author}
          </Flex>
        </Card.Header>
        <Card.Body p="6">
          <VStack as="form" onSubmit={handleSubmit} gap="8" w="full">
            <VStack gap="6" align="stretch" w="full">
              {test.questions.map((question, idx) => (
                <Box
                  key={question.id}
                  p="5"
                  borderRadius="lg"
                  bg="white"
                  border="1px solid"
                  borderColor="gray.200"
                  boxShadow="sm"
                  _hover={{ boxShadow: 'md' }}
                  transition="all 0.2s ease-in-out"
                >
                  <Text
                    fontWeight="semibold"
                    color="blue.800"
                    mb="4"
                    fontSize="lg"
                  >
                    {idx + 1}. {question.content}
                  </Text>
                  <RadioCardGroup
                    orientation="vertical"
                    align="start"
                    gap="3"
                    w="full"
                  >
                    <SimpleGrid gap="3" columns={{ base: 1, lg: 2 }}>
                      {test.alternatives.map((alt) => (
                        <RadioCardItem
                          key={alt.id}
                          label={alt.content}
                          value={alt.value.toString()}
                          onChange={() =>
                            handleChange(question.id, alt.id, alt.value)
                          }
                          indicator={null}
                          _checked={{
                            bg: 'blue.100',
                            borderColor: 'blue.500',
                            color: 'blue.800',
                            fontWeight: 'semibold',
                          }}
                          overflow="hidden"
                          borderRadius="md"
                          border="1px solid"
                          borderColor="gray.300"
                          cursor="pointer"
                          _hover={{ bg: 'gray.50' }}
                        >
                          {alt.content}
                        </RadioCardItem>
                      ))}
                    </SimpleGrid>
                  </RadioCardGroup>
                </Box>
              ))}
            </VStack>

            <Flex justify="flex-end" w="full">
              <Button
                type="submit"
                colorPalette="blue"
                size="lg"
                loading={isPending}
                loadingText="Enviando..."
                borderRadius="lg"
                px="8"
                shadow="md"
                _hover={{ transform: 'scale(1.02)', shadow: 'lg' }}
                disabled={
                  submitting || test.questions.some((q) => !answers[q.id])
                }
              >
                Enviar respuestas
              </Button>
            </Flex>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Stack>
  );
};
