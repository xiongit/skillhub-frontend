'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  ChevronDown,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Sparkles,
  BookOpen,
  GraduationCap,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">
        {/* Left: Brand Logo & Links */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl text-slate-900 tracking-tight">
              SkillHub
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-700">
            {/* Courses Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setCoursesDropdownOpen(!coursesDropdownOpen);
                  setCategoriesDropdownOpen(false);
                }}
                className="flex items-center space-x-1 hover:text-indigo-600 transition-colors py-2"
              >
                <span>Courses</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {coursesDropdownOpen && (
                <div
                  onMouseLeave={() => setCoursesDropdownOpen(false)}
                  className="absolute top-full left-0 mt-1 w-56 rounded-xl bg-white shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                >
                  <Link
                    href="/courses"
                    onClick={() => setCoursesDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-indigo-600 text-xs font-medium"
                  >
                    All Masterclasses
                  </Link>
                  <Link
                    href="/courses?category=web-development"
                    onClick={() => setCoursesDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-indigo-600 text-xs font-medium"
                  >
                    Web Development
                  </Link>
                  <Link
                    href="/courses?category=design-uiux"
                    onClick={() => setCoursesDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-indigo-600 text-xs font-medium"
                  >
                    UI/UX Design
                  </Link>
                  <Link
                    href="/courses?category=digital-marketing"
                    onClick={() => setCoursesDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-indigo-600 text-xs font-medium"
                  >
                    Digital Marketing
                  </Link>
                </div>
              )}
            </div>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setCategoriesDropdownOpen(!categoriesDropdownOpen);
                  setCoursesDropdownOpen(false);
                }}
                className="flex items-center space-x-1 hover:text-indigo-600 transition-colors py-2"
              >
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {categoriesDropdownOpen && (
                <div
                  onMouseLeave={() => setCategoriesDropdownOpen(false)}
                  className="absolute top-full left-0 mt-1 w-52 rounded-xl bg-white shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                >
                  <Link
                    href="/courses"
                    onClick={() => setCategoriesDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-slate-50 text-slate-700 text-xs"
                  >
                    Development
                  </Link>
                  <Link
                    href="/courses"
                    onClick={() => setCategoriesDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-slate-50 text-slate-700 text-xs"
                  >
                    Design & Creative
                  </Link>
                  <Link
                    href="/courses"
                    onClick={() => setCategoriesDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-slate-50 text-slate-700 text-xs"
                  >
                    Marketing & Business
                  </Link>
                  <Link
                    href="/courses"
                    onClick={() => setCategoriesDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-slate-50 text-slate-700 text-xs"
                  >
                    Data Science & AI
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/#learning-paths"
              className="hover:text-indigo-600 transition-colors py-2"
            >
              Learning Paths
            </Link>

            <Link
              href="/dashboard/community"
              className="hover:text-indigo-600 transition-colors py-2"
            >
              Community
            </Link>
          </nav>
        </div>

        {/* Center/Right: Search Pill */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xs mx-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, skills or anything..."
              className="w-full pl-4 pr-9 py-2 text-xs bg-slate-50 rounded-full border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-800 placeholder:text-slate-400 transition-all"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Right: Auth / Session */}
        <div className="flex items-center space-x-3">
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-2">
              <Link
                href="/dashboard/courses"
                className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                My Courses
              </Link>

              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-1 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <img
                    src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                  <span className="hidden md:inline text-xs font-semibold text-slate-800">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-2xl border border-slate-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>

                    <div className="p-1 space-y-0.5">
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="w-full flex items-center px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                      >
                        <UserIcon className="w-4 h-4 mr-2 text-slate-400" />
                        Student Dashboard
                      </Link>
                      <Link
                        href="/dashboard/certificates"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="w-full flex items-center px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                      >
                        <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
                        My Certificates
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                          router.push('/');
                        }}
                        className="w-full flex items-center px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg"
                      >
                        <LogOut className="w-4 h-4 mr-2 text-rose-500" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2.5">
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3">
          <form onSubmit={handleSearch} className="mb-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, skills..."
              className="w-full px-3.5 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200"
            />
          </form>
          <Link
            href="/courses"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Courses
          </Link>
          <Link
            href="/#learning-paths"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Learning Paths
          </Link>
          <Link
            href="/dashboard/community"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Community
          </Link>
        </div>
      )}
    </header>
  );
};
