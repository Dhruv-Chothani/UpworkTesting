import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../lib/api';

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
        const response = await apiFetch<MeResponse>('/api/auth/me');
        console.log('Auth check response:', response);
        if (response && response.admin) {
          setUser(response.admin);
        } else {
          // Clear any invalid tokens
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
    console.log('Attempting login with:', { email });
    try {
      const response = await fetch(apiFetch('/api/auth/login'), {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      console.log('Login response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = 'Login failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          console.error('Login error response:', errorData);
        } catch (e) {
          console.error('Failed to parse error response:', e);
          errorMessage = response.status === 401 ? 'Invalid email or password' : 'Login failed';
        }
        throw new Error(errorMessage);
      }

      // Get the response data
      const data = await response.json();
      console.log('Login successful:', { hasToken: !!data.token });
      
      // Store token if present (for backward compatibility)
      if (data.token) {
        localStorage.setItem('mh_admin_token', data.token);
      }

      // Get user data using the cookie that was set
      console.log('Fetching user data...');
      const userData: MeResponse = await apiFetch('/api/auth/me');
      console.log('User data response:', userData);
      
      if (!userData || !userData.admin) {
        console.error('Invalid user data received:', userData);
        throw new Error('Failed to fetch user data');
      }
      
      setUser(userData.admin);
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
      await fetch(apiFetch('/api/auth/logout'), {
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
