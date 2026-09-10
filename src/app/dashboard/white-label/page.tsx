'use client';

import React, { useState } from 'react';
import {
  Palette,
  Globe,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  Eye,
  Building,
} from 'lucide-react';
import { Badge } from '../../../components/common/Badge';

export default function WhiteLabelStudioPage() {
  const [brandTitle, setBrandTitle] = useState('Acme Corporate University');
  const [subdomain, setSubdomain] = useState('acme');
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [accentColor, setAccentColor] = useState('#8b5cf6');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">
          <Palette className="w-4 h-4" />
          <span>SaaS Multi-Tenancy & Custom Branding</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          White-Label Academy Studio
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure custom domains, corporate brand colors, email senders, and logos to run your own branded online university.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customization Form */}
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Academy Title / Brand Name
            </label>
            <input
              type="text"
              required
              value={brandTitle}
              onChange={(e) => setBrandTitle(e.target.value)}
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tenant Subdomain
            </label>
            <div className="flex items-center">
              <input
                type="text"
                required
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-l-xl focus:outline-none focus:border-primary-500 font-mono font-bold"
              />
              <span className="px-3 py-2.5 bg-slate-100 border-y border-r border-slate-200 text-xs text-slate-500 font-mono rounded-r-xl font-bold">
                .skillhub.com
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Brand Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-9 h-9 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                />
                <span className="font-mono text-xs font-bold text-slate-700">{primaryColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Accent Highlight Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-9 h-9 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                />
                <span className="font-mono text-xs font-bold text-slate-700">{accentColor}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-primary-600/20 transition-all flex items-center justify-center cursor-pointer"
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Branding Updated & Deployed!
              </>
            ) : (
              'Save & Deploy White-Label Branding'
            )}
          </button>
        </form>

        {/* Live White-Label Mockup Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Live Tenant Preview
            </span>
            <span className="text-xs text-primary-600 font-mono font-bold">
              https://{subdomain}.skillhub.com
            </span>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl space-y-4">
            {/* Branded Header Mockup */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black"
                  style={{ backgroundColor: primaryColor }}
                >
                  {brandTitle.charAt(0)}
                </div>
                <span className="font-extrabold text-xs text-slate-900">{brandTitle}</span>
              </div>
              <Badge variant="primary">Powered by SkillHub</Badge>
            </div>

            {/* Branded Banner Mockup */}
            <div
              className="p-6 rounded-2xl text-white space-y-2"
              style={{
                background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`,
              }}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                Corporate Learning Portal
              </span>
              <h3 className="font-bold text-sm sm:text-base">
                Welcome to {brandTitle}
              </h3>
              <p className="text-[11px] opacity-90 leading-relaxed">
                Access your assigned mandatory compliance certifications and engineering masterclasses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
