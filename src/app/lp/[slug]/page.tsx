'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Users,
  ShieldCheck,
  Star,
  ArrowRight,
  Send,
} from 'lucide-react';
import { Badge } from '../../../components/common/Badge';

export default function PromotionalLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    try {
      await fetch('http://localhost:8000/api/v1/growth/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone }),
      });
    } catch {
      // offline fallback
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-slate-950 text-white py-16 sm:py-24 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-900/60 border border-primary-500/40 text-primary-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-primary-400" />
              <span>Special Cohort Admissions Open</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Become a Production <span className="text-primary-400">Full-Stack Architect</span> in 16 Weeks
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
              Learn Next.js 15, React 19, Laravel 12, and PostgreSQL through hands-on capstone engineering, 1-on-1 mentorship, and job placement assistance.
            </p>

            <div className="flex flex-wrap gap-4 text-xs text-slate-300">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Job Placement Assistance</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Proctored Certification</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Google Gemini AI Tutor</span>
              </div>
            </div>
          </div>

          {/* Lead Capture Box */}
          <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Application Received!</h2>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Our admissions team will contact you via WhatsApp with the cohort syllabus and exclusive discount code.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Reserve Your Seat & Get Syllabus</h2>
                  <p className="text-xs text-slate-500">Fast admissions counseling and scholarship eligibility check.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. tanvir@example.com"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 01711223344"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-primary-600/20 transition-all flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Download Syllabus & Apply for ৳500 Discount
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Social Proof & Features */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-2">
          <Badge variant="purple">Why SkillHub LMS?</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Engineered for Real-World Careers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Clean Production Architecture</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Don't just watch tutorials. Build enterprise apps utilizing Service layers, Repository patterns, Docker containers, and CI/CD pipelines.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">3-Attempt Proctored Exams</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Earn cryptographically verified QR certificates valued by top technology companies and tech recruiters globally.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Integrated AI Mentor Studio</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Get instant 24/7 code reviews, technical mock interview scoring, and personalized study plans powered by Google Gemini AI.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
