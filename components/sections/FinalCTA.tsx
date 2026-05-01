export default function FinalCTA() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" aria-hidden />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
        <div className="w-[800px] h-[400px] bg-gradient-to-r from-emerald-200/40 via-teal-200/45 to-emerald-200/40 rounded-full blur-[100px]" />
      </div>
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" aria-hidden />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Double-bezel CTA card */}
        <div className="reveal bezel shadow-2xl shadow-emerald-900/10">
          <div className="bg-white rounded-[calc(1.5rem-6px)] px-8 py-16 sm:px-16 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">

            <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-[11px] uppercase tracking-[0.15em] font-semibold mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" aria-hidden />
              Get Started Today
            </p>

            <h2 className="text-4xl sm:text-5xl lg:text-[60px] font-bold tracking-[-0.03em] text-gray-900 mb-6 leading-[1.04]">
              Ready to Sync Your{" "}
              <span className="gradient-text">Hiring?</span>
            </h2>

            <p className="text-gray-500 text-[17px] leading-relaxed max-w-[50ch] mx-auto mb-10">
              Join hundreds of teams and candidates transforming how the world
              connects talent with opportunity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Primary — button-in-button */}
              <a
                href="#waitlist"
                className="inline-flex items-center justify-between gap-3 pl-6 pr-2 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base glow-btn"
              >
                I&apos;m a Recruiter
                <span className="w-9 h-9 rounded-lg bg-black/10 flex items-center justify-center flex-shrink-0">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                    <path d="M3 7.5H12M8.5 4L12 7.5L8.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>

              {/* Secondary */}
              <a
                href="#waitlist"
                className="inline-flex items-center justify-between gap-3 pl-6 pr-2 py-2 rounded-xl border border-gray-300 hover:border-emerald-300 hover:bg-emerald-50 text-gray-800 font-bold text-base transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98]"
              >
                I&apos;m a Candidate
                <span className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                    <path d="M3 7.5H12M8.5 4L12 7.5L8.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-12">
              {[
                "No credit card required",
                "Cancel anytime",
                "GDPR compliant",
                "SOC 2 ready",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2 6L4.5 8.5L10 3" stroke="#059669" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
