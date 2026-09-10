'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Save, Camera, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';

export default function StudentProfilePage() {
  const { user, setAuth, token } = useAuthStore();
  const [name, setName] = useState(user?.name || 'Tanvir Hossain');
  const [headline, setHeadline] = useState(user?.headline || 'Aspiring Full-Stack Software Engineer');
  const [bio, setBio] = useState(
    user?.bio || 'Passionate about React, Next.js, and clean Laravel API architecture.'
  );
  const [skills, setSkills] = useState(['Next.js 15', 'React 19', 'Laravel 12', 'PostgreSQL', 'Tailwind CSS']);
  const [newSkill, setNewSkill] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && token) {
      setAuth({ ...user, name, headline, bio }, token);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Student Profile & Portfolio
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your student identity, verified skills, and career portfolio.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center">
          <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
          Profile updated successfully!
        </div>
      )}

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-card space-y-6">
        {/* Avatar Upload */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
              alt={user?.name || 'Student'}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-primary-200"
            />
            <button
              onClick={() => alert('Photo upload dialog')}
              className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-primary-600 text-white shadow-sm hover:bg-primary-500"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">{name}</h3>
            <span className="text-xs text-slate-400">{user?.email}</span>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">About Me / Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 leading-relaxed"
            />
          </div>

          {/* Skills Portfolio Tags */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700">Verified Technical Skills</label>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-semibold bg-primary-50 text-primary-700 border border-primary-200"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-1.5 text-primary-400 hover:text-rose-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-2 pt-1 max-w-xs">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add skill (e.g. Docker)..."
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold"
              >
                Add
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold text-xs shadow-md shadow-primary-600/20 transition-all flex items-center cursor-pointer"
            >
              <Save className="w-4 h-4 mr-1.5" />
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
