'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguageStore } from '../../store/useLanguageStore';
import { dictionary } from '../../locales/dictionary';
import { mockCourses } from '../../services/courseService';
import Navbar from '../../components/home/Navbar';
import Footer from '../../components/home/Footer';
import { BookOpen, Clock, Star, Users } from 'lucide-react';

export default function CoursesPage() {
  const { lang } = useLanguageStore();
  const t = dictionary[lang].courseList;
  
  // Filter only published courses
  const publishedCourses = mockCourses.filter(c => c.status === 'published');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-900/20 to-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedCourses.map((course) => (
            <div 
              key={course.id} 
              className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] hover:border-slate-700 transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={course.thumbnail_url || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop'}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {course.category?.name || 'Course'}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-1">
                  {course.subtitle}
                </p>

                {/* Meta Stats */}
                <div className="flex items-center gap-4 text-xs font-medium text-slate-300 mb-6 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span>{course.total_lessons_count} {t.lessons}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span>{Math.floor(course.total_duration_minutes / 60)} {t.hours}</span>
                  </div>
                </div>

                {/* Footer (Instructor & Price) */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-700">
                      <Image
                        src={course.instructors?.[0]?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                        alt={course.instructors?.[0]?.name || 'Instructor'}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-200">{course.instructors?.[0]?.name || 'Expert Instructor'}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-[10px] text-amber-500 font-bold">{course.average_rating || 0}</span>
                        <span className="text-[10px] text-slate-500">({course.reviews_count || 0})</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-lg font-bold text-white">
                      {course.pricing?.currency || 'BDT'} {course.pricing?.effective_price || 0}
                    </span>
                    {course.pricing && course.pricing.discount_price !== course.pricing.price && (
                      <span className="text-[10px] text-slate-500 line-through">
                        {course.pricing.currency} {course.pricing.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Hover Action */}
              <div className="px-6 pb-6">
                <Link 
                  href={`/courses/${course.slug}`}
                  className="block w-full text-center py-2.5 rounded-xl bg-slate-800 text-slate-200 font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors"
                >
                  {t.enrollNow}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
