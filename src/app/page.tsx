'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ArrowRight,
  Sparkles,
  Star,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Monitor,
  GraduationCap,
  ShieldCheck,
  Award,
  Layers,
  Clock,
  FileCheck,
  Code,
  Target,
  Brain,
  TrendingUp,
} from 'lucide-react';
import { homeService, HomeData, fallbackHomeData } from '../services/homeService';

export default function HomePage() {
  const router = useRouter();
  const [homeData, setHomeData] = useState<HomeData>(fallbackHomeData);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    homeService.getHomeData().then(setHomeData);
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/courses');
    }
  };

  const getPathIcon = (iconName?: string) => {
    switch (iconName) {
      case 'target':
        return <Target className="w-5 h-5 text-white" />;
      case 'brain':
        return <Brain className="w-5 h-5 text-white" />;
      case 'trending-up':
        return <TrendingUp className="w-5 h-5 text-white" />;
      default:
        return <Code className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div className="bg-slate-50/50 min-h-screen">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-white via-indigo-50/30 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline & Actions */}
            <div className="lg:col-span-6 space-y-6">
              {/* Tag Pill */}
              <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-xs font-semibold text-indigo-600 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Learn • Practice • Grow</span>
              </div>

              {/* Bold Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Learn Skills. <br />
                <span className="text-indigo-600">Build Your Future.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 max-w-lg leading-relaxed font-normal">
                Access high-quality online courses from industry experts. Learn at your own pace and build real-world skills.
              </p>

              {/* Search Box */}
              <form
                onSubmit={handleHeroSearch}
                className="bg-white p-2 rounded-2xl shadow-lg shadow-indigo-100/60 border border-slate-200/80 flex items-center max-w-lg transition-all focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100"
              >
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you want to learn?..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-transparent border-none focus:outline-none text-slate-800 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/25 shrink-0 transition-all flex items-center space-x-1.5"
                >
                  <Search className="w-3.5 h-3.5 hidden sm:inline" />
                  <span>Search Courses</span>
                </button>
              </form>

              {/* Metrics Row */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 text-sm block">10K+</span>
                    <span className="text-[11px] text-slate-500">Students</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 text-sm block">500+</span>
                    <span className="text-[11px] text-slate-500">Courses</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 text-sm block">50+</span>
                    <span className="text-[11px] text-slate-500">Instructors</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 text-sm block">100%</span>
                    <span className="text-[11px] text-slate-500">Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual & Floating Cards */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              {/* Background Circular Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-indigo-200/50 via-purple-100/40 to-blue-200/30 blur-2xl -z-10" />

              {/* Main Student Image Container */}
              <div className="relative w-full max-w-md sm:max-w-lg aspect-[4/3.8] rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/10 border-4 border-white bg-slate-100">
                <img
                  src="/images/home/hero-student.jpg"
                  alt="Student learning with SkillHub"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Floating Badge 1: Learn Anywhere (Top Right) */}
              <div className="absolute -top-3 right-0 sm:right-4 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-100 flex items-center space-x-3 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 leading-tight">Learn Anywhere</h4>
                  <p className="text-[10px] text-slate-400">Access on mobile, tablet or desktop</p>
                </div>
              </div>

              {/* Floating Badge 2: Expert Instructors (Middle Right / Side) */}
              <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-100 flex items-center space-x-3 hidden sm:flex animate-in fade-in slide-in-from-right-4 duration-700">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 leading-tight">Expert Instructors</h4>
                  <p className="text-[10px] text-slate-400">Learn from industry professionals</p>
                </div>
              </div>

              {/* Floating Badge 3: Get Certified (Bottom Right) */}
              <div className="absolute -bottom-4 right-2 sm:right-6 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-100 flex items-center space-x-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 leading-tight">Get Certified</h4>
                  <p className="text-[10px] text-slate-400">Earn certificates and boost career</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TRUSTED BY LEARNERS FROM TOP COMPANIES */}
      {/* ========================================================================= */}
      <section className="border-y border-slate-200/70 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">
            Trusted by learners from top companies
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="font-extrabold text-lg text-slate-700 tracking-tighter">Google</span>
            <span className="font-bold text-lg text-slate-700 tracking-tight">Microsoft</span>
            <span className="font-extrabold text-lg text-slate-700 tracking-tight lowercase">amazon</span>
            <span className="font-extrabold text-lg text-slate-700 tracking-tight lowercase">facebook</span>
            <span className="font-bold text-lg text-slate-700 tracking-tight lowercase">airbnb</span>
            <span className="font-black text-lg text-slate-700 tracking-wider uppercase">NETFLIX</span>
            <span className="font-bold text-lg text-slate-700 tracking-tight">Uber</span>
            <span className="font-extrabold text-lg text-slate-700 tracking-tight">Spotify</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. POPULAR COURSES */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Popular Courses
          </h2>
          <Link
            href="/courses"
            className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View All Courses <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        {/* 5 Course Cards Grid with Carousel Right Button */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {homeData.courses.slice(0, 5).map((course, index) => {
              const badges = ['Bestseller', 'Popular', 'Featured', '', ''];
              const badgeText = badges[index];
              const instructor = course.instructors?.[0] || {
                name: 'Lead Instructor',
                avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop',
              };

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-card hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Course Thumbnail */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                      <img
                        src={course.thumbnail_url}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {badgeText && (
                        <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-[10px] font-bold text-white px-2 py-0.5 rounded-md border border-white/10">
                          {badgeText}
                        </div>
                      )}
                    </div>

                    {/* Course Info */}
                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {course.subtitle || course.description}
                      </p>

                      {/* Instructor */}
                      <div className="flex items-center space-x-2 pt-1">
                        <img
                          src={instructor.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop'}
                          alt={instructor.name}
                          className="w-5 h-5 rounded-full object-cover border border-slate-200"
                        />
                        <span className="text-[11px] font-medium text-slate-700">
                          {instructor.name}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-1 text-xs pt-1">
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-500" />
                          ))}
                        </div>
                        <span className="font-bold text-[11px] text-slate-800 ml-1">
                          {course.average_rating || 4.9}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          ({course.reviews_count || 950})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Footer */}
                  <div className="p-4 pt-0 border-t border-slate-50 flex items-center justify-between mt-2">
                    <div className="flex items-baseline space-x-1.5">
                      {course.pricing?.discount_price ? (
                        <>
                          <span className="text-xs text-slate-400 line-through font-medium">
                            ৳{course.pricing.price.toLocaleString()}
                          </span>
                          <span className="text-sm font-extrabold text-emerald-600">
                            ৳{course.pricing.discount_price.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-extrabold text-emerald-600">
                          ৳{course.pricing?.price.toLocaleString() || '3,200'}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/courses/${course.slug}`}
                      className="text-slate-400 hover:text-indigo-600 transition-colors p-1"
                      title="View Course"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Carousel Button */}
          <Link
            href="/courses"
            className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg border border-slate-200 items-center justify-center text-slate-600 hover:text-indigo-600 hover:scale-105 transition-all"
            title="More Courses"
          >
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CHOOSE YOUR LEARNING PATH */}
      {/* ========================================================================= */}
      <section id="learning-paths" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Choose Your Learning Path
          </h2>
          <Link
            href="/learning-paths"
            className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View All Paths <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeData.learning_paths.slice(0, 4).map((path) => {
            return (
              <div
                key={path.id}
                className={`rounded-3xl p-6 bg-gradient-to-br ${path.color_gradient || 'from-blue-600 to-indigo-600'} text-white shadow-lg shadow-indigo-900/10 flex flex-col justify-between min-h-[220px] group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
              >
                <div>
                  {/* Icon rounded translucent square */}
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20">
                    {getPathIcon(path.icon)}
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-lg text-white tracking-tight leading-snug">
                    {path.title}
                  </h3>
                </div>

                {/* Bottom Avatars & Arrow */}
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {/* Mini avatar stack */}
                    <div className="flex -space-x-2 overflow-hidden">
                      <img
                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white/40 object-cover"
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop"
                        alt="student"
                      />
                      <img
                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white/40 object-cover"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop"
                        alt="student"
                      />
                      <img
                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white/40 object-cover"
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop"
                        alt="student"
                      />
                    </div>
                    <span className="text-xs font-semibold text-white/90">
                      {path.courses_count || 10} Courses
                    </span>
                  </div>

                  {/* Arrow Action Circle */}
                  <Link
                    href={`/courses`}
                    className="w-8 h-8 rounded-full bg-white text-slate-800 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform"
                  >
                    <ArrowRight className="w-4 h-4 text-slate-800" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. VALUE PROPOSITION BAR (WHITE CARD WITH 4 PROPS) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Expert Instructors</h4>
              <p className="text-xs text-slate-500 mt-0.5">Learn from industry professionals</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Hands-on Projects</h4>
              <p className="text-xs text-slate-500 mt-0.5">Build real-world projects</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Lifetime Access</h4>
              <p className="text-xs text-slate-500 mt-0.5">Learn at your own pace</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Certificates</h4>
              <p className="text-xs text-slate-500 mt-0.5">Earn recognized certificates</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. WHAT OUR STUDENTS SAY (TESTIMONIALS) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            What <span className="text-slate-900">Our Students Say</span>
          </h2>
          <div className="flex items-center space-x-3">
            <Link
              href="/#reviews"
              className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors mr-2"
            >
              View All Reviews <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
            <button className="w-7 h-7 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-300 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-300 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeData.testimonials.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-card hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center space-x-1 text-amber-400 mb-4">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Headline Quote */}
                <h4 className="font-bold text-sm text-slate-900 leading-snug">
                  "{item.headline}"
                </h4>

                {/* Body Quote */}
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {item.quote}
                </p>
              </div>

              {/* Student Author */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center space-x-3">
                <img
                  src={item.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h5 className="font-bold text-xs text-slate-900">{item.name}</h5>
                  <p className="text-[11px] text-slate-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. TOP INSTRUCTORS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Top Instructors
          </h2>
          <Link
            href="/mentors"
            className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View All Instructors <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {homeData.instructors.slice(0, 6).map((inst) => (
            <div
              key={inst.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-card hover:shadow-md transition-all text-center group"
            >
              {/* Instructor Portrait */}
              <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden mb-3 border border-slate-100 bg-slate-100">
                <img
                  src={inst.avatar_url}
                  alt={inst.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Name */}
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                {inst.name}
              </h4>

              {/* Headline */}
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                {inst.headline}
              </p>

              {/* Rating */}
              <div className="mt-2 flex items-center justify-center space-x-1 text-[11px]">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="font-bold text-slate-700">{inst.rating || 4.9}</span>
                <span className="text-slate-400">({inst.students_count || '1.8k'})</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. READY TO START YOUR JOURNEY? (CTA BANNER) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative rounded-3xl bg-[#0E1528] text-white p-8 sm:p-12 lg:p-14 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Subtle Confetti Glow in Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -z-0 pointer-events-none" />

          {/* Left Text */}
          <div className="max-w-xl space-y-4 relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Join thousands of learners and start building your future today.
            </p>
            <div className="pt-2">
              <Link
                href="/courses"
                className="inline-flex items-center px-6 py-3 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
              >
                Browse Courses <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* Right Image Graphic: Graduation Cap with Ribbon & Confetti */}
          <div className="relative z-10 w-64 sm:w-80 lg:w-96 aspect-[16/9] flex items-center justify-center shrink-0">
            <img
              src="/images/home/cta-diploma.jpg"
              alt="Graduation diploma and cap"
              className="w-full h-full object-cover rounded-2xl shadow-lg border border-indigo-900/50"
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FREQUENTLY ASKED QUESTIONS (2-COLUMN ACCORDION) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <Link
            href="/#faq"
            className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View All FAQs <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        {/* 2-Column Accordion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {homeData.faqs.slice(0, 4).map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={faq.id || idx}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                >
                  <span className="pr-2">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs text-slate-500 leading-relaxed border-t border-slate-50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
