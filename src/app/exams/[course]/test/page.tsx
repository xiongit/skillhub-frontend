'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Clock, ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { mockExam, examService } from '../../../../services/examService';
import { Exam } from '../../../../types';

export default function LiveExamScreen() {
  const params = useParams();
  const router = useRouter();
  const courseSlug = params?.course as string;

  const [exam, setExam] = useState<Exam>(mockExam);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (courseSlug) {
      examService.getExamForCourse(courseSlug).then((data) => {
        if (data) {
          setExam(data);
          if (data.duration_minutes) {
            setTimeLeft(data.duration_minutes * 60);
          }
        }
      });
    }
  }, [courseSlug]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [exam, answers]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const questions = exam.questions && exam.questions.length > 0 ? exam.questions : (mockExam.questions || []);
  const activeQuestion = questions[currentIndex];

  const handleSubmitExam = async () => {
    setSubmitting(true);
    const result = await examService.submitExam(answers, exam);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('last_exam_result', JSON.stringify(result));
    }
    router.push(`/exams/${courseSlug}/result`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Status Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card flex items-center justify-between">
        <div>
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
            Final Exam In Progress
          </span>
          <h2 className="text-xs sm:text-sm font-bold text-slate-900">
            Question {currentIndex + 1} of {questions.length}
          </h2>
        </div>

        {/* Timer Pill */}
        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 font-mono text-sm font-bold">
          <Clock className="w-4 h-4 animate-pulse" />
          <span>{formatTimer(timeLeft)}</span>
        </div>
      </div>

      {/* Question Number Pills */}
      <div className="flex flex-wrap gap-2">
        {questions.map((q, idx) => {
          const isAnswered = answers[q.id] !== undefined;
          const isCurrent = idx === currentIndex;
          return (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                isCurrent
                  ? 'bg-primary-600 text-white shadow-sm'
                  : isAnswered
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Question Card */}
      {activeQuestion && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-card space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">
              Question {currentIndex + 1} (Marks: {activeQuestion.marks})
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {activeQuestion.question_text}
            </h3>
          </div>

          <div className="space-y-3">
            {activeQuestion.options.map((opt) => {
              const isSelected = answers[activeQuestion.id] === opt.id;
              return (
                <label
                  key={opt.id}
                  onClick={() => setAnswers({ ...answers, [activeQuestion.id]: opt.id })}
                  className={`flex items-center p-4 rounded-2xl border text-xs sm:text-sm font-medium cursor-pointer transition-all ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50/50 text-primary-900 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${activeQuestion.id}`}
                    checked={isSelected}
                    onChange={() => {}}
                    className="mr-3 text-primary-600 focus:ring-0"
                  />
                  <span>{opt.option_text}</span>
                </label>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Previous
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="px-5 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold flex items-center shadow-sm"
              >
                Next Question <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center shadow-md shadow-emerald-600/20"
              >
                <CheckCircle className="w-4 h-4 mr-1.5" />
                {submitting ? 'Evaluating Score...' : 'Submit & Finish Exam'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
