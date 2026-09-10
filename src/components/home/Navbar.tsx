import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Car, Globe } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { dictionary } from '../../locales/dictionary';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, toggleLanguage } = useLanguageStore();
  const t = dictionary[lang].nav;

  const navLinks = [
    { name: t.home, href: '/' },
    { name: t.courses, href: '/courses' },
    { name: t.resources, href: '#resources' },
    { name: t.byTopic, href: '#topics' },
  ];

  return (
    <nav className="fixed w-full bg-slate-900/95 backdrop-blur-sm z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Car className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">Theory Pass Master</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-slate-300 hover:text-blue-400 font-medium transition-colors">
                {link.name}
              </Link>
            ))}
            
            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border border-slate-700"
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'EN' : 'BN'}
            </button>

            <Link href="/login" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-semibold transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              {t.login}
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-slate-300 bg-slate-800 px-2 py-1 rounded-full text-xs font-medium"
            >
              <Globe className="w-3 h-3" />
              {lang === 'en' ? 'EN' : 'BN'}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white">
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md">
                {link.name}
              </Link>
            ))}
            <Link href="/login" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-blue-400 hover:text-blue-300 hover:bg-slate-800 rounded-md">
              {t.login}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
