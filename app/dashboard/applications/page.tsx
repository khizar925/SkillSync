'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    ClipboardList, Loader2, AlertCircle, FileText,
    Building2, MapPin, Briefcase, ChevronDown, ChevronUp,
} from 'lucide-react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { useCandidateApplications } from '@/lib/queries/candidate';

const STATUS_STYLES: Record<string, string> = {
    pending:     'bg-amber-50 text-amber-700 border-amber-200',
    shortlisted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rejected:    'bg-red-50 text-red-700 border-red-200',
};

const STATUS_DOT: Record<string, string> = {
    pending:     'bg-amber-500',
    shortlisted: 'bg-emerald-500',
    rejected:    'bg-red-500',
};

function formatDate(iso: string) {
    const date = new Date(iso);
    const now  = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60)        return 'Just now';
    if (diff < 3600)      return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400)     return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const ITEMS_PER_PAGE = 10;

export default function MyApplicationsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedFeedback, setExpandedFeedback] = useState<Set<string>>(new Set());

    const { data: applications = [], isLoading, error, refetch } = useCandidateApplications();

    const toggleFeedback = (id: string) => {
        setExpandedFeedback(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const paginatedApplications = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return applications.slice(start, start + ITEMS_PER_PAGE);
    }, [applications, currentPage]);

    const totalPages = Math.ceil(applications.length / ITEMS_PER_PAGE);

    return (
        <div className="space-y-6">

            {/* Page header */}
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                    <ClipboardList className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">My applications</h1>
                    <p className="text-sm text-gray-400">Track every job you applied for</p>
                </div>
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-2/3 bg-gray-100 rounded-md" />
                                    <div className="flex gap-3">
                                        <div className="h-3 w-24 bg-gray-100 rounded" />
                                        <div className="h-3 w-20 bg-gray-100 rounded" />
                                    </div>
                                    <div className="h-3 w-28 bg-gray-100 rounded" />
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <div className="h-6 w-20 bg-gray-100 rounded-md" />
                                    <div className="h-8 w-8 bg-gray-100 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Error */}
            {error && !isLoading && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-3">
                    <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-red-800">Failed to load applications</p>
                        <button onClick={() => refetch()} className="mt-1 text-sm text-red-600 hover:text-red-800 underline transition-colors">
                            Try again
                        </button>
                    </div>
                </div>
            )}

            {/* Empty state */}
            {!isLoading && !error && applications.length === 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-4">
                        <ClipboardList className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-1">No applications yet</h3>
                    <p className="text-sm text-gray-400 mb-6 max-w-xs mx-auto">
                        Start exploring open positions and apply to get started.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all duration-200 active:scale-[0.98] shadow-md shadow-emerald-600/20"
                    >
                        Browse jobs
                    </Link>
                </div>
            )}

            {/* Applications list */}
            {!isLoading && !error && applications.length > 0 && (
                <>
                    <p className="text-xs text-gray-400 font-medium">
                        {applications.length} application{applications.length !== 1 ? 's' : ''}
                    </p>

                    <div className="space-y-3">
                        {paginatedApplications.map((app) => {
                            const hasFeedback = app.status === 'rejected' && !!app.rejection_feedback;
                            const isExpanded  = expandedFeedback.has(app.id);
                            const job         = app.jobs;

                            return (
                                <div
                                    key={app.id}
                                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-emerald-100 hover:shadow-sm transition-all duration-200"
                                >
                                    <div className="p-5 flex flex-col sm:flex-row sm:items-start gap-4">

                                        {/* Job info */}
                                        <div className="flex-1 min-w-0">
                                            {job ? (
                                                <>
                                                    <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1.5">
                                                        {job.job_title}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                                        <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
                                                            <Building2 className="h-3 w-3 flex-shrink-0" />
                                                            {job.company_name}
                                                        </span>
                                                        {job.job_location && (
                                                            <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
                                                                <MapPin className="h-3 w-3 flex-shrink-0" />
                                                                {job.job_location}
                                                            </span>
                                                        )}
                                                        {job.employment_type && (
                                                            <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
                                                                <Briefcase className="h-3 w-3 flex-shrink-0" />
                                                                <span className="capitalize">{job.employment_type}</span>
                                                            </span>
                                                        )}
                                                    </div>
                                                </>
                                            ) : (
                                                <p className="text-sm text-gray-400 italic">Job no longer available</p>
                                            )}
                                            <p className="text-[11px] text-gray-400 mt-2">
                                                Applied {formatDate(app.created_at)}
                                            </p>
                                        </div>

                                        {/* Status + resume */}
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${STATUS_STYLES[app.status] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${STATUS_DOT[app.status] ?? 'bg-gray-400'}`} />
                                                <span className="capitalize">{app.status}</span>
                                            </span>
                                            <a
                                                href={`/api/resume?path=${encodeURIComponent(app.resume_url)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="View resume"
                                                className="p-2 bg-gray-50 text-gray-500 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 border border-gray-100 transition-colors"
                                            >
                                                <FileText className="h-3.5 w-3.5" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Rejection feedback */}
                                    {hasFeedback && (
                                        <div className="border-t border-gray-50">
                                            <button
                                                onClick={() => toggleFeedback(app.id)}
                                                className="w-full flex items-center justify-between px-5 py-2.5 text-xs font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
                                            >
                                                <span>Recruiter feedback</span>
                                                {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                                            </button>
                                            {isExpanded && (
                                                <div className="px-5 pb-4">
                                                    <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-3 border border-gray-100 italic">
                                                        &quot;{app.rejection_feedback}&quot;
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center pt-2">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                        />
                                    </PaginationItem>
                                    {(() => {
                                        const items: (number | string)[] = [1];
                                        if (currentPage > 3) items.push('ellipsis-start');
                                        const start = Math.max(2, currentPage - 1);
                                        const end   = Math.min(totalPages - 1, currentPage + 1);
                                        for (let i = start; i <= end; i++) items.push(i);
                                        if (currentPage < totalPages - 2) items.push('ellipsis-end');
                                        if (totalPages > 1) items.push(totalPages);
                                        return items.map((item, idx) => (
                                            <PaginationItem key={idx}>
                                                {item === 'ellipsis-start' || item === 'ellipsis-end'
                                                    ? <PaginationEllipsis />
                                                    : <PaginationLink
                                                        isActive={currentPage === item}
                                                        onClick={() => setCurrentPage(item as number)}
                                                      >{item}</PaginationLink>
                                                }
                                            </PaginationItem>
                                        ));
                                    })()}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
