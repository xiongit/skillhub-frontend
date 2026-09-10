import { Course } from '../types';

export interface HomeLearningPath {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  color_gradient?: string;
  difficulty?: string;
  courses_count?: number;
}

export interface HomeInstructor {
  id: number;
  name: string;
  headline: string;
  avatar_url: string;
  rating: number;
  students_count: string;
}

export interface HomeTestimonial {
  id: number;
  name: string;
  role: string;
  avatar_url?: string;
  headline: string;
  quote: string;
  rating: number;
}

export interface HomeFaq {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

export interface HomeData {
  hero_stats: {
    students: string;
    courses: string;
    instructors: string;
    satisfaction: string;
  };
  courses: Course[];
  learning_paths: HomeLearningPath[];
  instructors: HomeInstructor[];
  testimonials: HomeTestimonial[];
  faqs: HomeFaq[];
}

export const fallbackHomeData: HomeData = {
  hero_stats: {
    students: '10K+',
    courses: '500+',
    instructors: '50+',
    satisfaction: '100%',
  },
  courses: [
    {
      id: 1,
      uuid: 'c-1',
      title: 'Laravel Masterclass',
      slug: 'laravel-masterclass',
      subtitle: 'Build Modern Web Apps',
      description: 'Master modern web applications with Laravel 12, REST API architecture, and database design.',
      level: 'intermediate',
      language: 'bn',
      thumbnail_url: '/images/home/course-laravel.jpg',
      status: 'published',
      total_duration_minutes: 2400,
      total_lessons_count: 52,
      enrollment_count: 3450,
      average_rating: 4.9,
      reviews_count: 1200,
      category: { id: 1, name: 'Web Development', slug: 'web-development' },
      pricing: { price: 8000, discount_price: 5000, effective_price: 5000, is_free: false, currency: 'BDT' },
      instructors: [
        {
          id: 6,
          name: 'John Doe',
          avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&fit=crop',
          headline: 'Laravel Expert',
          is_primary: true,
        },
      ],
    },
    {
      id: 2,
      uuid: 'c-2',
      title: 'React.js Complete Guide',
      slug: 'react-complete-guide',
      subtitle: 'From Zero to Hero',
      description: 'Comprehensive masterclass on React 19, Next.js 15, State Management, and Tailwind CSS.',
      level: 'beginner',
      language: 'bn',
      thumbnail_url: '/images/home/course-react.jpg',
      status: 'published',
      total_duration_minutes: 2100,
      total_lessons_count: 48,
      enrollment_count: 2890,
      average_rating: 4.9,
      reviews_count: 980,
      category: { id: 1, name: 'Web Development', slug: 'web-development' },
      pricing: { price: 5500, discount_price: 4500, effective_price: 4500, is_free: false, currency: 'BDT' },
      instructors: [
        {
          id: 7,
          name: 'Jane Smith',
          avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&fit=crop',
          headline: 'React Instructor',
          is_primary: true,
        },
      ],
    },
    {
      id: 3,
      uuid: 'c-3',
      title: 'UI/UX Design Bootcamp',
      slug: 'uiux-design-bootcamp',
      subtitle: 'Design Like a Pro',
      description: 'Learn industry-standard Figma, wireframing, interactive prototyping, and design systems.',
      level: 'all',
      language: 'bn',
      thumbnail_url: '/images/home/course-uiux.jpg',
      status: 'published',
      total_duration_minutes: 1800,
      total_lessons_count: 40,
      enrollment_count: 1920,
      average_rating: 4.7,
      reviews_count: 750,
      category: { id: 2, name: 'UI/UX Design', slug: 'design-uiux' },
      pricing: { price: 8000, discount_price: 6000, effective_price: 6000, is_free: false, currency: 'BDT' },
      instructors: [
        {
          id: 8,
          name: 'Robert Fox',
          avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&fit=crop',
          headline: 'UI/UX Designer',
          is_primary: true,
        },
      ],
    },
    {
      id: 4,
      uuid: 'c-4',
      title: 'Digital Marketing Course',
      slug: 'digital-marketing-course',
      subtitle: 'Become a Marketing Expert',
      description: 'Master SEO, Google Ads, Meta advertising, conversion funnels, and brand growth strategies.',
      level: 'beginner',
      language: 'bn',
      thumbnail_url: '/images/home/course-marketing.jpg',
      status: 'published',
      total_duration_minutes: 1600,
      total_lessons_count: 36,
      enrollment_count: 2400,
      average_rating: 4.8,
      reviews_count: 1100,
      category: { id: 3, name: 'Digital Marketing', slug: 'digital-marketing' },
      pricing: { price: 3500, discount_price: null, effective_price: 3500, is_free: false, currency: 'BDT' },
      instructors: [
        {
          id: 9,
          name: 'Emily Johnson',
          avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&fit=crop',
          headline: 'Marketing Expert',
          is_primary: true,
        },
      ],
    },
    {
      id: 5,
      uuid: 'c-5',
      title: 'Python for Beginners',
      slug: 'python-for-beginners',
      subtitle: 'Learn Python Step by Step',
      description: 'Hands-on Python programming from basic syntax to OOP, web scraping, and automation scripts.',
      level: 'beginner',
      language: 'bn',
      thumbnail_url: '/images/home/course-python.jpg',
      status: 'published',
      total_duration_minutes: 1900,
      total_lessons_count: 42,
      enrollment_count: 2150,
      average_rating: 4.9,
      reviews_count: 950,
      category: { id: 4, name: 'Programming', slug: 'programming-languages' },
      pricing: { price: 3200, discount_price: null, effective_price: 3200, is_free: false, currency: 'BDT' },
      instructors: [
        {
          id: 10,
          name: 'Michael Brown',
          avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&fit=crop',
          headline: 'Python Developer',
          is_primary: true,
        },
      ],
    },
  ],
  learning_paths: [
    {
      id: 1,
      title: 'Full Stack Developer',
      slug: 'full-stack-developer',
      description: 'Master frontend, backend, databases and devops for modern scalable web apps.',
      icon: 'code',
      color_gradient: 'from-blue-600 to-indigo-600',
      difficulty: 'intermediate',
      courses_count: 12,
    },
    {
      id: 2,
      title: 'Digital Marketing Expert',
      slug: 'digital-marketing-expert',
      description: 'End-to-end growth marketing, conversion rate optimization, and advertising campaigns.',
      icon: 'target',
      color_gradient: 'from-purple-600 to-violet-600',
      difficulty: 'beginner',
      courses_count: 8,
    },
    {
      id: 3,
      title: 'AI & Machine Learning',
      slug: 'ai-machine-learning',
      description: 'Deep learning, computer vision, natural language processing, and generative AI.',
      icon: 'brain',
      color_gradient: 'from-amber-500 to-orange-600',
      difficulty: 'advanced',
      courses_count: 10,
    },
    {
      id: 4,
      title: 'Data Science Professional',
      slug: 'data-science-professional',
      description: 'Data analytics, visualization, Python pipelines, and predictive statistical modeling.',
      icon: 'trending-up',
      color_gradient: 'from-emerald-600 to-teal-600',
      difficulty: 'intermediate',
      courses_count: 9,
    },
  ],
  instructors: [
    {
      id: 6,
      name: 'John Doe',
      headline: 'Laravel Expert',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&fit=crop',
      rating: 4.9,
      students_count: '2.1k',
    },
    {
      id: 7,
      name: 'Jane Smith',
      headline: 'React Instructor',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&fit=crop',
      rating: 4.9,
      students_count: '1.8k',
    },
    {
      id: 8,
      name: 'Robert Fox',
      headline: 'UI/UX Designer',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&fit=crop',
      rating: 4.8,
      students_count: '1.5k',
    },
    {
      id: 9,
      name: 'Emily Johnson',
      headline: 'Marketing Expert',
      avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&fit=crop',
      rating: 4.8,
      students_count: '1.2k',
    },
    {
      id: 10,
      name: 'Michael Brown',
      headline: 'Python Developer',
      avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&fit=crop',
      rating: 4.7,
      students_count: '1k',
    },
    {
      id: 11,
      name: 'David Wilson',
      headline: 'Data Scientist',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&fit=crop',
      rating: 4.8,
      students_count: '1.4k',
    },
  ],
  testimonials: [
    {
      id: 1,
      name: 'Rashedul Islam',
      role: 'Full Stack Developer',
      avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&fit=crop',
      headline: 'This platform changed my career.',
      quote: 'The courses are well structured and the instructors are amazing. Building real SaaS projects helped me ace my tech interview!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Farhana Akter',
      role: 'Frontend Developer',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&fit=crop',
      headline: "Best investment I've ever made.",
      quote: 'Practical projects helped me get my first job in tech. The curriculum quality and mentor reviews are unmatched anywhere.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Jahid Hasan',
      role: 'Digital Marketer',
      avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&fit=crop',
      headline: 'Excellent learning experience!',
      quote: 'Clear step-by-step guidance and community support is top notch. I have already scaled profitable campaigns for my agency clients.',
      rating: 5,
    },
  ],
  faqs: [
    {
      id: 1,
      question: 'How does the course access work?',
      answer: 'Once enrolled, you get instant lifetime 24/7 access to all course lectures, quizzes, and resources. You can learn at your own pace from mobile, tablet, or desktop.',
      category: 'General',
    },
    {
      id: 2,
      question: 'Will I get a certificate after completion?',
      answer: 'Yes! Upon completing all lessons and passing the course final exam, you will instantly receive a tamper-proof digital certificate with a verifiable QR code.',
      category: 'Certificates',
    },
    {
      id: 3,
      question: 'Can I download the course materials?',
      answer: 'Yes, all project starter code, architecture diagrams, cheatsheets, and exercise files are readily downloadable directly from your student dashboard.',
      category: 'Content',
    },
    {
      id: 4,
      question: 'How can I get support if I face any issue?',
      answer: 'Our instructors and dedicated mentors answer questions daily in the Course Community Q&A forum. You can also contact our support team via live chat or email.',
      category: 'Support',
    },
  ],
};

export const homeService = {
  getHomeData: async (): Promise<HomeData> => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
      const res = await fetch(`${apiUrl}/home/data`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch home data');
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
      return fallbackHomeData;
    } catch {
      return fallbackHomeData;
    }
  },
};
