'use client';

import { useState } from 'react';
import PublicPageLayout from '@/components/PublicPageLayout';

const faqs = [
  {
    category: 'AI Scoring',
    items: [
      {
        q: 'How does the AI scoring work?',
        a: 'SmartHire uses transformer embeddings and cosine similarity to score resumes 0–100 against a job description. It goes beyond keyword matching — it understands context, synonyms, and transferable skills. Every score includes a breakdown: skills match, experience depth, and role fit.',
      },
      {
        q: 'Is the scoring biased?',
        a: 'Scoring is based on skills and experience alignment with the job description — not names, photos, or demographics. We\'re shipping a bias audit log in Phase 2 so every decision is logged and exportable for compliance review.',
      },
      {
        q: 'How long does scoring take?',
        a: 'Under 3 seconds per resume. Bulk uploads of 50+ resumes are processed asynchronously — you get a ranked shortlist without waiting.',
      },
    ],
  },
  {
    category: 'Pricing & Limits',
    items: [
      {
        q: 'How much does SmartHire cost?',
        a: 'Free tier: 50 scored applications per month, all features included. No credit card required. Paid tier ($49/month) unlocks unlimited applications, bias audit logs, and API access. Pricing is final before Phase 2 launch.',
      },
      {
        q: 'What counts toward the 50 application limit?',
        a: 'Only scored applications count — not every submission received. If a candidate applies but you don\'t trigger scoring, it doesn\'t use your quota.',
      },
      {
        q: 'Can I try it before committing?',
        a: 'Yes. The free tier is permanent — not a trial. You get 50 scored applications every month with no expiry.',
      },
    ],
  },
  {
    category: 'Files & Data',
    items: [
      {
        q: 'What file formats do you support?',
        a: 'PDF and DOCX. Both are parsed server-side — PDF via pdf-parse, DOCX via mammoth. Text is extracted and sent to the NLP scoring engine.',
      },
      {
        q: 'Is my data secure?',
        a: 'All data is stored in Supabase (Postgres) with row-level security. Resumes are stored in Supabase Storage with per-user buckets. We never share candidate data with third parties or use it to train models.',
      },
      {
        q: 'Can I delete my data?',
        a: 'Yes. You can delete any job, application, or your account at any time. All associated data is permanently removed.',
      },
    ],
  },
  {
    category: 'For Recruiters',
    items: [
      {
        q: 'Do candidates need a SmartHire account to apply?',
        a: 'No. Candidates apply via a public job link — no account needed. Recruiters have accounts; candidates can optionally create profiles to track their applications.',
      },
      {
        q: 'What is the Automated Status Engine?',
        a: 'Every time you move a candidate through the pipeline (applied → reviewed → shortlisted → interviewed → decided), they automatically receive an email update. No manual follow-up needed. This is what eliminates ghosting.',
      },
      {
        q: 'Can I upload resumes I already have?',
        a: 'Yes. Bulk resume upload lets you upload 50+ PDFs at once — SmartHire scores all of them and returns a ranked shortlist. No re-posting required.',
      },
    ],
  },
  {
    category: 'Platform',
    items: [
      {
        q: 'When is SmartHire launching?',
        a: 'Currently in active development. MVP targets small Pakistani recruiting agencies in the first cohort. Sign up to get notified when we open.',
      },
      {
        q: 'What industries does it work for?',
        a: 'Any industry where skills can be described in a job description. Best fit: tech, finance, operations, marketing. The NLP engine understands cross-industry transferable skills.',
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-gray-900 font-medium text-sm sm:text-base">{q}</span>
        <span className={`flex-shrink-0 w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center transition-transform duration-200 ${open ? 'rotate-45 border-emerald-400 bg-emerald-50' : ''}`}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M5 2V8M2 5H8" stroke={open ? '#059669' : '#9ca3af'} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="text-gray-500 text-sm leading-relaxed pb-5">{a}</p>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <PublicPageLayout>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-widest text-emerald-600 font-semibold mb-4">FAQ</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Common questions.
          </h1>
          <p className="text-gray-500 text-lg">
            Everything you need to know about SmartHire.{' '}
            <a href="mailto:contact@smarthire.website" className="text-emerald-600 hover:underline">
              Can&apos;t find your answer? Email us.
            </a>
          </p>
        </div>

        <div className="space-y-10">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2 pb-2 border-b border-gray-100">
                {section.category}
              </h2>
              <div>
                {section.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h2>
          <p className="text-gray-500 text-sm mb-4">We respond within 24 hours.</p>
          <a
            href="mailto:contact@smarthire.website"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors"
          >
            contact@smarthire.website
          </a>
        </div>
      </main>
    </PublicPageLayout>
  );
}
