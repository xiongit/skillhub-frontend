import { Course } from '../types';

export const mockCourses: Course[] = [
  {
    id: 1,
    uuid: 'c-101',
    title: 'Full-Stack Web Development with Next.js 15 & Laravel 12',
    slug: 'fullstack-nextjs-laravel',
    subtitle: 'From zero to building production-ready SaaS platforms with Bangladesh & Global Payment Gateways',
    description:
      'Become an industry-ready software engineer. Learn Next.js 15 App Router, React 19, Tailwind CSS, coupled with a robust Laravel 12 REST API, PostgreSQL database architecture, Sanctum RBAC authentication, and automated payment gateways (bKash, Nagad, SSLCommerz, Stripe).',
    level: 'intermediate',
    language: 'Bangla',
    thumbnail_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop',
    promo_video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    status: 'published',
    total_duration_minutes: 2400,
    total_lessons_count: 82,
    enrollment_count: 3420,
    average_rating: 4.94,
    reviews_count: 512,
    category: { id: 1, name: 'Web Development', slug: 'web-development' },
    pricing: { price: 8000, discount_price: 4999, effective_price: 4999, is_free: false, currency: 'BDT' },
    instructors: [
      {
        id: 1,
        name: 'Hasin Hayder',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
        headline: 'Lead Architect & Tech Speaker',
        bio: '20+ years building scalable distributed architectures and mentoring 50,000+ developers.',
        is_primary: true,
      },
    ],
    requirements: [
      'Basic knowledge of HTML, CSS, and modern JavaScript (ES6+)',
      'A computer with Node.js and PHP installed',
      'Desire to master modern full-stack web architecture',
    ],
    learning_outcomes: [
      'Architect robust production REST APIs in Laravel 12 with Clean Architecture',
      'Build performant Server and Client components in Next.js 15 App Router',
      'Integrate bKash, Nagad, SSLCommerz, and Stripe webhooks with idempotent safety',
      'Deploy scalable PostgreSQL schemas with indexing and connection pooling',
      'Earn an industry-recognized, QR-verifiable certificate upon graduation',
    ],
    modules: [
      {
        id: 1,
        course_id: 1,
        title: 'Module 1: Next.js 15 App Router Fundamentals',
        sort_order: 1,
        lessons: [
          {
            id: 101,
            module_id: 1,
            title: '1.1 Introduction to Server Components & Layouts',
            slug: 'server-components-layouts',
            type: 'video',
            duration_minutes: 18,
            sort_order: 1,
            is_free_preview: true,
            is_completed: true,
            video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            video_duration_seconds: 1080,
          },
          {
            id: 102,
            module_id: 1,
            title: '1.2 Module 1 Knowledge Check Quiz',
            slug: 'module-1-quiz',
            type: 'quiz',
            duration_minutes: 10,
            sort_order: 2,
            is_free_preview: false,
            is_completed: false,
            quiz: {
              id: 1,
              lesson_id: 102,
              title: 'Next.js 15 Fundamentals Quiz',
              passing_score_percentage: 80,
              questions: [
                {
                  id: 1,
                  question_text: 'Where do Next.js Server Components execute by default?',
                  type: 'mcq',
                  marks: 1,
                  explanation: 'Server Components execute exclusively on the server without shipping JavaScript to the client.',
                  options: [
                    { id: 1, option_text: 'On the server during build or request time', is_correct: true },
                    { id: 2, option_text: 'In the client browser via Web Workers', is_correct: false },
                    { id: 3, option_text: 'Only inside Service Workers', is_correct: false },
                  ],
                },
                {
                  id: 2,
                  question_text: 'Which directive must you place at the top of a file to create a Client Component?',
                  type: 'mcq',
                  marks: 1,
                  explanation: 'The "use client" directive marks the component boundary for client-side interactivity.',
                  options: [
                    { id: 4, option_text: '"use client"', is_correct: true },
                    { id: 5, option_text: '"use browser"', is_correct: false },
                    { id: 6, option_text: '"use frontend"', is_correct: false },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        id: 2,
        course_id: 1,
        title: 'Module 2: Laravel 12 Clean Architecture & PostgreSQL',
        sort_order: 2,
        lessons: [
          {
            id: 201,
            module_id: 2,
            title: '2.1 Service-Repository Pattern & Form Requests',
            slug: 'service-repository-pattern',
            type: 'video',
            duration_minutes: 32,
            sort_order: 1,
            is_free_preview: false,
            is_completed: false,
            video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            video_duration_seconds: 1920,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    uuid: 'c-102',
    title: 'Mastering PostgreSQL & Advanced Database Architecture',
    slug: 'mastering-postgresql',
    subtitle: 'Table partitioning, indexing strategies, EXPLAIN ANALYZE, and ACID transaction locks',
    description:
      'Engineered for developers who want to handle millions of queries per second. Learn indexing (B-Tree, GIN, GiST), connection pooling with PgBouncer, and replication clustering.',
    level: 'advanced',
    language: 'Bangla',
    thumbnail_url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop',
    promo_video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    status: 'published',
    total_duration_minutes: 1800,
    total_lessons_count: 54,
    enrollment_count: 1890,
    average_rating: 4.88,
    reviews_count: 320,
    category: { id: 2, name: 'Database Engineering', slug: 'database' },
    pricing: { price: 6000, discount_price: 3800, effective_price: 3800, is_free: false, currency: 'BDT' },
    instructors: [
      {
        id: 2,
        name: 'Sumon Selim',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        headline: 'Principal Database Architect',
        bio: 'Optimizing high-throughput financial transaction engines for over 15 years.',
        is_primary: true,
      },
    ],
    learning_outcomes: [
      'Master query optimization with EXPLAIN (ANALYZE, BUFFERS)',
      'Implement multi-tenant data partitioning in PostgreSQL 16+',
      'Avoid deadlocks with row-level locks (FOR UPDATE, FOR NO KEY UPDATE)',
    ],
  },
  {
    id: 3,
    uuid: 'c-103',
    title: 'Modern DevOps: Docker, Kubernetes & CI/CD Pipelines',
    slug: 'modern-devops-kubernetes',
    subtitle: 'Containerize, orchestrate, and automate zero-downtime cloud deployments',
    description:
      'Learn production DevOps from the ground up. Write Dockerfiles, configure multi-stage builds, deploy Kubernetes clusters, and automate testing via GitHub Actions.',
    level: 'intermediate',
    language: 'Bangla',
    thumbnail_url: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop',
    promo_video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    status: 'published',
    total_duration_minutes: 1600,
    total_lessons_count: 48,
    enrollment_count: 1240,
    average_rating: 4.91,
    reviews_count: 180,
    category: { id: 3, name: 'DevOps & Cloud', slug: 'devops' },
    pricing: { price: 6500, discount_price: 4200, effective_price: 4200, is_free: false, currency: 'BDT' },
  },
];

export const courseService = {
  getCourses: async (search = '', category = '', level = ''): Promise<Course[]> => {
    let filtered = [...mockCourses];
    if (search) {
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category) {
      filtered = filtered.filter((c) => c.category?.slug === category);
    }
    if (level && level !== 'all') {
      filtered = filtered.filter((c) => c.level === level);
    }
    return filtered;
  },

  getCourseBySlug: async (slug: string): Promise<Course | null> => {
    const course = mockCourses.find((c) => c.slug === slug);
    return course || mockCourses[0];
  },
};
