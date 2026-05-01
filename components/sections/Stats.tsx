"use client";

import { useState, useEffect, useRef } from "react";

interface Stat {
  prefix?: string;
  end: number;
  suffix: string;
  label: string;
  description: string;
  accent: string;
  ring: string;
}

const stats: Stat[] = [
  {
    end: 60,
    suffix: "%",
    label: "Faster Hiring",
    description: "Average reduction in time-to-hire across all role types and company sizes.",
    accent: "text-emerald-600",
    ring: "border-emerald-200 bg-emerald-50",
  },
  {
    end: 100,
    suffix: "%",
    label: "Transparency",
    description: "Of applications receive real-time status updates and structured recruiter feedback.",
    accent: "text-teal-600",
    ring: "border-teal-200 bg-teal-50",
  },
  {
    prefix: "<",
    end: 5,
    suffix: "s",
    label: "AI Scoring",
    description: "Average time for our NLP engine to score and rank any resume against any job.",
    accent: "text-sky-600",
    ring: "border-sky-200 bg-sky-50",
  },
];

function CountUp({ end, duration = 1800 }: { end: number; duration?: number }) {
  const [value, setValue] = useState(0);
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
            const p = Math.min((now - t0) / duration, 1);
            const eased = 1 - (1 - p) ** 3;
            setValue(Math.round(eased * end));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return <span ref={elRef}>{value}</span>;
}

export default function Stats() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" aria-hidden />

      {/* Glow band */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-72 bg-gradient-to-r from-emerald-200/30 via-teal-200/35 to-sky-200/30 blur-[90px] pointer-events-none" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16 reveal">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-200 bg-teal-50 text-teal-700 text-[11px] uppercase tracking-[0.15em] font-semibold mb-6">
            By the Numbers
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.025em] text-gray-900">
            The{" "}
            <span className="gradient-text">Numbers</span>{" "}
            Speak for Themselves
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <div
              key={i}
              className="reveal flex flex-col gap-0"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Double-bezel stat card */}
              <div className="bezel">
                <div className="bg-white rounded-[calc(1.5rem-6px)] p-8 text-center flex flex-col items-center gap-5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
                  {/* Icon ring */}
                  <div className={`w-12 h-12 rounded-xl border ${s.ring} ${s.accent} flex items-center justify-center`}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                      <path d="M3 15l4-5 3.5 3.5L15 6l3 3" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Number */}
                  <div className={`flex items-baseline gap-0.5 ${s.accent}`}>
                    {s.prefix && <span className="text-4xl font-bold tabular-nums">{s.prefix}</span>}
                    <span className="text-6xl font-bold tabular-nums tracking-[-0.03em]">
                      <CountUp end={s.end} />
                    </span>
                    <span className="text-4xl font-bold tabular-nums">{s.suffix}</span>
                  </div>

                  <h3 className="text-gray-900 font-semibold text-lg tracking-[-0.01em]">{s.label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
