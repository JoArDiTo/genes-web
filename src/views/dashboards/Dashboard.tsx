import { useProvideAuth } from '@/hooks';
import { dashboardsByRole } from './DashboardsByRole';
import { Box, Flex, Heading, Stack } from '@chakra-ui/react';

export const Dashboard = () => {
  const { getUserCookie } = useProvideAuth();
  const user = getUserCookie();

  const allowedDashboards = dashboardsByRole
    .filter(({ role }) => role === user?.role || role === null)
    .map(({ component }, idx) => (
      <Box key={idx} w="full">
        {component()}{' '}
      </Box>
    ));

  return (
    <Flex direction="column" minH="100vh">
      <Stack flex="1" py="8" px="0" w="full" gap={8}>
        {allowedDashboards.length > 0 ? (
          allowedDashboards
        ) : (
          <Box>
            <Heading size="md">No tienes dashboards disponibles.</Heading>
          </Box>
        )}
      </Stack>
    </Flex>
  );
};
