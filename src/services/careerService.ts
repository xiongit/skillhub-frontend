import { LearningPath, JobPost, MentorProfile } from '../types';
import { mockCourses } from './courseService';

export const mockLearningPaths: LearningPath[] = [
  {
    id: 1,
    title: 'Full-Stack Software Engineer Career Path',
    slug: 'fullstack-engineer',
    description:
      'The comprehensive roadmap to becoming an industry-ready Full-Stack Developer. Master React 19, Next.js 15, TypeScript, Tailwind CSS, coupled with robust Laravel 12 APIs and PostgreSQL database optimization.',
    difficulty: 'Intermediate to Advanced',
    courses_count: 2,
    total_hours: 70,
    color_gradient: 'from-blue-600 to-indigo-600',
    courses: [mockCourses[0], mockCourses[1]],
  },
  {
    id: 2,
    title: 'Modern DevOps & Cloud Architect Path',
    slug: 'devops-architect',
    description:
      'Learn Docker containerization, Kubernetes clusters, GitHub Actions CI/CD workflows, and production AWS infrastructure deployments.',
    difficulty: 'Intermediate',
    courses_count: 1,
    total_hours: 35,
    color_gradient: 'from-emerald-600 to-teal-700',
    courses: [mockCourses[2]],
  },
];

export const mockJobPosts: JobPost[] = [
  {
    id: 1,
    company_name: 'Brain Station 23',
    company_logo: 'https://images.unsplash.com/photo-1542744094-3a31727560fa?w=100',
    title: 'Associate Full-Stack Developer (Next.js & Laravel)',
    slug: 'associate-fullstack-dev',
    type: 'full_time',
    workplace: 'hybrid',
    location: 'Dhaka, Bangladesh',
    salary_range: '৳50,000 - ৳75,000 / month',
    requirements: [
      'Proficiency in React, Next.js 14/15, and TypeScript',
      'Hands-on experience with Laravel REST APIs & Eloquent ORM',
      'Graduated from SkillHub Full-Stack track or equivalent',
    ],
    deadline_at: '2026-09-30',
  },
  {
    id: 2,
    company_name: 'Pathao',
    company_logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100',
    title: 'Database Engineer Intern (PostgreSQL)',
    slug: 'database-intern-postgresql',
    type: 'internship',
    workplace: 'on_site',
    location: 'Gulshan, Dhaka',
    salary_range: '৳25,000 / month stipend + certificate',
    requirements: [
      'Understanding of PostgreSQL indexing, query plans, and transactions',
      'SkillHub Verified PostgreSQL Skill badge holder',
    ],
    deadline_at: '2026-10-15',
  },
];

export const mockMentors: MentorProfile[] = [
  {
    id: 1,
    name: 'Hasin Hayder',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    headline: 'Senior Technical Lead & Software Architect',
    bio: 'Mentoring software engineers on distributed systems, career roadmaps, and international job interviews.',
    hourly_rate: 2000,
    skills: ['Architecture Review', 'Mock Interview', 'Next.js & Laravel'],
    available_slots: [
      { id: 1, start_time: '2026-09-10 18:00', end_time: '2026-09-10 19:00' },
      { id: 2, start_time: '2026-09-12 20:00', end_time: '2026-09-12 21:00' },
    ],
  },
  {
    id: 2,
    name: 'Sumon Selim',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    headline: 'Principal Database Architect',
    bio: 'Specializing in PostgreSQL performance tuning, database clustering, and high-concurrency architectures.',
    hourly_rate: 1800,
    skills: ['PostgreSQL Tuning', 'Data Modeling', 'Code Review'],
    available_slots: [
      { id: 3, start_time: '2026-09-11 19:00', end_time: '2026-09-11 20:00' },
    ],
  },
];

export const careerService = {
  getLearningPaths: async (): Promise<LearningPath[]> => mockLearningPaths,
  getJobPosts: async (): Promise<JobPost[]> => mockJobPosts,
  getMentors: async (): Promise<MentorProfile[]> => mockMentors,
};
