"use client";

import { useState, useEffect, useRef } from "react";

const SEED_COUNT = 500;

const perks = [
  "First access when we launch",
  "Exclusive founding-member features",
  "Priority onboarding &amp; support",
  "Free premium tier for first 3 months",
];

const avatars = [
  { type: "photo", src: "https://i.pravatar.cc/40?img=5"  },
  { type: "initial", text: "SK", bg: "bg-emerald-600" },
  { type: "photo", src: "https://i.pravatar.cc/40?img=32" },
  { type: "photo", src: "https://i.pravatar.cc/40?img=44" },
  { type: "initial", text: "MR", bg: "bg-amber-600" },
] as const;

function AnimatedCounter({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const elRef = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - t0) / 1600, 1);
            const eased = 1 - (1 - p) ** 3;
            setDisplay(Math.round(eased * value));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  useEffect(() => {
    if (fired.current) setDisplay(value);
  }, [value]);

  return <span ref={elRef}>{display.toLocaleString()}</span>;
}

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"recruiter" | "candidate">("recruiter");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(SEED_COUNT);
  const [loading, setLoading] = useState(false);

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong.');
        return;
      }
      if (data.count) setCount(data.count);
      setSubmitted(true);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="relative py-28 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" aria-hidden />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50 pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" aria-hidden />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-300/20 rounded-full blur-[150px] pointer-events-none" aria-hidden />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-teal-300/15 rounded-full blur-[130px] pointer-events-none" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left ── */}
          <div className="space-y-8 reveal">
            <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-[11px] uppercase tracking-[0.15em] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" aria-hidden />
              Join the Waitlist
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.025em] text-gray-900 leading-tight">
              Be First in Line for{" "}
              <span className="gradient-text">Smarter Hiring</span>
            </h2>

            <p className="text-gray-500 text-[17px] leading-relaxed max-w-[50ch]">
              Join hundreds of forward-thinking HR leaders and candidates who are
              ready to leave the broken hiring system behind.
            </p>

            {/* Live counter */}
            <div className="flex items-center gap-4 p-5 glass rounded-2xl">
              <div className="flex -space-x-2.5" aria-hidden>
                {avatars.map((av, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white overflow-hidden flex-shrink-0"
                    style={{ zIndex: 5 - i }}
                  >
                    {av.type === "photo" ? (
                      <img src={av.src} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full ${av.bg} flex items-center justify-center text-white text-[10px] font-bold`}>
                        {av.text}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-gray-900 font-bold text-xl tabular-nums">
                  <AnimatedCounter value={count} />
                  <span className="text-emerald-600">+</span>
                </p>
                <p className="text-gray-500 text-sm">Already on the waitlist</p>
              </div>
            </div>

            {/* Perks */}
            <ul className="space-y-3">
              {perks.map((p, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-600 text-sm">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden className="flex-shrink-0 text-emerald-600">
                    <circle cx="8.5" cy="8.5" r="7.5" fill="currentColor" fillOpacity="0.15" />
                    <path d="M5 8.5L7.5 11L12 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span dangerouslySetInnerHTML={{ __html: p }} />
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: Form (double-bezel) ── */}
          <div className="reveal" style={{ animationDelay: "0.1s" }}>
            <div className="bezel shadow-2xl shadow-emerald-900/10">
              <div className="bg-white rounded-[calc(1.5rem-6px)] p-8 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
                {submitted ? (
                  <div className="flex flex-col items-center text-center gap-6 py-6">
                    {/* Success icon */}
                    <div className="w-20 h-20 rounded-full border border-emerald-200 bg-emerald-50 flex items-center justify-center animate-bounce-gentle">
                      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
                        <path d="M7 17L14 24L27 11" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-gray-900 font-bold text-2xl tracking-[-0.02em]">
                        You&apos;re on the list!
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        We&apos;ll send launch details to{" "}
                        <span className="text-emerald-600 font-medium">{email}</span>.
                      </p>
                    </div>

                    <div className="w-full p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                      <p className="text-emerald-700 text-sm font-semibold text-center">
                        You&apos;re #{count} on the waitlist
                      </p>
                    </div>

                    <p className="text-gray-400 text-xs">
                      Know someone who should join?{" "}
                      <button
                        onClick={() => { setSubmitted(false); setEmail(""); }}
                        className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                      >
                        Add another email
                      </button>
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-7">
                      <h3 className="text-gray-900 font-bold text-2xl tracking-[-0.02em] mb-1.5">
                        Reserve Your Spot
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Join {count}+ others. No spam. Unsubscribe anytime.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                      {/* Email field */}
                      <div className="space-y-2">
                        <label htmlFor="waitlist-email" className="block text-gray-700 text-sm font-medium">
                          Work Email
                        </label>
                        <input
                          id="waitlist-email"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setError(""); }}
                          placeholder="you@company.com"
                          className={`w-full px-4 py-3 rounded-xl bg-gray-50 border text-gray-900 placeholder:text-gray-400 text-sm outline-none
                            transition-all duration-200
                            focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400
                            ${error
                              ? "border-rose-400 bg-rose-50 focus:ring-rose-400/20"
                              : "border-gray-200 hover:border-gray-300"
                            }`}
                        />
                        {error && (
                          <p className="flex items-center gap-1.5 text-rose-600 text-xs mt-1">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                              <path d="M6 4v3M6 8.5V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                            {error}
                          </p>
                        )}
                      </div>

                      {/* Role toggle */}
                      <div className="space-y-2">
                        <p className="text-gray-700 text-sm font-medium">I am a&hellip;</p>
                        <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-gray-100 border border-gray-200">
                          {(["recruiter", "candidate"] as const).map((r) => (
                            <button
                              key={r}
                              type="button"
                              onClick={() => setRole(r)}
                              className={`py-2.5 rounded-lg text-sm font-semibold capitalize transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                role === r
                                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                                  : "text-gray-500 hover:text-gray-700"
                              }`}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Submit — button-in-button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-between pl-5 pr-1.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm mt-2 glow-btn"
                      >
                        {loading ? 'Joining…' : 'Join the Waitlist'}
                        <span className="w-9 h-9 rounded-lg bg-black/10 flex items-center justify-center flex-shrink-0">
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                            <path d="M3 7.5H12M8.5 4L12 7.5L8.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </button>

                      <p className="text-gray-400 text-xs text-center pt-1">
                        By joining you agree to our{" "}
                        <a href="/privacy" className="text-gray-500 hover:text-gray-700 underline underline-offset-2 transition-colors">
                          Privacy Policy
                        </a>
                        . We&apos;ll never share your email.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
