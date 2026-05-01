const features = [
  {
    accent: "text-emerald-600",
    ring:   "border-emerald-200 bg-emerald-50",
    tag:    "Core Engine",
    tagColor: "text-emerald-700 border-emerald-200 bg-emerald-50",
    icon: (
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" aria-hidden>
        <path d="M10.5 2.5l2.5 4h4l-3 2.5 1.5 4.5-5-3-5 3 1.5-4.5-3-2.5h4l2.5-4Z"
          stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
      </svg>
    ),
    title: "AI-Powered Matching",
    body:  "Our NLP engine scores resumes 0–100 against job requirements, factoring in skills, experience context, and transferable competencies.",
  },
  {
    accent: "text-teal-600",
    ring:   "border-teal-200 bg-teal-50",
    tag:    "Real-Time",
    tagColor: "text-teal-700 border-teal-200 bg-teal-50",
    icon: (
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" aria-hidden>
        <path d="M3 10.5h15M10.5 3.5l7 7-7 7" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="3" cy="10.5" r="1.8" stroke="currentColor" strokeWidth="1.35" />
      </svg>
    ),
    title: "Real-Time Application Sync",
    body:  "Live status updates for every application — from submission to final decision. Candidates always know exactly where they stand.",
  },
  {
    accent: "text-sky-600",
    ring:   "border-sky-200 bg-sky-50",
    tag:    "No-Code",
    tagColor: "text-sky-700 border-sky-200 bg-sky-50",
    icon: (
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" aria-hidden>
        <rect x="3" y="3" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="1.35" />
        <path d="M7 8h7M7 11h5M7 14h6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      </svg>
    ),
    title: "SME-Friendly Interface",
    body:  "Recruiters post jobs in plain English. No technical jargon or complex configurations. AI handles the scoring rubric automatically.",
  },
  {
    accent: "text-amber-600",
    ring:   "border-amber-200 bg-amber-50",
    tag:    "Dual Portals",
    tagColor: "text-amber-700 border-amber-200 bg-amber-50",
    icon: (
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" aria-hidden>
        <circle cx="7.5" cy="7.5" r="4.5" stroke="currentColor" strokeWidth="1.35" />
        <circle cx="13.5" cy="13.5" r="4.5" stroke="currentColor" strokeWidth="1.35" />
      </svg>
    ),
    title: "Dual Portal System",
    body:  "Dedicated dashboards for recruiters and candidates with role-specific tools, analytics, messaging, and decision workflows.",
  },
  {
    accent: "text-rose-600",
    ring:   "border-rose-200 bg-rose-50",
    tag:    "NLP",
    tagColor: "text-rose-700 border-rose-200 bg-rose-50",
    icon: (
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" aria-hidden>
        <path d="M3 8.5A8.5 8.5 0 0118 8.5c0 4.7-3.8 8.5-8.5 8.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
        <circle cx="10.5" cy="8.5" r="2.5" stroke="currentColor" strokeWidth="1.35" />
        <path d="M3 8.5H6M3 13H8" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      </svg>
    ),
    title: "Natural Language Understanding",
    body:  "Beyond keyword matching — our AI understands context, synonyms, and transferable skills across industries and job families.",
  },
  {
    accent: "text-orange-600",
    ring:   "border-orange-200 bg-orange-50",
    tag:    "Fairness",
    tagColor: "text-orange-700 border-orange-200 bg-orange-50",
    icon: (
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" aria-hidden>
        <path d="M4 4h13v9H4V4Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
        <path d="M8 17h5M10.5 13v4" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
        <path d="M7 9l2 2 4-4" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Mandatory Feedback Loop",
    body:  "Recruiters are required to provide structured feedback on every application — creating a respectful and legally sound hiring process.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-28 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" aria-hidden />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-emerald-200/30 rounded-full blur-[130px] pointer-events-none" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-[11px] uppercase tracking-[0.15em] font-semibold mb-6">
            Features
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.025em] text-gray-900 mb-5">
            Everything You Need to{" "}
            <span className="gradient-text">Hire Smarter</span>
          </h2>
          <p className="text-gray-500 text-[17px] leading-relaxed max-w-[54ch] mx-auto">
            Six powerful capabilities working in concert to make every hire
            faster, fairer, and more effective.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <article
              key={i}
              className="reveal glass glass-hover rounded-2xl p-6 flex flex-col gap-5 group"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className={`w-11 h-11 rounded-xl border ${f.ring} ${f.accent} flex items-center justify-center flex-shrink-0`}>
                  {f.icon}
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.12em] font-bold border ${f.tagColor}`}>
                  {f.tag}
                </span>
              </div>
              <div className="space-y-2.5">
                <h3 className="text-gray-900 font-semibold text-[15px] leading-snug">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
