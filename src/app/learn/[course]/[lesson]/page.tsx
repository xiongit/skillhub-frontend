'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Play,
  RotateCcw,
  Bookmark,
  FileText,
  HelpCircle,
  CheckCircle2,
  Circle,
  Menu,
  X,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Send,
  Lightbulb,
  Check,
  AlertCircle,
  Award,
} from 'lucide-react';
import { mockCourses } from '../../../../services/courseService';
import { useLearningStore } from '../../../../store/useLearningStore';
import { useAiAssistantStore } from '../../../../store/useAiAssistantStore';
import { Badge } from '../../../../components/common/Badge';
import { Lock, Unlock, CheckCircle } from 'lucide-react';

// Helper to extract embeddable video URL for YouTube & Vimeo
const getEmbedUrl = (url?: string, provider?: string): string => {
  if (!url) return 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?enablejsapi=1&autoplay=1';
  const cleanUrl = url.trim();

  // Vimeo
  if (cleanUrl.includes('vimeo.com') || provider === 'vimeo') {
    const vimeoMatch = cleanUrl.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    }
    return cleanUrl;
  }

  // YouTube
  const ytMatch = cleanUrl.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?enablejsapi=1&autoplay=1`;
  }

  return cleanUrl;
};

// Contextual fallback questions if a quiz lesson has no custom questions attached yet
const defaultQuizQuestions = [
  {
    id: 101,
    question_text: 'Where do Next.js 15 Server Components compile and execute by default?',
    explanation: 'Server Components execute exclusively on the server runtime, streaming HTML without shipping JavaScript bundles to the client.',
    options: [
      { id: 1, option_text: 'On the server during build or request time', is_correct: true },
      { id: 2, option_text: 'Inside the client browser via Web Workers', is_correct: false },
      { id: 3, option_text: 'Only inside background Service Workers', is_correct: false },
    ],
  },
  {
    id: 102,
    question_text: 'Which directive marks a component boundary for client-side React interactivity in Next.js?',
    explanation: 'The "use client" directive marks an explicit boundary where client hooks like useState, useEffect, and event listeners are enabled.',
    options: [
      { id: 4, option_text: '"use client"', is_correct: true },
      { id: 5, option_text: '"use browser"', is_correct: false },
      { id: 6, option_text: '"use frontend"', is_correct: false },
    ],
  },
  {
    id: 103,
    question_text: 'In Laravel REST APIs, what authentication mechanism is standard for SPA token authorization?',
    explanation: 'Laravel Sanctum provides a lightweight token-based authentication system with Personal Access Tokens.',
    options: [
      { id: 7, option_text: 'Laravel Sanctum with Personal Access Tokens', is_correct: true },
      { id: 8, option_text: 'Basic HTTP Authentication in clear text', is_correct: false },
      { id: 9, option_text: 'Unsigned URL query parameters', is_correct: false },
    ],
  },
];

export default function CourseLearningPage() {
  const params = useParams();
  const courseSlug = params?.course as string;
  const lessonSlug = params?.lesson as string;

  const defaultCourse = mockCourses.find((c) => c.slug === courseSlug) || mockCourses[0];

  // Dynamic curriculum and lock state
  const [curriculumData, setCurriculumData] = useState<any>(null);
  const [enforceSequentialWatch, setEnforceSequentialWatch] = useState<boolean>(true);
  const [minWatchPercentage, setMinWatchPercentage] = useState<number>(90);
  const [lockedToast, setLockedToast] = useState<string | null>(null);
  const [unlockCelebration, setUnlockCelebration] = useState<string | null>(null);

  const {
    currentVideoTime,
    setCurrentVideoTime,
    completedLessonIds,
    markLessonCompleted,
    notes,
    addNote,
    deleteNote,
    bookmarks,
    toggleBookmark,
    isSidebarOpen,
    toggleSidebar,
  } = useLearningStore();

  // Fetch live curriculum from API or localStorage
  useEffect(() => {
    const loadCurriculum = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/v1/courses/1/curriculum');
        if (res.ok) {
          const json = await res.json();
          if (json?.data?.modules && json.data.modules.length > 0) {
            setCurriculumData(json.data);
            if (json.data.enforce_sequential_watch !== undefined) {
              setEnforceSequentialWatch(Boolean(json.data.enforce_sequential_watch));
            }
            if (json.data.min_watch_percentage) {
              setMinWatchPercentage(json.data.min_watch_percentage);
            }
            return;
          }
        }
      } catch (e) {
        console.warn('Could not fetch from backend, trying localStorage cache:', e);
      }

      // Check localStorage cache
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('skillmaster_curriculum_1');
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            setCurriculumData(parsed);
            if (parsed.enforce_sequential_watch !== undefined) {
              setEnforceSequentialWatch(Boolean(parsed.enforce_sequential_watch));
            }
            if (parsed.min_watch_percentage) {
              setMinWatchPercentage(parsed.min_watch_percentage);
            }
          } catch (err) {
            console.error(err);
          }
        }
      }
    };

    loadCurriculum();

    // Listen for cross-tab or course-builder updates
    const handleSync = () => loadCurriculum();
    window.addEventListener('curriculum-updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('curriculum-updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Compute active course, modules, and lessons
  const modules = curriculumData?.modules && curriculumData.modules.length > 0
    ? curriculumData.modules
    : (defaultCourse.modules || []);

  const allLessons = modules.flatMap((m: any) => m.lessons || []);

  const activeLesson =
    allLessons.find((l: any) => l.slug === lessonSlug || String(l.id) === lessonSlug) ||
    allLessons[0];

  const activeLessonIndex = allLessons.findIndex((l: any) => l.id === activeLesson?.id);

  // Check if active lesson is a quiz
  const isQuizLesson =
    activeLesson?.type === 'quiz' ||
    Boolean(activeLesson?.quiz) ||
    (!activeLesson?.video_url && Boolean(activeLesson?.quiz_questions_count));

  // Determine quiz questions for the active lesson
  const currentQuizQuestions =
    activeLesson?.quiz?.questions && activeLesson.quiz.questions.length > 0
      ? activeLesson.quiz.questions
      : defaultQuizQuestions;

  // Check if a lesson is locked
  const isLessonLocked = (les: any, idx: number): boolean => {
    if (!les) return false;
    // Free preview is always accessible
    if (les.is_free_preview) return false;

    // Explicit manual lock by admin
    if (les.is_locked) return true;

    // Sequential lock policy
    if (enforceSequentialWatch) {
      if (idx === 0) return false; // First lesson is always unlocked
      const prevLesson = allLessons[idx - 1];
      if (prevLesson && !completedLessonIds.includes(prevLesson.id)) {
        return true;
      }
    }

    return false;
  };

  const isCurrentLessonLocked = activeLesson ? isLessonLocked(activeLesson, activeLessonIndex) : false;

  // Video Player Controls State
  const [videoProgress, setVideoProgress] = useState(25);
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'ai_assistant'>('overview');
  const [aiQuestionInput, setAiQuestionInput] = useState('');
  const { messages, isThinking, sendMessage } = useAiAssistantStore();

  // Notes Form State
  const [newNoteText, setNewNoteText] = useState('');

  // Quiz Arena State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Reset quiz state when active lesson changes
  useEffect(() => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  }, [activeLesson?.id]);

  const isCompleted = activeLesson ? completedLessonIds.includes(activeLesson.id) : false;
  const isBookmarked = activeLesson
    ? bookmarks.some((b) => b.lesson_id === activeLesson.id)
    : false;

  const handleToggleComplete = () => {
    if (activeLesson) {
      markLessonCompleted(activeLesson.id);
      setVideoProgress(100);

      // Auto-unlock celebration
      const nextLesson = allLessons[activeLessonIndex + 1];
      if (nextLesson) {
        setUnlockCelebration(`🎉 Lecture Completed! Next module item "${nextLesson.title}" has been unlocked.`);
      } else {
        setUnlockCelebration('🎉 Congratulations! You have completed all lessons in this curriculum!');
      }
      setTimeout(() => setUnlockCelebration(null), 6000);
    }
  };

  const handleSimulateWatch = (pct: number) => {
    setVideoProgress(pct);
    if (pct >= minWatchPercentage && activeLesson) {
      markLessonCompleted(activeLesson.id);
      const nextLesson = allLessons[activeLessonIndex + 1];
      if (nextLesson) {
        setUnlockCelebration(`🎉 Target watch reached (${pct}%)! Next lecture "${nextLesson.title}" is unlocked.`);
      }
      setTimeout(() => setUnlockCelebration(null), 6000);
    }
  };

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !activeLesson) return;
    addNote(activeLesson.id, newNoteText);
    setNewNoteText('');
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let correctCount = 0;
    currentQuizQuestions.forEach((q: any) => {
      const correctOpt = q.options?.find((o: any) => o.is_correct);
      if (correctOpt && quizAnswers[q.id] === correctOpt.id) {
        correctCount++;
      }
    });

    const calculated = Math.round((correctCount / currentQuizQuestions.length) * 100);
    setQuizScore(calculated);
    setQuizSubmitted(true);

    const passingMark = activeLesson?.quiz?.passing_score_percentage || 70;
    if (calculated >= passingMark && activeLesson) {
      markLessonCompleted(activeLesson.id);
      const nextLesson = allLessons[activeLessonIndex + 1];
      if (nextLesson) {
        setUnlockCelebration(`🎉 Quiz Passed with ${calculated}%! Next lecture "${nextLesson.title}" is now unlocked.`);
      } else {
        setUnlockCelebration(`🎉 Quiz Passed with ${calculated}%! You have completed this module!`);
      }
      setTimeout(() => setUnlockCelebration(null), 6000);
    }
  };

  const handleRetryQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remaining = Math.floor(sec % 60);
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  const nextLesson = allLessons[activeLessonIndex + 1];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Toast: Unlock Celebration Banner */}
      {unlockCelebration && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 text-xs font-bold flex items-center justify-between shadow-lg z-30 animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-200" />
            <span>{unlockCelebration}</span>
          </div>
          <button onClick={() => setUnlockCelebration(null)} className="text-emerald-200 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Toast: Locked Notification Banner */}
      {lockedToast && (
        <div className="bg-amber-600 text-white px-4 py-2.5 text-xs font-bold flex items-center justify-between shadow-lg z-30 animate-fadeIn">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-amber-200" />
            <span>{lockedToast}</span>
          </div>
          <button onClick={() => setLockedToast(null)} className="text-amber-200 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Learning Navigation Header */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center space-x-3">
          <Link
            href="/dashboard/courses"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="hidden sm:block border-l border-slate-800 pl-3">
            <span className="text-xs font-bold text-white block line-clamp-1">
              {curriculumData?.course_title || defaultCourse.title}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-slate-400">{activeLesson?.title}</span>
              {isQuizLesson && (
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-bold uppercase">
                  Quiz Arena
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Sequential lock indicator badge */}
          {enforceSequentialWatch && (
            <span className="hidden md:inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-800 border border-slate-700 text-amber-400">
              <Lock className="w-3 h-3 mr-1 text-amber-400" />
              Sequential Watch: {minWatchPercentage}% Required
            </span>
          )}

          {/* Bookmark Button */}
          <button
            onClick={() =>
              activeLesson &&
              toggleBookmark(defaultCourse.id, defaultCourse.title, activeLesson.id, activeLesson.title)
            }
            className={`p-2 rounded-xl text-xs font-semibold flex items-center transition-colors ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            <span className="ml-1.5 hidden md:inline">
              {isBookmarked ? 'Saved' : 'Bookmark'}
            </span>
          </button>

          {/* Mark Complete Button */}
          <button
            onClick={handleToggleComplete}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center transition-colors ${
              isCompleted
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            {isCompleted ? 'Completed' : 'Mark as Complete'}
          </button>

          {/* Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Learning Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left / Center: Player / Quiz Arena & Tabs */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Custom Video Player Canvas OR Quiz Arena OR Locked Screen */}
          {isCurrentLessonLocked ? (
            <div className="relative aspect-video w-full bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800 flex flex-col items-center justify-center p-8 text-center shadow-inner">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/5">
                <Lock className="w-8 h-8 text-amber-400" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
                {isQuizLesson ? 'Quiz Locked' : 'Video Lecture Locked'}
              </h2>
              <p className="text-xs text-slate-400 max-w-md mb-6 leading-relaxed">
                {activeLesson?.is_locked
                  ? 'This item is locked by the instructor.'
                  : `Sequential progression is enabled. You must complete the previous lecture (${minWatchPercentage}%+ watch) before accessing this ${isQuizLesson ? 'quiz' : 'video'}.`}
              </p>
              {activeLessonIndex > 0 && allLessons[activeLessonIndex - 1] && (
                <Link
                  href={`/learn/${courseSlug || defaultCourse.slug}/${allLessons[activeLessonIndex - 1].slug || allLessons[activeLessonIndex - 1].id}`}
                  className="inline-flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold bg-primary-600 hover:bg-primary-500 text-white shadow-lg transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                  Return to Previous Lecture: {allLessons[activeLessonIndex - 1].title}
                </Link>
              )}
            </div>
          ) : isQuizLesson ? (
            /* ========================================================================= */
            /* DEDICATED INTERACTIVE QUIZ ARENA (When Active Lesson is a Quiz) */
            /* ========================================================================= */
            <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800 p-6 md:p-8">
              <div className="max-w-3xl mx-auto space-y-6">
                {/* Quiz Header Banner */}
                <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                      <HelpCircle className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          Module Knowledge Check
                        </span>
                        {isCompleted && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center">
                            <Check className="w-3 h-3 mr-1" /> Completed
                          </span>
                        )}
                      </div>
                      <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
                        {activeLesson?.quiz?.title || activeLesson?.title}
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Answer all {currentQuizQuestions.length} questions. Pass mark is{' '}
                        <span className="text-purple-400 font-bold">
                          {activeLesson?.quiz?.passing_score_percentage || 70}%
                        </span>{' '}
                        to unlock the next video lecture.
                      </p>
                    </div>
                  </div>

                  {quizSubmitted && (
                    <div className="text-right shrink-0">
                      <span className="text-[11px] text-slate-400 block mb-1">Your Score</span>
                      <span
                        className={`text-2xl font-black font-mono ${
                          quizScore >= (activeLesson?.quiz?.passing_score_percentage || 70)
                            ? 'text-emerald-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {quizScore}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Score Alert Banner if Submitted */}
                {quizSubmitted && (
                  <div
                    className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      quizScore >= (activeLesson?.quiz?.passing_score_percentage || 70)
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {quizScore >= (activeLesson?.quiz?.passing_score_percentage || 70) ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-rose-400 shrink-0" />
                      )}
                      <div>
                        <span className="font-bold text-sm block">
                          {quizScore >= (activeLesson?.quiz?.passing_score_percentage || 70)
                            ? 'Congratulations! You Passed the Quiz!'
                            : 'Quiz Not Passed. Minimum passing score is 70%.'}
                        </span>
                        <span className="text-xs opacity-80">
                          {quizScore >= (activeLesson?.quiz?.passing_score_percentage || 70)
                            ? 'Your progress has been recorded and the next lesson is unlocked.'
                            : 'Review the explanations below and retry to unlock the next lesson.'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        type="button"
                        onClick={handleRetryQuiz}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        Retake
                      </button>

                      {nextLesson && quizScore >= (activeLesson?.quiz?.passing_score_percentage || 70) && (
                        <Link
                          href={`/learn/${courseSlug || defaultCourse.slug}/${nextLesson.slug || nextLesson.id}`}
                          className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 flex items-center transition-all"
                        >
                          Next Lecture <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Link>
                      )}
                    </div>
                  </div>
                )}

                {/* Questions Form */}
                <form onSubmit={handleQuizSubmit} className="space-y-5">
                  {currentQuizQuestions.map((q: any, qIdx: number) => {
                    const isAnswered = quizAnswers[q.id] !== undefined;
                    const correctOpt = q.options?.find((o: any) => o.is_correct);

                    return (
                      <div
                        key={q.id}
                        className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-bold text-white flex items-center">
                            <span className="w-6 h-6 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 text-xs font-bold flex items-center justify-center mr-2 shrink-0">
                              {qIdx + 1}
                            </span>
                            {q.question_text}
                          </span>
                        </div>

                        {/* Options List */}
                        <div className="space-y-2">
                          {q.options?.map((opt: any) => {
                            const isSelected = quizAnswers[q.id] === opt.id;
                            const isCorrect = opt.is_correct;

                            let optStyle = 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300';
                            if (quizSubmitted) {
                              if (isCorrect) {
                                optStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500/40 font-semibold';
                              } else if (isSelected && !isCorrect) {
                                optStyle = 'border-rose-500 bg-rose-950/40 text-rose-200 ring-1 ring-rose-500/40';
                              } else {
                                optStyle = 'border-slate-800 bg-slate-900/30 text-slate-500 opacity-60';
                              }
                            } else if (isSelected) {
                              optStyle = 'border-purple-500 bg-purple-950/40 text-purple-200 ring-1 ring-purple-500/40 font-semibold';
                            }

                            return (
                              <label
                                key={opt.id}
                                className={`flex items-center p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${optStyle}`}
                              >
                                <input
                                  type="radio"
                                  name={`quiz-question-${q.id}`}
                                  value={opt.id}
                                  checked={isSelected}
                                  disabled={quizSubmitted}
                                  onChange={() =>
                                    setQuizAnswers({ ...quizAnswers, [q.id]: opt.id })
                                  }
                                  className="mr-3 text-purple-600 focus:ring-0"
                                />
                                <span className="flex-1">{opt.option_text}</span>
                                {quizSubmitted && isCorrect && (
                                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                )}
                                {quizSubmitted && isSelected && !isCorrect && (
                                  <X className="w-4 h-4 text-rose-400 shrink-0" />
                                )}
                              </label>
                            );
                          })}
                        </div>

                        {/* Detailed Explanation if Submitted */}
                        {quizSubmitted && q.explanation && (
                          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-300 flex items-start space-x-2">
                            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-amber-400">Explanation: </strong>
                              {q.explanation}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {!quizSubmitted && (
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-slate-400">
                        Answered: {Object.keys(quizAnswers).length} / {currentQuizQuestions.length}
                      </span>
                      <button
                        type="submit"
                        disabled={Object.keys(quizAnswers).length === 0}
                        className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-lg shadow-purple-600/25 flex items-center transition-all cursor-pointer"
                      >
                        Submit Quiz Answers
                        <ChevronRight className="w-4 h-4 ml-1.5" />
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* VIDEO PLAYER & CONTROLS (When Active Lesson is a Video) */
            /* ========================================================================= */
            <>
              <div className="relative aspect-video w-full bg-black flex items-center justify-center group overflow-hidden">
                <iframe
                  key={activeLesson?.video_url}
                  className="w-full h-full pointer-events-auto"
                  src={getEmbedUrl(activeLesson?.video_url, activeLesson?.provider)}
                  title={activeLesson?.title || 'Course Player'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Interactive Watch Progression Bar */}
              <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                <div className="flex items-center space-x-3">
                  <span className="text-slate-400 font-medium">Watch Progress:</span>
                  <div className="w-40 sm:w-56 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                    <div
                      className={`h-full transition-all duration-300 ${
                        videoProgress >= minWatchPercentage ? 'bg-emerald-500' : 'bg-primary-500'
                      }`}
                      style={{ width: `${Math.min(videoProgress, 100)}%` }}
                    />
                  </div>
                  <span className="font-mono font-bold text-white">{videoProgress}%</span>
                  {videoProgress >= minWatchPercentage && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      ✓ Target Reached (Next Unlocked)
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleSimulateWatch(50)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
                  >
                    +50% Watch
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSimulateWatch(100)}
                    className="px-3 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold flex items-center transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    Finish Video (Auto Unlock Next)
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Bottom Tabs */}
          <div className="bg-slate-900 border-b border-slate-800 px-6 flex items-center space-x-6 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {isQuizLesson ? 'Quiz Objectives' : 'Lesson Overview'}
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`py-3.5 border-b-2 transition-colors flex items-center ${
                activeTab === 'notes'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              Notes ({notes.filter((n) => n.lesson_id === activeLesson?.id).length})
            </button>
            <button
              onClick={() => setActiveTab('ai_assistant')}
              className={`py-3.5 border-b-2 transition-colors flex items-center ${
                activeTab === 'ai_assistant'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              Gemini AI Tutor
            </button>
          </div>

          {/* Tab Content Panel */}
          <div className="p-6 bg-slate-950 flex-1 max-w-4xl">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {activeLesson?.title}
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isQuizLesson
                    ? 'Test your comprehension of the concepts covered in this module. Pass the quiz with 70%+ to unlock subsequent lessons.'
                    : 'In this masterclass lesson, we explore how React 19 and Next.js 15 Server Components compile down to lightweight payloads without unnecessary hydration bundles.'}
                </p>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-xs font-semibold text-slate-300 block">Lesson Resources</span>
                  <div className="flex items-center space-x-3 text-xs">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary-400 hover:underline flex items-center"
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-1" />
                      Download GitHub Source Code
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Timestamped Student Notes System */}
            {activeTab === 'notes' && (
              <div className="space-y-6">
                <form onSubmit={handleAddNoteSubmit} className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Create a note for this lesson</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder="Type your notes or key takeaways..."
                      className="flex-1 px-4 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-primary-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary-600 hover:bg-primary-500 text-white flex items-center shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" />
                      Add Note
                    </button>
                  </div>
                </form>

                <div className="space-y-2.5">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <p className="text-xs text-slate-300">{note.content}</p>
                      </div>

                      <button
                        onClick={() => deleteNote(note.id)}
                        className="p-1 text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gemini AI Course Assistant Panel */}
            {activeTab === 'ai_assistant' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-amber-300 font-semibold">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>SkillHub AI Assistant • Powered by Google Gemini</span>
                  </div>
                  <span className="text-[10px] text-amber-400/80 font-mono">Context: {activeLesson?.title}</span>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-primary-600 text-white ml-8 shadow-sm'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 mr-8 shadow-card'
                      }`}
                    >
                      <span className="text-[10px] font-bold block mb-1 opacity-70">
                        {msg.sender === 'user' ? 'You' : 'Gemini AI Tutor'}
                      </span>
                      <p>{msg.text}</p>
                    </div>
                  ))}
                  {isThinking && (
                    <div className="p-3.5 rounded-2xl bg-slate-900 text-xs text-slate-400 flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                      <span>Gemini is generating response...</span>
                    </div>
                  )}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!aiQuestionInput.trim()) return;
                    sendMessage(aiQuestionInput, activeLesson?.title);
                    setAiQuestionInput('');
                  }}
                  className="flex items-center space-x-2 pt-2"
                >
                  <input
                    type="text"
                    value={aiQuestionInput}
                    onChange={(e) => setAiQuestionInput(e.target.value)}
                    placeholder="Ask Gemini e.g. Explain why Server Components don't bundle into client JS..."
                    className="flex-1 px-4 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center shrink-0"
                  >
                    <Send className="w-3.5 h-3.5 mr-1" />
                    Ask AI
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Right: Collapsible Curriculum Drawer */}
        {isSidebarOpen && (
          <aside className="w-80 lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0 overflow-y-auto">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <span className="font-bold text-xs text-white uppercase tracking-wider">
                Course Curriculum
              </span>
              <button onClick={toggleSidebar} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-slate-800">
              {modules.map((mod: any, modIdx: number) => (
                <div key={mod.id} className="p-3">
                  <span className="text-[11px] font-bold text-slate-400 block mb-2">
                    Module {modIdx + 1}: {mod.title}
                  </span>

                  <div className="space-y-1.5">
                    {mod.lessons.map((les: any) => {
                      const flatIdx = allLessons.findIndex((l: any) => l.id === les.id);
                      const isLesCompleted = completedLessonIds.includes(les.id);
                      const isLesActive = les.id === activeLesson?.id;
                      const locked = isLessonLocked(les, flatIdx);
                      const isLesQuiz =
                        les.type === 'quiz' ||
                        Boolean(les.quiz) ||
                        (!les.video_url && Boolean(les.quiz_questions_count));

                      return (
                        <div key={les.id}>
                          {locked ? (
                            <button
                              type="button"
                              onClick={() => {
                                setLockedToast(
                                  `🔒 "${les.title}" is locked! Complete the previous lecture (${minWatchPercentage}% watch) to unlock.`
                                );
                                setTimeout(() => setLockedToast(null), 4000);
                              }}
                              className="w-full p-2.5 rounded-xl flex items-center justify-between text-xs transition-colors bg-slate-950/40 text-slate-500 hover:bg-slate-800/40 cursor-not-allowed border border-slate-800/50 text-left group"
                            >
                              <div className="flex items-center space-x-2.5 min-w-0">
                                <Lock className="w-3.5 h-3.5 text-amber-500/80 shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="truncate">{les.title}</span>
                              </div>
                              <span className="text-[10px] text-amber-400 font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 shrink-0">
                                Locked
                              </span>
                            </button>
                          ) : (
                            <Link
                              href={`/learn/${courseSlug || defaultCourse.slug}/${les.slug || les.id}`}
                              className={`p-2.5 rounded-xl flex items-center justify-between text-xs transition-colors ${
                                isLesActive
                                  ? isLesQuiz
                                    ? 'bg-purple-700 text-white font-semibold shadow-md shadow-purple-900/30'
                                    : 'bg-primary-600 text-white font-semibold shadow-sm'
                                  : 'hover:bg-slate-800 text-slate-300'
                              }`}
                            >
                              <div className="flex items-center space-x-2.5 min-w-0">
                                {isLesCompleted ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                ) : isLesQuiz ? (
                                  <HelpCircle className="w-4 h-4 text-purple-400 shrink-0" />
                                ) : (
                                  <Play className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                )}
                                <span className="truncate">{les.title}</span>
                                {isLesQuiz ? (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-bold uppercase shrink-0">
                                    Quiz
                                  </span>
                                ) : les.is_free_preview ? (
                                  <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-300 font-bold shrink-0">
                                    Free
                                  </span>
                                ) : null}
                              </div>

                              <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                                {isLesQuiz
                                  ? `${les.quiz_questions_count || les.quiz?.questions?.length || 3} Qs`
                                  : `${les.duration_minutes || 15}m`}
                              </span>
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
