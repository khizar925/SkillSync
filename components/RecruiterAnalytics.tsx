'use client';

import { AlertCircle, Briefcase, Users, CheckCircle, Star } from 'lucide-react';
import { useRecruiterAnalytics } from '@/lib/queries/analytics';
import { Skeleton } from '@/components/ui/skeleton';
import { ApplicationsOverTimeChart } from './charts/ApplicationsOverTimeChart';
import { StatusBreakdownChart } from './charts/StatusBreakdownChart';
import { TopJobsChart } from './charts/TopJobsChart';

function AnalyticsSkeleton() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gray-100 flex-shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-2.5 w-16 bg-gray-100 rounded" />
                <div className="h-6 w-10 bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <Skeleton className="h-4 w-40 mb-4" />
        <Skeleton className="h-60 w-full" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <Skeleton className="h-4 w-36 mb-4" />
          <Skeleton className="h-60 w-full" />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <Skeleton className="h-4 w-36 mb-4" />
          <Skeleton className="h-60 w-full" />
        </div>
      </div>
    </div>
  );
}

function AnalyticsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-3">
      <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-red-800">Failed to load analytics</p>
        <button onClick={onRetry} className="mt-1 text-sm text-red-600 hover:text-red-800 underline transition-colors">
          Try again
        </button>
      </div>
    </div>
  );
}

const stats = [
  { key: 'openPosts',   label: 'Open posts',       icon: Briefcase,   bg: 'bg-emerald-50',  iconColor: 'text-emerald-600' },
  { key: 'total',       label: 'Total applicants',  icon: Users,       bg: 'bg-sky-50',      iconColor: 'text-sky-600'     },
  { key: 'shortlisted', label: 'Shortlisted',       icon: CheckCircle, bg: 'bg-teal-50',     iconColor: 'text-teal-600'    },
  { key: 'hired',       label: 'Hired',             icon: Star,        bg: 'bg-violet-50',   iconColor: 'text-violet-600'  },
];

export function RecruiterAnalytics() {
  const { data, isLoading, error, refetch } = useRecruiterAnalytics();

  if (isLoading) return <AnalyticsSkeleton />;
  if (error) return <AnalyticsError onRetry={refetch} />;
  if (!data) return null;

  const totalApplicants = data.statusBreakdown.reduce((s, d) => s + d.count, 0);
  const shortlisted     = data.statusBreakdown.find((d) => d.status === 'shortlisted')?.count ?? 0;
  const hired           = data.statusBreakdown.find((d) => d.status === 'hired')?.count ?? 0;

  const values: Record<string, number> = {
    openPosts: data.openPosts,
    total: totalApplicants,
    shortlisted,
    hired,
  };

  return (
    <div className="space-y-5">

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(({ key, label, icon: Icon, bg, iconColor }) => (
          <div key={key} className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex items-center gap-3 hover:border-emerald-100 hover:shadow-sm transition-all duration-200">
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`h-4 w-4 ${iconColor}`} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.12em] leading-none mb-1">{label}</p>
              <p className="text-2xl font-bold text-gray-900 tabular-nums leading-none">{values[key]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Applications over time */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Applications over time</h3>
        <div className="h-60">
          <ApplicationsOverTimeChart data={data.applicationsOverTime} />
        </div>
      </div>

      {/* Status + Top Jobs */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Application status</h3>
          <div className="h-60">
            <StatusBreakdownChart data={data.statusBreakdown} />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Top jobs by applicants</h3>
          <div className="h-60">
            <TopJobsChart data={data.topJobs} />
          </div>
        </div>
      </div>
    </div>
  );
}
