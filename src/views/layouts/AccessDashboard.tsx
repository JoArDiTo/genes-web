import { SideBar, TopBar } from '@/components/navigation';
import { useProvideAuth } from '@/hooks';
import { Box, Flex } from '@chakra-ui/react';
import { FiCheck, FiFile, FiGrid, FiUser, FiUsers } from 'react-icons/fi';
import { Outlet } from 'react-router';

const mainItems = [
  {
    href: '/',
    icon: FiGrid,
    label: 'Mi panel',
    role: null,
  },
  {
    href: '/cuestionarios',
    icon: FiFile,
    label: 'Test disponibles',
    role: null,
  },
  // Rutas para el estudiante
  {
    href: '/mis-evaluaciones',
    icon: FiCheck,
    label: 'Mis evaluaciones',
    role: 'STUDENT',
  },
  // Rutas para el docente
  {
    href: '/estudiantes',
    icon: FiUsers,
    label: 'Estudiantes',
    role: 'TEACHER',
  },
];

const bottomItems = [
  {
    href: '/perfil',
    icon: FiUser,
    label: 'Mi perfil',
    role: null,
  },
];

export const AccessDashboard = () => {
  const { getUser } = useProvideAuth();
  const user = getUser();
  const role = user?.role;
  const mainItemsFiltered = mainItems.filter(
    (item) => item.role === null || item.role === role,
  );

  return (
    <Flex h="100svh" w="100vw" position="fixed" direction="column">
      <Flex h="100%" w="100%">
        <SideBar mainItems={mainItemsFiltered} bottomItems={bottomItems} />
        <Flex flex="1" direction="column" minW="0">
          <TopBar />
          <Box overflowY="auto" p={6}>
            <Outlet />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
