"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { label: "Features",     href: "/#features"     },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Benefits",     href: "/#benefits"     },
];

export default function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5">
      <div
        className={`w-full max-w-6xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] rounded-2xl ${
          scrolled
            ? "bg-white/90 backdrop-blur-2xl border border-black/[0.07] shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
            : "bg-white/90 backdrop-blur-2xl border border-black/[0.07] shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-2.5">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/25 group-hover:shadow-emerald-600/50 group-hover:bg-emerald-700 transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M8 2L5 6H2L4.5 8.5L3.5 12L8 9.5L12.5 12L11.5 8.5L14 6H11L8 2Z"
                  fill="white" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900">
              Smart<span className="text-emerald-600">Hire</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-gray-500 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/sign-in"
            className="hidden md:inline-flex items-center gap-2.5 pl-4 pr-1.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold glow-btn"
          >
            Get Started
            <span className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
                <path d="M2.5 6.5H10.5M7.5 3.5L10.5 6.5L7.5 9.5"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-500 hover:text-gray-900 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <div className="w-5 flex flex-col gap-[5px] items-end">
              <span className={`h-px bg-current transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? "w-5 rotate-45 translate-y-[9px]" : "w-5"}`} />
              <span className={`h-px bg-current transition-all duration-200 ${open ? "opacity-0 w-4" : "opacity-100 w-3.5"}`} />
              <span className={`h-px bg-current transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? "w-5 -rotate-45 -translate-y-[9px]" : "w-5"}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-black/[0.06] px-5 py-4">
            <nav className="flex flex-col gap-1 mb-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-3 py-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-emerald-50 text-sm font-medium transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/sign-in"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
