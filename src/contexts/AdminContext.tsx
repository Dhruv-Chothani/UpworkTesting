import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

interface AdminContextType {
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  // On mount, check current session with backend
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await apiFetch<{ admin: { email: string } | null }>('/api/auth/me', {
          credentials: 'include',
        });
        setIsAdmin(!!res?.admin);
      } catch {
        setIsAdmin(false);
      } finally {
        setChecked(true);
      }
    };
    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await apiFetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      setIsAdmin(true);
      return { ok: true };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Invalid email or password';
      setIsAdmin(false);
      return { ok: false, error: message || 'Invalid email or password' };
    }
  };

  const logout = async () => {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // ignore
    }
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within an AdminProvider');
  return ctx;
};
