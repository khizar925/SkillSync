const columns = [
  {
    heading: "Product",
    links: [
      { label: "Features",     href: "#features"     },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Benefits",     href: "#benefits"     },
      { label: "Pricing",      href: "#"             },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",   href: "#" },
      { label: "Blog",    href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy",   href: "/privacy" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy",    href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-10 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <a href="#" className="flex items-center gap-2.5 w-fit">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/25">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M8 2L5 6H2L4.5 8.5L3.5 12L8 9.5L12.5 12L11.5 8.5L14 6H11L8 2Z"
                    fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-bold text-lg text-gray-900 tracking-tight">
                Skill<span className="text-emerald-600">Sync</span>
              </span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
              AI-powered recruitment that syncs the right skills with the right
              opportunities.
            </p>


          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <h4 className="text-gray-900 text-sm font-semibold">{col.heading}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-gray-500 hover:text-gray-700 transition-colors duration-200 text-sm"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} SkillSync Technologies. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs">
            Built for better hiring, everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
