'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, Award, PlayCircle, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Badge } from '../../components/common/Badge';

export default function StudentDashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Welcome Greeting Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-700 text-white shadow-soft relative overflow-hidden">
        <div className="max-w-xl space-y-2 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Ready for today's coding session?</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome back, {user?.name?.split(' ')[0] || 'Tanvir'}!
          </h1>
          <p className="text-xs sm:text-sm text-primary-100">
            You are 78% done with Module 1 in Full-Stack Web Development. Continue where you left off.
          </p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center space-x-2 text-slate-500 text-xs mb-1">
            <BookOpen className="w-4 h-4 text-primary-600" />
            <span>Enrolled</span>
          </div>
          <span className="text-xl sm:text-2xl font-extrabold text-slate-900">2 Courses</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center space-x-2 text-slate-500 text-xs mb-1">
            <Clock className="w-4 h-4 text-purple-600" />
            <span>Learning Time</span>
          </div>
          <span className="text-xl sm:text-2xl font-extrabold text-slate-900">38.5 Hours</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center space-x-2 text-slate-500 text-xs mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Completed</span>
          </div>
          <span className="text-xl sm:text-2xl font-extrabold text-slate-900">1 Track</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center space-x-2 text-slate-500 text-xs mb-1">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Certificates</span>
          </div>
          <span className="text-xl sm:text-2xl font-extrabold text-slate-900">1 Earned</span>
        </div>
      </div>

      {/* Continue Learning Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Continue Learning</h2>
          <Link href="/dashboard/courses" className="text-xs text-primary-600 font-semibold hover:underline">
            View all courses
          </Link>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <PlayCircle className="w-7 h-7" />
            </div>
            <div>
              <Badge variant="primary">Module 1 • Lesson 1.2</Badge>
              <h3 className="font-bold text-sm text-slate-900 mt-1">
                Full-Stack Web Development with Next.js 15 & Laravel 12
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Current: Introduction to Server Components & Layouts
              </p>
            </div>
          </div>

          <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
            <span className="text-xs font-bold text-slate-700">75% Completed</span>
            <Link
              href="/learn/fullstack-nextjs-laravel/server-components-layouts"
              className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold text-xs shadow-md shadow-primary-600/20 transition-all flex items-center"
            >
              Resume Lesson
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
