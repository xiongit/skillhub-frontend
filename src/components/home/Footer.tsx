import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Car } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { dictionary } from '../../locales/dictionary';

export default function Footer() {
  const { lang } = useLanguageStore();
  const t = dictionary[lang].footer;

  return (
    <footer className="bg-slate-950 text-slate-300 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Car className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">Theory Pass Master</span>
            </div>
            <p className="text-slate-400">
              {t.desc}
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">{t.contact}</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <a href="mailto:action@myintensivecourse.com" className="hover:text-blue-400 transition-colors">action@myintensivecourse.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500" />
                <a href="tel:03330147072" className="hover:text-blue-400 transition-colors">0333 014 7072</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                <span>London Driving Center<br/>14 Talbot Road<br/>SA13 1DH</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">{t.legal}</h4>
            <ul className="space-y-3">
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">{t.terms}</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">{t.privacy}</Link></li>
              <li><Link href="/adi-terms" className="hover:text-blue-400 transition-colors">{t.adiTerms}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} {t.rights}</p>
        </div>
      </div>
    </footer>
  );
}
