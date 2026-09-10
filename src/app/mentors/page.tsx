'use client';

import React, { useState } from 'react';
import { Calendar, Clock, DollarSign, Star, CheckCircle2, Video, ArrowRight } from 'lucide-react';
import { mockMentors } from '../../services/careerService';
import { Badge } from '../../components/common/Badge';

export default function MentorsPage() {
  const [selectedMentor, setSelectedMentor] = useState(mockMentors[0]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBook = () => {
    if (!selectedSlot) return;
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setSelectedSlot(null);
    }, 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          1-on-1 Engineering Mentorship
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Book live private video sessions with industry leads for code architecture reviews, mock interviews, and career guidance.
        </p>
      </div>

      {bookingConfirmed && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center border border-emerald-200">
          <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-600" />
          Mentorship session booked! Google Meet link has been sent to your student email.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <img
                  src={mentor.avatar_url}
                  alt={mentor.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-primary-200 shrink-0"
                />
                <div>
                  <h3 className="font-bold text-base text-slate-900">{mentor.name}</h3>
                  <p className="text-xs font-semibold text-primary-600">{mentor.headline}</p>
                  <span className="text-xs font-extrabold text-emerald-600 block mt-1">
                    ৳{mentor.hourly_rate.toLocaleString()} / 60-min session
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{mentor.bio}</p>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Available Calendar Slots
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {mentor.available_slots.map((slot) => {
                    const isSelected = selectedSlot === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedSlot(slot.id)}
                        className={`p-2.5 rounded-xl border text-xs font-mono font-semibold transition-all ${
                          isSelected
                            ? 'border-primary-500 bg-primary-50 text-primary-900 ring-2 ring-primary-500/20'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        {slot.start_time.split(' ')[0]} • {slot.start_time.split(' ')[1]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              onClick={handleBook}
              disabled={!selectedSlot}
              className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md shadow-primary-600/20 transition-all disabled:opacity-40 flex items-center justify-center cursor-pointer"
            >
              <Video className="w-4 h-4 mr-2" />
              Book 1-on-1 Session with {mentor.name.split(' ')[0]}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
