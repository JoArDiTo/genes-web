import { useEffect } from 'react';
import { isAxiosError } from '@/lib/axios';
import { useProvideAuth } from './useProvideAuth';
import { axiosPrivate } from '@/lib';
import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

// Extender InternalAxiosRequestConfig para incluir _retry
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const useAxiosPrivate = () => {
  const { getToken, logout } = useProvideAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = getToken();
        if (!config.headers?.['Authorization'] && token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        // Verificar que es un error de Axios
        if (isAxiosError(error)) {
          const prevRequest = error.config as ExtendedAxiosRequestConfig;

          // Si es 401 (token expirado/inválido) y no hemos procesado esta request
          if (
            error.response?.status === 401 &&
            prevRequest &&
            !prevRequest._retry
          ) {
            prevRequest._retry = true; // Marcar para evitar loops infinitos

            console.warn('Token expirado o inválido. Redirigiendo al login...');

            // Limpiar sesión y redirigir
            logout();

            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [getToken, logout]);

  return axiosPrivate;
};
