const problems = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="8.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M11 6.5v4.5l3 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "text-rose-600",
    ring: "border-rose-200 bg-rose-50",
    bar: "bg-rose-500",
    label: "Painfully Slow Screening",
    body: "Teams spend 23+ hours screening resumes per role, losing top candidates to faster-moving competitors before the first call.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M11 3L3 7.5v7L11 19l8-4.5v-7L11 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M11 3v16M3 7.5l8 4.5 8-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
    accent: "text-amber-600",
    ring: "border-amber-200 bg-amber-50",
    bar: "bg-amber-500",
    label: "Unconscious Bias",
    body: "Manual evaluation introduces bias at every stage — from resume formatting to names — creating inequitable outcomes and costly bad hires.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <rect x="3" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 10V7a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="11" cy="15" r="1.5" fill="currentColor" />
      </svg>
    ),
    accent: "text-sky-600",
    ring: "border-sky-200 bg-sky-50",
    bar: "bg-sky-500",
    label: "Zero Transparency",
    body: "Candidates apply into a black box. No feedback, no status updates, no explanation of rejection. It destroys your employer brand.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="8.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M11 6.5v1m0 7v1m-2.5-5.5a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    accent: "text-emerald-600",
    ring: "border-emerald-200 bg-emerald-50",
    bar: "bg-emerald-500",
    label: "Prohibitive Costs",
    body: "Agencies charge 15–25% of annual salary per hire. In-house teams burn weeks on tasks AI can perform in seconds for a fraction of the cost.",
  },
];

export default function Problem() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-200 bg-rose-50 text-rose-700 text-[11px] uppercase tracking-[0.15em] font-semibold mb-6">
            The Problem
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.025em] text-gray-900 mb-5">
            The Hiring Process Is{" "}
            <span className="gradient-text">Broken</span>
          </h2>
          <p className="text-gray-500 text-[17px] leading-relaxed max-w-[54ch] mx-auto">
            Every day companies lose great talent and candidates lose great
            opportunities — because the process is slow, biased, and opaque.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((p, i) => (
            <article
              key={i}
              className="reveal glass glass-hover rounded-2xl p-6 flex flex-col gap-5 group"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl border ${p.ring} ${p.accent} flex items-center justify-center flex-shrink-0`}>
                {p.icon}
              </div>

              {/* Copy */}
              <div className="space-y-2.5">
                <h3 className="text-gray-900 font-semibold text-[15px] leading-snug">{p.label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.body}</p>
              </div>

              {/* Accent bar (bottom) */}
              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="h-0.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${p.bar} transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:w-full`}
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
