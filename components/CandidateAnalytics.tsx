'use client';

import { AlertCircle } from 'lucide-react';
import { useCandidateAnalytics } from '@/lib/queries/analytics';
import { Skeleton } from '@/components/ui/skeleton';
import { StatusBreakdownChart } from './charts/StatusBreakdownChart';
import { ScoreTrendChart } from './charts/ScoreTrendChart';

function AnalyticsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {[1, 2].map((i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
          <Skeleton className="h-4 w-36 mb-4" />
          <Skeleton className="h-60 w-full" />
        </div>
      ))}
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

export function CandidateAnalytics() {
  const { data, isLoading, error, refetch } = useCandidateAnalytics();

  if (isLoading) return <AnalyticsSkeleton />;
  if (error) return <AnalyticsError onRetry={refetch} />;
  if (!data) return null;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Application status</h3>
        <div className="h-60">
          <StatusBreakdownChart data={data.statusSummary} />
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Score trend</h3>
        <div className="h-60">
          <ScoreTrendChart data={data.scoreTrend} />
        </div>
      </div>
    </div>
  );
}
