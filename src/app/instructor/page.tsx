'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  BookOpen,
  DollarSign,
  Star,
  TrendingUp,
  Plus,
  HelpCircle,
  Award,
  ArrowUpRight,
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export default function InstructorDashboardPage() {
  const stats = {
    totalStudents: 5310,
    coursesPublished: 2,
    totalGrossRevenue: 4999000,
    instructorShare: 3499300, // 70% commission
    platformFee: 1499700, // 30% commission
    averageRating: 4.94,
    activeQuestions: 4,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block">
            Instructor Console
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Instructor Operations & Revenue Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track student enrollment progress, revenue commissions, and answer curriculum questions.
          </p>
        </div>

        <Link
          href="/courses"
          className="inline-flex items-center px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold text-xs shadow-md shadow-primary-600/20"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Create New Course
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Total Students</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl font-bold text-slate-900">{stats.totalStudents.toLocaleString()}</span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">+14.2% MoM</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Instructor Earnings (70%)</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-bold text-emerald-600">৳{(stats.instructorShare / 1000000).toFixed(2)}M</span>
          <span className="text-[11px] text-slate-500 block mt-1">Gross: ৳{(stats.totalGrossRevenue / 1000000).toFixed(2)}M</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Published Masterclasses</span>
            <BookOpen className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-2xl font-bold text-slate-900">{stats.coursesPublished} Tracks</span>
          <span className="text-[11px] text-primary-600 font-semibold block mt-1">100% Active</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Instructor Rating</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <span className="text-2xl font-bold text-slate-900">{stats.averageRating} / 5.0</span>
          <span className="text-[11px] text-slate-500 block mt-1">Across 832 reviews</span>
        </div>
      </div>

      {/* Revenue Sharing Split Calculator Widget */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Revenue Sharing Model (70 / 30 Split)</h2>
            <p className="text-xs text-slate-500">
              SkillHub LMS pays instructors 70% of gross course sales every month via automated bKash or Bank Wire.
            </p>
          </div>
          <Badge variant="success">Standard Instructor Tier</Badge>
        </div>

        <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden flex">
          <div className="bg-emerald-600 h-full w-[70%]" title="Instructor Share: 70%" />
          <div className="bg-slate-400 h-full w-[30%]" title="Platform Infrastructure Share: 30%" />
        </div>

        <div className="flex items-center justify-between text-xs font-semibold pt-1">
          <span className="text-emerald-700">● Instructor Net: 70% (৳{stats.instructorShare.toLocaleString()})</span>
          <span className="text-slate-500">● Platform Cloud & Server: 30% (৳{stats.platformFee.toLocaleString()})</span>
        </div>
      </div>
    </div>
  );
}
