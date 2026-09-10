'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Award, ShieldCheck, CheckCircle2, QrCode, Download, ArrowLeft } from 'lucide-react';
import { certificateService } from '../../../services/certificateService';
import { Certificate } from '../../../types';
import { Badge } from '../../../components/common/Badge';

export default function PublicCertificateVerificationPage() {
  const params = useParams();
  const certId = params?.id as string;
  const [cert, setCert] = useState<Certificate | null>(null);

  useEffect(() => {
    if (certId) {
      certificateService.verifyCertificate(certId).then(setCert);
    }
  }, [certId]);

  if (!cert) return null;

  return (
    <div className="min-h-[85vh] py-12 px-4 max-w-3xl mx-auto space-y-8">
      <Link
        href="/"
        className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> SkillHub Home
      </Link>

      {/* Verification Banner */}
      <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
              Cryptographically Verified
            </span>
            <h1 className="text-base sm:text-lg font-extrabold text-emerald-950">
              Official Credential Authenticated
            </h1>
          </div>
        </div>

        <Badge variant="success">Active Record</Badge>
      </div>

      {/* Certificate Frame */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-elevated p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-primary-600 text-white font-bold flex items-center justify-center text-xs">
              SH
            </div>
            <span className="font-bold text-sm text-slate-900">SkillHub LMS Registry</span>
          </div>

          <span className="font-mono text-xs font-bold text-slate-600">
            SERIAL: {cert.certificate_number}
          </span>
        </div>

        <div className="space-y-2 py-4">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block">
            This is to certify that
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {cert.user?.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto pt-2">
            has successfully fulfilled all required curriculum modules, laboratory assignments, and passed the final proctored exam for:
          </p>
          <h3 className="text-base sm:text-lg font-bold text-primary-600 pt-1">
            {cert.course?.title}
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-left text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Issue Date</span>
            <span className="font-semibold text-slate-800">{cert.issued_at}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Verification Code</span>
            <span className="font-mono font-semibold text-slate-800 truncate block">
              {cert.uuid.slice(0, 16)}...
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Graduation Status</span>
            <span className="text-emerald-600 font-bold flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Passed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
