'use client';

import { useState } from 'react';
import { Briefcase, Loader2, AlertCircle, MapPin, Clock, Users, Calendar, Plus, Trash2, Pencil, Link2, Check } from 'lucide-react';
import { RecruiterAnalytics } from './RecruiterAnalytics';
import { Button } from './Button';
import { PostJobModal } from './PostJobModal';
import { EditJobModal } from './EditJobModal';
import { JobDetailsModal } from './JobDetailsModal';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { useRecruiterJobs } from '@/lib/queries/jobs';
import { useDeleteJob } from '@/lib/mutations/jobs';
import type { Job } from '@/types';
import { JOB_EXPIRY_DAYS } from '@/lib/constants';

export function RecruiterDashboard(_props: { firstName?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<Job | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { data: jobs = [], isLoading, error, refetch } = useRecruiterJobs();
  const deleteJob = useDeleteJob();

  const handleCopyLink = (e: React.MouseEvent, job: Job) => {
    e.stopPropagation();
    const url = `${window.location.origin}/jobs/${job.id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(job.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleEdit = (e: React.MouseEvent, job: Job) => {
    e.stopPropagation();
    setJobToEdit(job);
    setIsEditModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent, job: Job) => {
    e.stopPropagation();
    setDeleteError(null);
    setJobToDelete(job);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!jobToDelete) return;
    try {
      await deleteJob.mutateAsync(jobToDelete.id);
      setIsDeleteModalOpen(false);
      setJobToDelete(null);
    } catch {
      setDeleteError('Failed to delete job. Try again.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  const truncateDescription = (text: string, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '…';
  };

  const getDaysLeft = (job: Job): number => {
    const ageMs = Date.now() - new Date(job.created_at).getTime();
    return JOB_EXPIRY_DAYS - Math.floor(ageMs / 86_400_000);
  };

  const isNewPost = (job: Job): boolean =>
    Date.now() - new Date(job.created_at).getTime() < 3 * 86_400_000;

  const StatusBadge = ({ job }: { job: Job }) => {
    if (job.status === 'draft') return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        <span className="w-1 h-1 rounded-full bg-amber-500" /> Draft
      </span>
    );
    if (job.status === 'closed') return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-gray-100 text-gray-500 border border-gray-200">
        <span className="w-1 h-1 rounded-full bg-gray-400" /> Closed
      </span>
    );
    if (job.status === 'active' && getDaysLeft(job) <= 7 && getDaysLeft(job) > 0) return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-orange-50 text-orange-700 border border-orange-200">
        <span className="w-1 h-1 rounded-full bg-orange-500" /> Expires {getDaysLeft(job)}d
      </span>
    );
    if (job.status === 'active' && isNewPost(job)) return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> New
      </span>
    );
    if (job.status === 'active') return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <span className="w-1 h-1 rounded-full bg-emerald-500" /> Active
      </span>
    );
    return null;
  };

  return (
    <>
      <div className="space-y-8">

        {/* Top action bar */}
        <div className="flex items-center justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 pl-4 pr-2 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all duration-200 active:scale-[0.98] shadow-md shadow-emerald-600/20"
          >
            Post a job
            <span className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
              <Plus className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>

        {/* Analytics */}
        <RecruiterAnalytics />

        {/* Job postings section */}
        <div>
          {/* Section header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">Job postings</h2>
              {!isLoading && !error && (
                <p className="text-sm text-gray-400 mt-0.5">
                  {jobs.length === 0 ? 'No jobs posted yet' : `${jobs.length} active ${jobs.length === 1 ? 'posting' : 'postings'}`}
                </p>
              )}
            </div>
          </div>

          {/* Delete error */}
          {deleteError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {deleteError}
            </div>
          )}

          {/* Loading — skeleton cards */}
          {isLoading && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-2/3 bg-gray-100 rounded-md" />
                    <div className="h-5 w-14 bg-gray-100 rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-1/2 bg-gray-100 rounded" />
                    <div className="h-3 w-1/3 bg-gray-100 rounded" />
                    <div className="h-3 w-2/5 bg-gray-100 rounded" />
                  </div>
                  <div className="h-3 w-full bg-gray-100 rounded" />
                  <div className="h-3 w-4/5 bg-gray-100 rounded" />
                  <div className="h-9 w-full bg-gray-100 rounded-xl mt-2" />
                </div>
              ))}
            </div>
          )}

          {/* Fetch error */}
          {error && !isLoading && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-3">
              <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-800">Failed to load job postings</p>
                <button onClick={() => refetch()} className="mt-1 text-sm text-red-600 hover:text-red-800 underline transition-colors">
                  Try again
                </button>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !error && jobs.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">No jobs posted yet</h3>
              <p className="text-sm text-gray-400 mb-6 max-w-xs mx-auto">
                Post your first opening and start receiving AI-scored applications.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all duration-200 active:scale-[0.98] shadow-md shadow-emerald-600/20"
              >
                <Plus className="h-4 w-4" />
                Post first job
              </button>
            </div>
          )}

          {/* Job cards — 2-col on md, 3-col on xl */}
          {!isLoading && !error && jobs.length > 0 && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {jobs.map((job: Job) => (
                <div
                  key={job.id}
                  className="group bg-white rounded-2xl border border-gray-100 p-5 flex flex-col hover:shadow-md hover:shadow-emerald-600/5 hover:border-emerald-100 transition-all duration-200"
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-bold text-gray-900 text-sm leading-snug truncate" title={job.job_title}>
                      {job.job_title}
                    </h3>
                    <div className="flex-shrink-0 flex items-center gap-1">
                      <StatusBadge job={job} />
                      <button
                        onClick={(e) => handleCopyLink(e, job)}
                        className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-150"
                        title="Copy job link"
                      >
                        {copiedId === job.id ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Link2 className="h-3.5 w-3.5" />}
                      </button>
                      <button
                        onClick={(e) => handleEdit(e, job)}
                        className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-150"
                        title="Edit job"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, job)}
                        disabled={deleteJob.isPending && jobToDelete?.id === job.id}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-150 disabled:opacity-50"
                        title="Delete job"
                      >
                        {deleteJob.isPending && jobToDelete?.id === job.id
                          ? <Loader2 className="h-3.5 w-3.5 animate-spin text-red-500" />
                          : <Trash2 className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-2 mb-3">
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

                  {/* Description */}
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4 flex-1">
                    {truncateDescription(job.job_description)}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
                      <Calendar className="h-3 w-3" /> {formatDate(job.created_at)}
                    </span>
                    <button
                      onClick={() => { setSelectedJob(job); setIsDetailsModalOpen(true); }}
                      className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      View details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <PostJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onJobposted={() => {}}
      />
      <EditJobModal
        isOpen={isEditModalOpen}
        onClose={() => { setIsEditModalOpen(false); setJobToEdit(null); }}
        job={jobToEdit}
      />
      <JobDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => { setIsDetailsModalOpen(false); setSelectedJob(null); }}
        job={selectedJob}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        isDeleting={deleteJob.isPending}
        onClose={() => { setIsDeleteModalOpen(false); setJobToDelete(null); setDeleteError(null); }}
        onConfirm={handleConfirmDelete}
        title="Delete job posting"
        message={`Delete "${jobToDelete?.job_title}"? This cannot be undone.`}
      />
    </>
  );
}
