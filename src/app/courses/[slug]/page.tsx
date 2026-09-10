'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Star,
  Clock,
  BookOpen,
  Users,
  CheckCircle2,
  PlayCircle,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Award,
  ArrowRight,
} from 'lucide-react';
import { courseService } from '../../../services/courseService';
import { Course } from '../../../types';
import { Badge } from '../../../components/common/Badge';
import { useCartStore } from '../../../store/useCartStore';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [openModuleId, setOpenModuleId] = useState<number | null>(1);
  const { setCourse: setCartCourse } = useCartStore();

  useEffect(() => {
    if (slug) {
      courseService.getCourseBySlug(slug).then(setCourse);
    }
  }, [slug]);

  if (!course) {
    return (
      <div className="flex justify-center py-24">
        <div className="w-8 h-8 border-4 border-primary-500/20 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  const handleEnroll = () => {
    setCartCourse(course);
    router.push('/checkout');
  };

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Header Banner */}
      <section className="bg-slate-900 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center space-x-2">
              <Badge variant="primary">{course.category?.name}</Badge>
              <Badge variant="purple">Certificate Track</Badge>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {course.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
              <div className="flex items-center text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400 mr-1" />
                {course.average_rating}
                <span className="text-slate-400 font-normal ml-1">({course.reviews_count} reviews)</span>
              </div>
              <span>•</span>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1 text-slate-400" />
                {course.enrollment_count.toLocaleString()} students enrolled
              </div>
              <span>•</span>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-slate-400" />
                {Math.round(course.total_duration_minutes / 60)} Hours Total
              </div>
            </div>

            {/* Instructor Pill */}
            {course.instructors?.[0] && (
              <div className="flex items-center space-x-3 pt-2">
                <img
                  src={course.instructors[0].avatar_url}
                  alt={course.instructors[0].name}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                />
                <div>
                  <span className="text-[11px] text-slate-400 block">Created by</span>
                  <span className="text-xs font-bold text-white">{course.instructors[0].name}</span>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Enrollment Card (Desktop) */}
          <div className="bg-white rounded-3xl p-6 text-slate-900 border border-slate-200 shadow-2xl space-y-5">
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black relative">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
                title="Course Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                ৳{course.pricing?.effective_price.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ৳{course.pricing?.price.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                37% OFF
              </span>
            </div>

            <button
              onClick={handleEnroll}
              className="w-full py-3.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all shadow-primary-600/20 flex items-center justify-center cursor-pointer"
            >
              Enroll in Course Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

            <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <li className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                <span>Full lifetime access to all lectures</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                <span>Automated quizzes & 3-attempt final exam</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                <span>Official QR-verifiable certificate</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                <span>Instant bKash, Nagad & Card payment</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Course Body Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          {/* What You'll Learn */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">What you will master</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.learning_outcomes?.map((outcome, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Syllabus Accordion */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Course Curriculum</h2>
                <p className="text-xs text-slate-500">
                  {course.modules?.length} Modules • {course.total_lessons_count} Lessons
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {course.modules?.map((module, idx) => {
                const isOpen = openModuleId === module.id;
                return (
                  <div
                    key={module.id}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenModuleId(isOpen ? null : module.id)}
                      className="w-full p-4 text-left flex items-center justify-between bg-slate-50/60 hover:bg-slate-100/60 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 rounded-lg bg-primary-100 text-primary-700 font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-xs sm:text-sm text-slate-900">{module.title}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-slate-500">
                        <span>{module.lessons.length} lessons</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="divide-y divide-slate-100 p-2">
                        {module.lessons.map((lesson) => (
                          <Link
                            key={lesson.id}
                            href={`/learn/${course.slug}/${lesson.slug}`}
                            className="p-3 flex items-center justify-between hover:bg-slate-50 rounded-xl transition-colors block group"
                          >
                            <div className="flex items-center space-x-3 text-xs">
                              {lesson.type === 'video' ? (
                                <PlayCircle className="w-4 h-4 text-primary-600 shrink-0 group-hover:scale-110 transition-transform" />
                              ) : (
                                <HelpCircle className="w-4 h-4 text-purple-600 shrink-0 group-hover:scale-110 transition-transform" />
                              )}
                              <span className="font-medium text-slate-800 group-hover:text-primary-700 transition-colors">{lesson.title}</span>
                            </div>

                            <div className="flex items-center space-x-3 text-xs text-slate-400">
                              {lesson.is_free_preview && (
                                <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                                  Free Preview
                                </span>
                              )}
                              <span>{lesson.duration_minutes}m</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-3">
            <h3 className="text-base font-bold text-slate-900">Requirements</h3>
            <ul className="space-y-2 list-disc list-inside text-xs text-slate-600">
              {course.requirements?.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
