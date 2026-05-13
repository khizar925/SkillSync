'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Briefcase, Users, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { UserRole } from '@/types';

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingRole, setIsCheckingRole] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      const existingRole = user.publicMetadata?.role as UserRole | undefined;
      if (existingRole) {
        router.push('/dashboard');
      } else {
        setIsCheckingRole(false);
      }
    } else if (isLoaded && !user) {
      router.push('/sign-in');
    }
  }, [isLoaded, user, router]);

  const handleRoleSelection = async (role: UserRole) => {
    if (isSaving) return;

    setSelectedRole(role);
    setError(null);
    setIsSaving(true);

    try {
      const response = await fetch('/api/user/role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setError('Role already set and cannot be changed.');
        } else if (response.status === 400) {
          setError(data.error || 'Invalid role selected.');
        } else if (response.status === 401) {
          setError('Please sign in to continue.');
          router.push('/sign-in');
          return;
        } else {
          setError(data.error || 'Something went wrong. Try again.');
        }
        setIsSaving(false);
        return;
      }

      window.location.href = '/dashboard';
    } catch {
      setError('Connection failed. Check your network and try again.');
      setIsSaving(false);
    }
  };

  if (!isLoaded || isCheckingRole) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <a href="/" className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/25">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M8 2L5 6H2L4.5 8.5L3.5 12L8 9.5L12.5 12L11.5 8.5L14 6H11L8 2Z" fill="white" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight text-gray-900">Smart<span className="text-emerald-600">Hire</span></span>
        </a>
        <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!user) {
    router.push('/sign-in');
    return null;
  }

  const existingRole = user.publicMetadata?.role as UserRole | undefined;
  if (existingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
      </div>
    );
  }

  const roles = [
    {
      id: 'candidate' as UserRole,
      label: "I'm looking for work",
      sublabel: 'Candidate',
      icon: Users,
      benefits: [
        'Apply to jobs with one click',
        'Track application status in real time',
        'Get notified at every stage',
      ],
    },
    {
      id: 'recruiter' as UserRole,
      label: "I'm hiring talent",
      sublabel: 'Recruiter',
      icon: Briefcase,
      benefits: [
        'Post jobs and receive applications',
        'AI resume scoring in seconds',
        'Automated candidate communication',
      ],
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden px-4 py-16">

      {/* Background grid + glow — matching landing page */}
      <div className="absolute inset-0 bg-grid opacity-[0.025] pointer-events-none" aria-hidden />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
        <div className="w-[700px] h-[350px] bg-gradient-to-r from-emerald-200/30 via-teal-200/35 to-emerald-200/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">

        {/* Logo */}
        <div className="flex justify-center mb-12">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/25 group-hover:shadow-emerald-600/40 group-hover:bg-emerald-700 transition-all duration-300">
              <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M8 2L5 6H2L4.5 8.5L3.5 12L8 9.5L12.5 12L11.5 8.5L14 6H11L8 2Z" fill="white" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">Smart<span className="text-emerald-600">Hire</span></span>
          </a>
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-[11px] uppercase tracking-[0.15em] font-semibold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" aria-hidden />
            Step 1 of 1
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-3 leading-[1.1]">
            How are you using{' '}
            <span className="gradient-text">SmartHire?</span>
          </h1>
          <p className="text-gray-500 text-base max-w-sm mx-auto">
            Your experience is personalized based on your role. This cannot be changed later.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Role cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {roles.map(({ id, label, sublabel, icon: Icon, benefits }) => {
            const isSelected = selectedRole === id;
            const isDisabled = isSaving && selectedRole !== id;

            return (
              <button
                key={id}
                onClick={() => handleRoleSelection(id)}
                disabled={isSaving}
                className={`
                  group relative text-left rounded-2xl border-2 p-6 transition-all duration-300
                  ease-[cubic-bezier(0.32,0.72,0,1)]
                  ${isSelected
                    ? 'border-emerald-500 bg-emerald-50/60 shadow-lg shadow-emerald-600/10'
                    : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-600/5 hover:-translate-y-0.5'
                  }
                  ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer active:scale-[0.98]'}
                `}
              >
                {/* Selected checkmark */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    {isSaving
                      ? <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                      : <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    }
                  </div>
                )}

                {/* Icon */}
                <div className={`
                  w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors duration-200
                  ${isSelected ? 'bg-emerald-600 shadow-md shadow-emerald-600/25' : 'bg-gray-100 group-hover:bg-emerald-50'}
                `}>
                  <Icon className={`h-5 w-5 transition-colors duration-200 ${isSelected ? 'text-white' : 'text-gray-500 group-hover:text-emerald-600'}`} />
                </div>

                {/* Label */}
                <p className="text-[10px] uppercase tracking-widest font-semibold text-emerald-600 mb-1">{sublabel}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">{label}</h3>

                {/* Benefits */}
                <ul className="space-y-1.5">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-gray-500">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="flex-shrink-0">
                        <path d="M2 6L4.5 8.5L10 3" stroke="#059669" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        {/* Saving indicator */}
        {isSaving && (
          <div className="flex items-center justify-center gap-2 text-emerald-600 mb-6">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-medium">Setting up your account...</span>
          </div>
        )}

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400">
          By continuing you agree to our{' '}
          <a href="/terms" className="underline hover:text-gray-600 transition-colors">Terms of Service</a>
          {' '}and{' '}
          <a href="/privacy" className="underline hover:text-gray-600 transition-colors">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
