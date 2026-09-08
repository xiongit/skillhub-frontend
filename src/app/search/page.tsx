'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Code2, Users, FileText, Filter, ArrowRight } from 'lucide-react';
import { mockCourses } from '../../services/courseService';
import { Badge } from '../../components/common/Badge';

export default function AdvancedSearchPage() {
  const [query, setQuery] = useState('Laravel');
  const [activeTab, setActiveTab] = useState<'all' | 'courses' | 'projects' | 'articles'>('all');

  const sampleResults = {
    courses: mockCourses.filter((c) => c.title.toLowerCase().includes(query.toLowerCase())),
    projects: [
      {
        title: 'Production SaaS with Laravel 12 & Next.js',
        author: 'Tanvir Hossain',
        type: 'Project',
        link: '/student/profile/tanvir',
      },
    ],
    articles: [
      {
        title: 'Top 10 Backend Best Practices in Laravel 12 API Architecture',
        category: 'Tutorial',
        date: 'September 2026',
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Global Knowledge Search
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Search across masterclasses, curriculum lectures, student open-source projects, and engineering articles.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white p-3 sm:p-4 rounded-3xl border border-slate-200 shadow-card flex items-center space-x-3">
        <Search className="w-5 h-5 text-slate-400 ml-2 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by topic, framework, project, or student name..."
          className="w-full text-xs sm:text-sm bg-transparent border-none focus:outline-none text-slate-800 font-medium"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 text-xs font-semibold">
        {[
          { id: 'all', label: 'All Results' },
          { id: 'courses', label: 'Courses & Masterclasses' },
          { id: 'projects', label: 'Student Projects' },
          { id: 'articles', label: 'Articles & Tutorials' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === tab.id
                ? 'bg-primary-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results Content */}
      <div className="space-y-6">
        {(activeTab === 'all' || activeTab === 'courses') && sampleResults.courses.length > 0 && (
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Matching Courses
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleResults.courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="p-5 rounded-3xl border border-slate-200 bg-white hover:border-primary-500 hover:shadow-soft transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-4 min-w-0">
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      className="w-16 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-primary-600 transition-colors truncate">
                        {course.title}
                      </h4>
                      <span className="text-[11px] text-slate-500">{course.total_lessons_count} Lessons</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'projects') && (
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Student Projects
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleResults.projects.map((proj, i) => (
                <Link
                  key={i}
                  href={proj.link}
                  className="p-5 rounded-3xl border border-slate-200 bg-white hover:border-primary-500 transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Code2 className="w-4 h-4 text-primary-600" />
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">{proj.title}</h4>
                    </div>
                    <span className="text-[11px] text-slate-500 block">Built by {proj.author}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary-600 transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
