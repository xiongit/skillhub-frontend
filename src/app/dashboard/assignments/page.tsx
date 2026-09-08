'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Clock, Upload, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { assignmentService, mockAssignments, mockSubmissions } from '../../../services/assignmentService';
import { Assignment, AssignmentSubmission } from '../../../types';
import { Badge } from '../../../components/common/Badge';

export default function StudentAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(mockSubmissions);
  const [activeAssignment, setActiveAssignment] = useState<Assignment>(mockAssignments[0]);
  const [submissionText, setSubmissionText] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [successNotice, setSuccessNotice] = useState(false);

  const existingSubmission = submissions.find((s) => s.assignment_id === activeAssignment.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSub = await assignmentService.submitAssignment(activeAssignment.id, submissionText, [
      githubUrl,
      liveUrl,
    ]);
    setSubmissions([newSub, ...submissions.filter((s) => s.assignment_id !== activeAssignment.id)]);
    setSuccessNotice(true);
    setTimeout(() => setSuccessNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Practical Course Assignments
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Submit laboratory code repositories, projects, and receive personalized evaluation from mentors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assignments List */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-card space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Assigned Tasks</span>
          <div className="space-y-2">
            {assignments.map((assignment) => {
              const sub = submissions.find((s) => s.assignment_id === assignment.id);
              const isSelected = activeAssignment.id === assignment.id;
              return (
                <div
                  key={assignment.id}
                  onClick={() => setActiveAssignment(assignment)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50/40'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-slate-500">Marks: {assignment.total_marks}</span>
                    <Badge variant={sub?.status === 'evaluated' ? 'success' : sub ? 'primary' : 'warning'}>
                      {sub?.status === 'evaluated' ? 'Graded' : sub ? 'Submitted' : 'Pending'}
                    </Badge>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{assignment.title}</h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submission Details & Form */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-card space-y-6">
          <div className="space-y-2 pb-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <Badge variant="primary">Pass Mark: {activeAssignment.pass_marks}%</Badge>
              <span className="text-xs text-slate-500 flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Deadline: {activeAssignment.deadline_at ? new Date(activeAssignment.deadline_at).toLocaleDateString() : 'No Limit'}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">{activeAssignment.title}</h2>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {activeAssignment.instruction}
            </p>
          </div>

          {/* Feedback section if evaluated */}
          {existingSubmission?.status === 'evaluated' && (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-emerald-900 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" />
                  Evaluated by Instructor
                </span>
                <span className="text-sm font-extrabold text-emerald-800">
                  {existingSubmission.marks_awarded} / {activeAssignment.total_marks} Marks
                </span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Feedback: "{existingSubmission.feedback}"
              </p>
            </div>
          )}

          {successNotice && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" />
              Assignment submitted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                GitHub Repository URL
              </label>
              <input
                type="url"
                required
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/project-repo"
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Live Deployment URL (Optional)
              </label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://my-app.vercel.app"
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Submission Notes & Architecture Explanation
              </label>
              <textarea
                rows={4}
                required
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                placeholder="Explain your approach, libraries used, and how to run your code..."
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold shadow-md shadow-primary-600/20 flex items-center"
            >
              <Upload className="w-4 h-4 mr-1.5" />
              {existingSubmission ? 'Resubmit Assignment' : 'Submit Assignment for Grading'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
