'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, CheckCircle2, ArrowRight, Clock, BookOpen, Sparkles } from 'lucide-react';
import { mockLearningPaths } from '../../services/careerService';
import { Badge } from '../../components/common/Badge';

export default function LearningPathsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="max-w-2xl">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-primary-600 uppercase tracking-wider mb-2">
          <Compass className="w-4 h-4" />
          <span>Career Acceleration Roadmaps</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Role-Based Learning Paths
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Structured curricula designed with hiring managers from leading tech companies in Bangladesh and globally. Complete every course in the track to graduate.
        </p>
      </div>

      <div className="space-y-8">
        {mockLearningPaths.map((path) => (
          <div
            key={path.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Badge variant="purple">{path.difficulty}</Badge>
                  <span className="text-xs text-slate-400">
                    {path.courses_count} Masterclasses • {path.total_hours} Hours
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{path.title}</h2>
                <p className="text-xs text-slate-500 max-w-2xl">{path.description}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs text-slate-400 block font-medium">Path Progress</span>
                <span className="text-xl font-extrabold text-primary-600">50% Completed</span>
              </div>
            </div>

            {/* Courses in Path */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Track Progression Steps
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {path.courses.map((course, idx) => (
                  <div
                    key={course.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <span className="w-7 h-7 rounded-xl bg-primary-100 text-primary-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-900 line-clamp-1 block">
                          {course.title}
                        </span>
                        <span className="text-[11px] text-slate-500">{course.total_lessons_count} Lessons</span>
                      </div>
                    </div>

                    <Link
                      href={`/courses/${course.slug}`}
                      className="px-3 py-1.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold shrink-0 ml-3 shadow-sm"
                    >
                      {idx === 0 ? 'Resume' : 'Next Course'}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
