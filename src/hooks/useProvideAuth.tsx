import type { LoginResponse, Response } from '@/interfaces';
import axios, { isAxiosError } from '@/lib/axios';
import { jwtDecode } from 'jwt-decode';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

interface JWTPayload {
  sub: number;
  uuid: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

interface UserData {
  id: number;
  uuid: string;
  name: string;
  role: string;
  exp: number;
}

export const useProvideAuth = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const isInitialized = useRef(false);

  const getCookieConfig = useCallback((): Cookies.CookieAttributes => {
    const isProduction = import.meta.env.VITE_IS_PRODUCTION === 'true';
    const config: Cookies.CookieAttributes = {
      secure: isProduction,
      sameSite: 'strict',
      ...(isProduction &&
        import.meta.env.VITE_COOKIE_DOMAIN && {
          domain: import.meta.env.VITE_COOKIE_DOMAIN,
        }),
    };
    return config;
  }, []);

  const setUserFromToken = useCallback((token: string) => {
    try {
      const jwtPayload: JWTPayload = jwtDecode(token);
      const { sub: id, uuid, name, role, exp } = jwtPayload;

      const currentTime = Math.floor(Date.now() / 1000);
      if (exp < currentTime) return false;

      setUser({ id, uuid, name, role, exp });
      return true;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return false;
    }
  }, []);

  useEffect(() => {
    if (isInitialized.current) return;

    const initializeAuth = () => {
      try {
        const token = Cookies.get(String(import.meta.env.VITE_COOKIE_NAME));
        if (token) {
          const success = setUserFromToken(token);
          if (!success) {
            Cookies.remove(
              String(import.meta.env.VITE_COOKIE_NAME),
              getCookieConfig(),
            );
          }
        }
      } catch (error) {
        console.error('Error al inicializar auth:', error);
      } finally {
        setIsLoading(false);
        isInitialized.current = true;
      }
    };

    initializeAuth();
  }, [setUserFromToken, getCookieConfig]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/auth/login/', {
        email,
        password,
      });

      const data: Response<LoginResponse> = response.data;
      const token = data.result?.token;
      if (!token) throw new Error(data.message);

      const success = setUserFromToken(token);
      if (!success) throw new Error('Token inválido recibido del servidor');

      const jwtPayload: JWTPayload = jwtDecode(token);

      Cookies.set(String(import.meta.env.VITE_COOKIE_NAME), token, {
        ...getCookieConfig(),
        expires: new Date(jwtPayload.exp * 1000),
      });

      void navigate('/');
    } catch (error) {
      let errorMessage = 'Ocurrio un error en el servidor';

      if (isAxiosError(error) && error.response?.data) {
        const data = error.response?.data as Response<LoginResponse>;
        errorMessage = data.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove(String(import.meta.env.VITE_COOKIE_NAME), getCookieConfig());
    setUser(null);
    void navigate('/auth/login');
  };

  const getUser = useCallback(() => {
    return user;
  }, [user]);

  const getUserCookie = useCallback(() => {
    try {
      const cookie = Cookies.get(String(import.meta.env.VITE_COOKIE_NAME));
      if (!cookie) return null;
      const parsed: JWTPayload = jwtDecode(cookie);
      return parsed;
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      return null;
    }
  }, []);

  const getToken = useCallback(() => {
    try {
      const cookie = Cookies.get(String(import.meta.env.VITE_COOKIE_NAME));
      if (!cookie) return null;
      return cookie;
    } catch (err) {
      console.error('Error al obtener el token:', err);
      return null;
    }
  }, []);

  return {
    user,
    login,
    logout,
    isLoading,
    error,
    getUser,
    getUserCookie,
    getToken,
  };
};
