import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout, isAuthenticated } from '../services/auth';
import type { LoginCredentials, RegisterData, AuthResponse } from '../services/auth';

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await apiLogin(credentials);
    setUser(response.user);
    setIsAuth(true);
  };

  const register = async (data: RegisterData) => {
    const response = await apiRegister(data);
    setUser(response.user);
    setIsAuth(true);
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    setIsAuth(false);
  };

  const value = {
    user,
    isAuthenticated: isAuth,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};