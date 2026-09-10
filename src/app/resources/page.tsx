'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/home/Navbar';
import Footer from '../../components/home/Footer';
import { useLanguageStore } from '../../store/useLanguageStore';
import {
  BookOpen,
  Car,
  AlertTriangle,
  Smartphone,
  Gauge,
  Siren,
  CheckCircle2,
  ExternalLink,
  PhoneCall,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Compass,
  FileText,
  Clock,
  Check,
  X,
  Phone,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface ResourceItem {
  id: string;
  category: 'guide' | 'signs' | 'app' | 'safety' | 'exam';
  title_en: string;
  title_bn: string;
  tag_en: string;
  tag_bn: string;
  desc_en: string;
  desc_bn: string;
  link: string;
  isExternal: boolean;
  image: string;
  icon: any;
  bulletPoints_en: string[];
  bulletPoints_bn: string[];
}

const resourcesData: ResourceItem[] = [
  {
    id: 'highway-code',
    category: 'guide',
    title_en: 'The Highway Code',
    title_bn: 'দ্য হাইওয়ে কোড (The Highway Code)',
    tag_en: 'Essential DVSA Bible',
    tag_bn: 'অফিসিয়াল বাধ্যতামূলক গাইড',
    desc_en:
      'Considered the bible for all road users and the ultimate source for all 700+ DVSA multiple choice questions.',
    desc_bn:
      'যুক্তরাজ্যের সকল সড়ক ব্যবহারকারীদের জন্য অলিখিত সংবিধান এবং ডিভিএসএ পরীক্ষার সকল মাল্টিপল চয়েস প্রশ্নের মূল উৎস।',
    link: 'https://www.gov.uk/guidance/the-highway-code',
    isExternal: true,
    image: '/images/traffic-light.png',
    icon: BookOpen,
    bulletPoints_en: [
      'Rules for pedestrians, cyclists & motorists',
      'Dual carriageway and motorway regulations',
      'Right of way, roundabouts & junctions',
      'Vehicle maintenance & safety equipment',
    ],
    bulletPoints_bn: [
      'পথচারী, সাইকেল ও গাড়ি চালকদের নিয়মাবলী',
      'ডুয়াল ক্যারেজওয়ে এবং মোটরওয়ের আইন',
      'রাউন্ডঅ্যাবাউট ও মোড়ে অগ্রাধিকারের নিয়ম',
      'গাড়ির রক্ষণাবেক্ষণ ও নিরাপত্তা চেকলিস্ট',
    ],
  },
  {
    id: 'traffic-signs',
    category: 'signs',
    title_en: 'Know Your Traffic Signs',
    title_bn: 'ট্রাফিক সাইন জানুন (Traffic Signs)',
    tag_en: 'Visual Road Markings',
    tag_bn: 'রোড সাইন ও দিকনির্দেশনা',
    desc_en:
      'Confused between a red border triangle and a circle? Not anymore! Master all road signs, orders, and speed limit rules.',
    desc_bn:
      'লাল বর্ডারের ত্রিভুজ আর বৃত্তের মধ্যে দ্বিধাদ্বন্দ্ব? ত্রিভুজ মানে সতর্কবার্তা এবং বৃত্ত মানে বাধ্যতামূলক আদেশ—সব সাইন সহজে শিখুন।',
    link: 'https://www.gov.uk/government/publications/know-your-traffic-signs',
    isExternal: true,
    image: '/images/stop-sign.png',
    icon: AlertTriangle,
    bulletPoints_en: [
      'Red Circles = What you MUST NOT do',
      'Blue Circles = Mandatory positive instructions',
      'Triangles = Hazard & road warnings ahead',
      'Rectangles = Directional and information signs',
    ],
    bulletPoints_bn: [
      'লাল বৃত্ত = যা করা সম্পূর্ণ নিষেধ (Must Not)',
      'নীল বৃত্ত = বাধ্যতামূলক ইতিবাচক নির্দেশ',
      'ত্রিভুজ = সামনের রাস্তার বিপদ বা সতর্কবার্তা',
      'আয়তাকার = তথ্য ও দিকনির্দেশক সাইন',
    ],
  },
  {
    id: 'practice-app',
    category: 'app',
    title_en: 'Go to Theory Practice App',
    title_bn: 'থিওরি প্র্যাকটিস অ্যাপ (Practice App)',
    tag_en: 'Official Question Banks',
    tag_bn: 'মক টেস্ট ও হাজার্ড পারসেপশন',
    desc_en:
      'Here you can answer multiple choice questions and practice hazard perception CGI video clips until you are a master!',
    desc_bn:
      'এখানে আপনি অফিসিয়াল ডিভিএসএ প্রশ্ন ও ৩৪টির বেশি সিজিআই হাজার্ড পারসেপশন ভিডিও টেস্ট মাস্টার না হওয়া পর্যন্ত প্র্যাকটিস করতে পারবেন।',
    link: '/courses',
    isExternal: false,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    icon: Smartphone,
    bulletPoints_en: [
      'Full DVSA licensed question revision bank',
      '34+ Official CGI Hazard Perception clips',
      'Unlimited timed mock examination arena',
      'Detailed analytical explanations for mistakes',
    ],
    bulletPoints_bn: [
      'সম্পূর্ণ লাইসেন্সকৃত ডিভিএসএ প্রশ্নব্যাংক',
      '৩৪টির বেশি অফিসিয়াল CGI হ্যাজার্ড পারসেপশন ক্লিপ',
      'সীমাহীন সময়ভিত্তিক মক টেস্ট সিমুলেটর',
      'ভুল উত্তরের বিস্তারিত বাংলা ও ইংরেজি ব্যাখ্যা',
    ],
  },
  {
    id: 'stopping-distances',
    category: 'safety',
    title_en: 'Stopping Distances Guide',
    title_bn: 'স্টপিং ও ব্রেকিং ডিস্ট্যান্স (Stopping Distance)',
    tag_en: 'Critical Safety Math',
    tag_bn: 'জরুরি থামার দূরত্বের হিসাব',
    desc_en:
      'Thinking Distance + Braking Distance = Overall Stopping Distance. Learn the calculations for dry, wet (2x), and icy (10x) roads.',
    desc_bn:
      'চিন্তা করার দূরত্ব + ব্রেক ধরার দূরত্ব = মোট স্টপিং ডিস্ট্যান্স। স্বাভাবিক, বৃষ্টিতে দ্বিগুণ (2x) এবং বরফে ১০ গুণ (10x) দূরত্ব শিখুন।',
    link: 'https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158',
    isExternal: true,
    image: '/images/brake-warning.png',
    icon: Gauge,
    bulletPoints_en: [
      '20 mph = 12m (40 ft) total stopping distance',
      '30 mph = 23m (75 ft) total stopping distance',
      '50 mph = 53m (175 ft) total stopping distance',
      '70 mph = 96m (315 ft) total stopping distance',
    ],
    bulletPoints_bn: [
      '২০ মাইল/ঘণ্টা = ১২ মিটার (৪০ ফুট) মোট দূরত্ব',
      '৩০ মাইল/ঘণ্টা = ২৩ মিটার (৭৫ ফুট) মোট দূরত্ব',
      '৫০ মাইল/ঘণ্টা = ৫৩ মিটার (১৭৫ ফুট) মোট দূরত্ব',
      '৭০ মাইল/ঘণ্টা = ৯৬ মিটার (৩১৫ ফুট) মোট দূরত্ব',
    ],
  },
  {
    id: 'blue-light-aware',
    category: 'safety',
    title_en: 'Blue Light Aware Protocol',
    title_bn: 'ব্লু লাইট জরুরি গাড়ি প্রটোকল (Blue Light Aware)',
    tag_en: 'Emergency Response Rules',
    tag_bn: 'জরুরি অ্যাম্বুলেন্স ও পুলিশ প্রটোকল',
    desc_en:
      'Learn how to safely give way to emergency vehicles (police, ambulance, fire) without breaking laws or running red lights.',
    desc_bn:
      'ট্রাফিক আইন না ভেঙে বা লাল বাতি ক্রস না করে কীভাবে পেছনের জরুরি সাইরেনযুক্ত অ্যাম্বুলেন্স বা পুলিশকে নিরাপদে পথ দিতে হয় তা জানুন।',
    link: 'https://www.bluelightaware.org.uk/',
    isExternal: true,
    image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=800&q=80',
    icon: Siren,
    bulletPoints_en: [
      'Do NOT drive through red traffic lights or into bus lanes',
      'Stay calm, look for safe spots to pull in & indicate',
      'Avoid braking harshly on roundabouts or blind bends',
      'Wait until the emergency vehicle is completely clear',
    ],
    bulletPoints_bn: [
      'কখনই লাল ট্রাফিক বাতি অতিক্রম করবেন না বা বাস লেনে ঢুকবেন না',
      'শান্ত থাকুন, নিরাপদে দাঁড়ানোর জায়গা দেখে ইন্ডিকেটর দিন',
      'রাউন্ডঅ্যাবাউট বা বাঁকে হুট করে জোরে ব্রেক করবেন না',
      'জরুরি যান পুরোপুরি চলে যাওয়া পর্যন্ত অপেক্ষা করুন',
    ],
  },
  {
    id: 'guide-to-success',
    category: 'exam',
    title_en: 'Your Guide to Success',
    title_bn: 'টেস্ট ডে সাকসেস চেকলিস্ট (Guide to Success)',
    tag_en: 'Official Exam Checklist',
    tag_bn: 'পরীক্ষার দিনের প্রস্তুতি',
    desc_en:
      'Step-by-step checklist of what to bring on your test day, required photocard provisional license, and test room procedure.',
    desc_bn:
      'পরীক্ষার দিন সাথে কী কী নিতে হবে, ফটোকার্ড প্রভিশনাল লাইসেন্স, লকার পলিসি এবং টেস্ট রুমে বসার পূর্ণাঙ্গ নির্দেশিকা।',
    link: '/courses/intensive-theory-masterclass',
    isExternal: false,
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&q=80',
    icon: CheckCircle2,
    bulletPoints_en: [
      'Must bring valid UK photocard provisional driving licence',
      'Arrive 15 minutes before scheduled exam slot',
      '50 Multiple Choice Questions (43 out of 50 to pass)',
      '14 Hazard Perception clips (44 out of 75 to pass)',
    ],
    bulletPoints_bn: [
      'বাধ্যতামূলকভাবে মূল UK ফটো প্রভিশনাল লাইসেন্স সাথে রাখুন',
      'পরীক্ষার নির্ধারিত সময়ের অন্তত ১৫ মিনিট পূর্বে উপস্থিত হোন',
      '৫০টি বহুনির্বাচনী প্রশ্ন (পাস মার্ক ৫০-এ ৪৩)',
      '১৪টি হাজার্ড পারসেপশন ক্লিপ (পাস মার্ক ৭৫-এ ৪৪)',
    ],
  },
];

export default function ResourcesPage() {
  const { lang } = useLanguageStore();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showCallbackModal, setShowCallbackModal] = useState<boolean>(false);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackTime, setCallbackTime] = useState('Today (Afternoon)');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  const filteredResources =
    activeFilter === 'all'
      ? resourcesData
      : resourcesData.filter((item) => item.category === activeFilter);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackSubmitted(true);
    setTimeout(() => {
      setShowCallbackModal(false);
      setCallbackSubmitted(false);
      setCallbackName('');
      setCallbackPhone('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-500/30">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        {/* ========================================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-20 max-w-7xl mx-auto text-center overflow-hidden">
          {/* Subtle glowing ambient lights */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-wide uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>
                {lang === 'bn'
                  ? 'অফিসিয়াল ড্রাইভিং থিওরি রিভিশন পিট স্টপ'
                  : 'Official Driving Theory Revision Pit Stop'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {lang === 'bn'
                ? 'ধৈর্য ধরুন — আপনি সাফল্যের দ্বারপ্রান্তে! আপনি কি প্রস্তুত?'
                : "Steady on — you're about to access success! Are you sure you are ready?"}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {lang === 'bn'
                ? 'থিওরি টেস্টের সকল গুরুত্বপূর্ণ অফিশিয়াল ম্যাটেরিয়াল, রোড সাইন ও প্রিপারেশনের জন্য এই পেজটি আপনার ওয়ান-স্টপ গাইড।'
                : 'Think of this page as your pit stop for all things theory test prep. Essential guides, road sign breakdown, stopping distance math, and exam day rules.'}
            </p>

            {/* Category Filter Pills */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
              {[
                { id: 'all', label_en: 'All Resources', label_bn: 'সকল রিসোর্স' },
                { id: 'guide', label_en: 'The Highway Code', label_bn: 'হাইওয়ে কোড' },
                { id: 'signs', label_en: 'Traffic Signs', label_bn: 'রোড সাইন' },
                { id: 'app', label_en: 'Practice App & Mocks', label_bn: 'প্র্যাকটিস অ্যাপ' },
                { id: 'safety', label_en: 'Stopping & Blue Light', label_bn: 'সেফটি ও ব্রেকিং' },
                { id: 'exam', label_en: 'Test Day Checklist', label_bn: 'পরীক্ষার প্রস্তুতি' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setActiveFilter(pill.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeFilter === pill.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {lang === 'bn' ? pill.label_bn : pill.label_en}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MAIN RESOURCE CARDS GRID */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="group bg-slate-900/90 rounded-3xl border border-slate-800/90 overflow-hidden hover:border-blue-500/50 transition-all duration-300 flex flex-col shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
                >
                  {/* Card Visual Image Banner */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title_en}
                      className={`w-full h-full ${
                        item.image.includes('traffic-light') || item.image.includes('stop-sign') || item.image.includes('brake-warning')
                          ? 'object-contain p-2 bg-[#283574]'
                          : 'object-cover'
                      } object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100`}
                    />
                    <div className={`absolute inset-0 ${item.image.includes('traffic-light') || item.image.includes('stop-sign') || item.image.includes('brake-warning') ? 'bg-gradient-to-t from-slate-900/60 via-transparent to-transparent' : 'bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent'}`} />

                    {/* Tag Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-950/80 backdrop-blur-md text-blue-400 border border-blue-500/30 shadow-md">
                        {lang === 'bn' ? item.tag_bn : item.tag_en}
                      </span>
                    </div>

                    {/* Icon Accent */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">
                        {lang === 'bn' ? item.title_bn : item.title_en}
                      </h3>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        {lang === 'bn' ? item.desc_bn : item.desc_en}
                      </p>

                      {/* Bullet Highlights */}
                      <ul className="space-y-2 pt-2 border-t border-slate-800/80">
                        {(lang === 'bn' ? item.bulletPoints_bn : item.bulletPoints_en).map(
                          (pt, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{pt}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Action Link / Button */}
                    <div className="pt-4 border-t border-slate-800">
                      {item.isExternal ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center transition-all shadow-md shadow-blue-600/20 group-hover:shadow-blue-600/40"
                        >
                          <span>{lang === 'bn' ? 'অফিশিয়াল গাইড দেখুন (Go)' : 'Go to Official Guide'}</span>
                          <ExternalLink className="w-3.5 h-3.5 ml-2" />
                        </a>
                      ) : (
                        <Link
                          href={item.link}
                          className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center transition-all shadow-md shadow-blue-600/20 group-hover:shadow-blue-600/40"
                        >
                          <span>{lang === 'bn' ? 'প্রবেশ করুন (Go)' : 'Access Resource'}</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-2" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* DUAL DECISION CTA: "NOT READY?" vs "READY?" */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* NOT READY BOX */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/30 p-8 sm:p-10 flex flex-col justify-between shadow-2xl">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'bn' ? 'পরামর্শ প্রয়োজন?' : 'Need 1-on-1 Guidance?'}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {lang === 'bn' ? 'এখনও পুরোপুরি প্রস্তুত নন?' : 'Not Ready Yet?'}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {lang === 'bn'
                    ? 'কোন সমস্যা নেই! আমাদের অভিজ্ঞ কোর্স কোঅর্ডিনেটরের সাথে ফ্রি কল শিডিউল করুন। আপনার জন্য সঠিক স্টাডি প্ল্যান আমরা তৈরি করে দেব।'
                    : 'Schedule a call with one of our expert London course coordinators! We will assess your level, recommend revision schedules, and walk you through every step.'}
                </p>

                <div className="pt-2 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-amber-400" />
                    <span>{lang === 'bn' ? 'ফ্রি ১৫ মিনিটের এক্সপার্ট কনসালটেশন' : 'Free 15-minute 1-on-1 consultation'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-amber-400" />
                    <span>{lang === 'bn' ? 'বাংলা ও ইংরেজি উভয় ভাষায় পরামর্শের সুবিধা' : 'Available in both English and Bengali'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-amber-400" />
                    <span>{lang === 'bn' ? 'ডাইরেক্ট সাপোর্ট লাইন: 0333 014 7072' : 'Direct helpline: 0333 014 7072'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => setShowCallbackModal(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 mr-2 text-slate-950" />
                  {lang === 'bn' ? 'কল ব্যাক শিডিউল করুন' : 'Schedule Call Back'}
                </button>

                <a
                  href="tel:03330147072"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center transition-colors border border-slate-700"
                >
                  <Phone className="w-4 h-4 mr-2 text-blue-400" />
                  0333 014 7072
                </a>
              </div>
            </div>

            {/* READY BOX */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-900 border border-blue-500/40 p-8 sm:p-10 flex flex-col justify-between shadow-2xl">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>{lang === 'bn' ? 'গ্যারান্টিড পাস কোর্স' : 'Guaranteed Pass Service'}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {lang === 'bn' ? 'সম্পূর্ণ প্রস্তুত?' : 'Ready to Pass?'}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {lang === 'bn'
                    ? 'অনলাইনে আজই ভর্তি হোন এবং প্রথমবারেই পাস করার গ্যারান্টি নিন। যদি আপনি প্রথমবারে পাস না করেন, আমরা পরবর্তী সকল রি-সিট ফি দেব!'
                    : "I'm ready to book online — let's do this! Enroll in our intensive 21-day structured course with pre-booked DVSA test date and unlimited free resits."}
                </p>

                <div className="pt-2 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'bn' ? 'সীমাহীন ফ্রি রি-সিট (আনলিমিটেড)' : 'Unlimited free resits until you pass'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'bn' ? 'লোকাল ডিভিএসএ টেস্ট ডেট বুকিং অন্তর্ভুক্ত' : 'Pre-booked local DVSA test appointment'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'bn' ? 'লাইভ অনলাইন ক্লাস ও ১-টু-১ রিকভারি সেশন' : 'Live instructor classes & 1-to-1 recovery'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href="/courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-lg shadow-blue-600/30 group"
                >
                  <span>{lang === 'bn' ? 'কনফিডেন্সের সাথে বুক করুন' : 'Book With Confidence'}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PRACTICAL DRIVING TUITION BANNER */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-8 md:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-[11px] font-bold tracking-wider text-blue-400 uppercase">
                  {lang === 'bn' ? 'ব্যবহারিক ড্রাইভিং ট্রেনিং' : 'Practical Intensive Driving Tuition'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {lang === 'bn'
                    ? 'গাড়ি চালানো শিখতে চান? সরাসরি প্র্যাক্টিক্যাল কোর্স!'
                    : 'Need to Learn to Drive? Intensive Practical Courses'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {lang === 'bn'
                    ? 'লন্ডন এবং আশপাশের এলাকায় আমাদের অভিজ্ঞ ডিভিএসএ অনুমোদিত প্রশিক্ষকদের সাথে দ্রুত ও আত্মবিশ্বাসের সাথে ব্যবহারিক ড্রাইভিং শিখুন।'
                    : 'From beginner to test-ready in as little as 1-2 weeks. Fast-track practical driving tests, fully dual-controlled modern cars, and DVSA approved instructors.'}
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <a
                    href="tel:03330147072"
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center border border-slate-700"
                  >
                    <Phone className="w-3.5 h-3.5 mr-2 text-blue-400" />
                    {lang === 'bn' ? 'কল করুন: 0333 014 7072' : 'Call 0333 014 7072'}
                  </a>
                  <a
                    href="mailto:action@myintensivecourse.com"
                    className="px-5 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 font-semibold text-xs flex items-center border border-blue-500/30"
                  >
                    <Mail className="w-3.5 h-3.5 mr-2 text-blue-400" />
                    action@myintensivecourse.com
                  </a>
                </div>
              </div>

              <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80"
                  alt="Practical Driving Tuition"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-xs text-white">
                    <span className="font-bold block">London Driving Center</span>
                    <span className="text-slate-300">14 Talbot Road, Port Talbot, SA13 1DH</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* CALLBACK MODAL */}
      {/* ========================================================================= */}
      {showCallbackModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {lang === 'bn' ? 'কল ব্যাক রিকোয়েস্ট' : 'Request a Callback'}
                </h3>
              </div>
              <button
                onClick={() => setShowCallbackModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {callbackSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white">
                  {lang === 'bn' ? 'অনুরোধ সফলভাবে পাঠানো হয়েছে!' : 'Callback Scheduled!'}
                </h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  {lang === 'bn'
                    ? 'আমাদের কোর্স কোঅর্ডিনেটর খুব শীঘ্রই আপনার নম্বরে কল করবেন।'
                    : 'One of our expert coordinators will call you back at your preferred time.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {lang === 'bn' ? 'আপনার নাম' : 'Your Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={callbackName}
                    onChange={(e) => setCallbackName(e.target.value)}
                    placeholder="e.g. Tanvir Rahman"
                    className="w-full px-3.5 py-2.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {lang === 'bn' ? 'ফোন নম্বর' : 'UK Phone Number'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    placeholder="07123 456789"
                    className="w-full px-3.5 py-2.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {lang === 'bn' ? 'পছন্দের সময়' : 'Preferred Callback Time'}
                  </label>
                  <select
                    value={callbackTime}
                    onChange={(e) => setCallbackTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                  >
                    <option value="Today (Morning 9am - 12pm)">Today (Morning 9am - 12pm)</option>
                    <option value="Today (Afternoon 12pm - 5pm)">Today (Afternoon 12pm - 5pm)</option>
                    <option value="Today (Evening 5pm - 8pm)">Today (Evening 5pm - 8pm)</option>
                    <option value="Tomorrow (Anytime)">Tomorrow (Anytime)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center transition-all shadow-md shadow-amber-500/20 cursor-pointer mt-2"
                >
                  <PhoneCall className="w-4 h-4 mr-2" />
                  {lang === 'bn' ? 'অনুরোধ জমা দিন' : 'Confirm Callback Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
