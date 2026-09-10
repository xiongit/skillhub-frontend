import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

const getInitialUser = () => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('skillhub_student_user');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
};

const getInitialToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('skillhub_student_token');
  }
  return null;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getInitialUser(),
  token: getInitialToken(),
  isAuthenticated: !!getInitialToken(),

  setAuth: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('skillhub_student_token', token);
      localStorage.setItem('skillhub_student_user', JSON.stringify(user));
    }
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('skillhub_student_token');
      localStorage.removeItem('skillhub_student_user');
    }
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
