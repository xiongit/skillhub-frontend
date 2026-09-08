'use client';

import React, { useEffect, useState } from 'react';
import {
  LifeBuoy,
  Plus,
  Clock,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Send,
  MessageSquare,
} from 'lucide-react';
import { growthService } from '../../../services/growthService';
import { SupportTicketItem } from '../../../types';
import { Badge } from '../../../components/common/Badge';

export default function CustomerSupportDeskPage() {
  const [tickets, setTickets] = useState<SupportTicketItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('technical');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');

  useEffect(() => {
    growthService.getSupportTickets().then(setTickets);
  }, []);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    const newTicket: SupportTicketItem = {
      id: Date.now(),
      ticket_number: 'TCK-' + Math.floor(10000 + Math.random() * 90000),
      subject,
      category,
      priority,
      status: 'open',
      ai_suggested_reply:
        'Thank you for reporting this issue. Our support team has logged your inquiry regarding ' +
        category +
        ' and will follow up within our 2-hour SLA window.',
      created_at: 'Just now',
    };

    setTickets([newTicket, ...tickets]);
    setShowModal(false);
    setSubject('');
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">
            <LifeBuoy className="w-4 h-4" />
            <span>Customer Service Operations</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Customer Support Desk & SLA Tracker
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Open help tickets for billing, video playback, certificates, and access issues with guaranteed 2-hour SLA turnaround.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md shadow-primary-600/20 flex items-center self-start sm:self-center cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Create Support Ticket
        </button>
      </div>

      {/* Ticket List */}
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold text-slate-400">
                  {ticket.ticket_number}
                </span>
                <Badge variant={ticket.status === 'resolved' ? 'success' : 'primary'}>
                  {ticket.status.toUpperCase()}
                </Badge>
                <Badge variant={ticket.priority === 'urgent' ? 'danger' : 'warning'}>
                  {ticket.priority.toUpperCase()} PRIORITY
                </Badge>
              </div>

              <span className="text-xs text-slate-400 font-semibold">{ticket.created_at}</span>
            </div>

            <h2 className="text-base font-bold text-slate-900">{ticket.subject}</h2>

            {/* AI Auto-Resolution Advice */}
            {ticket.ai_suggested_reply && (
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/60 text-xs text-purple-900 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-purple-800">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>AI Immediate Triage Solution:</span>
                </div>
                <p className="leading-relaxed">{ticket.ai_suggested_reply}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Ticket Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl max-w-lg w-full space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Open Support Ticket</h2>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Issue Subject
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. bKash payment completed but course locked"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="billing">Billing & Payment</option>
                    <option value="technical">Technical / Video Playback</option>
                    <option value="course_access">Course Access</option>
                    <option value="certificate">Certificate & QR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md shadow-primary-600/20"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
