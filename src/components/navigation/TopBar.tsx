import {
  Box,
  Circle,
  Flex,
  Float,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Avatar } from '../ui';

export const TopBar = () => {
  const name = 'JOSE ARMANDO DIAZ TORRES';
  const role = 'TEACHER';
  const roleDisplay = role === 'TEACHER' ? 'Docente' : 'Estudiante';

  return (
    <Flex
      bg="white"
      justify="space-between"
      align="center"
      px="6"
      py="2.5"
      //border='2px solid'
      //borderColor='gray.200'
      boxShadow="md"
      h="64px"
    >
      <HStack color="red.600" fontSize="md" fontWeight="bold">
        <Text display={{ base: 'none', md: 'block' }}>
          Sistema de Apoyo de Salud Mental
        </Text>
      </HStack>
      <HStack style={{ gap: 19 }} gap={['1', '3']}>
        <Box position="relative">
          {name && <Avatar name={name} size="sm" />}
          <Float placement="bottom-end" offsetX="1" offsetY="1">
            <Circle
              bg="green.500"
              size="8px"
              outline="0.2em solid"
              outlineColor="white"
            />
          </Float>
        </Box>

        <Stack gap="0" display={{ base: 'none', md: 'block' }}>
          <Text fontWeight="medium">
            {name?.split(' ').slice(0, 2).join(' ')}
          </Text>
          <Text color="fg.muted" textStyle="sm" lineHeight="1">
            {roleDisplay || 'Aún no tienes rol'}
          </Text>
        </Stack>
      </HStack>
    </Flex>
  );
};
