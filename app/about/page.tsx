import PublicPageLayout from '@/components/PublicPageLayout';

export const metadata = {
  title: 'About — SmartHire',
  description: 'The story behind SmartHire and why we\'re fixing hiring for small agencies.',
};

export default function AboutPage() {
  return (
    <PublicPageLayout>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

        {/* Mission */}
        <div className="mb-20">
          <p className="text-xs uppercase tracking-widest text-emerald-600 font-semibold mb-4">Our Mission</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.08]">
            Hiring shouldn&apos;t feel like<br />
            <span className="text-emerald-600">shouting into a void.</span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed max-w-[60ch]">
            SmartHire exists to break the mutual deception loop in hiring — where candidates ghost companies,
            companies ghost candidates, and both sides lose. We&apos;re building the infrastructure that makes
            every hire faster, fairer, and fully transparent.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-20" />

        {/* Founder story */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
          <div>
            <p className="text-xs uppercase tracking-widest text-emerald-600 font-semibold mb-4">The Founder</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Built by someone who lived the problem.</h2>

            <div className="space-y-4 text-gray-500 leading-relaxed">
              <p>
                I&apos;m <span className="text-gray-900 font-semibold">Khizar Qamar</span>, Founder &amp; CEO of SmartHire.
              </p>
              <p>
                I&apos;ve been on both sides of the hiring table — applying into black holes with zero feedback,
                and watching recruiters drown in spreadsheets trying to manage hundreds of resumes manually.
                The pain is real on both sides, and it&apos;s not because people aren&apos;t trying.
                It&apos;s because the tools are broken.
              </p>
              <p>
                Small recruiting agencies — 2 to 5 people — don&apos;t have the budget for enterprise ATS platforms.
                So they run on Excel. They send interview invites one by one. They forget to follow up.
                Candidates never hear back. Good people get missed.
              </p>
              <p>
                I built SmartHire to give small agencies the same leverage that Fortune 500 companies have —
                AI resume scoring, automated candidate updates, bulk processing — without the enterprise price tag.
              </p>
              <p className="text-gray-900 font-medium">
                No team. No investors. Just a problem worth fixing.
              </p>
            </div>
          </div>

          {/* Stats / values */}
          <div className="space-y-6">
            {[
              {
                stat: '92%',
                label: 'of candidates get ghosted after applying',
                color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
              },
              {
                stat: '23h+',
                label: 'average time spent screening per role — manually',
                color: 'bg-teal-50 border-teal-200 text-teal-700',
              },
              {
                stat: '4/4',
                label: 'recruiters validated bulk upload as their #1 need',
                color: 'bg-sky-50 border-sky-200 text-sky-700',
              },
            ].map((item) => (
              <div key={item.stat} className={`rounded-2xl border p-6 ${item.color}`}>
                <p className="text-4xl font-bold mb-1">{item.stat}</p>
                <p className="text-sm opacity-80">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="h-px bg-gray-100 mb-20" />

        <div className="mb-20">
          <p className="text-xs uppercase tracking-widest text-emerald-600 font-semibold mb-4">What We Stand For</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Our principles.</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: 'Radical transparency',
                body: 'Every candidate knows where they stand. Every decision has a reason. No black boxes.',
              },
              {
                title: 'Fairness by default',
                body: 'Skill-based scoring, not keyword matching. Bias audit logs ship before predictive match.',
              },
              {
                title: 'Built for the underdog',
                body: 'Small agencies deserve the same tools as big companies. Free tier, no credit card.',
              },
            ].map((v) => (
              <div key={v.title} className="p-6 rounded-2xl border border-gray-100 bg-gray-50">
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </PublicPageLayout>
  );
}
