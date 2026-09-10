'use client';

import React from 'react';
import Link from 'next/link';
import { PlayCircle, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { mockCourses } from '../../../services/courseService';
import { Badge } from '../../../components/common/Badge';

export default function MyCoursesPage() {
  const enrolledCourses = [
    {
      course: mockCourses[0],
      progress: 75,
      completedLessons: 10,
      totalLessons: 14,
      lastLessonSlug: 'automatic-car-basics',
    }
  ].filter(item => item.course); // Filter out any undefined courses just in case

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          My Enrolled Courses
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Pick up right where you left off or take your graduation certification exams.
        </p>
      </div>

      <div className="space-y-4">
        {enrolledCourses.map(({ course, progress, completedLessons, totalLessons, lastLessonSlug, certificateUuid }) => (
          <div
            key={course.id}
            className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-card flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <img
                src={course.thumbnail_url}
                alt={course.title}
                className="w-24 h-20 rounded-2xl object-cover shrink-0"
              />
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Badge variant={progress === 100 ? 'success' : 'primary'}>
                    {progress === 100 ? 'Course Completed' : 'In Progress'}
                  </Badge>
                  <span className="text-[11px] text-slate-400">
                    {completedLessons} of {totalLessons} Lessons Done
                  </span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 line-clamp-1">
                  {course.title}
                </h3>

                {/* Progress Bar */}
                <div className="mt-3 flex items-center space-x-3 w-full max-w-xs">
                  <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        progress === 100 ? 'bg-emerald-500' : 'bg-primary-600'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-700">{progress}%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
              {progress === 100 ? (
                <Link
                  href="/dashboard/certificates"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center shadow-sm"
                >
                  <Award className="w-4 h-4 mr-1.5" />
                  View Certificate
                </Link>
              ) : (
                <Link
                  href={`/learn/${course.slug}/${lastLessonSlug}`}
                  className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold flex items-center shadow-md shadow-primary-600/20"
                >
                  <PlayCircle className="w-4 h-4 mr-1.5" />
                  Continue Learning
                </Link>
              )}

              <Link
                href={`/exams/${course.slug}`}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center"
              >
                Final Exam
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
