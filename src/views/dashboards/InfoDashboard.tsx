import {
  Box,
  Card,
  Grid,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  Badge,
  Separator,
  Flex,
} from '@chakra-ui/react';
import {
  LuHeart,
  LuUsers,
  LuShield,
  LuPhone,
  LuMapPin,
  LuHeadphones,
} from 'react-icons/lu';

export const InfoDashboard = () => {
  const supportServices = [
    {
      icon: LuHeart,
      title: 'Apoyo Emocional',
      description:
        'Acompañamiento personalizado para gestión de emociones y bienestar',
      color: 'red',
    },
    {
      icon: LuUsers,
      title: 'Terapia Grupal',
      description:
        'Sesiones grupales para fortalecer habilidades sociales y autoestima',
      color: 'blue',
    },
    {
      icon: LuShield,
      title: 'Prevención',
      description:
        'Programas preventivos para promover la salud mental estudiantil',
      color: 'green',
    },
    {
      icon: LuHeadphones,
      title: 'Escucha Activa',
      description:
        'Espacios seguros para expresar sentimientos y preocupaciones',
      color: 'purple',
    },
  ];

  const contactInfo = [
    {
      icon: LuPhone,
      label: 'Línea de Emergencia',
      value: '(01) 521-8596',
      description: 'Disponible',
    },
    {
      icon: LuMapPin,
      label: 'Ubicación',
      value: 'Oficina de Bienestar Estudiantil',
      description: 'Sede Los Olivos - 2do Piso',
    },
  ];

  return (
    <Stack gap="6">
      {/* Header Section */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        gap={{ base: '6', md: '12' }}
        bgGradient="linear(to-r, blue.50, red.50)"
        p={{ base: '4', md: '8' }}
        borderRadius="xl"
        boxShadow="md"
      >
        {/* Left: Text Content */}
        <Box
          flex="1"
          textAlign={{ base: 'center', md: 'left' }}
          py={{ base: '4', md: '8' }}
        >
          <Heading
            size={{ base: 'lg', md: '2xl' }}
            color="blue.800"
            mb={{ base: '2', md: '4' }}
            lineHeight="1.2"
          >
            Sistema de Apoyo de Salud Mental
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'xl' }}
            color="gray.700"
            maxW="3xl"
            mx={{ base: 'auto', md: '0' }}
          >
            Colegio GENES - Promoviendo el bienestar integral de nuestra
            comunidad estudiantil
          </Text>
          <Badge
            colorScheme="red"
            variant="solid"
            fontSize={{ base: 'sm', md: 'md' }}
            px="4"
            py="2"
            mt="4"
            borderRadius="md"
            boxShadow="sm"
          >
            Tu bienestar es nuestra prioridad
          </Badge>
        </Box>
      </Flex>

      {/* Services Section */}
      <Card.Root variant="elevated">
        <Card.Header>
          <Heading size="lg" color="gray.800">
            Nuestros Servicios
          </Heading>
          <Text color="gray.600">
            Ofrecemos un enfoque integral para el cuidado de la salud mental
            estudiantil
          </Text>
        </Card.Header>
        <Card.Body>
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="6">
            {supportServices.map((service, index) => (
              <Card.Root key={index} variant="outline" size="sm">
                <Card.Body p="6">
                  <HStack gap="4" align="flex-start">
                    <Box
                      p="3"
                      bg={`${service.color}.50`}
                      borderRadius="full"
                      border={`2px solid`}
                      borderColor={`${service.color}.200`}
                    >
                      <Icon fontSize="xl" color={`${service.color}.600`}>
                        <service.icon />
                      </Icon>
                    </Box>
                    <Stack gap="2" flex="1">
                      <Text fontWeight="semibold" color="gray.800">
                        {service.title}
                      </Text>
                      <Text fontSize="sm" color="gray.600" lineHeight="1.5">
                        {service.description}
                      </Text>
                    </Stack>
                  </HStack>
                </Card.Body>
              </Card.Root>
            ))}
          </Grid>
        </Card.Body>
      </Card.Root>

      {/* Contact Information */}
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap="6">
        {/* Emergency Contact */}
        <Card.Root
          variant="elevated"
          borderLeft="4px solid"
          borderLeftColor="red.500"
        >
          <Card.Header>
            <HStack gap="3">
              <Icon fontSize="xl" color="red.500">
                <LuHeart />
              </Icon>
              <Heading size="md" color="gray.800">
                ¿Necesitas Ayuda Inmediata?
              </Heading>
            </HStack>
          </Card.Header>
          <Card.Body>
            <Text color="gray.700" mb="4">
              Si estás pasando por una crisis emocional o necesitas apoyo
              urgente, no dudes en contactarnos. Nuestro equipo está aquí para
              ayudarte.
            </Text>
            <Stack gap="4">
              {contactInfo.map((contact, index) => (
                <HStack
                  key={index}
                  gap="4"
                  p="3"
                  bg="gray.50"
                  borderRadius="md"
                >
                  <Icon fontSize="lg" color="gray.600">
                    <contact.icon />
                  </Icon>
                  <Stack gap="0" flex="1">
                    <Text fontSize="sm" color="gray.600">
                      {contact.label}
                    </Text>
                    <Text fontWeight="semibold" color="gray.800">
                      {contact.value}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {contact.description}
                    </Text>
                  </Stack>
                </HStack>
              ))}
            </Stack>
          </Card.Body>
        </Card.Root>

        {/* Mission & Values */}
        <Card.Root variant="elevated">
          <Card.Header>
            <Heading size="md" color="gray.800">
              Nuestra Misión
            </Heading>
          </Card.Header>
          <Card.Body>
            <Stack gap="4">
              <Text color="gray.700" fontSize="sm" lineHeight="1.6">
                Brindar apoyo integral y especializado en salud mental a todos
                los miembros de la comunidad educativa del Colegio GENES,
                promoviendo un ambiente seguro y saludable.
              </Text>

              <Separator />

              <Stack gap="3">
                <Text fontWeight="semibold" color="gray.800">
                  Nuestros Valores:
                </Text>
                <Stack gap="2">
                  <HStack gap="2">
                    <Icon fontSize="sm" color="green.500">
                      <LuHeart />
                    </Icon>
                    <Text fontSize="sm" color="gray.700">
                      Empatía y comprensión
                    </Text>
                  </HStack>
                  <HStack gap="2">
                    <Icon fontSize="sm" color="blue.500">
                      <LuShield />
                    </Icon>
                    <Text fontSize="sm" color="gray.700">
                      Confidencialidad y respeto
                    </Text>
                  </HStack>
                  <HStack gap="2">
                    <Icon fontSize="sm" color="purple.500">
                      <LuUsers />
                    </Icon>
                    <Text fontSize="sm" color="gray.700">
                      Inclusión y diversidad
                    </Text>
                  </HStack>
                </Stack>
              </Stack>
            </Stack>
          </Card.Body>
        </Card.Root>
      </Grid>
    </Stack>
  );
};
