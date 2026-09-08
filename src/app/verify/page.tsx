'use client';

import React, { useState } from 'react';
import {
  Award,
  Search,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  ExternalLink,
  QrCode,
  AlertTriangle,
} from 'lucide-react';
import { enterpriseService } from '../../services/enterpriseService';
import { OfficialCertificationVerification } from '../../types';
import { Badge } from '../../components/common/Badge';

export default function UniversalCertificationVerificationPage() {
  const [query, setQuery] = useState('LARAVEL88');
  const [cert, setCert] = useState<OfficialCertificationVerification | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const res = await enterpriseService.verifyCertification(query);
    setCert(res);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Authority Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-primary-100 text-primary-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-primary-600" />
            <span>Official Credential Registry</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            SkillHub Certification Verification Authority
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Instantly verify professional software engineering and cloud credentials issued by SkillHub LMS.
          </p>
        </div>

        {/* Verification Search Bar */}
        <form onSubmit={handleVerify} className="max-w-xl mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Certificate ID (e.g. SKILLHUB-CERT-LARAVEL88)"
              className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:border-primary-500 font-mono font-semibold"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-primary-600/20 transition-all cursor-pointer"
          >
            Verify Credential
          </button>
        </form>

        {/* Verified Certificate Certificate Display */}
        {cert && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-500/30 shadow-2xl space-y-8 relative overflow-hidden">
            {/* Authenticity Watermark Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="space-y-1">
                <Badge variant="success">OFFICIALLY VALID & VERIFIED</Badge>
                <span className="text-xs font-mono text-slate-400 block mt-1">
                  Registry Record: {cert.certificate_id}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200/60 self-start sm:self-auto">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Cryptographically Authentic</span>
              </div>
            </div>

            {/* Recipient & Certification Details */}
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
                Issued To
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {cert.student_name}
              </h2>
              <p className="text-sm font-semibold text-primary-600 pt-1">
                {cert.certification_title}
              </p>
              <span className="text-xs text-slate-500 block">
                {cert.issuing_authority} • <strong className="text-slate-700">{cert.grade}</strong>
              </span>
            </div>

            {/* Verified Skills Matrix */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Proctored Competencies & Verified Skills
              </span>
              <div className="flex flex-wrap gap-2">
                {cert.verified_skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200/60 flex items-center"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Dates & Validity Footer */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Issue Date: <strong className="text-slate-800">{cert.issued_at}</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Expires: <strong className="text-slate-800">{cert.expires_at}</strong> (24-Month Validity)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
