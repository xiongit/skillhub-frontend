export interface User {
  id: number;
  uuid: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive' | 'suspended';
  avatar_url?: string;
  headline?: string;
  bio?: string;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  courses_count?: number;
}

export interface CoursePricing {
  price: number;
  discount_price?: number | null;
  effective_price: number;
  is_free: boolean;
  currency: string;
}

export interface Instructor {
  id: number;
  name: string;
  avatar_url?: string;
  headline?: string;
  bio?: string;
  is_primary?: boolean;
}

export interface QuestionOption {
  id: number;
  option_text: string;
  is_correct?: boolean;
}

export interface QuizQuestion {
  id: number;
  question_text: string;
  type: 'mcq' | 'multiple_answer' | 'true_false';
  marks: number;
  explanation?: string;
  options: QuestionOption[];
}

export interface LessonQuiz {
  id: number;
  lesson_id: number;
  title: string;
  instructions?: string;
  passing_score_percentage: number;
  time_limit_minutes?: number;
  questions: QuizQuestion[];
}

export interface Lesson {
  id: number;
  module_id: number;
  title: string;
  slug: string;
  type: 'video' | 'quiz' | 'document' | 'assignment';
  duration_minutes: number;
  sort_order: number;
  is_free_preview: boolean;
  is_completed?: boolean;
  is_locked?: boolean;
  video_url?: string;
  video_duration_seconds?: number;
  quiz?: LessonQuiz;
}

export interface Module {
  id: number;
  course_id: number;
  title: string;
  sort_order: number;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  uuid: string;
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  language: string;
  thumbnail_url?: string;
  promo_video_url?: string;
  status: 'draft' | 'published';
  total_duration_minutes: number;
  total_lessons_count: number;
  enrollment_count: number;
  average_rating: number;
  reviews_count?: number;
  category?: Category;
  pricing?: CoursePricing;
  instructors?: Instructor[];
  modules?: Module[];
  requirements?: string[];
  learning_outcomes?: string[];
}

export interface LessonProgress {
  id: number;
  enrollment_id: number;
  lesson_id: number;
  is_completed: boolean;
  watch_time_seconds: number;
  completed_at?: string;
}

export interface Enrollment {
  id: number;
  user_id: number;
  course_id: number;
  status: 'active' | 'completed' | 'reset_required';
  progress_percentage: number;
  enrolled_at: string;
  completed_at?: string;
  course?: Course;
}

export interface StudentNote {
  id: string;
  lesson_id: number;
  timestamp_seconds: number;
  content: string;
  created_at: string;
}

export interface Bookmark {
  id: string;
  course_id: number;
  lesson_id: number;
  lesson_title: string;
  course_title: string;
  created_at: string;
}

export interface ExamAttempt {
  id: number;
  exam_id: number;
  user_id: number;
  attempt_number: number;
  score_obtained: number;
  total_possible_score: number;
  percentage: number;
  status: 'in_progress' | 'submitted' | 'passed' | 'failed';
  triggered_course_reset: boolean;
  started_at: string;
  submitted_at?: string;
}

export interface Exam {
  id: number;
  course_id: number;
  title: string;
  description?: string;
  pass_percentage: number;
  duration_minutes: number;
  total_questions_to_pick: number;
  max_attempts: number;
  questions?: QuizQuestion[];
  course?: Course;
}

export interface Certificate {
  id: number;
  uuid: string;
  certificate_number: string;
  user_id: number;
  course_id: number;
  issued_at: string;
  pdf_file_path?: string;
  user?: User;
  course?: Course;
}

export interface Coupon {
  id: number;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  min_order_amount: number;
}

export interface Order {
  id: number;
  uuid: string;
  order_number: string;
  total_amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  payment_method: 'bkash' | 'nagad' | 'sslcommerz' | 'stripe';
}

export interface DiscussionReply {
  id: number;
  user_name: string;
  avatar_url?: string;
  content: string;
  created_at: string;
}

export interface DiscussionPost {
  id: number;
  user_name: string;
  avatar_url?: string;
  content: string;
  created_at: string;
  likes_count: number;
  replies: DiscussionReply[];
}

export interface Assignment {
  id: number;
  lesson_id: number;
  title: string;
  instruction: string;
  total_marks: number;
  pass_marks: number;
  deadline_at?: string;
}

export interface AssignmentSubmission {
  id: number;
  assignment_id: number;
  user_id: number;
  submission_text: string;
  attachment_urls?: string[];
  marks_awarded?: number;
  status: 'submitted' | 'in_review' | 'evaluated' | 'resubmission_required';
  feedback?: string;
  evaluated_at?: string;
}

export interface Skill {
  id: number;
  name: string;
  slug: string;
  category: string;
  proficiency_level?: 'beginner' | 'intermediate' | 'advanced';
  is_verified?: boolean;
}

export interface LearningPath {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  color_gradient?: string;
  difficulty: string;
  courses_count: number;
  total_hours: number;
  courses: Course[];
}

export interface Badge {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  points_required: number;
  awarded_at?: string;
}

