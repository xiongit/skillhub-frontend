'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Bell,
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Pin,
  Tag,
  Share2,
  Check,
  X,
  BookOpen,
  GraduationCap,
  Car,
  ChevronRight,
  ShieldAlert,
  Award,
} from 'lucide-react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

export interface BlogPostItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
  image_url: string;
  is_pinned: boolean;
  views_count: number;
  reading_time: string;
  created_at: string;
}

const fallbackInitialArticles: BlogPostItem[] = [
  {
    id: 1,
    title: 'DVSA Driving Theory Test 2026: Key Changes & Updated Pass Marks',
    slug: 'dvsa-driving-theory-test-2026-key-changes',
    category: 'DVSA Announcements',
    author: 'Theory Pass Master Editorial',
    excerpt: 'Everything you need to know about the latest DVSA computer test interface updates, video hazard perception clips, and the 43/50 pass requirement.',
    content: `## New DVSA Computer Test Revisions for 2026

The Driver and Vehicle Standards Agency (DVSA) has updated the computerized driving theory test curriculum to reflect modern highway conditions, smart motorways, and electric vehicle handling.

### What Has Changed?
1. **CGI Hazard Perception Clips**: High-definition computer-generated video clips replacing older low-resolution footage.
2. **Smart Motorway Scenarios**: Greater emphasis on red 'X' lane indicators, emergency refuge areas, and variable speed limits.
3. **Electric & Hybrid Vehicle Safety**: Silent pedestrian hazards, regenerative braking awareness, and charging station protocol.

### Test Structure Breakdown
- **Multiple Choice Questions**: 50 questions in 57 minutes (Pass mark: 43 out of 50 / 86%).
- **Hazard Perception**: 14 video clips with 15 developing hazards (Pass mark: 44 out of 75 / 59%).

> **Expert Advice**: Practice using our interactive Theory Pass Master mock test simulator before booking your official test to ensure guaranteed first-time success.`,
    image_url: '/images/bd-girl-driving.jpg',
    is_pinned: true,
    views_count: 1420,
    reading_time: '4 min read',
    created_at: '2026-09-08T10:00:00Z',
  },
  {
    id: 2,
    title: 'Top 10 Road Signs That Confuse New UK Drivers (And How to Memorize Them)',
    slug: 'top-10-confusing-road-signs-uk',
    category: 'Theory Test Rules',
    author: 'Senior Instructor David Miller',
    excerpt: 'Learn the quick rule of thumb for triangular, circular, and rectangular signs that will score you instant marks on test day.',
    content: `## The Simple Rule of Road Signs

Many students fail their theory test because they mix up road sign shapes and colors under exam pressure. Here is the golden rule used by professional driving instructors:

- **Triangles** give **WARNINGS** (e.g., sharp bend ahead, crossroads, pedestrians).
- **Circles** give **ORDERS** (e.g., speed limits, no entry, turn left).
  - Red circles: What you **MUST NOT** do.
  - Blue circles: Positive instructions (what you **MUST** do).
- **Rectangles** give **INFORMATION** (e.g., lane guidance, hospital signs, route numbers).

### The Top 3 Most Failed Signs:
1. **No Vehicles Except Bicycles Being Pushed** (Empty red circle with white interior).
2. **Clearway / No Stopping** (Red cross on a blue circle).
3. **Priority Over Oncoming Vehicles** (White arrow forward with smaller red arrow beside it on a blue square).

Mastering these simple visual distinctions gives you an instant confidence boost during the official exam!`,
    image_url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    is_pinned: false,
    views_count: 980,
    reading_time: '5 min read',
    created_at: '2026-09-05T14:30:00Z',
  },
  {
    id: 3,
    title: 'Hazard Perception: The 3-Click Technique to Avoid "Zero Score" Flags',
    slug: 'hazard-perception-3-click-technique',
    category: 'Driving Tips',
    author: 'Theory Pass Master Team',
    excerpt: 'Avoid the dreaded anti-cheat detection algorithm while maximizing your chances of hitting the 5-point scoring window.',
    content: `## The Scoring Window Explained

In the Hazard Perception test, each developing hazard starts scoring 5 points as soon as it begins to develop, gradually dropping to 4, 3, 2, 1, and 0.

### The Common Mistake: Clicking Too Early or Rapidly
If you click repeatedly in a rhythmic pattern, the DVSA anti-cheating mechanism triggers and awards **0 points** for the entire clip.

### The Recommended 3-Click Strategy:
1. **First Click**: When you spot the potential hazard (e.g., a car waiting at a junction or a pedestrian looking to cross).
2. **Second Click**: One second later when the hazard begins to develop (e.g., the car edges out or the pedestrian steps off the curb).
3. **Third Click**: One second after that to ensure you caught the scoring window even if your first click was fractionally early.

This safe cadence ensures you hit the 5 or 4-point window without triggering the cheating detector.`,
    image_url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80',
    is_pinned: false,
    views_count: 1830,
    reading_time: '3 min read',
    created_at: '2026-08-28T09:15:00Z',
  },
  {
    id: 4,
    title: 'UK Stopping Distances Made Easy: The Simple Math Formula',
    slug: 'uk-stopping-distances-easy-math',
    category: 'Highway Code',
    author: 'Sarah Jenkins (DVSA Approved)',
    excerpt: 'Forget memorizing raw numbers! Use the simple multiplication multiplier to calculate stopping distances for any speed in seconds.',
    content: `## Stopping Distance Formula: Thinking Distance + Braking Distance

Stopping distance questions frequently trip up candidates. Here is the easiest mental math trick starting from 20 mph:

- Multiply speed by factors starting at **2** and increasing by **0.5** for each 10 mph jump:
  - **20 mph**: 20 × 2 = **40 feet** (12 meters)
  - **30 mph**: 30 × 2.5 = **75 feet** (23 meters)
  - **40 mph**: 40 × 3 = **120 feet** (36 meters)
  - **50 mph**: 50 × 3.5 = **175 feet** (53 meters)
  - **60 mph**: 60 × 4 = **240 feet** (73 meters)
  - **70 mph**: 70 × 4.5 = **315 feet** (96 meters)

### Wet Weather Factor
Always remember: In **wet weather**, stopping distances **DOUBLE** (×2). In **icy weather**, stopping distances increase by up to **TEN TIMES** (×10)!

Memorize this quick multiplier and you will never get a stopping distance question wrong again.`,
    image_url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
    is_pinned: false,
    views_count: 2140,
    reading_time: '4 min read',
    created_at: '2026-08-20T11:00:00Z',
  },
];

