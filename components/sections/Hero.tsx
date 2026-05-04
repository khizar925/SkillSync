const skills = ["React", "TypeScript", "Node.js", "GraphQL"];

const avatarColors = [
  "bg-emerald-600",
  "bg-teal-600",
  "bg-sky-600",
  "bg-amber-600",
  "bg-rose-600",
];
const avatarLetters = ["A", "B", "C", "D", "E"];

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-24 sm:pt-28 pb-16 sm:pb-20 overflow-hidden">

      {/* Dot-grid texture */}
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden />

      {/* Glow orbs */}
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-emerald-300/25 rounded-full blur-[160px] pointer-events-none" aria-hidden />
      <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-teal-300/20 rounded-full blur-[140px] pointer-events-none" aria-hidden />
      <div className="absolute -bottom-20 left-1/3 w-[500px] h-[300px] bg-emerald-200/20 rounded-full blur-[100px] pointer-events-none" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-24 items-center">

          {/* ── Left: Copy ── */}
          <div className="space-y-6 sm:space-y-8">

            {/* Eyebrow tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-[11px] uppercase tracking-[0.08em] sm:tracking-[0.15em] font-semibold animate-fade-in max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" aria-hidden />
              <span className="sm:hidden truncate">Now in Beta</span>
              <span className="hidden sm:inline">AI-Powered Recruitment — Now in Beta</span>
            </div>

            {/* Headline */}
            <h1
              className="text-[2.25rem] sm:text-5xl lg:text-[64px] font-bold tracking-[-0.03em] leading-[1.06] text-gray-900 animate-fade-up"
              style={{ animationDelay: "0.08s" }}
            >
              Hire Smart with{" "}
              <span className="gradient-text">AI</span>
              {", "}
              Powered by AI
            </h1>

            {/* Body */}
            <p
              className="text-base sm:text-[17px] text-gray-500 leading-[1.7] max-w-[52ch] animate-fade-up"
              style={{ animationDelay: "0.18s" }}
            >
              NLP-powered resume scoring (0–100), real-time application tracking,
              and separate portals for recruiters and candidates. Reduce hiring
              time by{" "}
              <span className="text-emerald-600 font-semibold">40–60%</span>.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-3 animate-fade-up"
              style={{ animationDelay: "0.28s" }}
            >
              <a
                href="#features"
                className="inline-flex items-center justify-between gap-3 pl-6 pr-2 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base glow-btn"
              >
                Start Hiring Smarter
                <span className="w-9 h-9 rounded-lg bg-black/10 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-7 py-[13px] rounded-xl border border-gray-300 hover:border-emerald-300 hover:bg-emerald-50 text-gray-700 font-semibold text-base transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98]"
              >
                See How It Works
              </a>
            </div>

            {/* Social proof */}
            <div
              className="flex flex-wrap items-center gap-x-3 gap-y-2 animate-fade-up"
              style={{ animationDelay: "0.38s" }}
            >
            </div>
          </div>

          {/* ── Right: AI Score Card (double-bezel) ── */}
          <div
            className="relative flex justify-center lg:justify-end animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative py-6 sm:py-8 lg:py-0">

              {/* Background depth card — desktop only (2-col layout) */}
              <div className="hidden lg:block absolute top-10 -right-2 w-56 opacity-60 animate-float-slow z-0" aria-hidden>
                <div className="bezel">
                  <div className="bg-white rounded-[calc(1.5rem-6px)] p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-gray-800 text-xs font-medium">New Application</span>
                    </div>
                    <p className="text-gray-400 text-xs">Marcus Lee — TechCorp SWE</p>
                    <div className="mt-2.5 h-1 rounded-full bg-gray-100">
                      <div className="h-full w-4/5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-right text-emerald-600 text-xs mt-1.5 font-semibold">87 / 100</p>
                  </div>
                </div>
              </div>

              {/* Main floating card — double-bezel */}
              <div className="relative z-10 animate-float">
                {/* Outer shell */}
                <div className="bezel shadow-2xl shadow-emerald-900/10">
                  {/* Inner core */}
                  <div className="bg-white rounded-[calc(1.5rem-6px)] p-4 sm:p-6 w-[264px] sm:w-72 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">

                    {/* Card header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/25 flex-shrink-0">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                          <circle cx="9" cy="9" r="6.5" stroke="white" strokeWidth="1.5" />
                          <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 text-sm font-semibold">AI Analysis Complete</p>
                        <p className="text-gray-400 text-xs">Processed in 2.4 seconds</p>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" aria-hidden />
                    </div>

                    {/* Candidate */}
                    <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        SC
                      </div>
                      <div className="min-w-0">
                        <p className="text-gray-900 text-sm font-semibold truncate">Sarah Chen</p>
                        <p className="text-gray-400 text-xs truncate">Sr. Frontend Developer</p>
                      </div>
                    </div>

                    {/* Score bar */}
                    <div className="mb-5">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-500 font-medium">Match Score</span>
                        <span className="text-emerald-600 font-bold">94 / 100</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full shimmer-bar" style={{ width: "94%" }} />
                      </div>
                    </div>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs border border-emerald-200 font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Match result */}
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <circle cx="8" cy="8" r="6" fill="rgba(16,185,129,0.2)" />
                        <path d="M5 8L7 10L11 6" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-emerald-700 text-xs font-medium">Matched to 3 job opportunities</span>
                    </div>
                  </div>
                </div>

                {/* Floating chip — top right */}
                <div className="hidden sm:block absolute -top-4 -right-4 z-20 animate-bounce-gentle">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-emerald-200 shadow-md shadow-emerald-900/8">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden className="text-emerald-600">
                      <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M4 6.5L6 8.5L9.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-emerald-700 text-xs font-semibold">Top Match</span>
                  </div>
                </div>

                {/* Floating chip — bottom left */}
                <div className="hidden sm:block absolute -bottom-4 -left-4 z-20 animate-float-slow">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-teal-200 shadow-md shadow-teal-900/8">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden className="text-teal-600">
                      <path d="M6.5 1.5V3M10.5 6.5H9M4 6.5H2.5M6.5 10V11.5M9.2 3.8L8.15 4.85M3.8 9.2L4.85 8.15M9.2 9.2L8.15 8.15M3.8 3.8L4.85 4.85" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <circle cx="6.5" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    <span className="text-teal-700 text-xs font-semibold">2.4s Analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll nudge */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-400 animate-bounce-gentle pointer-events-none" aria-hidden>
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3.5 6L8 10.5L12.5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
