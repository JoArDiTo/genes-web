import { useProvideAuth } from '@/hooks';
import { createContext } from 'react';
import * as React from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useProvideAuth();

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
