'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const UserButton = dynamic(
    () => import('@clerk/nextjs').then((mod) => ({ default: mod.UserButton })),
    { ssr: false }
);
import { AppSidebar } from '@/components/app-sidebar';
import { ScoreResumeModal } from '@/components/ScoreResumeModal';
import { FeedbackButton } from '@/components/FeedbackButton';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import type { UserRole } from '@/types';

interface DashboardLayoutClientProps {
    children: React.ReactNode;
    role?: UserRole;
    firstName?: string;
}

export function DashboardLayoutClient({ children, role, firstName }: DashboardLayoutClientProps) {
    const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);

    if (role === 'recruiter') {
        return (
            <>
                <div className="flex min-h-screen w-full bg-gray-50/50">
                    <div className="flex flex-col flex-1 min-h-screen w-full">
                        {/* Recruiter top header */}
                        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-gray-100 bg-white px-4 md:px-8 sticky top-0 z-20 w-full">
                            <div className="flex items-center gap-3">
                                <a href="/dashboard" className="flex items-center gap-2.5 group">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/25 group-hover:shadow-emerald-600/40 group-hover:bg-emerald-700 transition-all duration-300">
                                        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                                            <path d="M8 2L5 6H2L4.5 8.5L3.5 12L8 9.5L12.5 12L11.5 8.5L14 6H11L8 2Z"
                                                fill="white" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <span className="font-bold text-base tracking-tight text-gray-900">
                                        Smart<span className="text-emerald-600">Hire</span>
                                    </span>
                                </a>
                                <div className="h-4 w-px bg-gray-200 hidden md:block" />
                                <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 tracking-wide">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Recruiter Portal
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </header>

                        {/* Main content */}
                        <main className="flex-1 w-full p-4 md:p-8 overflow-x-hidden">
                            <div className="max-w-7xl mx-auto">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
                <FeedbackButton />
            </>
        );
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-gray-50/50">
                <AppSidebar
                    role={role as 'candidate' | 'recruiter'}
                    onOpenScore={() => setIsScoreModalOpen(true)}
                />

                <SidebarInset className="flex flex-col flex-1 min-h-screen transition-all duration-300 overflow-hidden">
                    {/* Candidate top header */}
                    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-gray-100 bg-white/90 backdrop-blur-md px-4 md:px-6 sticky top-0 z-20 w-full">
                        <div className="flex items-center gap-3">
                            <SidebarTrigger className="h-8 w-8 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 flex-shrink-0" />
                            <div className="h-4 w-px bg-gray-200 hidden md:block" />
                            <span className="text-sm text-gray-400 hidden md:block">
                                Welcome back, <span className="text-gray-900 font-semibold">{firstName || 'there'}</span>
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </header>

                    {/* Main content */}
                    <main className="flex-1 w-full p-4 md:p-8 overflow-x-hidden">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </main>
                </SidebarInset>

                <ScoreResumeModal
                    isOpen={isScoreModalOpen}
                    onClose={() => setIsScoreModalOpen(false)}
                />

                <FeedbackButton />
            </div>
        </SidebarProvider>
    );
}
