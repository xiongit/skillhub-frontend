'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  UploadCloud,
  FileText,
} from 'lucide-react';
import { aiIntelligenceService } from '../../../services/aiIntelligenceService';
import { AiGeneratedCurriculum } from '../../../types';
import { Badge } from '../../../components/common/Badge';

export default function InstructorAiStudioPage() {
  const [topic, setTopic] = useState('Docker, Kubernetes & Production CI/CD');
  const [targetLevel, setTargetLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [curriculum, setCurriculum] = useState<AiGeneratedCurriculum | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    const generated = await aiIntelligenceService.generateCurriculum(topic);
    setCurriculum(generated);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Generative Course Studio</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          AI Course Architect & Curriculum Generator
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Provide a topic prompt and let Gemini AI generate complete syllabus modules, lesson duration estimates, and measurable learning outcomes.
        </p>
      </div>

      {/* Input Prompt Box */}
      <form onSubmit={handleGenerate} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Course Topic / Subject Prompt
            </label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Master Laravel 12 Microservices & Event Sourcing"
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Target Audience Level
            </label>
            <select
              value={targetLevel}
              onChange={(e) => setTargetLevel(e.target.value as any)}
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 font-semibold"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-3.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-primary-600/20 transition-all flex items-center justify-center cursor-pointer disabled:opacity-50"
        >
          {isGenerating ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Complete Syllabus with Gemini AI
            </>
          )}
        </button>
      </form>

      {/* Generated Syllabus Review */}
      {curriculum && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="space-y-1">
              <Badge variant="purple">AI Generated Masterclass</Badge>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">{curriculum.title}</h2>
              <p className="text-xs text-slate-500">{curriculum.headline}</p>
            </div>

            <button
              onClick={() => alert('Curriculum imported into course builder!')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center shrink-0"
            >
              <UploadCloud className="w-4 h-4 mr-1.5" />
              Import into Builder
            </button>
          </div>

          {/* Learning Outcomes */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Measurable Outcomes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {curriculum.learning_outcomes.map((outcome, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Module Syllabus Outline */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Module & Lecture Breakdown
            </h3>
            <div className="space-y-3">
              {curriculum.modules.map((mod, mIdx) => (
                <div key={mIdx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{mod.title}</h4>
                  <div className="pl-3 border-l-2 border-primary-500 space-y-1.5">
                    {mod.lessons.map((lesson, lIdx) => (
                      <div key={lIdx} className="flex items-center justify-between text-xs text-slate-600">
                        <span>{lesson.title}</span>
                        <span className="text-[11px] font-mono text-slate-400 font-semibold">
                          {lesson.duration_minutes} mins
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