export interface LeaderboardEntry {
  id: number;
  name: string;
  avatar_url?: string;
  total_points: number;
  rank: number;
}

export interface AffiliateStats {
  referral_code: string;
  commission_rate_percentage: number;
  total_earnings: number;
  current_balance: number;
  referrals_count: number;
}

export interface SubscriptionPlan {
  id: number;
  name: string;
  slug: string;
  price: number;
  billing_cycle: 'monthly' | 'annual';
  features: string[];
}

export interface CourseBundle {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  discount_price: number;
  courses: Course[];
}

export interface JobPost {
  id: number;
  company_name: string;
  company_logo?: string;
  title: string;
  slug: string;
  type: 'full_time' | 'part_time' | 'internship' | 'contract';
  workplace: 'on_site' | 'remote' | 'hybrid';
  location: string;
  salary_range: string;
  requirements: string[];
  deadline_at: string;
}

export interface MentorProfile {
  id: number;
  name: string;
  avatar_url: string;
  headline: string;
  bio: string;
  hourly_rate: number;
  skills: string[];
  available_slots: { id: number; start_time: string; end_time: string }[];
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface AiStudyTask {
  id: number;
  type: 'lecture' | 'practice' | 'quiz';
  title: string;
  duration: string;
  completed: boolean;
}

export interface AiStudyPlan {
  date: string;
  focus_area: string;
  completion_target_hours: number;
  tasks: AiStudyTask[];
  ai_insight: string;
}

export interface AiCodeReviewResult {
  score: number;
  summary: string;
  vulnerabilities: string[];
  suggestions: string[];
  refactored_code: string;
}

export interface AiInterviewSession {
  interview_id: string;
  role: string;
  total_questions: number;
  current_question_index: number;
  first_question: string;
}

export interface AiInterviewScorecard {
  overall_score: number;
  hiring_decision: string;
  rubric_scores: {
    technical_depth: number;
    architecture_cleanliness: number;
    communication_clarity: number;
    error_handling: number;
  };
  strengths: string[];
  improvement_areas: string[];
  suggested_learning_material: string;
}

export interface AiGeneratedCurriculum {
  title: string;
  slug: string;
  headline: string;
  description: string;
  learning_outcomes: string[];
  modules: {
    title: string;
    lessons: { title: string; duration_minutes: number }[];
  }[];
}

export interface CrmLead {
  id: number;
  name: string;
  email: string;
  phone?: string;
  course_name?: string;
  status: 'new_lead' | 'contacted' | 'interested' | 'trial' | 'purchased' | 'lost';
  lead_score: number;
  created_at: string;
}

export interface SalesFunnelStage {
  stage: string;
  count: number;
  percentage_of_top: number;
  drop_off_percentage: number;
}

export interface SalesFunnelMetrics {
  total_visitors: number;
  stages: SalesFunnelStage[];
  overall_visitor_to_purchase_rate: number;
  gross_funnel_revenue: number;
}

export interface AbandonedCartSummary {
  total_abandoned_carts: number;
  nudges_dispatched: number;
  discounts_offered: number;
  successfully_recovered_carts: number;
  recovery_rate_percentage: number;
  total_recovered_revenue_bdt: number;
}

export interface BiExecutiveMetrics {
  mrr: number;
  arr: number;
  active_subscribers: number;
  arpu: number;
  monthly_churn_rate_percentage: number;
  customer_lifetime_value_ltv: number;
  customer_acquisition_cost_cac: number;
  ltv_to_cac_ratio: number;
  net_revenue_retention_nrr: number;
}

export interface CohortItem {
  cohort: string;
  size: number;
  retention: number[];
}

export interface SupportTicketItem {
  id: number;
  ticket_number: string;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  sla_due_at?: string;
  ai_suggested_reply?: string;
  created_at: string;
}

export interface CorporateDepartmentTraining {
  name: string;
  code: string;
  employees_count: number;
  completion_rate: number;
  active_course: string;
}

export interface CorporateOverview {
  organization_name: string;
  total_employees: number;
  active_trainees: number;
  mandatory_courses_assigned: number;
  overall_compliance_rate: number;
  departments: CorporateDepartmentTraining[];
}

export interface OfficialCertificationVerification {
  certificate_id: string;
  student_name: string;
  certification_title: string;
  issuing_authority: string;
  issued_at: string;
  expires_at: string;
  status: 'valid' | 'expired' | 'revoked';
  grade: string;
  verified_skills: string[];
  qr_verification_url: string;
}

export interface LiveClassSession {
  id: number;
  title: string;
  course_title: string;
  instructor_name: string;
  provider: 'zoom' | 'meet';
  scheduled_start_at: string;
  duration_minutes: number;
  meeting_url: string;
  status: 'scheduled' | 'live' | 'ended';
  attendance_count: number;
}

export interface WhiteLabelBranding {
  brand_title: string;
  logo_url?: string;
  primary_color: string;
  accent_color: string;
  email_sender_name?: string;
}

export interface CurrencyConversionResult {
  base_amount_bdt: number;
  target_currency: string;
  exchange_rate: number;
  converted_amount: number;
  formatted: string;
}




