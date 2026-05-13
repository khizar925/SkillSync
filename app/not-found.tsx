import Link from 'next/link';
import PublicPageLayout from '@/components/PublicPageLayout';

export default function NotFound() {
  return (
    <PublicPageLayout>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-emerald-600 mb-4">404</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Page not found.
          </h1>
          <p className="text-gray-400 text-base mb-8">
            This page doesn&apos;t exist or was removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all duration-200 active:scale-[0.98] shadow-md shadow-emerald-600/20"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </PublicPageLayout>
  );
}
