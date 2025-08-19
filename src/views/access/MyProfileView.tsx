import { Avatar, Field, InputGroup } from '@/components/ui';
import { useReadProfile } from '@/hooks/users';
import type { ProfileResponse } from '@/interfaces';
import {
  Card,
  Flex,
  Grid,
  HStack,
  Icon,
  Spinner,
  Stack,
  Text,
  Badge,
  SimpleGrid,
  Input,
} from '@chakra-ui/react';
import {
  LuUser,
  LuIdCard,
  LuCalendar,
  LuMapPin,
  LuPhone,
  LuMail,
  LuGraduationCap,
  LuBookOpen,
  LuFingerprint,
  LuPersonStanding,
  LuBox,
} from 'react-icons/lu';

export const MyProfileView = () => {
  const { data, isLoading, error } = useReadProfile();

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="xl" color="red.500" />
      </Flex>
    );
  }

  const profile = data?.result as ProfileResponse;

  if (!profile || error) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Text color="gray.500">No se pudieron cargar los datos del perfil</Text>
      </Flex>
    );
  }

  const fullName = `${profile.person.firstName} ${profile.person.paternalSurname} ${profile.person.maternalSurname}`;
  const isStudent = profile.user.role === 'STUDENT';
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'STUDENT':
        return 'Estudiante';
      case 'TEACHER':
        return 'Docente';
      default:
        return 'No especificado';
    }
  };

  const getGenderDisplay = (gender: string) => {
    switch (gender) {
      case 'MALE':
        return 'Masculino';
      case 'FEMALE':
        return 'Femenino';
      default:
        return 'No especificado';
    }
  };

  return (
    <Stack gap="6">
      <Card.Root boxShadow="md" border="1px solid" borderColor="gray.200">
        <Card.Body p="8">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap="6"
            alignItems={{ base: 'center', md: 'flex-start' }}
          >
            <Avatar src={profile.user.imageUrl} name={fullName} size="2xl" />

            <Stack gap="3" flex="1" textAlign={{ base: 'center', md: 'left' }}>
              <Text fontSize="3xl" fontWeight="bold" color="gray.800">
                {fullName}
              </Text>

              <HStack gap="3" justify={{ base: 'center', md: 'flex-start' }}>
                <Badge colorPalette="blue" variant="subtle">
                  {getRoleDisplay(profile.user.role)}
                </Badge>
                <Badge
                  colorPalette={profile.user.available ? 'green' : 'red'}
                  variant="subtle"
                >
                  {profile.user.available ? 'Disponible' : 'No disponible'}
                </Badge>
              </HStack>

              <HStack
                gap="2"
                color="gray.600"
                justify={{ base: 'center', md: 'flex-start' }}
              >
                <Icon fontSize="lg">
                  <LuMail />
                </Icon>
                <Text>{profile.user.email}</Text>
              </HStack>
            </Stack>
          </Flex>
        </Card.Body>
      </Card.Root>

      <Grid
        templateColumns={{ base: '1fr', lg: isStudent ? '1fr 1fr' : '1fr' }}
        gap="6"
      >
        <Card.Root boxShadow="md" border="1px solid" borderColor="gray.200">
          <Card.Header pb="4">
            <HStack gap="3">
              <Icon fontSize="xl" color="gray.600">
                <LuUser />
              </Icon>
              <Text fontSize="lg" fontWeight="semibold" color="gray.800">
                Información Personal
              </Text>
            </HStack>
          </Card.Header>

          <Card.Body pt="0">
            <Stack gap="4">
              <SimpleGrid columns={{ base: 1, lg: 2 }} gap="4">
                <Field label="Tipo de documento">
                  <InputGroup width="100%" startElement={<LuIdCard />}>
                    <Input
                      readOnly
                      variant="flushed"
                      value={profile.person.documentType}
                    />
                  </InputGroup>
                </Field>
                <Field label="Número de Documento">
                  <InputGroup width="100%" startElement={<LuFingerprint />}>
                    <Input
                      readOnly
                      variant="flushed"
                      value={profile.person.documentNumber}
                    />
                  </InputGroup>
                </Field>
                <Field label="Género">
                  <InputGroup width="100%" startElement={<LuPersonStanding />}>
                    <Input
                      readOnly
                      variant="flushed"
                      value={getGenderDisplay(profile.person.gender)}
                    />
                  </InputGroup>
                </Field>
                <Field label="Fecha de Nacimiento">
                  <InputGroup width="100%" startElement={<LuCalendar />}>
                    <Input
                      readOnly
                      variant="flushed"
                      value={formatDate(profile.person.birthDate)}
                    />
                  </InputGroup>
                </Field>
              </SimpleGrid>

              <SimpleGrid gap="4">
                <Field label="Dirección">
                  <InputGroup width="100%" startElement={<LuMapPin />}>
                    <Input
                      readOnly
                      variant="flushed"
                      value={profile.person.address}
                    />
                  </InputGroup>
                </Field>
                <Field label="Teléfono">
                  <InputGroup width="100%" startElement={<LuPhone />}>
                    <Input
                      readOnly
                      variant="flushed"
                      value={profile.person.phoneNumber ?? 'No disponible'}
                    />
                  </InputGroup>
                </Field>
              </SimpleGrid>
            </Stack>
          </Card.Body>
        </Card.Root>

        {isStudent && profile.academic && (
          <Card.Root boxShadow="md" border="1px solid" borderColor="gray.200">
            <Card.Header pb="4">
              <HStack gap="3">
                <Icon fontSize="xl" color="gray.600">
                  <LuGraduationCap />
                </Icon>
                <Text fontSize="lg" fontWeight="semibold" color="gray.800">
                  Información Académica
                </Text>
              </HStack>
            </Card.Header>

            <Card.Body pt="0">
              <SimpleGrid gap="4">
                <Field label="Nivel de educación">
                  <InputGroup width="100%" startElement={<LuBookOpen />}>
                    <Input
                      readOnly
                      variant="flushed"
                      value={profile.academic.level}
                    />
                  </InputGroup>
                </Field>
                <Field label="Grado">
                  <InputGroup width="100%" startElement={<LuBox />}>
                    <Input
                      readOnly
                      variant="flushed"
                      value={profile.academic.grade}
                    />
                  </InputGroup>
                </Field>
                <Field label="Sección">
                  <InputGroup width="100%" startElement={<LuCalendar />}>
                    <Input
                      readOnly
                      variant="flushed"
                      value={profile.academic.section}
                    />
                  </InputGroup>
                </Field>
              </SimpleGrid>
            </Card.Body>
          </Card.Root>
        )}
      </Grid>
    </Stack>
  );
};
