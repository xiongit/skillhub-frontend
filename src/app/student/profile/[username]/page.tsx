'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Award,
  CheckCircle2,
  Github,
  Globe,
  Share2,
  Calendar,
  ExternalLink,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { Badge } from '../../../../components/common/Badge';

export default function PublicStudentPortfolioPage() {
  const params = useParams();
  const username = (params?.username as string) || 'tanvir';

  const student = {
    name: 'Tanvir Hossain',
    username: 'tanvir',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    headline: 'Associate Full-Stack Software Engineer • Next.js 15 & Laravel 12',
    bio: 'Software engineer passionate about building scalable, high-performance web applications and distributed systems. Completed multiple production bootcamps at SkillHub LMS.',
    location: 'Dhaka, Bangladesh',
    skills: [
      { name: 'Next.js 15', level: 'Advanced', verified: true },
      { name: 'React 19', level: 'Advanced', verified: true },
      { name: 'Laravel 12 REST API', level: 'Advanced', verified: true },
      { name: 'PostgreSQL Architecture', level: 'Intermediate', verified: true },
      { name: 'Docker & DevOps', level: 'Intermediate', verified: true },
      { name: 'Tailwind CSS', level: 'Advanced', verified: true },
    ],
    certificates: [
      {
        title: 'Full-Stack Web Development Masterclass',
        serial: 'SKILLHUB-2026-X8921',
        date: 'September 2026',
        uuid: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      },
      {
        title: 'PostgreSQL Database Architecture & Optimization',
        serial: 'SKILLHUB-2026-Z4410',
        date: 'August 2026',
        uuid: '8c2efc5e-4c8e-5cbe-0cee-3c1e8c4eda7e',
      },
    ],
    projects: [
      {
        title: 'SkillHub EdTech SaaS Platform',
        description: 'Complete multi-role online learning platform with bKash/Nagad/Stripe gateways and timed exams.',
        github: 'https://github.com',
        live: 'https://skillhub.test',
        tags: ['Next.js 15', 'Laravel 12', 'PostgreSQL'],
      },
      {
        title: 'Real-Time Financial Ledger & Webhook Processor',
        description: 'High-throughput payment webhook reconciliation engine with idempotent safety.',
        github: 'https://github.com',
        tags: ['Laravel 12', 'Redis', 'PostgreSQL'],
      },
    ],
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('Portfolio link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Portfolio Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-card flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-28 h-28 rounded-3xl object-cover border-4 border-primary-100 shadow-md shrink-0"
          />
          <div className="space-y-2">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <h1 className="text-2xl font-extrabold text-slate-900">{student.name}</h1>
              <Badge variant="success">Verified Graduate</Badge>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-primary-600">{student.headline}</p>
            <p className="text-xs text-slate-600 max-w-xl leading-relaxed">{student.bio}</p>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center shadow-sm shrink-0"
        >
          <Share2 className="w-4 h-4 mr-1.5" />
          Share Portfolio
        </button>
      </div>

      {/* Verified Skills Grid */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="text-base font-bold text-slate-900">SkillHub Verified Competencies</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {student.skills.map((skill) => (
            <div
              key={skill.name}
              className="p-3.5 rounded-2xl border border-primary-100 bg-primary-50/30 flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-xs text-slate-900 block">{skill.name}</span>
                <span className="text-[10px] text-slate-500 font-medium">{skill.level}</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          ))}
        </div>
      </div>

      {/* Verified Certificates Showcase */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-purple-600" />
          <h2 className="text-base font-bold text-slate-900">Authenticated Diplomas</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {student.certificates.map((cert) => (
            <div
              key={cert.serial}
              className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="font-mono text-[10px] font-bold text-amber-600 uppercase tracking-wider block">
                  SERIAL: {cert.serial}
                </span>
                <h3 className="font-bold text-sm text-slate-900 mt-1">{cert.title}</h3>
                <span className="text-xs text-slate-500 block mt-0.5">Awarded {cert.date}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-end">
                <Link
                  href={`/certificate/${cert.uuid}`}
                  className="text-xs font-semibold text-primary-600 hover:underline flex items-center"
                >
                  Inspect Live QR Verification <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Capstone Projects Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">Featured Capstone Projects</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {student.projects.map((project) => (
            <div
              key={project.title}
              className="p-5 rounded-2xl border border-slate-200/80 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-slate-900">{project.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center space-x-3 text-xs">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-700 hover:text-primary-600 font-semibold flex items-center"
                >
                  <Github className="w-3.5 h-3.5 mr-1" /> GitHub
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary-600 hover:underline font-semibold flex items-center"
                  >
                    <Globe className="w-3.5 h-3.5 mr-1" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
