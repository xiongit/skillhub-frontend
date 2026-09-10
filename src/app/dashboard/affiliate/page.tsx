'use client';

import React, { useState } from 'react';
import { DollarSign, Copy, Check, Share2, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Badge } from '../../../components/common/Badge';

export default function AffiliateDashboardPage() {
  const [copied, setCopied] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [bkashNumber, setBkashNumber] = useState('');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const affiliate = {
    code: 'TANVIR2026',
    link: 'https://skillhub.test/courses?ref=TANVIR2026',
    commissionRate: 15,
    totalEarnings: 18500,
    currentBalance: 7200,
    referralsCount: 24,
  };

  const copyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(affiliate.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawSuccess(true);
    setWithdrawalAmount('');
    setBkashNumber('');
    setTimeout(() => setWithdrawSuccess(false), 4000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Affiliate & Partner Program
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Share your referral link with students and earn 15% recurring commission on all course purchases.
        </p>
      </div>

      {/* Referral Link Bar */}
      <div className="bg-gradient-to-r from-primary-900 to-secondary-900 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-elevated">
        <div>
          <span className="text-xs font-bold text-primary-300 uppercase tracking-wider block">
            Your Unique Partner Link
          </span>
          <p className="text-xs text-slate-300 mt-1">
            Whenever a student enrolls through this URL, 15% of the gross sale is credited to your balance instantly.
          </p>
        </div>

        <div className="flex items-center bg-slate-950/70 p-2 rounded-2xl border border-white/10 max-w-xl">
          <input
            type="text"
            readOnly
            value={affiliate.link}
            className="flex-1 px-3 py-1 text-xs sm:text-sm bg-transparent border-none text-white font-mono focus:outline-none truncate"
          />
          <button
            onClick={copyLink}
            className="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold flex items-center shrink-0 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 mr-1 text-emerald-300" /> : <Copy className="w-4 h-4 mr-1" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <span className="text-xs text-slate-500 block mb-1">Available for Withdrawal</span>
          <span className="text-2xl font-extrabold text-emerald-600">৳{affiliate.currentBalance.toLocaleString()}</span>
          <span className="text-[11px] text-slate-400 block mt-1">Min withdrawal: ৳1,000</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <span className="text-xs text-slate-500 block mb-1">Lifetime Commission Earned</span>
          <span className="text-2xl font-extrabold text-slate-900">৳{affiliate.totalEarnings.toLocaleString()}</span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">+৳3,500 this week</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <span className="text-xs text-slate-500 block mb-1">Successful Referrals</span>
          <span className="text-2xl font-extrabold text-slate-900">{affiliate.referralsCount} Students</span>
          <span className="text-[11px] text-primary-600 font-semibold block mt-1">15% Commission Rate</span>
        </div>
      </div>

      {/* Payout Withdrawal Box */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-card space-y-4 max-w-xl">
        <div>
          <h2 className="text-base font-bold text-slate-900">Request bKash Commission Withdrawal</h2>
          <p className="text-xs text-slate-500">Payouts are processed within 24 hours directly to your bKash personal account.</p>
        </div>

        {withdrawSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            Withdrawal request submitted! Your funds will arrive within 24 hours.
          </div>
        )}

        <form onSubmit={handleWithdraw} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">bKash Personal Number</label>
            <input
              type="tel"
              required
              value={bkashNumber}
              onChange={(e) => setBkashNumber(e.target.value)}
              placeholder="017XXXXXXXX"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Withdrawal Amount (BDT)</label>
            <input
              type="number"
              required
              min={1000}
              max={affiliate.currentBalance}
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              placeholder="e.g. 5000"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-primary-500"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold shadow-md shadow-pink-600/20"
          >
            Submit bKash Payout Request
          </button>
        </form>
      </div>
    </div>
  );
}
