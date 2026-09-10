'use client';

import React, { useEffect, useState } from 'react';
import {
  Video,
  Calendar,
  Clock,
  Users,
  ExternalLink,
  Plus,
  Play,
} from 'lucide-react';
import { enterpriseService } from '../../../services/enterpriseService';
import { LiveClassSession } from '../../../types';
import { Badge } from '../../../components/common/Badge';

export default function VirtualLiveClassesPage() {
  const [classes, setClasses] = useState<LiveClassSession[]>([]);

  useEffect(() => {
    enterpriseService.getLiveClasses().then(setClasses);
  }, []);

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">
            <Video className="w-4 h-4" />
            <span>Interactive Virtual Classroom</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Live Classes & Hands-on Workshops
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Join live scheduled lectures, live coding clinics, and Q&A sessions with industry mentors via Zoom & Google Meet.
          </p>
        </div>

        <button
          onClick={() => alert('Schedule Live Class Modal')}
          className="px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md shadow-primary-600/20 flex items-center self-start sm:self-center cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Schedule Session
        </button>
      </div>

      {/* Class List */}
      <div className="space-y-4">
        {classes.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Badge variant={c.provider === 'zoom' ? 'primary' : 'purple'}>
                  {c.provider.toUpperCase()} CLASSROOM
                </Badge>
                <span className="text-xs text-slate-500 font-semibold">• {c.course_title}</span>
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{c.scheduled_start_at} ({c.duration_minutes} mins)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">{c.title}</h2>
                <div className="flex items-center space-x-3 text-xs text-slate-500">
                  <span>Instructor: <strong className="text-slate-800">{c.instructor_name}</strong></span>
                  <span>•</span>
                  <span>{c.attendance_count} Students RSVP'd</span>
                </div>
              </div>

              <a
                href={c.meeting_url}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-primary-600/20 flex items-center justify-center shrink-0 self-start sm:self-center"
              >
                <Play className="w-4 h-4 mr-2 fill-white" />
                Join Virtual Class
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
