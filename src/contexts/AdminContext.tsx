import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch, getApiUrl } from '../lib/api';

interface AdminContextType {
  isAdmin: boolean;
  checking: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const TOKEN_KEY = 'mh_admin_token';

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(true);

  // On mount, ask backend if session exists
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await apiFetch<{ admin: { email: string } | null }>('/api/auth/me', {
          credentials: 'include',
        });
        setIsAdmin(!!res?.admin);
      } catch {
        setIsAdmin(false);
        localStorage.removeItem(TOKEN_KEY);
      } finally {
        setChecking(false);
      }
    };
    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
      }
      
      setIsAdmin(true);
      return { ok: true, data };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid email or password';
      setIsAdmin(false);
      return { ok: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // ignore
    }
    setIsAdmin(false);
    localStorage.removeItem(TOKEN_KEY);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, checking, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within an AdminProvider');
  return ctx;
};
