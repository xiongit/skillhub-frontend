import { Certificate } from '../types';

export const mockCertificates: Certificate[] = [
  {
    id: 1,
    uuid: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    certificate_number: 'SKILLHUB-2026-X8921',
    user_id: 101,
    course_id: 1,
    issued_at: '2026-09-02',
    pdf_file_path: '/certificates/sample.pdf',
    user: {
      id: 101,
      uuid: 'student-uuid-101',
      name: 'Tanvir Hossain',
      email: 'tanvir@gmail.com',
      status: 'active',
      created_at: '',
    },
    course: {
      id: 1,
      uuid: 'c-101',
      title: 'Full-Stack Web Development with Next.js 15 & Laravel 12',
      slug: 'fullstack-nextjs-laravel',
      description: '',
      level: 'intermediate',
      language: 'Bangla',
      status: 'published',
      total_duration_minutes: 2400,
      total_lessons_count: 82,
      enrollment_count: 3420,
      average_rating: 4.94,
    },
  },
];

export const certificateService = {
  getMyCertificates: async (): Promise<Certificate[]> => {
    return mockCertificates;
  },

  verifyCertificate: async (idOrUuid: string): Promise<Certificate | null> => {
    const cert = mockCertificates.find(
      (c) => c.uuid === idOrUuid || c.certificate_number.toLowerCase() === idOrUuid.toLowerCase()
    );
    return cert || mockCertificates[0];
  },
};
