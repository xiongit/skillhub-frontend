import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { dictionary } from '../../locales/dictionary';

export default function CourseInfoSection() {
  const { lang } = useLanguageStore();
  const t = dictionary[lang].courseInfo;

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } 
    }
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent opacity-60 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-12 gap-0 shadow-2xl rounded-3xl overflow-hidden border border-slate-200/50 bg-white"
        >
          {/* Left Column - Graphic & Title */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-10 md:p-14 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1964&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-8">
                {t.leftTitle.split(' intensive').map((part, i) => (
                  <React.Fragment key={i}>
                    {i === 1 ? <><br /><span className="text-blue-400">intensive</span>{part}</> : part}
                  </React.Fragment>
                ))}
              </h2>
            </div>
            
            <div className="relative z-10 w-full h-[250px] md:h-[350px] my-6 rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="/images/bd-girl-driving.jpg"
                alt="Bangladeshi girl learning to drive in London"
                fill
                className="object-cover drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="relative z-10 mt-6">
              <div className="w-20 h-2 bg-blue-500 rounded-full mb-6"></div>
              <p className="text-slate-300 font-medium text-lg leading-relaxed">
                Join the highest-rated driving theory preparation program in the UK.
              </p>
            </div>
          </div>

          {/* Right Column - Text & List */}
          <div className="lg:col-span-7 bg-white p-10 md:p-14 lg:p-16 flex flex-col justify-center">
            <motion.h2 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight"
            >
              {t.rightTitle}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-600 text-lg leading-relaxed mb-8"
            >
              {t.desc}
            </motion.p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {t.features.map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (idx * 0.05) }}
                  className="flex items-start bg-slate-50 p-3 rounded-lg border border-slate-100 hover:border-blue-200 transition-colors"
                >
                  <CheckCircle className="flex-shrink-0 w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                  <span className="text-slate-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link 
                href="/courses/london-driving-theory" 
                className="inline-flex items-center justify-center bg-[#FFD147] hover:bg-[#FACC15] text-slate-900 font-bold px-10 py-4 rounded-xl shadow-lg shadow-yellow-500/20 transition-all text-lg tracking-wide hover:-translate-y-1 hover:shadow-yellow-500/40 w-full sm:w-auto"
              >
                {t.bookBtn}
              </Link>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
