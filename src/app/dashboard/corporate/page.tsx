'use client';

import React, { useEffect, useState } from 'react';
import {
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { enterpriseService } from '../../../services/enterpriseService';
import { CorporateOverview } from '../../../types';
import { Badge } from '../../../components/common/Badge';

export default function CorporateTrainingDashboardPage() {
  const [overview, setOverview] = useState<CorporateOverview | null>(null);

  useEffect(() => {
    enterpriseService.getCorporateOverview().then(setOverview);
  }, []);

  if (!overview) return null;

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>B2B Enterprise Academy</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Corporate Team Training & Compliance
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage mandatory employee compliance training, department upskilling, and certification completion rates.
          </p>
        </div>

        <button
          onClick={() => alert('Assign Mandatory Training Modal')}
          className="px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md shadow-primary-600/20 flex items-center self-start sm:self-center cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Assign Mandatory Course
        </button>
      </div>

      {/* Organization KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Overall Compliance Rate</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-extrabold text-emerald-600">
            {overview.overall_compliance_rate}%
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">Audit ready</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Enrolled Employees</span>
            <Users className="w-4 h-4 text-primary-600" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900">
            {overview.active_trainees} <span className="text-xs text-slate-400 font-normal">/ {overview.total_employees}</span>
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">Across 4 departments</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Mandatory Curricula</span>
            <Building2 className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900">
            {overview.mandatory_courses_assigned}
          </span>
          <span className="text-[11px] text-purple-600 font-semibold block mt-1">SOC2 & GDPR active</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Organization Plan</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-xl font-extrabold text-slate-900">Enterprise Plus</span>
          <span className="text-[11px] text-slate-400 block mt-1">Unlimited course licenses</span>
        </div>
      </div>

      {/* Department Compliance Breakdown */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">Department Learning Progress</h2>
            <p className="text-xs text-slate-500">Real-time completion metrics by organizational business unit.</p>
          </div>
          <Badge variant="primary">{overview.organization_name}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {overview.departments.map((dept) => (
            <div
              key={dept.code}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/40 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">{dept.name}</span>
                  <span className="text-[10px] font-mono text-slate-400 font-semibold">{dept.code} • {dept.employees_count} Team Members</span>
                </div>
                <span className={`text-base font-extrabold ${dept.completion_rate >= 90 ? 'text-emerald-600' : 'text-primary-600'}`}>
                  {dept.completion_rate}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${dept.completion_rate >= 90 ? 'bg-emerald-600' : 'bg-primary-600'}`}
                  style={{ width: `${dept.completion_rate}%` }}
                />
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                <span className="truncate pr-2 font-medium">Assigned: {dept.active_course}</span>
                <span className="text-primary-600 font-bold shrink-0 hover:underline cursor-pointer">
                  Team Details &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
