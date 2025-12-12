import React, { createContext, useContext, useEffect, useState } from 'react';

// Static, frontend-only admin credentials (requested)
const ADMIN_EMAIL = 'admin@clinic.com';
const ADMIN_PASSWORD = 'Clinic@123';
const STORAGE_KEY = 'mh_admin_logged_in';

interface AdminContextType {
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });

  // Sync across tabs/windows
  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      setIsAdmin(stored === 'true');
    };
    handleStorage();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = async (email: string, password: string) => {
    const isValidEmail = email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
    const isValidPassword = password === ADMIN_PASSWORD;
    if (isValidEmail && isValidPassword) {
      setIsAdmin(true);
      localStorage.setItem(STORAGE_KEY, 'true');
      return { ok: true };
    }
    setIsAdmin(false);
    localStorage.removeItem(STORAGE_KEY);
    return { ok: false, error: 'Invalid email or password' };
  };

  const logout = async () => {
    localStorage.removeItem(STORAGE_KEY);
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
