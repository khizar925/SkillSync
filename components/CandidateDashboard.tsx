'use client';

import { useState, useEffect, useRef } from 'react';
import { Briefcase, Loader2, AlertCircle, MapPin, Clock, Users, Calendar, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { formatTimeAgo, isNewJob } from '@/lib/date-utils';
import type { Job } from '@/types';
import Link from 'next/link';
import { usePublicJobs } from '@/lib/queries/jobs';

export function CandidateDashboard(_props: { firstName?: string }) {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const limit = 12;

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [searchInput]);

  const hasActiveFilters = !!search || !!employmentType || !!experienceLevel;

  const clearAllFilters = () => {
    setSearchInput('');
    setEmploymentType('');
    setExperienceLevel('');
    setPage(1);
  };

  const { data, isLoading, error, refetch } = usePublicJobs(page, search, employmentType, experienceLevel);

  const jobs       = data?.jobs       ?? [];
  const total      = data?.total      ?? 0;
  const totalPages = data?.totalPages ?? 0;
  const hasMore    = data?.hasMore    ?? false;

  const isEmpty = !isLoading && !error && jobs.length === 0;
  const isError = !!error;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getStartIndex = () => (total === 0 ? 0 : (page - 1) * limit + 1);
  const getEndIndex   = () => Math.min(page * limit, total);

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Available jobs</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {isLoading ? 'Loading…' : total > 0 ? `${getStartIndex()}–${getEndIndex()} of ${total} openings` : 'No openings found'}
          </p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search job title, company, or location…"
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-colors"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Job type filter */}
        <select
          value={employmentType}
          onChange={(e) => { setEmploymentType(e.target.value); setPage(1); }}
          className="py-2.5 px-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-colors sm:w-40"
        >
          <option value="">All types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
        </select>

        {/* Level filter */}
        <select
          value={experienceLevel}
          onChange={(e) => { setExperienceLevel(e.target.value); setPage(1); }}
          className="py-2.5 px-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-colors sm:w-36"
        >
          <option value="">All levels</option>
          <option value="entry">Entry</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>

        {/* Clear filters */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1.5 px-3.5 py-2.5 text-sm text-gray-500 hover:text-gray-800 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-all whitespace-nowrap"
          >
            <X className="h-3.5 w-3.5" /> Clear
          </button>
        )}
      </div>

      {/* Loading — skeleton cards */}
      {isLoading && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3 animate-pulse">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1.5 flex-1">
                  <div className="h-4 w-3/4 bg-gray-100 rounded-md" />
                  <div className="h-3 w-1/2 bg-gray-100 rounded" />
                </div>
                <div className="h-5 w-10 bg-gray-100 rounded-md" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                <div className="h-5 w-20 bg-gray-100 rounded-md" />
                <div className="h-5 w-16 bg-gray-100 rounded-md" />
                <div className="h-5 w-24 bg-gray-100 rounded-md" />
              </div>
              <div className="h-9 w-full bg-gray-100 rounded-xl mt-2" />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && !isLoading && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-3">
          <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-800">Failed to load jobs</p>
            <button onClick={() => refetch()} className="mt-1 text-sm text-red-600 hover:text-red-800 underline transition-colors">
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {isEmpty && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-4">
            <Briefcase className="h-6 w-6 text-emerald-600" />
          </div>
          {hasActiveFilters ? (
            <>
              <h3 className="text-base font-bold text-gray-900 mb-1">No jobs match your filters</h3>
              <p className="text-sm text-gray-400 mb-4">Try adjusting your search or filters.</p>
              <button
                onClick={clearAllFilters}
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Clear all filters
              </button>
            </>
          ) : (
            <>
              <h3 className="text-base font-bold text-gray-900 mb-1">No openings right now</h3>
              <p className="text-sm text-gray-400">Check back soon for new opportunities.</p>
            </>
          )}
        </div>
      )}

      {/* Job cards */}
      {!isLoading && !isError && jobs.length > 0 && (
        <>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {jobs.map((job: Job) => {
              const isNew = isNewJob(job.created_at);
              return (
                <div
                  key={job.id}
                  className="group bg-white rounded-2xl border border-gray-100 p-5 flex flex-col hover:shadow-md hover:shadow-emerald-600/5 hover:border-emerald-100 transition-all duration-200"
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm leading-snug truncate">{job.job_title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">{job.company_name}</p>
                    </div>
                    {isNew && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> New
                      </span>
                    )}
                  </div>

                  {/* Meta tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">
                      <MapPin className="h-3 w-3" /> {job.job_location}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">
                      <Clock className="h-3 w-3" /> <span className="capitalize">{job.employment_type.replace('-', ' ')}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">
                      <Users className="h-3 w-3" /> {job.applicants_count} {job.applicants_count === 1 ? 'applicant' : 'applicants'}
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-auto">
                    <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
                      <Calendar className="h-3 w-3" /> {formatTimeAgo(job.created_at)}
                    </span>
                    <Link
                      href={`/jobs/${job.id}?apply=true`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all duration-200 active:scale-[0.98] shadow-sm shadow-emerald-600/20"
                    >
                      Apply now
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={!hasMore}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-gray-400">Page {page} of {totalPages}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
