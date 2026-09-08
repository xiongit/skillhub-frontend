'use client';

import React from 'react';
import { Award, Flame, Zap, Trophy, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { useGamificationStore } from '../../../store/useGamificationStore';
import { Badge as StatusBadge } from '../../../components/common/Badge';

export default function GamificationDashboardPage() {
  const { points, streakDays, earnedBadges, leaderboard } = useGamificationStore();

  const pointRules = [
    { label: 'Complete Video Lesson', reward: '+10 XP', icon: CheckCircle2 },
    { label: 'Pass Lesson Quiz', reward: '+20 XP', icon: Star },
    { label: 'Complete Full Course & Final Exam', reward: '+100 XP', icon: Award },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Learning Gamification & Leaderboard
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Earn experience points, unlock achievement badges, and climb the SkillHub developer leaderboard.
        </p>
      </div>

      {/* Gamification Stats Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-tr from-amber-500 to-amber-600 text-white p-6 rounded-3xl shadow-soft space-y-1">
          <div className="flex items-center space-x-2 text-xs font-semibold text-amber-100">
            <Zap className="w-4 h-4" />
            <span>Total Experience Points</span>
          </div>
          <span className="text-3xl sm:text-4xl font-extrabold">{points} XP</span>
        </div>

        <div className="bg-gradient-to-tr from-rose-500 to-orange-500 text-white p-6 rounded-3xl shadow-soft space-y-1">
          <div className="flex items-center space-x-2 text-xs font-semibold text-rose-100">
            <Flame className="w-4 h-4" />
            <span>Active Learning Streak</span>
          </div>
          <span className="text-3xl sm:text-4xl font-extrabold">{streakDays} Days</span>
        </div>

        <div className="bg-gradient-to-tr from-purple-600 to-indigo-600 text-white p-6 rounded-3xl shadow-soft space-y-1">
          <div className="flex items-center space-x-2 text-xs font-semibold text-purple-100">
            <Trophy className="w-4 h-4" />
            <span>Unlocked Badges</span>
          </div>
          <span className="text-3xl sm:text-4xl font-extrabold">{earnedBadges.length} Badges</span>
        </div>
      </div>

      {/* Point Earning Rules */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
        <h2 className="text-base font-bold text-slate-900">How to Earn Experience Points</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {pointRules.map((rule) => (
            <div key={rule.label} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">{rule.label}</span>
              <span className="font-extrabold text-xs text-amber-600 font-mono bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                {rule.reward}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Unlocked Badges */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-purple-600" />
            <h3 className="text-base font-bold text-slate-900">My Achievement Badges</h3>
          </div>

          <div className="space-y-3">
            {earnedBadges.map((badge) => (
              <div key={badge.id} className="p-4 rounded-2xl border border-slate-200 flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-secondary-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                  <Award className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{badge.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">Unlocked: {badge.awarded_at}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Leaderboard */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900">Global Student Leaderboard</h3>
          </div>

          <div className="divide-y divide-slate-100">
            {leaderboard.map((student) => (
              <div key={student.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      student.rank === 1
                        ? 'bg-amber-100 text-amber-700'
                        : student.rank === 2
                        ? 'bg-slate-200 text-slate-700'
                        : student.rank === 3
                        ? 'bg-amber-700/20 text-amber-900'
                        : 'text-slate-400'
                    }`}
                  >
                    #{student.rank}
                  </span>
                  <img
                    src={student.avatar_url}
                    alt={student.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                  />
                  <span className="font-bold text-xs text-slate-900">{student.name}</span>
                </div>

                <span className="text-xs font-extrabold text-primary-600 font-mono">
                  {student.total_points} XP
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
