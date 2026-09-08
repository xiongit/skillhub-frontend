import { Exam, ExamAttempt, QuizQuestion } from '../types';
import { apiRequest } from './apiClient';

export const mockExam: Exam = {
  id: 1,
  course_id: 1,
  title: 'Full-Stack Web Development Final Certification Exam',
  description:
    'Test your comprehensive mastery over Next.js 15 App Router, React 19, Laravel 12 API architecture, and database security.',
  pass_percentage: 75.0,
  duration_minutes: 45,
  total_questions_to_pick: 5,
  max_attempts: 3,
  questions: [
    {
      id: 1,
      question_text: 'Which file in Next.js 15 App Router defines the UI shared across routes?',
      type: 'mcq',
      marks: 20,
      explanation: 'layout.tsx defines shared layouts that preserve state across navigations.',
      options: [
        { id: 1, option_text: 'layout.tsx', is_correct: true },
        { id: 2, option_text: 'template.tsx', is_correct: false },
        { id: 3, option_text: 'page.tsx', is_correct: false },
        { id: 4, option_text: 'route.ts', is_correct: false },
      ],
    },
    {
      id: 2,
      question_text: 'What is the primary benefit of the Service-Repository pattern in Laravel 12?',
      type: 'mcq',
      marks: 20,
      explanation: 'It decouples business domain logic from data persistence layers.',
      options: [
        { id: 5, option_text: 'Decoupling business logic from persistence logic', is_correct: true },
        { id: 6, option_text: 'Automatically styling Blade templates', is_correct: false },
        { id: 7, option_text: 'Eliminating the need for database migrations', is_correct: false },
        { id: 8, option_text: 'Increasing CSS download speed', is_correct: false },
      ],
    },
    {
      id: 3,
      question_text: 'How does Laravel Sanctum provide authentication for Single Page Applications (SPAs)?',
      type: 'mcq',
      marks: 20,
      explanation: 'Sanctum uses cookie-based sessions with CSRF protection for first-party SPAs.',
      options: [
        { id: 9, option_text: 'Cookie-based session authentication with CSRF protection', is_correct: true },
        { id: 10, option_text: 'Unencrypted query string parameters', is_correct: false },
        { id: 11, option_text: 'Basic HTTP auth headers on every request', is_correct: false },
      ],
    },
    {
      id: 4,
      question_text: 'Which PostgreSQL index type is most optimal for full-text search?',
      type: 'mcq',
      marks: 20,
      explanation: 'GIN (Generalized Inverted Index) is designed for multi-key attributes and full text search.',
      options: [
        { id: 12, option_text: 'GIN (Generalized Inverted Index)', is_correct: true },
        { id: 13, option_text: 'B-Tree', is_correct: false },
        { id: 14, option_text: 'Hash Index', is_correct: false },
      ],
    },
    {
      id: 5,
      question_text: 'In our SkillHub learning policy, how many final exam attempts are allowed before requiring a course reset?',
      type: 'mcq',
      marks: 20,
      explanation: 'SkillHub strictly allows a maximum of 3 attempts. Failing the 3rd attempt locks the enrollment into reset_required.',
      options: [
        { id: 15, option_text: 'Exactly 3 attempts', is_correct: true },
        { id: 16, option_text: 'Unlimited attempts', is_correct: false },
        { id: 17, option_text: 'Only 1 attempt', is_correct: false },
      ],
    },
  ],
};

let cachedExam: Exam = mockExam;
let currentAttemptCount = 1;

export const examService = {
  getExamForCourse: async (_slug: string): Promise<Exam> => {
    try {
      const response = await apiRequest<any>('/courses/1/curriculum');
      if (response && response.data && response.data.final_exam) {
        const fe = response.data.final_exam;
        const config = fe.config || {};
        const rawQuestions = fe.questions || [];

        if (rawQuestions.length > 0) {
          const questions: QuizQuestion[] = rawQuestions.map((q: any, idx: number) => ({
            id: Number(q.id) || idx + 1,
            question_text: q.question_text,
            type: (q.type || 'mcq') as 'mcq' | 'multiple_answer' | 'true_false',
            marks: Number(q.marks || 10),
            explanation: q.explanation || '',
            options: (q.options || []).map((o: any, oIdx: number) => ({
              id: Number(o.id) || (idx + 1) * 100 + oIdx + 1,
              option_text: o.option_text,
              is_correct: Boolean(o.is_correct),
            })),
          }));

          cachedExam = {
            id: 1,
            course_id: 1,
            title: response.data.course?.title ? `${response.data.course.title} Final Certification Exam` : mockExam.title,
            description: config.description || mockExam.description,
            pass_percentage: Number(config.pass_percentage ?? 75),
            duration_minutes: Number(config.duration_minutes ?? 45),
            total_questions_to_pick: Number(config.total_questions_to_pick || questions.length),
            max_attempts: Number(config.max_attempts ?? 3),
            questions,
          };
          return cachedExam;
        }
      }
    } catch (err) {
      console.warn('Could not fetch live exam questions, using mock fallback', err);
    }
    return mockExam;
  },

  submitExam: async (
    answers: Record<number, number>,
    examOverride?: Exam
  ): Promise<ExamAttempt> => {
    const activeExam = examOverride || cachedExam || mockExam;
    const questions = activeExam.questions || [];

    let totalMarks = 0;
    let score = 0;

    questions.forEach((q) => {
      const qMarks = Number(q.marks || 10);
      totalMarks += qMarks;
      const correctOpt = q.options.find((o) => o.is_correct);
      if (answers[q.id] !== undefined && correctOpt && answers[q.id] === correctOpt.id) {
        score += qMarks;
      }
    });

    const percentage = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;
    const isPassed = percentage >= activeExam.pass_percentage;
    const attemptNum = currentAttemptCount++;
    const triggeredReset = !isPassed && attemptNum >= (activeExam.max_attempts || 3);

    return {
      id: Date.now(),
      exam_id: activeExam.id,
      user_id: 101,
      attempt_number: attemptNum,
      score_obtained: score,
      total_possible_score: totalMarks || 100,
      percentage,
      status: isPassed ? 'passed' : 'failed',
      triggered_course_reset: triggeredReset,
      started_at: new Date(Date.now() - 1800000).toISOString(),
      submitted_at: new Date().toISOString(),
    };
  },
};
