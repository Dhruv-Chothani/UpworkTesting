import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

interface AdminContextType {
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    apiFetch('/api/auth/me')
      .then(() => setIsAdmin(true))
      .catch(() => setIsAdmin(false));
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setIsAdmin(true);
      return { ok: true };
    } catch (err: any) {
      setIsAdmin(false);
      return { ok: false, error: err?.message || 'Invalid email or password' };
    }
  };

  const logout = async () => {
    await apiFetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
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
