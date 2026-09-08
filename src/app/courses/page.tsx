'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, Star, Clock, Users, BookOpen, ArrowRight } from 'lucide-react';
import { courseService } from '../../services/courseService';
import { Course } from '../../types';
import { Badge } from '../../components/common/Badge';

export default function CoursesCatalogPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  useEffect(() => {
    courseService.getCourses(search, selectedCategory, selectedLevel).then(setCourses);
  }, [search, selectedCategory, selectedLevel]);

  const categories = [
    { label: 'All Categories', slug: '' },
    { label: 'Web Development', slug: 'web-development' },
    { label: 'Database Engineering', slug: 'database' },
    { label: 'Cloud & DevOps', slug: 'devops' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Explore All Masterclasses
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Learn from industry leaders with live hands-on projects, automated code testing, and certificates.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by course topic or skill..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 text-slate-700 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.label}
              </option>
            ))}
          </select>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 text-slate-700 focus:outline-none"
          >
            <option value="all">All Difficulty Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Course Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400">
            No courses found matching your filter criteria.
          </div>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-card hover:shadow-soft transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-800">
                    {course.category?.name}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center space-x-2 text-xs mb-2">
                    <span className="flex items-center font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 mr-1 fill-amber-500" />
                      {course.average_rating}
                    </span>
                    <span className="text-slate-400">({course.reviews_count || 0})</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">{course.enrollment_count.toLocaleString()} students</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">{course.subtitle}</p>

                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                    <span>{course.total_lessons_count} Lessons</span>
                    <span>•</span>
                    <span>{Math.round(course.total_duration_minutes / 60)} Hours</span>
                    <span>•</span>
                    <span className="capitalize">{course.level}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 line-through mr-1.5">
                    ৳{course.pricing?.price.toLocaleString()}
                  </span>
                  <span className="text-lg font-extrabold text-slate-900">
                    ৳{course.pricing?.effective_price.toLocaleString()}
                  </span>
                </div>

                <Link
                  href={`/courses/${course.slug}`}
                  className="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold text-xs shadow-sm transition-all shadow-primary-600/20"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
