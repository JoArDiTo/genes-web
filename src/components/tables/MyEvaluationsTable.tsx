import type { MyEvaluationResponse } from '@/interfaces';
import { Box, Table } from '@chakra-ui/react';

const Row = ({
  item,
  index,
  handleEvaluationClick,
}: {
  item: MyEvaluationResponse;
  index: number;
  handleEvaluationClick: (uuid: string) => void;
}) => {
  return (
    <Table.Row
      key={item.testPerformed.id}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('a')) return;
        handleEvaluationClick(item.testPerformed.uuid);
      }}
      cursor="pointer"
      _hover={{
        bg: 'blue.100',
      }}
    >
      <Table.Cell textAlign="center">{index + 1}</Table.Cell>
      <Table.Cell>{item.templateTest.name}</Table.Cell>
      <Table.Cell textAlign="center">
        {item.testPerformed.interpretation}
      </Table.Cell>
      <Table.Cell textAlign="center">
        {new Date(item.testPerformed.performedAt).toLocaleDateString()}
      </Table.Cell>
    </Table.Row>
  );
};

export const MyEvaluationsTable = ({
  tests,
  handleEvaluationClick,
}: {
  tests: MyEvaluationResponse[];
  handleEvaluationClick: (uuid: string) => void;
}) => {
  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
      overflow="hidden"
    >
      <Table.ScrollArea borderRadius="lg">
        <Table.Root variant="outline">
          <Table.Header bg="gray.50">
            <Table.Row>
              <Table.ColumnHeader
                fontWeight="bold"
                textAlign="center"
                color="gray.700"
              >
                Nº
              </Table.ColumnHeader>
              <Table.ColumnHeader fontWeight="bold" color="gray.700">
                Test
              </Table.ColumnHeader>
              <Table.ColumnHeader
                fontWeight="bold"
                textAlign="center"
                color="gray.700"
              >
                Resultado
              </Table.ColumnHeader>
              <Table.ColumnHeader
                fontWeight="bold"
                textAlign="center"
                color="gray.700"
              >
                Fecha realizada
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tests.length > 0 ? (
              tests.map((item, index) => (
                <Row
                  key={item.testPerformed.id}
                  item={item}
                  index={index}
                  handleEvaluationClick={handleEvaluationClick}
                />
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={4} textAlign="center">
                  No hay tests disponibles
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  );
};
