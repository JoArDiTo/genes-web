import type { TemplateTestResponse } from '@/interfaces';
import { Badge, Box, Table } from '@chakra-ui/react';

const Row = ({
  test,
  index,
  handleTestClick,
}: {
  test: TemplateTestResponse;
  index: number;
  handleTestClick: (uuid: string) => void;
}) => {
  return (
    <Table.Row
      key={test.id}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('a')) return;
        handleTestClick(test.uuid);
      }}
      cursor="pointer"
      _hover={{
        bg: 'blue.100',
      }}
    >
      <Table.Cell textAlign="center">{index + 1}</Table.Cell>
      <Table.Cell>{test.name}</Table.Cell>
      <Table.Cell textAlign="center">{test.author}</Table.Cell>
      <Table.Cell textAlign="center">
        <Badge
          colorPalette={test.available ? 'green' : 'red'}
          variant="subtle"
          size="sm"
        >
          {test.available ? 'Disponible' : 'No disponible'}
        </Badge>
      </Table.Cell>
    </Table.Row>
  );
};

export const TestsAvailablesTable = ({
  tests,
  handleTestClick,
}: {
  tests: TemplateTestResponse[];
  handleTestClick: (uuid: string) => void;
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
                Autor
              </Table.ColumnHeader>
              <Table.ColumnHeader
                fontWeight="bold"
                textAlign="center"
                color="gray.700"
              >
                Estado
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tests.length > 0 ? (
              tests.map((test, index) => (
                <Row
                  key={test.id}
                  test={test}
                  index={index}
                  handleTestClick={handleTestClick}
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
