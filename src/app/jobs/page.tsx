'use client';

import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Building2, Send, CheckCircle2 } from 'lucide-react';
import { mockJobPosts } from '../../services/careerService';
import { Badge } from '../../components/common/Badge';

export default function JobBoardPage() {
  const [selectedJob, setSelectedJob] = useState(mockJobPosts[0]);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

  const handleApply = (jobId: number) => {
    setAppliedJobs([...appliedJobs, jobId]);
    alert(`Application submitted to ${selectedJob.company_name}! Your SkillHub verified portfolio was attached.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">
          <Briefcase className="w-4 h-4" />
          <span>Talent Hiring Partner Network</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Tech Jobs & Engineering Internships
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Apply directly to top hiring partners in Bangladesh with your SkillHub verified credentials and project portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Listings (1 col) */}
        <div className="space-y-3">
          {mockJobPosts.map((job) => {
            const isSelected = selectedJob.id === job.id;
            const isApplied = appliedJobs.includes(job.id);
            return (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`p-5 rounded-3xl border cursor-pointer transition-all shadow-card ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50/40 shadow-soft'
                    : 'border-slate-200/80 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 flex items-center">
                    <Building2 className="w-3.5 h-3.5 mr-1" />
                    {job.company_name}
                  </span>
                  <Badge variant={job.type === 'internship' ? 'purple' : 'primary'}>
                    {job.type.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>

                <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{job.title}</h3>

                <div className="flex items-center space-x-3 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                  <span className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    {job.location}
                  </span>
                  <span>•</span>
                  <span className="font-semibold text-emerald-600">{job.salary_range}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Job Details (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xs text-slate-500">{selectedJob.company_name}</span>
                <Badge variant="success">Verified Hiring Partner</Badge>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{selectedJob.title}</h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                <span>Location: {selectedJob.location}</span>
                <span>•</span>
                <span>Compensation: <strong className="text-emerald-700">{selectedJob.salary_range}</strong></span>
              </div>
            </div>

            <button
              onClick={() => handleApply(selectedJob.id)}
              disabled={appliedJobs.includes(selectedJob.id)}
              className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md shadow-primary-600/20 transition-all flex items-center shrink-0 disabled:bg-emerald-600 cursor-pointer"
            >
              {appliedJobs.includes(selectedJob.id) ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  Application Sent
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-1.5" />
                  1-Click Apply with Portfolio
                </>
              )}
            </button>
          </div>

          {/* Job Requirements */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900">Candidate Qualifications</h3>
            <ul className="space-y-2 list-disc list-inside text-xs text-slate-600 leading-relaxed">
              {selectedJob.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
