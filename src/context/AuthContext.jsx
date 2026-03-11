import { createContext, useState, useMemo, useContext } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // Mock login — in production this would call an API
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const mockUser = {
      id: 'user_1',
      name: email.split('@')[0],
      email,
      avatar: null,
      createdAt: new Date().toISOString(),
    };

    setUser(mockUser);
    return mockUser;
  };

  const register = async (name, email, password) => {
    // Mock register — in production this would call an API
    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required');
    }

    const mockUser = {
      id: 'user_' + Date.now(),
      name,
      email,
      avatar: null,
      createdAt: new Date().toISOString(),
    };

    setUser(mockUser);
    return mockUser;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
      register,
    }),
    [user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
