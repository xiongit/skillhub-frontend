import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 101,
    uuid: 'student-uuid-101',
    name: 'Tanvir Hossain',
    email: 'tanvir@gmail.com',
    phone: '+8801712345678',
    status: 'active',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    headline: 'Aspiring Full-Stack Software Engineer',
    bio: 'Passionate about React, Next.js, and clean Laravel API architecture.',
    created_at: new Date().toISOString(),
  },
  token: 'student-demo-token-2026',
  isAuthenticated: true,

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
