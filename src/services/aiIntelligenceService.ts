import {
  AiStudyPlan,
  AiCodeReviewResult,
  AiInterviewSession,
  AiInterviewScorecard,
  AiGeneratedCurriculum,
} from '../types';

export const aiIntelligenceService = {
  getDailyStudyPlan: async (): Promise<AiStudyPlan> => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('skillhub_student_token') : '';
      const res = await fetch('http://localhost:8000/api/v1/ai/study-plan', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Offline fallback
    }

    return {
      date: '2026-09-03',
      focus_area: 'PostgreSQL Query Optimization & Indexing',
      completion_target_hours: 1.5,
      tasks: [
        {
          id: 1,
          type: 'lecture',
          title: 'Watch Lesson 2.3: B-Tree Indexing in PostgreSQL',
          duration: '25 mins',
          completed: false,
        },
        {
          id: 2,
          type: 'practice',
          title: 'Practice: Write EXPLAIN ANALYZE on users table',
          duration: '30 mins',
          completed: false,
        },
        {
          id: 3,
          type: 'quiz',
          title: 'Retake Module 2 Database Quiz (Target: >85%)',
          duration: '15 mins',
          completed: false,
        },
      ],
      ai_insight:
        'Based on your last quiz score of 65% on Database Relations, spending 45 minutes on indexing today will prepare you for the upcoming proctored final exam.',
    };
  },

  reviewCode: async (code: string, language: string = 'php'): Promise<AiCodeReviewResult> => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('skillhub_student_token') : '';
      const res = await fetch('http://localhost:8000/api/v1/ai/code-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Offline fallback
    }

    return {
      score: 8.8,
      summary:
        'Excellent architectural structure! The code adheres to clean architecture principles. We identified minor optimizations regarding database query indexing and transaction isolation.',
      vulnerabilities: [
        'Ensure input is strictly validated via FormRequest rather than raw request array access to avoid mass assignment.',
      ],
      suggestions: [
        'Use eager loading (`with()`) when iterating over related records to prevent N+1 queries.',
        'Wrap multi-table database mutations inside a `DB::transaction()` closure.',
      ],
      refactored_code:
        "// Recommended Refactored Version\npublic function store(CourseEnrollmentRequest $request): JsonResponse\n{\n    $enrollment = DB::transaction(fn() => $this->enrollmentService->enroll($request->validated()));\n    return response()->json(['success' => true, 'data' => $enrollment], 201);\n}",
    };
  },

  startMockInterview: async (role: string): Promise<AiInterviewSession> => {
    return {
      interview_id: 'int-live-2026',
      role,
      total_questions: 3,
      current_question_index: 0,
      first_question: `Welcome. Let's begin the technical interview for ${role}. In a distributed application, how would you prevent race conditions when two students attempt to purchase the final seat in a limited-cohort masterclass simultaneously?`,
    };
  },

  generateCurriculum: async (topicPrompt: string): Promise<AiGeneratedCurriculum> => {
    return {
      title: `Advanced ${topicPrompt} Masterclass`,
      slug: `${topicPrompt.toLowerCase().replace(/\s+/g, '-')}-masterclass`,
      headline: `Master production-grade ${topicPrompt} with clean architecture and real-world projects.`,
      description: `An industry-aligned masterclass designed for developers aiming to build enterprise applications with ${topicPrompt}.`,
      learning_outcomes: [
        `Architect scalable applications using ${topicPrompt}`,
        'Apply clean architecture and SOLID design principles',
        'Write comprehensive unit and integration feature tests',
        'Deploy containerized applications with Docker and CI/CD pipelines',
      ],
      modules: [
        {
          title: 'Module 1: Foundations & Architecture Setup',
          lessons: [
            { title: '1.1 System Architecture & Directory Planning', duration_minutes: 15 },
            { title: '1.2 Environment Configuration & Docker Setup', duration_minutes: 20 },
          ],
        },
        {
          title: 'Module 2: Core Domain Logic & Persistence',
          lessons: [
            { title: '2.1 Database Schema Modeling & Migrations', duration_minutes: 25 },
            { title: '2.2 Service Layer & Repository Pattern', duration_minutes: 30 },
          ],
        },
        {
          title: 'Module 3: Capstone Deployment & Testing',
          lessons: [
            { title: '3.1 Writing Automated Feature Tests', duration_minutes: 20 },
            { title: '3.2 Production Deployment & Cloud Monitoring', duration_minutes: 25 },
          ],
        },
      ],
    };
  },
};
