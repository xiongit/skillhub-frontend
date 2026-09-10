import { create } from 'zustand';
import { Badge, LeaderboardEntry } from '../types';

interface GamificationState {
  points: number;
  streakDays: number;
  earnedBadges: Badge[];
  leaderboard: LeaderboardEntry[];
  addPoints: (amount: number, reason: string) => void;
}

export const useGamificationStore = create<GamificationState>((set) => ({
  points: 480,
  streakDays: 5,
  earnedBadges: [
    {
      id: 1,
      name: 'Quick Starter',
      slug: 'quick-starter',
      icon: 'Rocket',
      description: 'Completed your first 5 curriculum video lectures.',
      points_required: 50,
      awarded_at: '2026-08-20',
    },
    {
      id: 2,
      name: 'Quiz Master',
      slug: 'quiz-master',
      icon: 'CheckCircle2',
      description: 'Passed 3 lesson quizzes on the first attempt with 100% score.',
      points_required: 150,
      awarded_at: '2026-08-28',
    },
    {
      id: 3,
      name: 'Code Champion',
      slug: 'code-champion',
      icon: 'Award',
      description: 'Earned your first graduation diploma and verified certificate.',
      points_required: 300,
      awarded_at: '2026-09-02',
    },
  ],
  leaderboard: [
    { id: 101, name: 'Tanvir Hossain', total_points: 480, rank: 1, avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
    { id: 102, name: 'Sabrina Akter', total_points: 420, rank: 2, avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    { id: 103, name: 'Mehedi Hasan', total_points: 390, rank: 3, avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    { id: 104, name: 'Fahim Shakil', total_points: 350, rank: 4, avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    { id: 105, name: 'Nusrat Jahan', total_points: 310, rank: 5, avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
  ],

  addPoints: (amount) => set((state) => ({ points: state.points + amount })),
}));
