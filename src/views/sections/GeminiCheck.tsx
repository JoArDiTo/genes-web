import { Alert, Button, toaster } from '@/components/ui';
import { useGenerateReport } from '@/hooks/analysis';
import type {
  AiReportResponse,
  ApiResponse,
  GenerateReportRequest,
  MyEvaluationResponse,
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
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsRobot } from 'react-icons/bs';
import { FiFile } from 'react-icons/fi';

export const GeminiCheck = ({
  evaluation,
}: {
  evaluation: MyEvaluationResponse | undefined;
}) => {
  const [aiReport, setAiReport] = useState<AiReportResponse | null>(null);
  const { mutate: generateReport, isPending: isGeneratingReport } =
    useGenerateReport();
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

      <Card.Root gridColumn={{ base: 'span 1', xl: 'span 2' }}>
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
        <Card.Body p="6">
          <Alert
            status="warning"
            title="En desarrollo: Redactar sus observaciones sobre el análisis generado."
          />
        </Card.Body>
      </Card.Root>
    </SimpleGrid>
  );
};
