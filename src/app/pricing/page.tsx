'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export default function PricingAndSubscriptionsPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      name: 'Standard Pro',
      priceMonthly: 1499,
      priceAnnual: 1199,
      desc: 'Perfect for students learning at their own pace with full curriculum access.',
      features: [
        'Access to all 140+ courses and bootcamps',
        'Interactive in-browser code quizzes',
        'Official QR-verified graduation certificates',
        'Student community Q&A forum access',
      ],
    },
    {
      name: 'All-Access Ultimate',
      popular: true,
      priceMonthly: 2499,
      priceAnnual: 1899,
      desc: 'Designed for career switchers seeking direct mentor support and job referrals.',
      features: [
        'Everything in Standard Pro',
        '1-on-1 monthly mentorship call (60 mins)',
        'Priority resume review & talent pool referral',
        'Unlimited AI Course Assistant queries (Gemini)',
        'Direct hiring partner introductions',
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-50 text-xs font-semibold text-primary-700">
          <Zap className="w-3.5 h-3.5" />
          <span>SkillHub Pro Membership</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Flexible Pricing for Serious Learners
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Gain unrestricted access to all software engineering bootcamps, certificates, and hiring perks.
        </p>

        {/* Toggle Billing */}
        <div className="inline-flex items-center bg-slate-100 p-1.5 rounded-2xl text-xs font-semibold mt-4">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-xl transition-all ${
              billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center ${
              billingCycle === 'annual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            Annual Billing
            <span className="ml-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Save 25%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => {
          const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
          return (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 bg-white border flex flex-col justify-between relative shadow-card ${
                plan.popular
                  ? 'border-2 border-primary-500 shadow-elevated ring-4 ring-primary-500/10'
                  : 'border-slate-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-[11px] font-bold px-3.5 py-1 rounded-full shadow-md">
                  Most Popular Career Track
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{plan.desc}</p>
                </div>

                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                    ৳{price.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400">/ month ({billingCycle})</span>
                </div>

                <ul className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-700">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href="/checkout"
                  className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center transition-all ${
                    plan.popular
                      ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-md shadow-primary-600/25'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  Choose {plan.name}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
