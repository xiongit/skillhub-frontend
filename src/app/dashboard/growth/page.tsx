'use client';

import React, { useEffect, useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Users,
  Repeat,
  Target,
  ArrowDownRight,
  ArrowUpRight,
  Filter,
  Layers,
} from 'lucide-react';
import { growthService } from '../../../services/growthService';
import { BiExecutiveMetrics, CohortItem, SalesFunnelMetrics } from '../../../types';
import { Badge } from '../../../components/common/Badge';

export default function GrowthAndBiDashboardPage() {
  const [metrics, setMetrics] = useState<BiExecutiveMetrics | null>(null);
  const [funnel, setFunnel] = useState<SalesFunnelMetrics | null>(null);
  const [cohorts, setCohorts] = useState<CohortItem[]>([]);

  useEffect(() => {
    growthService.getBiKpis().then(setMetrics);
    growthService.getFunnelMetrics().then(setFunnel);
    growthService.getCohorts().then(setCohorts);
  }, []);

  if (!metrics || !funnel) return null;

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">
          <TrendingUp className="w-4 h-4" />
          <span>Executive Business Intelligence</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          SaaS Growth & Cohort Retention Radar
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor Monthly Recurring Revenue (MRR), Customer Lifetime Value (LTV), Acquisition Cost (CAC), and Cohort Retention.
        </p>
      </div>

      {/* SaaS Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Monthly Recurring Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900">৳{(metrics.mrr / 1000000).toFixed(2)}M</span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1 flex items-center">
            <ArrowUpRight className="w-3 h-3 mr-0.5" /> +18.4% MoM (ARR: ৳{(metrics.arr / 1000000).toFixed(1)}M)
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Customer Lifetime Value (LTV)</span>
            <Target className="w-4 h-4 text-primary-600" />
          </div>
          <span className="text-2xl font-extrabold text-primary-600">৳{metrics.customer_lifetime_value_ltv.toLocaleString()}</span>
          <span className="text-[11px] text-slate-500 block mt-1">CAC: ৳{metrics.customer_acquisition_cost_cac.toLocaleString()} ({metrics.ltv_to_cac_ratio}x ratio)</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Active Subscribers</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900">{metrics.active_subscribers.toLocaleString()}</span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">ARPU: ৳{metrics.arpu.toLocaleString()} / mo</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Monthly Churn Rate</span>
            <Repeat className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900">{metrics.monthly_churn_rate_percentage}%</span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">NRR: {metrics.net_revenue_retention_nrr}%</span>
        </div>
      </div>

      {/* 6-Stage Sales Funnel Visualization */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">Student Acquisition Sales Funnel</h2>
            <p className="text-xs text-slate-500">Overall visitor-to-paid conversion rate: <strong className="text-primary-600 font-bold">{funnel.overall_visitor_to_purchase_rate}%</strong></p>
          </div>
          <Badge variant="success">৳{(funnel.gross_funnel_revenue / 1000000).toFixed(2)}M Gross Sales</Badge>
        </div>

        <div className="space-y-3">
          {funnel.stages.map((stage, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">{stage.stage}</span>
                <div className="space-x-3 text-slate-500">
                  <span className="font-semibold text-slate-900">{stage.count.toLocaleString()} students</span>
                  <span>({stage.percentage_of_top}% of visitors)</span>
                  {stage.drop_off_percentage > 0 && (
                    <span className="text-rose-600 font-semibold">-{stage.drop_off_percentage}% drop</span>
                  )}
                </div>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-primary-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${stage.percentage_of_top}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6-Month Cohort Retention Heatmap */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">Cohort Retention Heatmap (Monthly Active Learning)</h2>
            <p className="text-xs text-slate-500">Percentage of students remaining active and renewing subscriptions in subsequent months.</p>
          </div>
          <Badge variant="primary">Benchmark: &gt;50% Month 6</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-2 pr-4">Cohort</th>
                <th className="py-2 px-3">Size</th>
                <th className="py-2 px-3">Month 0</th>
                <th className="py-2 px-3">Month 1</th>
                <th className="py-2 px-3">Month 2</th>
                <th className="py-2 px-3">Month 3</th>
                <th className="py-2 px-3">Month 4</th>
                <th className="py-2 px-3">Month 5</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cohorts.map((row) => (
                <tr key={row.cohort}>
                  <td className="py-3 pr-4 font-mono font-bold text-slate-900">{row.cohort}</td>
                  <td className="py-3 px-3 font-semibold text-slate-600">{row.size}</td>
                  {row.retention.map((val, i) => (
                    <td key={i} className="py-3 px-3">
                      <span
                        className={`px-2.5 py-1 rounded-lg font-mono font-bold text-[11px] inline-block ${
                          val >= 80
                            ? 'bg-emerald-100 text-emerald-800'
                            : val >= 60
                            ? 'bg-emerald-50 text-emerald-700'
                            : val >= 50
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {val}%
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
