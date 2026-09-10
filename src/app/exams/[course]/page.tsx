'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  GraduationCap,
  Clock,
  HelpCircle,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { mockExam, examService } from '../../../services/examService';
import { Exam } from '../../../types';
import { Badge } from '../../../components/common/Badge';

export default function ExamInstructionPage() {
  const params = useParams();
  const courseSlug = params?.course as string;
  const [exam, setExam] = useState<Exam>(mockExam);

  useEffect(() => {
    if (courseSlug) {
      examService.getExamForCourse(courseSlug).then((data) => {
        if (data) setExam(data);
      });
    }
  }, [courseSlug]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto shadow-sm">
          <GraduationCap className="w-8 h-8" />
        </div>
        <Badge variant="purple">Official Certification Exam</Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {exam.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
          {exam.description}
        </p>
      </div>

      {/* Exam Specs Grid */}
      <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-card text-center">
        <div>
          <span className="text-[11px] text-slate-400 block font-medium">Questions</span>
          <span className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block">
            {exam.questions?.length || exam.total_questions_to_pick} Items
          </span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block font-medium">Duration</span>
          <span className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block">
            {exam.duration_minutes} Minutes
          </span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block font-medium">Pass Threshold</span>
          <span className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block">
            {exam.pass_percentage}% Score
          </span>
        </div>
      </div>

      {/* 3-Attempts Critical Warning Alert */}
      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
        <div className="flex items-center font-bold text-amber-800">
          <AlertTriangle className="w-4 h-4 mr-1.5 shrink-0 text-amber-600" />
          Strict Learning Policy: Maximum 3 Attempts Allowed
        </div>
        <p className="leading-relaxed text-amber-800/90">
          You are granted up to 3 total attempts to pass this graduation exam. If you fail all 3 attempts, your course enrollment will be locked into <span className="font-bold underline">Course Reset Required</span> status, and you will be required to re-watch all curriculum modules before testing again.
        </p>
      </div>

      {/* Start Button */}
      <div className="flex justify-center pt-2">
        <Link
          href={`/exams/${courseSlug}/test`}
          className="px-8 py-3.5 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-primary-600/25 transition-all flex items-center"
        >
          I Understand the Rules, Start Exam
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}
