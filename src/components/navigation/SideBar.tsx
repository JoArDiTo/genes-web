import { useProvideAuth } from '@/hooks';
import { Box, Flex, Image, Separator, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link, useLocation } from 'react-router';

interface SidebarItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  role: null | string;
}

interface SideBarProps {
  mainItems: SidebarItemProps[];
  bottomItems: SidebarItemProps[];
}

export const SideBar = ({ mainItems, bottomItems }: SideBarProps) => {
  const { logout } = useProvideAuth();
  const handleLogout = () => logout();

  return (
    <Box
      w="250px"
      bg="white"
      transition="width 0.3s"
      boxShadow="md"
      h="full"
      px="5"
      py="8"
      position="relative"
      display="flex"
      flexDirection="column"
    >
      <Flex justify="center" align="center" mb="6">
        <Image src="logo.svg" alt="Logo" />
      </Flex>
      <Flex
        direction="column"
        flex="1"
        maxHeight="calc(100svh - 130px)"
        justify="space-between"
      >
        <Stack overflowY="auto" h="full" spaceY="1" gapY="1">
          {mainItems.map((item, index) => (
            <SidebarItem
              key={index}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </Stack>
        <Separator size="xs" variant="solid" />
        <Stack mt="auto" spaceY="1" overflow={'clip'} pt="2" gapY="1">
          {bottomItems.map((item, index) => (
            <SidebarItem
              key={index}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}

          <SidebarItem
            icon={FiLogOut}
            label="Cerrar sesión"
            onClick={handleLogout}
          />
        </Stack>
      </Flex>
    </Box>
  );
};

interface SideBarItemProps {
  href?: string;
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

const SidebarItem = ({ href, icon, label, ...atr }: SideBarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  const ItemElement = ({ children }: React.PropsWithChildren) => {
    return (
      <>
        {href ? (
          <Link to={href}>{children}</Link>
        ) : (
          <Box cursor="pointer">{children}</Box>
        )}
      </>
    );
  };

  return (
    <ItemElement>
      <Flex
        h="40px"
        align="center"
        justify="space-between"
        px="2"
        fontWeight="medium"
        borderRadius="10px"
        bg={isActive ? 'red.100' : 'transparent'}
        color={isActive ? 'red.600' : 'inherit'}
        _hover={{ bg: 'red.100' }}
        {...atr}
      >
        <Flex align="center">
          {icon && (
            <Box
              mr="2"
              w="20px"
              h="20px"
              color={isActive ? 'red.600' : 'inherit'}
              as={icon}
            />
          )}
          <Text fontSize="14px">{label}</Text>
        </Flex>
      </Flex>
    </ItemElement>
  );
};
