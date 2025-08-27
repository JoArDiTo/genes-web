import type { ObservationResponse } from '@/interfaces';
import { Box, Card, Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { MdFileOpen } from 'react-icons/md';

export const ObservationsList = ({
  observations,
}: {
  observations: ObservationResponse[];
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
          <Icon as={MdFileOpen} fontSize="2xl" color="green.500" />
          <Heading size="md" color="gray.800">
            Observaciones del docente
          </Heading>
        </Flex>
      </Card.Header>
      <Card.Body p="6">
        <Stack gap="4">
          {observations.length > 0 ? (
            observations.map((obs, idx) => (
              <Box
                key={idx}
                p="4"
                borderRadius="md"
                bg="white"
                border="1px solid"
                borderColor="gray.100"
                boxShadow="sm"
              >
                <Text fontWeight="semibold" color="gray.700">
                  {idx + 1}. {obs.content}
                </Text>
              </Box>
            ))
          ) : (
            <Text color="gray.500">No hay observaciones disponibles.</Text>
          )}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};
