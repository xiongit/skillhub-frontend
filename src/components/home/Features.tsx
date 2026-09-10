import React from 'react';
import { Home, CalendarCheck, RefreshCw, BookOpen, Smartphone, Video } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useLanguageStore } from '../../store/useLanguageStore';
import { dictionary } from '../../locales/dictionary';

export default function Features() {
  const { lang } = useLanguageStore();
  const t = dictionary[lang].features;

  const getIcon = (index: number) => {
    const icons = [
      <Home key={0} className="w-8 h-8 text-blue-500" />,
      <BookOpen key={1} className="w-8 h-8 text-indigo-500" />,
      <Video key={2} className="w-8 h-8 text-emerald-500" />,
      <CalendarCheck key={3} className="w-8 h-8 text-amber-500" />,
      <RefreshCw key={4} className="w-8 h-8 text-purple-500" />,
      <Smartphone key={5} className="w-8 h-8 text-rose-500" />
    ];
    return icons[index];
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  };

  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-slate-50/50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold mb-6 text-sm uppercase tracking-wider"
          >
            Why Choose Us
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6"
          >
            {t.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 font-light"
          >
            {t.subtitle}
          </motion.p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {t.list.map((item, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-200/50 hover:border-blue-100 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Decorative background glow */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700 ease-in-out z-0"></div>
              
              <div className="relative z-10">
                <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm">
                  {getIcon(index)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
