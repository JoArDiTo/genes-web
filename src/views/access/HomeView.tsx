import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { Dashboard } from '../dashboards';

export const HomeView = () => {
  return (
    <Box spaceY="5">
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        align="center"
        justify="space-between"
        gap="3"
      >
        <Box>
          <Heading>Mi panel</Heading>
          <Text>👋 Hola, bienvenido nuevamente.</Text>
        </Box>
      </Stack>

      <Dashboard />
    </Box>
  );
};
