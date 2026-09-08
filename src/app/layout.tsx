import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { MobileBottomNav } from '../components/common/MobileBottomNav';

export const metadata: Metadata = {
  title: 'SkillHub LMS - Master In-Demand Tech Skills in Bangla',
  description:
    'Join over 50,000 students learning Full-Stack Web Development, Clean Laravel Architecture, PostgreSQL Database Engineering, and Modern DevOps.',
  keywords: 'LMS, EdTech, Next.js, Laravel, Bangladesh, Coding Bootcamp, Ostad alternative',
  openGraph: {
    title: 'SkillHub LMS - Professional Online Learning Platform',
    description: 'Master in-demand software engineering skills with live projects and QR-verified certificates.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased pb-16 md:pb-0">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileBottomNav />
        </Providers>
      </body>
    </html>
  );
}
