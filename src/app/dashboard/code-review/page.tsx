'use client';

import React, { useState } from 'react';
import {
  Code2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Zap,
} from 'lucide-react';
import { aiIntelligenceService } from '../../../services/aiIntelligenceService';
import { AiCodeReviewResult } from '../../../types';
import { Badge } from '../../../components/common/Badge';

export default function AiCodeReviewPage() {
  const [code, setCode] = useState(
    `// Paste your Laravel Controller or React Component here\npublic function store(Request $request)\n{\n    $user = User::create($request->all());\n    return response()->json($user);\n}`
  );
  const [language, setLanguage] = useState<'php' | 'typescript' | 'javascript' | 'sql'>('php');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AiCodeReviewResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleReview = async () => {
    setIsAnalyzing(true);
    const review = await aiIntelligenceService.reviewCode(code, language);
    setResult(review);
    setIsAnalyzing(false);
  };

  const copyRefactored = () => {
    if (result && typeof window !== 'undefined') {
      navigator.clipboard.writeText(result.refactored_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">
          <Code2 className="w-4 h-4" />
          <span>Automated Code Intelligence</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          AI Code Reviewer & Security Scanner
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Submit laboratory code snippets for instant static analysis, vulnerability detection, and clean architecture recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Input Canvas */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Source Code Input
              </span>

              {/* Language Selector */}
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
                {(['php', 'typescript', 'javascript', 'sql'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                      language === lang ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={14}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-4 font-mono text-xs bg-slate-950 text-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 border border-slate-800 leading-relaxed"
            />
          </div>

          <button
            onClick={handleReview}
            disabled={isAnalyzing}
            className="w-full py-3.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md shadow-primary-600/20 transition-all flex items-center justify-center cursor-pointer disabled:opacity-50"
          >
            {isAnalyzing ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze Code with Gemini AI
              </>
            )}
          </button>
        </div>

        {/* AI Analysis Report */}
        <div className="space-y-4">
          {result ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                    Code Quality Score
                  </span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-3xl font-extrabold text-emerald-600">{result.score}</span>
                    <span className="text-xs text-slate-400">/ 10.0</span>
                  </div>
                </div>

                <Badge variant={result.score >= 8 ? 'success' : 'warning'}>
                  {result.score >= 8 ? 'Production Ready' : 'Refactor Needed'}
                </Badge>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{result.summary}</p>

              {/* Security Vulnerabilities */}
              {result.vulnerabilities.length > 0 && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1.5">
                  <span className="text-xs font-bold text-rose-900 flex items-center">
                    <AlertTriangle className="w-3.5 h-3.5 mr-1.5 text-rose-600" />
                    Security & Input Notice
                  </span>
                  {result.vulnerabilities.map((v, i) => (
                    <p key={i} className="text-[11px] text-rose-800 leading-relaxed">
                      • {v}
                    </p>
                  ))}
                </div>
              )}

              {/* Clean Architecture Suggestions */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 block">
                  Recommended Refactoring Points
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {result.suggestions.map((s, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary-600 mr-2 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Refactored Code Block */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Refactored Idiomatic Code</span>
                  <button
                    onClick={copyRefactored}
                    className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                    {copied ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto leading-relaxed">
                  {result.refactored_code}
                </pre>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-card text-center space-y-3 h-full flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Awaiting Code Submission</h3>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Click "Analyze Code with Gemini AI" to inspect runtime safety, potential SQL injections, and idiomatic clean patterns.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
