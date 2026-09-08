'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  Brain,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { aiIntelligenceService } from '../../../services/aiIntelligenceService';
import { AiStudyPlan } from '../../../types';
import { Badge } from '../../../components/common/Badge';

export default function AiPersonalTutorPage() {
  const [studyPlan, setStudyPlan] = useState<AiStudyPlan | null>(null);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  useEffect(() => {
    aiIntelligenceService.getDailyStudyPlan().then(setStudyPlan);
  }, []);

  const toggleTask = (id: number) => {
    if (completedTasks.includes(id)) {
      setCompletedTasks(completedTasks.filter((tId) => tId !== id));
    } else {
      setCompletedTasks([...completedTasks, id]);
    }
  };

  if (!studyPlan) return null;

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
          <Brain className="w-4 h-4" />
          <span>Adaptive Machine Learning Tutor</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Personalized AI Daily Study Plan
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Your personal Gemini AI tutor analyzes your quiz results and learning velocity to build a focused daily curriculum.
        </p>
      </div>

      {/* AI Diagnostic Insight Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-primary-500/10 to-purple-500/10 rounded-3xl p-6 border border-amber-300/40 space-y-3 shadow-card">
        <div className="flex items-center space-x-2 text-xs font-bold text-amber-700">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>AI Diagnostic Assessment</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          "{studyPlan.ai_insight}"
        </p>
        <div className="flex items-center space-x-2 pt-1">
          <Badge variant="warning">Focus Area: {studyPlan.focus_area}</Badge>
          <span className="text-xs text-slate-500 font-semibold">
            • Target: {studyPlan.completion_target_hours} Hours Today
          </span>
        </div>
      </div>

      {/* Today's Adaptive Tasks Checklist */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Recommended Daily Milestones</h2>
          <span className="text-xs font-bold text-primary-600">
            {completedTasks.length} of {studyPlan.tasks.length} Completed
          </span>
        </div>

        <div className="space-y-3">
          {studyPlan.tasks.map((task) => {
            const isDone = completedTasks.includes(task.id);
            return (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  isDone
                    ? 'border-emerald-200 bg-emerald-50/40 opacity-75'
                    : 'border-slate-200 hover:border-primary-400 bg-slate-50/40'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                      isDone ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <div>
                    <span
                      className={`text-xs font-bold block ${
                        isDone ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {task.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      {task.type} • {task.duration}
                    </span>
                  </div>
                </div>

                <Badge variant={task.type === 'quiz' ? 'purple' : task.type === 'practice' ? 'warning' : 'primary'}>
                  {task.type.toUpperCase()}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Launch Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/dashboard/code-review"
          className="p-5 rounded-3xl bg-white border border-slate-200 shadow-card hover:border-primary-500 transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-primary-600 transition-colors">
              Submit Code for AI Review
            </h3>
            <p className="text-xs text-slate-500">Get automated vulnerability scans and clean architecture feedback.</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all ml-3 shrink-0" />
        </Link>

        <Link
          href="/dashboard/mock-interview"
          className="p-5 rounded-3xl bg-white border border-slate-200 shadow-card hover:border-primary-500 transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-primary-600 transition-colors">
              AI Mock Technical Interview
            </h3>
            <p className="text-xs text-slate-500">Practice live technical & behavioral questions with Gemini scoring.</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all ml-3 shrink-0" />
        </Link>
      </div>
    </div>
  );
}
