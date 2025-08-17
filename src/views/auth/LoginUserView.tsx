import { Alert, Button, Field, InputGroup } from '@/components/ui';
import { useProvideAuth } from '@/hooks';
import type { ValidationError } from '@/interfaces';
import {
  Box,
  Flex,
  Group,
  Image,
  Input,
  InputAddon,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LuEye, LuEyeOff, LuLock, LuMail } from 'react-icons/lu';
import { useNavigate } from 'react-router';

export const LoginUserView = () => {
  const bgImage = 'url(/images/bg-login.webp)';
  const logoImage = '/logo.svg';

  const { login, isLoading, getToken, error: authError } = useProvideAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<ValidationError | null>(null);

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const token = getToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      void navigate('/');
    }
  }, [token, navigate]);

  const validateFields = () => {
    const newErrors: ValidationError = {};
    if (email.trim() === '') newErrors.email = 'El correo es obligatorio';
    if (password.trim() === '')
      newErrors.password = 'La contraseña es obligatoria';
    if (!email.includes('@')) newErrors.email = 'El valor debe ser un correo';
    if (password.length < 6)
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateFields()) return;

    void login(email, password);
  };

  return (
    <Box
      height="100svh"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        width="full"
        height="full"
        bgImage={bgImage}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        zIndex={1}
      />
      <Flex
        w="full"
        h="100svh"
        justifyContent={{ base: 'center', xl: 'flex-end' }}
        zIndex={4}
      >
        <Flex alignItems="center" justifyContent="flex-end" w="full">
          <Box
            bg="white"
            borderRadius="0"
            boxShadow="2xl"
            minH="100vh"
            display="flex"
            flexDirection="column"
            pt={10}
            alignItems="center"
            pb={10}
            w="full"
            maxW="lg"
          >
            <VStack
              as="form"
              gap="20px"
              minW="70%"
              flex="1"
              justify="space-between"
            >
              <VStack w="full" gap="20px" alignItems="center">
                <Box
                  w="200px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image src={logoImage} alt="Logo" />
                </Box>
                <Text
                  fontSize="24px"
                  lineHeight="100%"
                  letterSpacing="0%"
                  textAlign="center"
                >
                  Iniciar Sesión
                </Text>

                <Text
                  fontSize="16px"
                  lineHeight="100%"
                  letterSpacing="0%"
                  textAlign="center"
                >
                  Hola, por favor ingresa tus datos institucionales
                </Text>

                {authError && <Alert status="error" title={authError} />}

                <VStack w="full" gap="20px">
                  <Stack w="full">
                    <Field
                      label="Correo:"
                      invalid={!!error?.email}
                      errorText={error?.email}
                    >
                      <InputGroup width="100%" startElement={<LuMail />}>
                        <Input
                          placeholder="Ingresar correo electrónico"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          size="sm"
                          ps={`calc(var(--input-height))`}
                        />
                      </InputGroup>
                    </Field>

                    <Field
                      label="Contraseña:"
                      invalid={!!error?.password}
                      errorText={error?.password}
                    >
                      <InputGroup width="100%" startElement={<LuLock />}>
                        <Group attached width="100%">
                          <Input
                            placeholder="Ingresar contraseña"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            size="sm"
                            ps={`calc(var(--input-height))`}
                          />
                          <InputAddon
                            onClick={handleTogglePassword}
                            bg="transparent"
                          >
                            {showPassword ? <LuEye /> : <LuEyeOff />}
                          </InputAddon>
                        </Group>
                      </InputGroup>
                    </Field>
                  </Stack>

                  <Button
                    w="full"
                    loadingText="Ingresando..."
                    bg="red.500"
                    color="white"
                    size="sm"
                    _hover={{ bg: 'red.600' }}
                    onClick={handleSubmit}
                    loading={isLoading}
                  >
                    Iniciar sesión
                  </Button>
                </VStack>
              </VStack>
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