function UpdatesContent() {
  const searchParams = useSearchParams();
  const requestedId = searchParams.get('id');

  const [articles, setArticles] = useState<BlogPostItem[]>(fallbackInitialArticles);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPostItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Fetch live articles from API or localStorage
  const loadArticles = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/posts');
      if (res.ok) {
        const json = await res.json();
        if (json?.data && json.data.length > 0) {
          setArticles(json.data);
          localStorage.setItem('skillmaster_blog_posts', JSON.stringify(json.data));
          return;
        }
      }
    } catch (err) {
      console.warn('Could not fetch from backend, checking localStorage:', err);
    }

    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('skillmaster_blog_posts');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setArticles(parsed);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  useEffect(() => {
    loadArticles();

    const handleSync = () => loadArticles();
    window.addEventListener('storage', handleSync);
    window.addEventListener('blog-updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('blog-updated', handleSync);
    };
  }, []);

  // Handle URL id query
  useEffect(() => {
    if (requestedId && articles.length > 0) {
      const found = articles.find((a) => String(a.id) === requestedId);
      if (found) setActiveArticle(found);
    }
  }, [requestedId, articles]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return ['All', ...Array.from(set)];
  }, [articles]);

  // Filtered list
  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchesCategory =
        selectedCategory === 'All' || a.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Pinned / Featured post
  const pinnedPost = articles.find((a) => a.is_pinned) || articles[0];

  const handleShare = (article: BlogPostItem) => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/updates?id=${article.id}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col selection:bg-primary-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-xs font-bold tracking-wide uppercase shadow-sm">
              <Bell className="w-3.5 h-3.5 animate-bounce" />
              <span>Official DVSA & Driving Updates</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Latest Driving Theory & Road Updates
            </h1>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Stay ahead with real-time test regulation changes, hazard perception strategies, and expert instructor advice from Theory Pass Master.
            </p>

            {/* Search & Filter Bar */}
            <div className="pt-2 max-w-xl mx-auto">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search updates, DVSA rules, highway code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm bg-slate-900/90 border border-slate-800 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500 shadow-xl transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs p-1"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 scale-105'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured / Pinned Update (Hero Card) */}
          {pinnedPost && selectedCategory === 'All' && !searchQuery && (
            <div className="mb-14 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 overflow-hidden shadow-2xl hover:border-slate-700 transition-all group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                {/* Image */}
                <div className="lg:col-span-6 relative min-h-[260px] lg:min-h-[380px] overflow-hidden">
                  <img
                    src={pinnedPost.image_url}
                    alt={pinnedPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/bd-girl-driving.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 flex items-center shadow-md">
                      <Pin className="w-3 h-3 mr-1 fill-slate-950" /> Featured Update
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 backdrop-blur-md text-white border border-slate-700">
                      {pinnedPost.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-xs text-slate-400">
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {new Date(pinnedPost.created_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {pinnedPost.reading_time || '4 min read'}
                      </span>
                      <span>•</span>
                      <span className="text-primary-400 font-semibold">{pinnedPost.author}</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug group-hover:text-primary-400 transition-colors">
                      {pinnedPost.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                      {pinnedPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => setActiveArticle(pinnedPost)}
                      className="inline-flex items-center px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-primary-600/30 transition-all transform group-hover:translate-x-1 cursor-pointer"
                    >
                      Read Full Update <ArrowRight className="w-4 h-4 ml-1.5" />
                    </button>

                    <button
                      onClick={() => handleShare(pinnedPost)}
                      className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Share update"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid of Update Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className="rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
              >
                {/* Card Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/bd-girl-driving.jpg';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-primary-300 border border-slate-700 shadow-sm">
                      {article.category}
                    </span>
                  </div>
                  {article.is_pinned && (
                    <div className="absolute top-3 right-3">
                      <span className="p-1.5 rounded-full bg-amber-500 text-slate-950 shadow-sm block">
                        <Pin className="w-3 h-3 fill-slate-950" />
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                      <span>{new Date(article.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{article.reading_time || '3 min read'}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-primary-400 font-bold group-hover:underline flex items-center">
                      Read Article <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </span>

                    <span className="text-[11px] text-slate-500 font-medium">
                      By {article.author?.split(' ')[0] || 'Admin'}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800/80 p-8 space-y-3">
              <Search className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">No updates matched your search</h3>
              <p className="text-xs text-slate-400">Try searching for other keywords or reset category filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-primary-600 text-white text-xs font-semibold shadow-md"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Bottom Theory Guarantee Banner */}
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-blue-950/60 via-indigo-950/60 to-purple-950/60 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0 shadow-lg">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Pass Your UK Driving Theory Test First Time — Guaranteed!
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                  Join our comprehensive £99 masterclass with unlimited free resits, CGI hazard perception videos, and personal 1-to-1 recovery coaching.
                </p>
              </div>
            </div>

            <Link
              href="/courses"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-600/30 flex items-center shrink-0 transition-all transform hover:scale-105"
            >
              Explore Masterclasses
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </main>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden my-8 animate-fadeIn flex flex-col max-h-[90vh]">
            {/* Modal Top Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50 shrink-0">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary-500/20 text-primary-300 border border-primary-500/30">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-slate-400">• {activeArticle.reading_time || '4 min read'}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleShare(activeArticle)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center transition-colors"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                      <span className="text-emerald-400">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 mr-1" />
                      <span>Share</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Article Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
              {/* Cover Image */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/60 shadow-lg">
                <img
                  src={activeArticle.image_url}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/bd-girl-driving.jpg';
                  }}
                />
              </div>

              {/* Title & Meta */}
              <div className="space-y-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug">
                  {activeArticle.title}
                </h1>

                <div className="flex items-center space-x-3 text-xs text-slate-400 pt-1">
                  <span>Published on {new Date(activeArticle.created_at).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Author: {activeArticle.author}</span>
                  <span>•</span>
                  <span>{activeArticle.views_count} Views</span>
                </div>
              </div>

              {/* Formatted Markdown Content */}
              <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-4">
                {activeArticle.content.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={pIdx} className="text-lg sm:text-xl font-bold text-white pt-3 border-b border-slate-800 pb-1">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={pIdx} className="text-sm sm:text-base font-bold text-primary-400 pt-2">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('> ')) {
                    return (
                      <blockquote
                        key={pIdx}
                        className="p-4 rounded-xl bg-blue-950/40 border-l-4 border-blue-500 text-blue-200 text-xs my-3"
                      >
                        {paragraph.replace('> ', '')}
                      </blockquote>
                    );
                  }
                  return (
                    <p key={pIdx} className="leading-relaxed text-slate-300 whitespace-pre-line">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Call to action inside reader */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-primary-950/40 to-slate-900 border border-primary-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                <div>
                  <h4 className="text-sm font-bold text-white">Ace Your Theory Test with Our Full Course</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Start learning interactive theory lessons and pass first time.
                  </p>
                </div>
                <Link
                  href="/courses"
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shrink-0 shadow-md shadow-primary-600/30"
                >
                  Start Course Now ➔
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function UpdatesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
          Loading updates...
        </div>
      }
    >
      <UpdatesContent />
    </Suspense>
  );
}
