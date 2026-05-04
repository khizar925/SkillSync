import type { Metadata } from "next";
import PublicPageLayout from "@/components/PublicPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — SmartHire",
  description: "How SmartHire collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "Information We Collect",
    body: "When you use SmartHire, we collect your email address, name, and role (recruiter or candidate). Recruiters may also provide job listings. Candidates may upload resumes (PDF or DOCX format). We also collect application data and AI resume scoring results generated through normal use of the platform.",
  },
  {
    title: "How We Use Your Information",
    body: "Your information is used to provide the SmartHire recruitment platform, including AI-powered resume scoring, automated status emails to applicants, and platform analytics to improve the product. We do not use your data for advertising or sell it to third parties.",
  },
  {
    title: "Data Storage",
    body: "Your data is stored securely in Supabase, hosted on AWS infrastructure. Data is encrypted at rest and in transit. Uploaded resumes are stored in Supabase Storage with per-user private buckets, ensuring files are only accessible to authorized parties.",
  },
  {
    title: "Data Sharing",
    body: "We do not sell, trade, or share your personal information with any third parties. Period.",
  },
  {
    title: "Data Retention",
    body: "We retain your data for as long as your account is active. You may request deletion of your account and all associated data at any time from your account settings. We will process deletion requests promptly.",
  },
  {
    title: "Your Rights",
    body: "You may request to view, correct, or delete your data at any time by emailing us. We will process your request within 7 business days.",
  },
  {
    title: "Cookies",
    body: "SmartHire uses Clerk authentication cookies to manage your login session. We also use Vercel Analytics, which collects only aggregate, anonymized usage data — no personal identifiers. We do not set any third-party tracking cookies.",
  },
  {
    title: "Changes to This Policy",
    body: "If we make material changes to this policy, we will notify users by email before the changes take effect.",
  },
];

export default function PrivacyPage() {
  return (
    <PublicPageLayout>
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
          SmartHire is an AI-powered recruitment platform. This policy explains
          what data we collect when you use our platform and how we handle it.
          We believe in plain English, so there is no legal jargon here.
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
    </PublicPageLayout>
  );
}
