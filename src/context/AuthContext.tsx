import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, userAuthService } from '../lib/userAuthService';

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateUser: (updatedUser: User) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for existing session
    const currentUser = userAuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
      setIsAdmin(currentUser.role === 'admin');
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    const user = await userAuthService.signIn(email, password);
    setUser(user);
    setIsAuthenticated(true);
    setIsAdmin(user.role === 'admin');
  };

  const signOut = () => {
    userAuthService.signOut();
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const updateUser = async (updatedUser: User) => {
    const updated = await userAuthService.updateUser(updatedUser);
    setUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      signIn, 
      signOut, 
      updateUser,
      isAuthenticated, 
      isAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}