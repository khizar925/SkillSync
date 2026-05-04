-- SmartHire Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/mwqdeebauodfuglrbfji/sql

-- ─── jobs ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS jobs (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recruiter_id     TEXT NOT NULL,
  job_title        TEXT NOT NULL,
  company_name     TEXT NOT NULL,
  job_location     TEXT NOT NULL,
  employment_type  TEXT NOT NULL,
  job_description  TEXT NOT NULL,
  skills           TEXT NOT NULL,
  experience_level TEXT NOT NULL,
  status           TEXT NOT NULL DEFAULT 'active',
  applicants_count INTEGER NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── applications ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS applications (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id               UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  candidate_id         TEXT,
  full_name            TEXT NOT NULL,
  email                TEXT NOT NULL,
  phone                TEXT,
  education_level      TEXT,
  years_of_experience  NUMERIC,
  cover_letter         TEXT,
  resume_url           TEXT NOT NULL,
  resume_text          TEXT,
  status               TEXT NOT NULL DEFAULT 'applied',
  rejection_feedback   TEXT,
  interview_date       TEXT,
  interview_time       TEXT,
  interview_type       TEXT,
  interview_link       TEXT,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── scores ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS scores (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id         UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  score          DOUBLE PRECISION NOT NULL,
  breakdown      JSONB,
  scored_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── candidate_profiles ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS candidate_profiles (
  candidate_id        TEXT PRIMARY KEY,
  full_name           TEXT,
  email               TEXT,
  phone               TEXT,
  address             TEXT,
  education_level     TEXT,
  years_of_experience NUMERIC,
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── feedback ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS feedback (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    TEXT NOT NULL,
  role       TEXT,
  rating     SMALLINT,
  category   TEXT,
  message    TEXT,
  page       TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── indexes ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_jobs_recruiter_id        ON jobs(recruiter_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status              ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_applications_job_id      ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_candidate   ON applications(candidate_id);
CREATE INDEX IF NOT EXISTS idx_applications_status      ON applications(status);
CREATE INDEX IF NOT EXISTS idx_scores_application_id    ON scores(application_id);
CREATE INDEX IF NOT EXISTS idx_scores_job_id            ON scores(job_id);

-- ─── updated_at trigger ───────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER candidate_profiles_updated_at
  BEFORE UPDATE ON candidate_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
