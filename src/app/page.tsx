'use client';

import React from 'react';
import Navbar from '../components/home/Navbar';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Footer from '../components/home/Footer';
import CourseInfoSection from '../components/home/CourseInfoSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />
      
      <main>
        <Hero />
        <CourseInfoSection />
        <Features />
      </main>
      
      <Footer />
    </div>
  );
}
