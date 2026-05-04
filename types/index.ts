export type UserRole = 'recruiter' | 'candidate';

export interface Job {
  id: string;
  recruiter_id: string;
  job_title: string;
  company_name: string;
  job_location: string;
  employment_type: string;
  job_description: string;
  skills: string;
  experience_level: string;
  status: 'active' | 'closed' | 'draft';
  created_at: string;
  applicants_count: number;
}

export interface ScoreBreakdown {
  semantic: number;
  skill: number;
  category: number;
  mode: string;
}

export interface Application {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  education_level: string;
  years_of_experience: number;
  cover_letter: string;
  resume_url: string;
  rejection_feedback?: string;
  interview_date?: string;
  interview_time?: string;
  interview_type?: string;
  interview_link?: string;
  status: string;
  created_at: string;
  scores?: {
    score: number;
    breakdown?: ScoreBreakdown | null;
  }[];
}
