const steps = [
  {
    num: "01",
    accent: "text-emerald-600",
    ring:   "border-emerald-200 bg-emerald-50",
    dot:    "bg-emerald-500",
    label:  "Post Your Job",
    body:   "Describe the role in plain English. Our AI automatically extracts requirements and builds a precision scoring rubric — no templates needed.",
    bullets: [
      "Plain-language job descriptions",
      "Auto-generated scoring criteria",
      "Live preview of requirements",
    ],
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
        <rect x="4" y="4" width="18" height="18" rx="3.5" stroke="currentColor" strokeWidth="1.35" />
        <path d="M9 10h8M9 13h6M9 16h7" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "02",
    accent: "text-teal-600",
    ring:   "border-teal-200 bg-teal-50",
    dot:    "bg-teal-500",
    label:  "AI Scores & Ranks",
    body:   "Candidates apply and receive an instant 0–100 match score. You get a ranked, bias-free shortlist in seconds — not weeks.",
    bullets: [
      "0–100 NLP match score",
      "Ranked candidate shortlist",
      "Skill gap analysis per candidate",
    ],
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
        <circle cx="13" cy="13" r="9" stroke="currentColor" strokeWidth="1.35" />
        <path d="M13 8.5v4.5l3.5 3" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.5 5L6.5 3.5M17.5 5L19.5 3.5M13 4V2" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "03",
    accent: "text-sky-600",
    ring:   "border-sky-200 bg-sky-50",
    dot:    "bg-sky-500",
    label:  "Track & Decide",
    body:   "Both parties get real-time status updates. Schedule interviews, exchange feedback, and close offers — all within SmartHire.",
    bullets: [
      "Live status for candidates",
      "In-platform interview scheduling",
      "Mandatory structured feedback",
    ],
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
        <path d="M4 13h18M4 8h18M4 18h11" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
        <circle cx="21" cy="18" r="3.5" stroke="currentColor" strokeWidth="1.35" />
        <path d="M19.5 18l1.5 1.5L23 16.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-16 sm:py-24 lg:py-28 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-16 lg:mb-20 reveal">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-200 bg-teal-50 text-teal-700 text-[11px] uppercase tracking-[0.15em] font-semibold mb-5 sm:mb-6">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.025em] text-gray-900 mb-4 sm:mb-5">
            Up and Running in{" "}
            <span className="gradient-text">Minutes</span>
          </h2>
          <p className="text-gray-500 text-base sm:text-[17px] leading-relaxed max-w-[52ch] mx-auto">
            Three simple steps from job posting to the right hire — powered by
            AI, designed for humans.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {/* Connector line (desktop only) */}
          <div
            className="hidden lg:block absolute top-[2.125rem] left-[2.125rem] right-[calc(33.33%-3.5rem)] h-px bg-gradient-to-r from-emerald-500/70 via-teal-500/70 to-sky-500/70"
            aria-hidden
          />

          {steps.map((s, i) => (
            <div
              key={i}
              className="reveal relative z-10 flex flex-col gap-4 sm:gap-6"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Step badge + icon */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative z-10 w-14 h-14 sm:w-[68px] sm:h-[68px] flex-shrink-0">
                  <div className="bezel w-full h-full flex items-center justify-center">
                    <div className={`w-full h-full rounded-[calc(1.5rem-6px)] bg-white flex items-center justify-center ${s.accent} shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]`}>
                      {s.icon}
                    </div>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.15em] font-bold border ${s.ring} ${s.accent}`}>
                  Step {s.num}
                </span>
              </div>

              {/* Content card */}
              <div className="glass glass-hover rounded-2xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 flex-1">
                <h3 className="text-gray-900 font-bold text-lg sm:text-xl tracking-[-0.02em]">{s.label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.body}</p>
                <ul className="flex flex-col gap-2 sm:gap-2.5 mt-0.5 sm:mt-1">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-gray-600 text-sm">
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} mt-[7px] flex-shrink-0`} aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
