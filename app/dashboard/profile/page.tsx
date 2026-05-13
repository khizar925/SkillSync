'use client';

import { useState, useEffect } from 'react';
import {
    User, Mail, Phone, MapPin, GraduationCap,
    Briefcase, Loader2, Save, CheckCircle, AlertCircle,
} from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    educationLevel: string;
    yearsOfExperience: string;
}

const inputClass = 'w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-colors';

export default function ProfilePage() {
    const qc = useQueryClient();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving]   = useState(false);
    const [message, setMessage]     = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const [formData, setFormData] = useState<FormData>({
        fullName: '', email: '', phone: '', address: '', educationLevel: '', yearsOfExperience: '',
    });

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/api/candidate/profile');
                if (res.ok) {
                    const data = await res.json();
                    if (data) {
                        setFormData({
                            fullName:          data.full_name ?? '',
                            email:             data.email ?? '',
                            phone:             data.phone ?? '',
                            address:           data.address ?? '',
                            educationLevel:    data.education_level ?? '',
                            yearsOfExperience: data.years_of_experience?.toString() ?? '',
                        });
                    }
                }
            } catch (err) {
                console.error('Error loading profile:', err);
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage(null);
        try {
            const res = await fetch('/api/candidate/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    yearsOfExperience: formData.yearsOfExperience ? parseFloat(formData.yearsOfExperience) : null,
                }),
            });
            if (res.ok) {
                setMessage({ type: 'success', text: 'Profile saved.' });
                qc.invalidateQueries({ queryKey: queryKeys.candidateProfile() });
            } else {
                const err = await res.json();
                setMessage({ type: 'error', text: err.error || 'Failed to save profile.' });
            }
        } catch {
            setMessage({ type: 'error', text: 'Connection failed. Try again.' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 max-w-2xl">

            {/* Page header */}
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">My profile</h1>
                    <p className="text-sm text-gray-400">Details auto-fill when you apply for jobs</p>
                </div>
            </div>

            {/* Form card */}
            <div className="bg-white rounded-2xl border border-gray-100">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
                        <p className="text-sm text-gray-400">Loading profile…</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-[0.1em] flex items-center gap-1.5">
                                    <User className="h-3.5 w-3.5" /> Full name
                                </label>
                                <input type="text" name="fullName" value={formData.fullName}
                                    onChange={handleChange} required className={inputClass}
                                    placeholder="Your full name" />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-[0.1em] flex items-center gap-1.5">
                                    <Mail className="h-3.5 w-3.5" /> Email address
                                </label>
                                <input type="email" name="email" value={formData.email}
                                    onChange={handleChange} required className={inputClass}
                                    placeholder="you@example.com" />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-[0.1em] flex items-center gap-1.5">
                                    <Phone className="h-3.5 w-3.5" /> Phone number
                                </label>
                                <input type="tel" name="phone" value={formData.phone}
                                    onChange={handleChange} className={inputClass}
                                    placeholder="+92 300 0000000" />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-[0.1em] flex items-center gap-1.5">
                                    <Briefcase className="h-3.5 w-3.5" /> Years of experience
                                </label>
                                <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience}
                                    onChange={handleChange} step="0.5" min="0" className={inputClass}
                                    placeholder="0" />
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-[0.1em] flex items-center gap-1.5">
                                    <GraduationCap className="h-3.5 w-3.5" /> Education level
                                </label>
                                <select name="educationLevel" value={formData.educationLevel}
                                    onChange={handleChange}
                                    className={inputClass + ' bg-white'}>
                                    <option value="">Select level</option>
                                    <option value="bachelors">Bachelor's Degree</option>
                                    <option value="master">Master's Degree</option>
                                    <option value="phd">PhD</option>
                                    <option value="diploma">Diploma</option>
                                    <option value="highschool">High School</option>
                                </select>
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-[0.1em] flex items-center gap-1.5">
                                    <MapPin className="h-3.5 w-3.5" /> Address
                                </label>
                                <textarea name="address" value={formData.address}
                                    onChange={handleChange} rows={2}
                                    className={inputClass + ' resize-none'}
                                    placeholder="City, Country" />
                            </div>
                        </div>

                        {message && (
                            <div className={`mt-5 p-3.5 rounded-xl flex items-center gap-2.5 text-sm ${
                                message.type === 'success'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                                {message.type === 'success'
                                    ? <CheckCircle className="h-4 w-4 flex-shrink-0" />
                                    : <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                }
                                <p className="font-medium">{message.text}</p>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end pt-5 border-t border-gray-50">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all duration-200 active:scale-[0.98] shadow-md shadow-emerald-600/20 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSaving
                                    ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
                                    : <><Save className="h-4 w-4" /> Save profile</>
                                }
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
