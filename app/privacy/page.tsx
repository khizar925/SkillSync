import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — SkillSync",
  description: "How SkillSync collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "Information We Collect",
    body: "When you join our waitlist, we collect your email address and your role (recruiter or candidate). We collect no other personal data.",
  },
  {
    title: "How We Use Your Information",
    body: "Your email and role are used solely to notify you when SkillSync launches and to send relevant product updates. We do not use your data for advertising or sell it to third parties.",
  },
  {
    title: "Data Storage",
    body: "Your data is stored securely in a cloud database (Supabase) hosted on AWS infrastructure in the EU/US region. Data is encrypted at rest and in transit.",
  },
  {
    title: "Data Sharing",
    body: "We do not sell, trade, or share your personal information with any third parties. Period.",
  },
  {
    title: "Data Retention",
    body: "We retain your waitlist data until SkillSync launches and you are onboarded, or until you request deletion — whichever comes first.",
  },
  {
    title: "Your Rights",
    body: "You may request to view, correct, or delete your data at any time by emailing us. We will process your request within 7 business days.",
  },
  {
    title: "Cookies",
    body: "This website does not use tracking cookies or analytics cookies. No third-party cookies are set.",
  },
  {
    title: "Changes to This Policy",
    body: "If we make material changes to this policy, we will notify waitlist members by email before the changes take effect.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M8 2L5 6H2L4.5 8.5L3.5 12L8 9.5L12.5 12L11.5 8.5L14 6H11L8 2Z"
                  fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-bold text-gray-900 tracking-tight">
              Skill<span className="text-emerald-600">Sync</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-12">
          <p className="text-emerald-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Legal
          </p>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm">
            Last updated:{" "}
            <time dateTime="2026-04-24">April 24, 2026</time>
          </p>
        </div>

        <p className="text-gray-600 leading-relaxed mb-12 text-[15px]">
          SkillSync is a waitlist-stage product. This policy explains what data we
          collect when you join our waitlist and how we handle it. We believe in
          plain English, so there is no legal jargon here.
        </p>

        <div className="space-y-10">
          {sections.map((s, i) => (
            <div key={i} className="border-t border-gray-100 pt-8">
              <h2 className="text-gray-900 font-semibold text-lg mb-3">
                {i + 1}. {s.title}
              </h2>
              <p className="text-gray-500 leading-relaxed text-[15px]">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
