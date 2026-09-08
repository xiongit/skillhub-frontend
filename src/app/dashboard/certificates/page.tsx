'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Award, Download, ExternalLink, QrCode, ShieldCheck } from 'lucide-react';
import { certificateService } from '../../../services/certificateService';
import { Certificate } from '../../../types';
import { Badge } from '../../../components/common/Badge';

export default function MyCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    certificateService.getMyCertificates().then(setCertificates);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          My Earned Credentials & Certificates
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Share your verifiable certificates on LinkedIn, CV, and with global employers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden p-6 space-y-4 flex flex-col justify-between"
          >
            {/* Certificate Preview Card */}
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-primary-950 border-2 border-amber-400/40 p-5 text-center text-white flex flex-col justify-between shadow-md">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-amber-400">SKILLHUB DIPLOMA</span>
                <Award className="w-5 h-5 text-amber-400" />
              </div>

              <div>
                <span className="text-[9px] text-slate-400 uppercase tracking-widest block">
                  Certificate of Completion
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">{cert.user?.name}</h4>
                <p className="text-[10px] text-slate-300 mt-0.5 line-clamp-1">
                  {cert.course?.title}
                </p>
              </div>

              <div className="flex items-center justify-between text-[8px] text-slate-400 pt-2 border-t border-slate-800">
                <span>Issued: {cert.issued_at}</span>
                <span className="font-mono text-amber-300">{cert.certificate_number}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-800">
                  {cert.certificate_number}
                </span>
                <Badge variant="success">Verified Active</Badge>
              </div>
              <p className="text-xs font-semibold text-slate-900 line-clamp-1">
                {cert.course?.title}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
              <button
                onClick={() => alert(`Downloading high-res PDF for ${cert.certificate_number}`)}
                className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center transition-colors"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Download PDF
              </button>

              <Link
                href={`/certificate/${cert.uuid}`}
                className="flex-1 py-2 rounded-xl bg-primary-50 hover:bg-primary-100 text-primary-700 text-xs font-semibold flex items-center justify-center transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                Public QR Link
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
