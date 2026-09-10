import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Theory Pass Master - London Driving Theory Course',
  description:
    'Pass your driving theory test first time with our guaranteed pass intensive course in London.',
  keywords: 'driving theory, intensive course, London, theory test, guaranteed pass',
  openGraph: {
    title: 'Theory Pass Master - Guaranteed Pass',
    description: 'Pass your theory test first time with our premium structured 21-day training course.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-50 antialiased selection:bg-blue-500/30">
        <Providers>
          <main className="flex-1 w-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
