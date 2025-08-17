import { useProvideAuth } from '@/hooks';
import { Flex, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import Cookies from 'js-cookie';

export const PrivateRoute = () => {
  const { getUser, getUserCookie, isLoading, getToken } = useProvideAuth();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [expirationTimeout, setExpirationTimeout] =
    useState<NodeJS.Timeout | null>(null);

  const checkTokenValidity = () => {
    const token = getToken();
    const user = getUserCookie();

    if (!token || !user) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const currentTime = Math.floor(Date.now() / 1000);

      // Verificar si el token está expirado
      if (user.exp < currentTime) {
        console.warn('Token expirado.');
        Cookies.remove(String(import.meta.env.VITE_COOKIE_NAME));
        setIsAuthenticated(false);
      } else {
        // Verificar si tiene user_id (adaptado a tu estructura: sub)
        if (user.sub) {
          setIsAuthenticated(true);

          const timeUntilExpiration = user.exp - currentTime;

          if (timeUntilExpiration > 0) {
            // Limpiar el temporizador anterior si existe
            if (expirationTimeout) {
              clearTimeout(expirationTimeout);
            }

            const timeBeforeExpiration = timeUntilExpiration + 1;

            const newTimeout = setTimeout(() => {
              checkTokenValidity();
            }, timeBeforeExpiration * 1000);

            setExpirationTimeout(newTimeout);
          }
        } else {
          setIsAuthenticated(false);
        }
      }
    } catch (error) {
      console.error('Error al verificar el token:', error);
      setIsAuthenticated(false);
    }
  };

  const checkAuth = () => {
    const user = getUser();
    if (!user) {
      // Como no tienes función refresh, verificamos directamente con getUserCookie
      const cookieUser = getUserCookie();
      if (!cookieUser) {
        setIsAuthenticated(false);
      }
    }
  };

  useEffect(() => {
    checkTokenValidity();
    checkAuth();

    return () => {
      if (expirationTimeout) {
        clearTimeout(expirationTimeout);
      }
    };
  }, []);

  useEffect(() => {
    const onWakeUp = () => {
      checkTokenValidity();
    };

    document.addEventListener('visibilitychange', onWakeUp);
    window.addEventListener('focus', onWakeUp);

    return () => {
      document.removeEventListener('visibilitychange', onWakeUp);
      window.removeEventListener('focus', onWakeUp);
    };
  }, []);

  if (isAuthenticated === null || isLoading) {
    return (
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        bg="gray.100"
      >
        <Spinner size="xl" color="red.500" />
      </Flex>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};
