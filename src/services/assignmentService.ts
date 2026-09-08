import { Assignment, AssignmentSubmission } from '../types';

export const mockAssignments: Assignment[] = [
  {
    id: 1,
    lesson_id: 101,
    title: 'Assignment 1: Build a Next.js 15 Server-Rendered Blog with Tailwind',
    instruction:
      'Create a modern personal blog using Next.js 15 App Router, React 19 Server Components, and Tailwind CSS. Implement dynamic routing (/blog/[slug]) and export metadata for SEO.',
    total_marks: 100,
    pass_marks: 70,
    deadline_at: '2026-09-15T23:59:59Z',
  },
  {
    id: 2,
    lesson_id: 201,
    title: 'Assignment 2: Architect a Clean Architecture REST API in Laravel 12',
    instruction:
      'Structure a multi-layer API separating Controllers, Requests, Services, and Repositories. Include PostgreSQL migrations, foreign keys, and unit feature tests.',
    total_marks: 100,
    pass_marks: 70,
    deadline_at: '2026-09-22T23:59:59Z',
  },
];

export const mockSubmissions: AssignmentSubmission[] = [
  {
    id: 101,
    assignment_id: 1,
    user_id: 101,
    submission_text: 'Completed blog project deployed live on Vercel with GitHub repository link.',
    attachment_urls: ['https://github.com/tanvir/nextjs15-blog', 'https://nextjs15-blog.vercel.app'],
    marks_awarded: 92,
    status: 'evaluated',
    feedback: 'Excellent work! Clean code structure, efficient Server Components, and semantic HTML tags.',
    evaluated_at: '2026-09-02T10:00:00Z',
  },
];

export const assignmentService = {
  getAssignments: async (): Promise<Assignment[]> => {
    return mockAssignments;
  },

  getSubmissions: async (): Promise<AssignmentSubmission[]> => {
    return mockSubmissions;
  },

  submitAssignment: async (
    assignmentId: number,
    submissionText: string,
    urls: string[]
  ): Promise<AssignmentSubmission> => {
    return {
      id: Date.now(),
      assignment_id: assignmentId,
      user_id: 101,
      submission_text: submissionText,
      attachment_urls: urls,
      status: 'submitted',
    };
  },
};
