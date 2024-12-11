import { config } from './config';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  profileImage?: string;
  bio?: string;
  createdAt: Date;
  lastLogin: Date;
}

const SESSION_KEY = 'quora_user_session';

export const userAuthService = {
  getCurrentUser(): User | null {
    const sessionData = sessionStorage.getItem(SESSION_KEY);
    if (!sessionData) return null;
    
    try {
      return JSON.parse(sessionData);
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
  },

  async signIn(email: string, password: string): Promise<User> {
    // Admin authentication
    if (email === config.admin.email && password === config.admin.password) {
      const adminUser: User = {
        id: 'admin-1',
        username: 'Lucas Oliver',
        email: email,
        role: 'admin',
        createdAt: new Date(),
        lastLogin: new Date()
      };

      sessionStorage.setItem(SESSION_KEY, JSON.stringify(adminUser));
      return adminUser;
    }

    throw new Error('Invalid credentials');
  },

  signOut() {
    sessionStorage.removeItem(SESSION_KEY);
  },

  async updateUser(updatedUser: User): Promise<User> {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }
};