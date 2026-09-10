'use client';

import React from 'react';
import {
  Brain,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Users,
  Activity,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Badge } from '../../../components/common/Badge';

export default function AdminAiAnalyticsDashboard() {
  const metrics = {
    totalTokensUsed: 1428500,
    estimatedCostUsd: 0.285, // Gemini 1.5 Flash efficiency
    totalAiQueries: 4120,
    averageLatencyMs: 420,
    atRiskStudentsCount: 3,
  };

  const atRiskStudents = [
    {
      id: 104,
      name: 'Fahim Shakil',
      course: 'Full-Stack Web Development Masterclass',
      riskScore: 85,
      riskLevel: 'high',
      factors: ['Inactive for 8 days', 'Failed Module 2 Quiz twice'],
    },
    {
      id: 108,
      name: 'Rashedul Karim',
      course: 'PostgreSQL Database Architecture & Optimization',
      riskScore: 72,
      riskLevel: 'high',
      factors: ['Inactive for 6 days', 'Video watch velocity <15% expected'],
    },
    {
      id: 112,
      name: 'Mehedi Hasan',
      course: 'Modern DevOps & Cloud Architect',
      riskScore: 50,
      riskLevel: 'medium',
      factors: ['Missed Lab 1 Assignment deadline'],
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">
          <Brain className="w-4 h-4" />
          <span>Operational Intelligence Console</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          AI Analytics & Dropout Risk Radar
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor Google Gemini token consumption, cost optimization, model latencies, and machine learning student retention signals.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Total AI Queries</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-2xl font-bold text-slate-900">
            {metrics.totalAiQueries.toLocaleString()}
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">+24% this week</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Gemini Token Spend</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-bold text-emerald-600">
            ${metrics.estimatedCostUsd.toFixed(3)} USD
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">1.42M tokens processed</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Average Model Latency</span>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl font-bold text-slate-900">{metrics.averageLatencyMs} ms</span>
          <span className="text-[11px] text-primary-600 font-semibold block mt-1">Gemini 1.5 Flash</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Dropout Risk Signals</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <span className="text-2xl font-bold text-rose-600">{metrics.atRiskStudentsCount} Students</span>
          <span className="text-[11px] text-rose-600 font-semibold block mt-1">Immediate action needed</span>
        </div>
      </div>

      {/* Dropout Risk Matrix Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">High Dropout Risk Radar</h2>
            <p className="text-xs text-slate-500">
              Students identified by the ML predictive model based on login drops and quiz failures.
            </p>
          </div>
          <Badge variant="danger">3 Priority Interventions</Badge>
        </div>

        <div className="divide-y divide-slate-100">
          {atRiskStudents.map((student) => (
            <div key={student.id} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-xs sm:text-sm text-slate-900">{student.name}</span>
                  <Badge variant={student.riskLevel === 'high' ? 'danger' : 'warning'}>
                    {student.riskScore}% Dropout Probability
                  </Badge>
                </div>
                <p className="text-xs text-slate-500">{student.course}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {student.factors.map((factor, i) => (
                    <span key={i} className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded font-semibold border border-rose-100">
                      • {factor}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => alert(`Triggering automated personalized WhatsApp mentor nudge to ${student.name}!`)}
                className="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold shadow-sm shrink-0 self-start sm:self-center"
              >
                Trigger Mentor Nudge
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
