import { createContext, useEffect, useState, type FC, type ReactNode } from 'react';
import type { UserDataToken } from '../interfaces/UserDataToken';
import { toast } from 'sonner';
import { useLocation } from 'wouter';
import { setToken, getToken, removeToken } from '../lib/services';

interface AuthContextProps {
  user: UserDataToken | null;
  auth: (token: string) => void;
  exit: () => void;
  isLoading: boolean;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState<UserDataToken | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useLocation();

  const checkToken = async () => {
    const token = await getToken();

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp * 1000 < Date.now();

        if (isExpired) {
          exit();
          toast.error('Sesión expirada, iniciar sesión nuevamente.');
        } else {
          setUser({ id: payload.id, name: payload.name, email: payload.email, role: payload.role });
        }
      } catch (error) {
        exit();
        toast.error('Token inválido, iniciar sesión nuevamente.');
      }
    } else {
      if (user) {
        reset();
        toast.error('No está autenticado, iniciar sesión nuevamente');
      }
    }
  }

  useEffect(() => {
    checkToken();
    setIsLoading(false);
  }, [location]);

  const auth = (token: string) => {
    setToken(token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUser({ id: payload.id, name: payload.name, email: payload.email, role: payload.role });
    setLocation("/");
    toast.success("Inicio de sesión exitoso.");
  }

  const exit = async () => {
    await removeToken()
    reset()
  }

  const reset = () => {
    setUser(null);
    setLocation("/");
  }

  return (
    <AuthContext.Provider value={{ user, auth, exit, isLoading }}>
      { children }
    </AuthContext.Provider>
  )
}