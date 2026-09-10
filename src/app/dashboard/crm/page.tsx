'use client';

import React, { useEffect, useState } from 'react';
import {
  Users,
  Plus,
  Phone,
  Mail,
  MessageSquare,
  Sparkles,
  Search,
  Filter,
} from 'lucide-react';
import { growthService } from '../../../services/growthService';
import { CrmLead } from '../../../types';
import { Badge } from '../../../components/common/Badge';

export default function StudentCrmPipelinePage() {
  const [leads, setLeads] = useState<CrmLead[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    growthService.getLeads().then(setLeads);
  }, []);

  const filteredLeads =
    statusFilter === 'all' ? leads : leads.filter((l) => l.status === statusFilter);

  const getStatusVariant = (status: CrmLead['status']) => {
    switch (status) {
      case 'new_lead':
        return 'primary';
      case 'contacted':
        return 'purple';
      case 'interested':
        return 'warning';
      case 'trial':
        return 'primary';
      case 'purchased':
        return 'success';
      case 'lost':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Student Relationship Management</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Student CRM & Lead Pipeline
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage prospective student inquiries, trial activations, and course enrollment conversions.
          </p>
        </div>

        <button
          onClick={() => alert('New Lead Modal')}
          className="px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md shadow-primary-600/20 flex items-center self-start sm:self-center cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Prospective Lead
        </button>
      </div>

      {/* Stage Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'New Leads', count: 450, status: 'new_lead' },
          { label: 'Contacted', count: 380, status: 'contacted' },
          { label: 'Interested', count: 290, status: 'interested' },
          { label: 'Trial Active', count: 180, status: 'trial' },
          { label: 'Purchased', count: 95, status: 'purchased' },
          { label: 'Lost', count: 25, status: 'lost' },
        ].map((col) => (
          <div
            key={col.status}
            onClick={() => setStatusFilter(col.status)}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
              statusFilter === col.status
                ? 'bg-primary-50 border-primary-400'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <span className="text-[10px] text-slate-400 uppercase font-bold block truncate">{col.label}</span>
            <span className="text-lg font-extrabold text-slate-900 mt-1 block">{col.count}</span>
          </div>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900">Prospect Pipeline</h2>
            <Badge variant="primary">{filteredLeads.length} Showing</Badge>
          </div>

          <button
            onClick={() => setStatusFilter('all')}
            className="text-xs font-semibold text-primary-600 hover:text-primary-700"
          >
            Clear Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-2.5 pr-4">Student Prospect</th>
                <th className="py-2.5 px-3">Interested Course</th>
                <th className="py-2.5 px-3">Lead Score</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Quick Outreach</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td className="py-3.5 pr-4">
                    <span className="font-bold text-slate-900 block">{lead.name}</span>
                    <span className="text-[11px] text-slate-400">{lead.email} {lead.phone ? `• ${lead.phone}` : ''}</span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-700 font-medium">{lead.course_name}</td>
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {lead.lead_score} / 100
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <Badge variant={getStatusVariant(lead.status)}>
                      {lead.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-3 text-right space-x-1">
                    <button
                      onClick={() => alert(`Opening WhatsApp chat with ${lead.phone}`)}
                      className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                      title="WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => alert(`Calling ${lead.phone}`)}
                      className="p-1.5 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100"
                      title="Call"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => alert(`Sending email to ${lead.email}`)}
                      className="p-1.5 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100"
                      title="Email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
