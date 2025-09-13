import { Button, toaster } from '@/components/ui';
import {
  useGenerateReport,
  useSendObservation,
  useValidateObservation,
} from '@/hooks/analysis';
import type {
  AiReportResponse,
  AiValidationResponse,
  ApiResponse,
  GenerateReportRequest,
  MyEvaluationResponse,
  ObservationResponse,
} from '@/interfaces';
import { EncryptedStorage } from '@/lib';
import {
  Box,
  Card,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  Textarea,
} from '@chakra-ui/react';
import type {
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import { useState } from 'react';
import { BsRobot } from 'react-icons/bs';
import { FiFile } from 'react-icons/fi';

export const GeminiCheck = ({
  evaluation,
  fetchObservations,
}: {
  evaluation: MyEvaluationResponse | undefined;
  fetchObservations: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<ApiResponse<ObservationResponse>, Error>>;
}) => {
  const [aiReport, setAiReport] = useState<AiReportResponse | null>(null);
  const [aiValidate, setAiValidate] = useState<AiValidationResponse | null>(
    null,
  );
  const [observation, setObservation] = useState<string>('');
  const { mutate: generateReport, isPending: isGeneratingReport } =
    useGenerateReport();
  const { mutate: validateObservation, isPending: isValidatingObservation } =
    useValidateObservation();
  const { mutate: sendObservation, isPending: isSendingObservation } =
    useSendObservation();

  const studentStorage = EncryptedStorage.load('studentStorage') as {
    fullName: string;
    gender: string;
    age: number;
    email: string;
    imageUrl: string;
    level: string;
    grade: number;
    section: string;
  };
  const GenderOptions = [
    { value: 'MALE', label: 'Masculino' },
    { value: 'FEMALE', label: 'Femenino' },
    { value: 'OTHER', label: 'Otro' },
    { value: 'PREFER_NOT_TO_SAY', label: 'No especificado' },
  ];

  const generatePayload = () => {
    if (!evaluation) {
      toaster.create({
        title: 'Ocurrio un error',
        description: 'No se pudo generar el análisis',
        type: 'error',
      });
      return;
    }

    const newPayload: GenerateReportRequest = {
      templateTest: {
        name: evaluation.templateTest.name,
        description: evaluation.templateTest.description,
        objectives: evaluation.templateTest.objectives,
      },
      student: {
        name: studentStorage.fullName,
        age: studentStorage.age,
        gender:
          GenderOptions.find((option) => option.value === studentStorage.gender)
            ?.label ?? 'No especificado',
      },
      answers: evaluation.answers.map((ans) => ({
        question: ans.question,
        alternative: ans.alternative,
      })),
    };

    if (aiReport) {
      newPayload.sessionId = aiReport.sessionId;
    }

    return newPayload;
  };

  const handleGenerateReport = () => {
    const payload = generatePayload();

    generateReport(payload as GenerateReportRequest, {
      onSuccess: (data: ApiResponse<AiReportResponse>) => {
        toaster.create({
          title: 'Análisis generado',
          description: 'El análisis preliminar ha sido generado',
          type: 'success',
        });
        const report = data.result as AiReportResponse;
        setAiReport(report);
      },
      onError: () => {
        toaster.create({
          title: 'Ocurrio un error',
          description: 'No se pudo generar el análisis',
          type: 'error',
        });
      },
    });
  };

  const handleValidateObservation = () => {
    if (!aiReport) {
      toaster.create({
        title: 'Ocurrio un error',
        description: 'Hubo un error en el modelo de IA',
        type: 'error',
      });
      return;
    }

    const payload = {
      sessionId: aiReport.sessionId,
      observation,
    };

    validateObservation(payload, {
      onSuccess: (data: ApiResponse<AiValidationResponse>) => {
        toaster.create({
          title: 'Observación enviada',
          description: 'La observación ha sido enviada correctamente',
          type: 'success',
        });
        const validation = data.result as AiValidationResponse;
        setAiValidate(validation);
      },
      onError: () => {
        toaster.create({
          title: 'Ocurrio un error',
          description: 'No se pudo enviar la observación',
          type: 'error',
        });
      },
    });
  };

  const handleSendObservation = () => {
    if (!evaluation) {
      toaster.create({
        title: 'Ocurrio un error',
        description: 'No se pudo generar el análisis',
        type: 'error',
      });
      return;
    }

    const payload = {
      testPerformedId: evaluation.testPerformed.id,
      content: observation,
    };

    sendObservation(payload, {
      onSuccess: () => {
        toaster.create({
          title: 'Observación enviada con éxito',
          type: 'success',
        });
        void fetchObservations();
        setObservation('');
        setAiValidate(null);
      },
      onError: () => {
        toaster.create({
          title: 'Error al enviar observación',
          type: 'error',
        });
      },
    });
  };

  function formatReport(report: string) {
    const lines = report.split('\n');
    return lines.map((line, idx) => {
      if (/^\*\s+/.test(line)) {
        const html = line
          .replace(/^\*\s+/, '')
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        return (
          <li
            key={idx}
            style={{ marginLeft: 24 }}
            className="text-gray-700 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }

      if (/^\*\*\*(.+)\*\*\*$/.test(line)) {
        return (
          <Text as="h4" fontWeight="bold" mt={4} mb={2} key={idx}>
            {line.replace(/\*\*\*/g, '')}
          </Text>
        );
      }

      if (line.trim() === '') {
        return <Box as="br" key={idx} />;
      }

      const html = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      return (
        <Text
          as="p"
          mb={2}
          key={idx}
          className="text-gray-700 whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    });
  }

  return (
    <SimpleGrid columns={{ base: 1, xl: 5 }} gap={4}>
      <Card.Root gridColumn={{ base: 'span 1', xl: 'span 3' }} h="463px">
        <Card.Header
          bg="gray.50"
          p="6"
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <Flex justify="space-between" align="center" gap="4">
            <Flex align="center" gap="4">
              <Icon as={BsRobot} fontSize="2xl" />
              <Heading size="md" color="gray.800">
                Genere un análisis con Gemini AI
              </Heading>
            </Flex>
            <Button
              size="sm"
              loading={isGeneratingReport}
              onClick={handleGenerateReport}
              disabled={isValidatingObservation || isSendingObservation}
              loadingText="Generando..."
              bg="purple.500"
              _hover={{ bg: 'purple.600' }}
            >
              Generar análisis preliminar
            </Button>
          </Flex>
        </Card.Header>
        <Card.Body p="6" overflowY="scroll">
          {aiReport ? (
            <Box whiteSpace="pre-line" fontSize="md" color="gray.700">
              {formatReport(aiReport.report)}
            </Box>
          ) : (
            <Text color="gray.500" fontStyle="italic">
              Genere un análisis con Gemini para ver el resultado aquí.
            </Text>
          )}
        </Card.Body>
      </Card.Root>

      <Card.Root gridColumn={{ base: 'span 1', xl: 'span 2' }} h="463px">
        <Card.Header
          bg="gray.50"
          p="6"
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <Flex align="center" gap="4">
            <Icon as={FiFile} fontSize="2xl" />
            <Heading size="md" color="gray.800">
              Redacte sus observaciones
            </Heading>
          </Flex>
        </Card.Header>
        <Card.Body p="6" display="flex" flexDirection="column" h="80%">
          <Textarea
            placeholder="Escriba sus observaciones aquí..."
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            resize="none"
          />
          <Flex justify="flex-end" gap="2" my="4">
            <Button
              size="sm"
              px="6"
              loading={isSendingObservation}
              onClick={handleSendObservation}
              disabled={
                !observation || isGeneratingReport || isValidatingObservation
              }
              loadingText="Generando..."
              bg="blue.500"
              _hover={{ bg: 'blue.600' }}
            >
              Enviar
            </Button>
            <Button
              size="sm"
              px="6"
              loading={isValidatingObservation}
              onClick={handleValidateObservation}
              disabled={!observation || !aiReport || isGeneratingReport}
              loadingText="Generando..."
              bg="green.500"
              _hover={{ bg: 'green.600' }}
            >
              Validar
            </Button>
          </Flex>
          <Box
            border="1px solid"
            borderColor="gray.200"
            p="3"
            overflowY="auto"
            flex="1"
          >
            {aiValidate ? (
              <Box whiteSpace="pre-line" fontSize="md" color="gray.700">
                {formatReport(aiValidate.validation)}
              </Box>
            ) : (
              <Text color="gray.500" fontStyle="italic">
                Genere un la validación de Gemini para su observación.
              </Text>
            )}
          </Box>
        </Card.Body>
      </Card.Root>
    </SimpleGrid>
  );
};
