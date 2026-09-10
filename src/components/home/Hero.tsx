import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { CheckCircle2, ArrowRight, ShieldCheck, PlayCircle } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { dictionary } from '../../locales/dictionary';

export default function Hero() {
  const { lang } = useLanguageStore();
  const t = dictionary[lang].hero;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden bg-[#0A0F1C]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-[#0A0F1C] to-[#0A0F1C]"></div>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-medium mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm tracking-wide uppercase">{t.badge}</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
              {t.title1} <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                {t.title2}
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light">
              {t.subtitle}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-5 mb-12">
              <Link href="/courses/london-driving-theory" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full font-bold text-lg transition-all shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:shadow-[0_0_60px_rgba(79,70,229,0.6)] flex items-center justify-center gap-2 transform hover:-translate-y-1">
                {t.bookBtn} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#preview" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-md rounded-full font-bold text-lg transition-all text-center flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5 text-indigo-400" />
                {t.howItWorks}
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8 text-slate-300 font-medium">
              {[t.feat1, t.feat2, t.feat3].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                  <CheckCircle2 className="text-green-400 w-5 h-5 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                  <span className="text-sm">{feat}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, type: 'spring', bounce: 0.3 }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 aspect-[4/3] lg:aspect-[4/4] group">
              <Image 
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop" 
                alt="Driving school steering wheel perspective"
                fill
                className="object-cover object-center group-hover:scale-110 transition-transform duration-1000 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/20 to-transparent"></div>
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl"></div>
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-2xl hidden md:flex items-center gap-4 z-20"
            >
              <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-3 rounded-xl shadow-inner">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-lg tracking-tight">100% Success Rate</p>
                <p className="text-emerald-300 font-medium text-sm">DVSA Approved</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
