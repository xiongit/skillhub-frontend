'use client';

import React, { useEffect, useState } from 'react';
import {
  ShoppingCart,
  Clock,
  Gift,
  CheckCircle2,
  Send,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  Mail,
} from 'lucide-react';
import { growthService } from '../../../services/growthService';
import { AbandonedCartSummary } from '../../../types';
import { Badge } from '../../../components/common/Badge';

export default function MarketingAutomationDashboardPage() {
  const [stats, setStats] = useState<AbandonedCartSummary | null>(null);

  useEffect(() => {
    growthService.getCartRecoveryStats().then(setStats);
  }, []);

  if (!stats) return null;

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">
          <ShoppingCart className="w-4 h-4" />
          <span>Automated Conversion Sequences</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Abandoned Cart Recovery & Marketing Automation
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Recover dropped checkouts through automated multi-channel sequences: 1-hour nudge + 48-hour promotional coupon.
        </p>
      </div>

      {/* Recovery KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Recovered Revenue</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-extrabold text-emerald-600">
            ৳{stats.total_recovered_revenue_bdt.toLocaleString()}
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">88 checkouts salvaged</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Recovery Rate</span>
            <ArrowUpRight className="w-4 h-4 text-primary-600" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900">
            {stats.recovery_rate_percentage}%
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">Industry avg: 18.2%</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>1-Hour Nudges Dispatched</span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900">{stats.nudges_dispatched}</span>
          <span className="text-[11px] text-purple-600 font-semibold block mt-1">WhatsApp & Email</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>48-Hour Promo Offers</span>
            <Gift className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900">{stats.discounts_offered}</span>
          <span className="text-[11px] text-amber-600 font-semibold block mt-1">Code CART10 (10% off)</span>
        </div>
      </div>

      {/* Active Multi-Channel Automation Sequences */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">Active Automated Workflows</h2>
            <p className="text-xs text-slate-500">Triggered lifecycle messaging powering higher course completion and sales.</p>
          </div>
          <Badge variant="success">All Systems Running</Badge>
        </div>

        <div className="space-y-4">
          {[
            {
              title: 'Checkout Drop-off Recovery (1 Hour Delay)',
              channel: 'WhatsApp + Email',
              trigger: 'Student leaves /checkout with uncompleted payment',
              impact: '32.4% open rate • ৳184,000 recovered',
            },
            {
              title: 'Final Urgency 10% Discount Offer (48 Hours Delay)',
              channel: 'Email (SendGrid) + SMS',
              trigger: 'Cart remains unrecovered after 48 hours',
              impact: '21.8% conversion rate • ৳255,912 recovered',
            },
            {
              title: 'New Student Welcome & Mentor Introduction',
              channel: 'Email',
              trigger: 'Successful course enrollment',
              impact: '82.5% open rate • 0% unsubscribe',
            },
            {
              title: 'Inactive Student Re-engagement (7 Days Inactivity)',
              channel: 'WhatsApp Notification',
              trigger: 'No lesson viewed in 7 days',
              impact: '44.1% reactivation within 48 hours',
            },
          ].map((flow, i) => (
            <div key={i} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900">{flow.title}</h3>
                  <Badge variant="purple">{flow.channel}</Badge>
                </div>
                <p className="text-xs text-slate-500">Trigger: {flow.trigger}</p>
                <span className="text-[11px] font-semibold text-emerald-600 block">{flow.impact}</span>
              </div>

              <button
                onClick={() => alert(`Editing workflow: ${flow.title}`)}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-primary-500 hover:text-primary-600 self-start sm:self-center"
              >
                Configure Rules
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
