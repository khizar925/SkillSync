const recruiterBenefits = [
  "Reduce screening time by up to 60%",
  "Eliminate unconscious bias with objective AI scoring",
  "Get an instantly ranked, shortlisted candidate pool",
  "Built-in applicant tracking system (ATS)",
  "Mandatory feedback tools to stay legally compliant",
  "Detailed hiring analytics and conversion insights",
];

const candidateBenefits = [
  "Receive an instant 0–100 match score on every application",
  "Know your exact application status in real-time",
  "Guaranteed structured feedback from every recruiter",
  "Fair, algorithm-driven, bias-free evaluation",
  "Only see and apply to genuinely matched opportunities",
  "Detailed skill gap analysis to grow your profile",
];

function CheckItem({ text, color }: { text: string; color: string }) {
  return (
    <li className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
      <svg
        width="17" height="17" viewBox="0 0 17 17" fill="none"
        aria-hidden className={`flex-shrink-0 mt-0.5 ${color}`}
      >
        <circle cx="8.5" cy="8.5" r="7.5" fill="currentColor" fillOpacity="0.15" />
        <path d="M5 8.5L7.5 11L12 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {text}
    </li>
  );
}

export default function Benefits() {
  return (
    <section id="benefits" className="relative py-28 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" aria-hidden />

      {/* Ambient glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-[130px] pointer-events-none" aria-hidden />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-teal-200/25 rounded-full blur-[130px] pointer-events-none" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-[11px] uppercase tracking-[0.15em] font-semibold mb-6">
            Benefits
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.025em] text-gray-900 mb-5">
            Built for{" "}
            <span className="gradient-text">Everyone</span>{" "}
            in the Hiring Chain
          </h2>
          <p className="text-gray-500 text-[17px] leading-relaxed max-w-[52ch] mx-auto">
            Whether you&apos;re filling a role or looking for your next opportunity,
            SmartHire is designed to give you the advantage.
          </p>
        </div>

        {/* Two columns */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Recruiters */}
          <div className="reveal flex flex-col gap-0">
            {/* Double-bezel card */}
            <div className="bezel flex-1">
              <div className="bg-white rounded-[calc(1.5rem-6px)] p-8 flex flex-col gap-7 h-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                      <path d="M16 20v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.35" />
                      <path d="M22 20v-2a4 4 0 00-3-3.87M15 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold text-xl tracking-[-0.02em]">For Recruiters</h3>
                    <p className="text-gray-400 text-sm mt-0.5">Close roles faster with AI-ranked candidates</p>
                  </div>
                </div>

                <ul className="flex flex-col gap-3.5">
                  {recruiterBenefits.map((b, i) => (
                    <CheckItem key={i} text={b} color="text-emerald-600" />
                  ))}
                </ul>

                <a
                  href="#features"
                  className="inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm mt-auto glow-btn self-start"
                >
                  Start Hiring Smarter
                  <span className="w-7 h-7 rounded-lg bg-black/10 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Candidates */}
          <div className="reveal flex flex-col gap-0" style={{ animationDelay: "0.1s" }}>
            <div className="bezel flex-1" style={{ background: "rgba(204, 251, 241, 0.3)", borderColor: "rgba(153, 246, 228, 0.6)" }}>
              <div className="bg-white rounded-[calc(1.5rem-6px)] p-8 flex flex-col gap-7 h-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl border border-teal-200 bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                      <path d="M19 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="11" cy="7" r="4" stroke="currentColor" strokeWidth="1.35" />
                      <path d="M15 3.5L16.5 5 20 2" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold text-xl tracking-[-0.02em]">For Candidates</h3>
                    <p className="text-gray-400 text-sm mt-0.5">Apply with confidence, get real feedback</p>
                  </div>
                </div>

                <ul className="flex flex-col gap-3.5">
                  {candidateBenefits.map((b, i) => (
                    <CheckItem key={i} text={b} color="text-teal-600" />
                  ))}
                </ul>

                <a
                  href="/sign-in"
                  className="inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm mt-auto glow-btn self-start"
                  style={{ transition: "box-shadow 0.25s cubic-bezier(0.32,0.72,0,1), transform 0.2s cubic-bezier(0.32,0.72,0,1)" }}
                >
                  Find My Next Role
                  <span className="w-7 h-7 rounded-lg bg-black/10 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
