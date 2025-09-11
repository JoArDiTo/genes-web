import { Alert } from '@/components/ui';
import { useReadMyEvaluationByUUID } from '@/hooks/evaluation';
import {
  Box,
  Card,
  Flex,
  Heading,
  Icon,
  Spinner,
  Stack,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { FaRegCommentDots } from 'react-icons/fa';
import { GiObservatory } from 'react-icons/gi';
import { MdDateRange, MdQuiz, MdScore, MdSummarize } from 'react-icons/md';
import { useParams } from 'react-router';
import { EvaluationSummary, GeminiCheck, ObservationsList } from '../sections';
import { useReadObservationsByTest } from '@/hooks/analysis';
import { useProvideAuth } from '@/hooks';
import { BsRobot } from 'react-icons/bs';

export const EvaluationDetailView = () => {
  const { uuid } = useParams<{ uuid: string }>();

  const { user: dataUser } = useProvideAuth();

  const {
    data: dataEvaluation,
    isLoading: isLoadingEvaluation,
    error: errorEvaluation,
  } = useReadMyEvaluationByUUID(uuid ?? '');

  const evaluation = dataEvaluation?.result;

  const {
    data: dataObservations,
    isLoading: isLoadingObservations,
    error: errorObservations,
  } = useReadObservationsByTest(evaluation?.testPerformed.id ?? '');

  const observations = dataObservations?.results;

  if (isLoadingEvaluation || isLoadingObservations) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  if (errorEvaluation || errorObservations) {
    return (
      <Alert
        title="Error al cargar el test"
        status="error"
        borderRadius="lg"
        mb={6}
      />
    );
  }

  if (!evaluation) {
    return (
      <Box textAlign="center" py="12">
        <Text fontSize="lg" color="gray.600">
          No se encontró la evaluación solicitada.
        </Text>
      </Box>
    );
  }

  const { testPerformed, templateTest, answers } = evaluation;
  const performedAtDate = new Date(
    testPerformed.performedAt,
  ).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const RiskLevelOptions = [
    { label: 'Riesgo No Definido', value: 'NOT_DEFINED' },
    { label: 'Riesgo Bajo', value: 'LOW' },
    { label: 'Riesgo Moderado', value: 'NORMAL' },
    { label: 'Riesgo Alto', value: 'HIGH' },
  ];

  const riskLevelLabel = RiskLevelOptions.find(
    (option) => option.value === testPerformed.riskLevel,
  )?.label;

  return (
    <Stack gap="8" mx="auto">
      {/* Información del test realizado */}
      <Card.Root boxShadow="md" border="1px solid" borderColor="gray.200">
        <Card.Header
          bg="blue.50"
          p="6"
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <Flex align="center" gap="4">
            <Icon as={MdQuiz} fontSize="2xl" color="blue.500" />
            <Heading size="md" color="gray.800">
              {templateTest.name}
            </Heading>
            <Text color="gray.500" fontSize="sm" ml="auto">
              {riskLevelLabel}
            </Text>
          </Flex>
        </Card.Header>
        <Card.Body p="6">
          <Stack gap="2">
            <Flex align="center" gap="2">
              <Icon as={MdDateRange} color="gray.500" />
              <Text fontSize="sm" color="gray.600">
                Fecha de realización: {performedAtDate}
              </Text>
            </Flex>
            <Flex align="center" gap="2">
              <Icon as={MdScore} color="green.500" />
              <Text fontSize="sm" color="gray.700" fontWeight="bold">
                Puntaje obtenido: {testPerformed.score}
              </Text>
            </Flex>
            <Flex align="center" gap="2">
              <Icon as={FaRegCommentDots} color="purple.500" />
              <Text fontSize="sm" color="gray.700">
                Interpretación: {testPerformed.interpretation}
              </Text>
            </Flex>
          </Stack>
        </Card.Body>
        <Card.Footer bg="gray.50" p="4">
          <Text fontSize="sm" color="gray.600">
            Autor del test: {templateTest.author}
          </Text>
        </Card.Footer>
      </Card.Root>

      <Tabs.Root defaultValue="summary" variant="plain">
        <Tabs.List bg="bg.muted" rounded="l3" p="1">
          <Tabs.Trigger value="summary">
            <MdSummarize />
            Resumen
          </Tabs.Trigger>
          <Tabs.Trigger value="observations">
            <GiObservatory />
            Observaciones
          </Tabs.Trigger>
          {dataUser?.role === 'TEACHER' && (
            <Tabs.Trigger value="ai-check">
              <BsRobot />
              Consultar con Gemini
            </Tabs.Trigger>
          )}
          <Tabs.Indicator rounded="l2" />
        </Tabs.List>
        <Tabs.Content value="summary">
          <EvaluationSummary answers={answers} />
        </Tabs.Content>
        <Tabs.Content value="observations">
          <ObservationsList observations={observations || []} />
        </Tabs.Content>
        {dataUser?.role === 'TEACHER' && (
          <Tabs.Content value="ai-check">
            <GeminiCheck evaluation={evaluation} />
          </Tabs.Content>
        )}
      </Tabs.Root>
    </Stack>
  );
};
