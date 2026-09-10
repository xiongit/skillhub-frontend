import {
  CorporateOverview,
  OfficialCertificationVerification,
  LiveClassSession,
  WhiteLabelBranding,
  CurrencyConversionResult,
} from '../types';

export const enterpriseService = {
  getCorporateOverview: async (): Promise<CorporateOverview> => {
    return {
      organization_name: 'Grameen Solutions Enterprise',
      total_employees: 240,
      active_trainees: 195,
      mandatory_courses_assigned: 4,
      overall_compliance_rate: 84.5,
      departments: [
        {
          name: 'Software Engineering',
          code: 'ENG',
          employees_count: 120,
          completion_rate: 91.2,
          active_course: 'Production Laravel 12 & PostgreSQL Security',
        },
        {
          name: 'Quality Assurance & DevOps',
          code: 'QA-OPS',
          employees_count: 50,
          completion_rate: 88.0,
          active_course: 'Docker & Automated CI/CD Pipelines',
        },
        {
          name: 'Information Security & Compliance',
          code: 'INFOSEC',
          employees_count: 40,
          completion_rate: 96.5,
          active_course: 'Enterprise SOC2 & GDPR Compliance Training',
        },
        {
          name: 'Product & Business Analysis',
          code: 'PROD',
          employees_count: 30,
          completion_rate: 74.0,
          active_course: 'Agile Scrum & Requirements Architecture',
        },
      ],
    };
  },

  verifyCertification: async (code: string): Promise<OfficialCertificationVerification> => {
    return {
      certificate_id: 'SKILLHUB-CERT-' + (code ? code.toUpperCase() : 'LARAVEL88'),
      student_name: 'Fahim Morshed',
      certification_title: 'SkillHub Certified Principal Laravel Architect',
      issuing_authority: 'SkillHub Professional Certification Board',
      issued_at: '2026-04-15',
      expires_at: '2028-04-15',
      status: 'valid',
      grade: 'Passed with Distinction (94%)',
      verified_skills: [
        'Laravel 12 API Clean Architecture',
        'PostgreSQL Database Optimization & Indexing',
        'Redis Distributed Caching & Queues',
        'Enterprise Docker Containerization & Security',
      ],
      qr_verification_url: 'https://verify.skillhub.com/credential/' + code,
    };
  },

  getLiveClasses: async (): Promise<LiveClassSession[]> => {
    return [
      {
        id: 1,
        title: 'Live Workshop: Real-Time High-Volume API Architecture with Laravel 12 & Redis',
        course_title: 'Full-Stack Web Development Masterclass',
        instructor_name: 'Engr. Tanvir Hasan',
        provider: 'zoom',
        scheduled_start_at: 'Today at 8:00 PM BST',
        duration_minutes: 90,
        meeting_url: 'https://zoom.us/j/98822114455',
        status: 'scheduled',
        attendance_count: 142,
      },
      {
        id: 2,
        title: 'Live Q&A & Code Clinic: PostgreSQL Execution Plans & Indexes',
        course_title: 'PostgreSQL Database Architecture & Optimization',
        instructor_name: 'Dr. Ariful Islam',
        provider: 'meet',
        scheduled_start_at: 'Tomorrow at 7:30 PM BST',
        duration_minutes: 60,
        meeting_url: 'https://meet.google.com/abc-defg-hij',
        status: 'scheduled',
        attendance_count: 88,
      },
    ];
  },

  convertCurrency: async (amountBdt: number, targetCurrency: string): Promise<CurrencyConversionResult> => {
    const rates: Record<string, { rate: number; symbol: string }> = {
      BDT: { rate: 1.0, symbol: '৳' },
      USD: { rate: 0.0083, symbol: '$' },
      EUR: { rate: 0.0078, symbol: '€' },
      SAR: { rate: 0.031, symbol: '﷼' },
      AED: { rate: 0.0305, symbol: 'د.إ' },
    };

    const target = rates[targetCurrency] || rates['USD'];
    const converted = roundDec(amountBdt * target.rate, 2);

    return {
      base_amount_bdt: amountBdt,
      target_currency: targetCurrency,
      exchange_rate: target.rate,
      converted_amount: converted,
      formatted: `${target.symbol}${converted.toLocaleString()}`,
    };
  },
};

function roundDec(val: number, dec: number): number {
  return Math.round(val * Math.pow(10, dec)) / Math.pow(10, dec);
}
