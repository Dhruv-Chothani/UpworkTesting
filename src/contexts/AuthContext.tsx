import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch, getApiUrl } from '../lib/api';

type User = {
  email: string;
  id: string;
  createdAt: string;
};

type ApiResponse<T = any> = T & {
  message?: string;
  error?: string;
};

type AuthResponse = {
  token?: string;
  admin?: User;
};

type MeResponse = {
  admin: User;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication status...');
        const meUrl = `${import.meta.env.VITE_API_URL || 'https://upwork-testing-backend.vercel.app'}/api/auth/me`;
        console.log('Auth check URL:', meUrl);
        
        const response = await fetch(meUrl, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('mh_admin_token') || ''}`
          }
        });

        if (!response.ok) {
          throw new Error('Not authenticated');
        }

        const data = await response.json();
        console.log('Auth check response:', data);
        
        if (data && data.admin) {
          setUser(data.admin);
        } else {
          localStorage.removeItem('mh_admin_token');
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  interface ApiError {
    message: string;
    status?: number;
  }

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login with:', { email });
      
      const response = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Login failed:', data);
        throw new Error(data.message || 'Login failed');
      }

      console.log('Login successful, received data:', data);
      
      if (data.token) {
        localStorage.setItem('mh_admin_token', data.token);
      }

      // Update user state with the received data
      if (data.admin) {
        setUser(data.admin);
      } else {
        // If no admin data in response, fetch it
        const userData = await apiFetch<{admin: User}>('/api/auth/me');
        setUser(userData.admin);
      }
      
      console.log('Login successful, navigating to /admin');
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Try to call the logout endpoint
      await fetch(getApiUrl('/api/auth/logout'), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout API error (proceeding anyway):', error);
    } finally {
      // Always clear local state and redirect
      localStorage.removeItem('mh_admin_token');
      setUser(null);
      navigate('/admin/login');
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
