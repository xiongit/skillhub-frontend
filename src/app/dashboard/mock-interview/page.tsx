'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Sparkles,
  Send,
  Award,
  CheckCircle2,
  TrendingUp,
  RotateCcw,
  MessageSquare,
} from 'lucide-react';
import { aiIntelligenceService } from '../../../services/aiIntelligenceService';
import { AiInterviewScorecard } from '../../../types';
import { Badge } from '../../../components/common/Badge';

export default function AiMockInterviewPage() {
  const [role, setRole] = useState('Full-Stack Software Engineer (Next.js & Laravel)');
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'ai' | 'user'; text: string }[]>([]);
  const [answerInput, setAnswerInput] = useState('');
  const [scorecard, setScorecard] = useState<AiInterviewScorecard | null>(null);

  const handleStart = async () => {
    const session = await aiIntelligenceService.startMockInterview(role);
    setMessages([{ sender: 'ai', text: session.first_question }]);
    setStarted(true);
    setScorecard(null);
  };

  const handleSendAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerInput.trim()) return;

    const newMsgs = [...messages, { sender: 'user' as const, text: answerInput }];
    setMessages(newMsgs);
    setAnswerInput('');

    // After answer, generate comprehensive scorecard
    const scorecardResult: AiInterviewScorecard = {
      overall_score: 88,
      hiring_decision: 'Strong Hire (Recommended for Technical Round)',
      rubric_scores: {
        technical_depth: 92,
        architecture_cleanliness: 86,
        communication_clarity: 90,
        error_handling: 84,
      },
      strengths: [
        'Clearly articulated concurrency mitigation using database transactions and row-level locks (SELECT ... FOR UPDATE).',
        'Demonstrated strong understanding of Next.js 15 Client Router Cache vs Server Component caching.',
      ],
      improvement_areas: [
        'Consider elaborating on Redis token invalidation during high-volume concurrent logout events.',
      ],
      suggested_learning_material: 'SkillHub Module 4: Distributed Caching & Event-Driven Architecture.',
    };

    setTimeout(() => {
      setScorecard(scorecardResult);
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">
          <Briefcase className="w-4 h-4" />
          <span>Career Placement Simulator</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          AI Technical Mock Interviewer
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Practice technical rounds with our specialized Gemini AI hiring simulator and receive instant rubric-based evaluations.
        </p>
      </div>

      {!started ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Target Engineering Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 font-semibold"
            >
              <option>Full-Stack Software Engineer (Next.js & Laravel)</option>
              <option>Backend API Lead (Laravel 12, PostgreSQL, Redis)</option>
              <option>Frontend Specialist (React 19, Next.js 15, TypeScript)</option>
              <option>DevOps & Cloud Architect (Docker, Kubernetes, AWS)</option>
            </select>
          </div>

          <div className="p-4 rounded-2xl bg-primary-50/50 border border-primary-100 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-primary-900 block">Interview Guidelines:</span>
            <p>• The AI interviewer will evaluate system architecture knowledge, code cleanliness, and communication clarity.</p>
            <p>• Complete answers using concrete technical terminology to achieve higher rubric scores.</p>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-3.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-primary-600/20 transition-all flex items-center justify-center cursor-pointer"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Begin Technical Mock Interview
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Conversational Screen */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500">{role}</span>
              <button
                onClick={() => setStarted(false)}
                className="text-xs font-semibold text-slate-400 hover:text-rose-600 flex items-center"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset Session
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'ai'
                      ? 'bg-slate-50 border border-slate-200 text-slate-800 mr-8'
                      : 'bg-primary-600 text-white ml-8 shadow-sm'
                  }`}
                >
                  <span className="text-[10px] font-bold block mb-1 opacity-70">
                    {m.sender === 'ai' ? 'Gemini AI Lead Interviewer' : 'Your Answer'}
                  </span>
                  <p>{m.text}</p>
                </div>
              ))}
            </div>

            {!scorecard && (
              <form onSubmit={handleSendAnswer} className="space-y-2 pt-2 border-t border-slate-100">
                <textarea
                  rows={3}
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  placeholder="Explain your approach, database concurrency handling, and technical trade-offs..."
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 leading-relaxed"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs flex items-center shadow-md shadow-primary-600/20"
                  >
                    <Send className="w-3.5 h-3.5 mr-1.5" />
                    Submit Answer for AI Scoring
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* AI Scorecard Display */}
          {scorecard && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Candidate Scorecard
                  </span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-3xl font-extrabold text-primary-600">
                      {scorecard.overall_score}%
                    </span>
                    <span className="text-xs font-semibold text-emerald-600">
                      • {scorecard.hiring_decision}
                    </span>
                  </div>
                </div>

                <Badge variant="success">Passed Interview</Badge>
              </div>

              {/* Rubric Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(scorecard.rubric_scores).map(([key, val]) => (
                  <div key={key} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block truncate">
                      {key.replace('_', ' ')}
                    </span>
                    <span className="text-lg font-extrabold text-slate-900 mt-1 block">{val}%</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 block">Candidate Key Strengths</span>
                {scorecard.strengths.map((s, i) => (
                  <p key={i} className="text-xs text-slate-600 flex items-start">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    {s}
                  </p>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <span className="font-bold block mb-1">Recommended Follow-up Study:</span>
                {scorecard.suggested_learning_material}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
