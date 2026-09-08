'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
  Download,
} from 'lucide-react';
import { ExamAttempt } from '../../../../types';
import { Badge } from '../../../../components/common/Badge';

export default function ExamResultPage() {
  const params = useParams();
  const courseSlug = params?.course as string;
  const [result, setResult] = useState<ExamAttempt | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('last_exam_result');
      if (stored) {
        setResult(JSON.parse(stored));
      } else {
        setResult({
          id: 1,
          exam_id: 1,
          user_id: 101,
          attempt_number: 1,
          score_obtained: 80,
          total_possible_score: 100,
          percentage: 80,
          status: 'passed',
          triggered_course_reset: false,
          started_at: '',
          submitted_at: '',
        });
      }
    }
  }, []);

  if (!result) return null;

  const isPassed = result.status === 'passed';
  const remainingAttempts = Math.max(0, 3 - result.attempt_number);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8 text-center">
      {/* Result Hero Header */}
      <div className="space-y-3">
        <div
          className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-md ${
            isPassed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
          }`}
        >
          {isPassed ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isPassed ? 'Congratulations! You Passed!' : 'Exam Attempt Unsuccessful'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          {isPassed
            ? 'You have satisfied the graduation benchmark. Your digital verified diploma has been issued.'
            : 'You did not meet the 75% passing score threshold for this attempt.'}
        </p>
      </div>

      {/* Score Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card grid grid-cols-3 gap-3 text-center">
        <div>
          <span className="text-[11px] text-slate-400 block font-medium">Your Score</span>
          <span className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5 block">
            {result.percentage}%
          </span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block font-medium">Required</span>
          <span className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5 block">
            75%
          </span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block font-medium">Attempt</span>
          <span className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5 block">
            {result.attempt_number} of 3
          </span>
        </div>
      </div>

      {/* Conditional 3-Attempts Logic Display */}
      {result.triggered_course_reset ? (
        <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-2 text-left">
          <div className="flex items-center font-bold text-rose-800">
            <ShieldAlert className="w-4 h-4 mr-1.5 shrink-0 text-rose-600" />
            Policy Enforced: Course Reset Required (3 Failures)
          </div>
          <p className="leading-relaxed">
            You have exhausted all 3 allowed attempts on this final exam. In accordance with SkillHub learning integrity rules, your progress has been reset. You must review all curriculum modules before unlocking a re-examination.
          </p>
          <div className="pt-2">
            <Link
              href={`/learn/${courseSlug}/server-components-layouts`}
              className="inline-flex items-center px-4 py-2 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-500"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Restart Course Modules
            </Link>
          </div>
        </div>
      ) : isPassed ? (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white space-y-4 shadow-soft">
          <div className="space-y-1">
            <Award className="w-8 h-8 text-amber-300 mx-auto" />
            <h3 className="text-lg font-bold">Certification Unlocked!</h3>
            <p className="text-xs text-emerald-100">
              Certificate Serial: <strong className="font-mono text-white">SKILLHUB-2026-X8921</strong>
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/dashboard/certificates"
              className="px-5 py-2.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-bold shadow-md transition-colors flex items-center"
            >
              <Award className="w-4 h-4 mr-1.5" />
              View in My Certificates
            </Link>
            <Link
              href="/certificate/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
              className="px-5 py-2.5 rounded-xl bg-emerald-800/60 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors flex items-center"
            >
              Public QR Verification
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left space-y-2">
          <span className="font-bold block text-amber-800">
            {remainingAttempts} attempt(s) remaining
          </span>
          <p className="text-slate-600">
            You can review the curriculum lectures and notes before initiating your next attempt.
          </p>
          <div className="pt-2 flex items-center space-x-3">
            <Link
              href={`/exams/${courseSlug}/test`}
              className="px-4 py-2 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-500"
            >
              Retake Exam Now
            </Link>
            <Link
              href={`/learn/${courseSlug}/server-components-layouts`}
              className="text-primary-600 font-semibold hover:underline"
            >
              Review Lectures First
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
