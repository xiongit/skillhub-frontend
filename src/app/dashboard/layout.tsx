'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Award,
  Users,
  User,
  Settings,
  ArrowRight,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const sidebarLinks = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Courses', href: '/dashboard/courses', icon: BookOpen },
    { label: 'Certificates', href: '/dashboard/certificates', icon: Award },
    { label: 'Community Q&A', href: '/dashboard/community', icon: Users },
    { label: 'Profile & Portfolio', href: '/dashboard/profile', icon: User },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav (Desktop) */}
        <div className="hidden lg:block space-y-6">
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
              <img
                src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                alt={user?.name || 'Student'}
                className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
              />
              <div className="min-w-0">
                <span className="font-bold text-xs sm:text-sm text-slate-900 block truncate">
                  {user?.name || 'Tanvir Hossain'}
                </span>
                <span className="text-[11px] text-slate-500 block truncate">
                  {user?.email || 'tanvir@gmail.com'}
                </span>
              </div>
            </div>

            <nav className="space-y-1">
              {sidebarLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mr-2.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">{children}</div>
      </div>
    </div>
  );
}
