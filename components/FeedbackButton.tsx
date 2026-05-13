'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageSquarePlus, X, Star } from 'lucide-react';

const CATEGORIES = ['Bug', 'Suggestion', 'Compliment', 'Other'] as const;
type Category = typeof CATEGORIES[number];

export function FeedbackButton() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [category, setCategory] = useState<Category>('Suggestion');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function reset() {
        setRating(0);
        setHoverRating(0);
        setCategory('Suggestion');
        setMessage('');
        setSubmitted(false);
        setError(null);
    }

    function handleClose() {
        setIsOpen(false);
        setTimeout(reset, 300);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!message.trim()) return;

        setSubmitting(true);
        setError(null);

        try {
            const res = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rating: rating || undefined,
                    category,
                    message,
                    page: pathname,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error ?? 'Something went wrong');
            }

            setSubmitted(true);
            setTimeout(handleClose, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send feedback');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            {/* Floating trigger button */}
            <button
                onClick={() => { setIsOpen(true); reset(); }}
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg shadow-emerald-600/30 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-600/40 hover:-translate-y-0.5 sm:gap-2 sm:px-4 sm:py-2.5 sm:rounded-full w-10 h-10 sm:w-auto sm:h-auto"
                aria-label="Give feedback"
            >
                <MessageSquarePlus className="h-5 w-5 shrink-0" />
                <span className="hidden sm:inline text-sm font-medium">Feedback</span>
            </button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-end sm:items-end justify-end"
                    onClick={handleClose}
                />
            )}

            {/* Modal */}
            <div
                className={`fixed bottom-20 right-6 z-50 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 transition-all duration-300 ${
                    isOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">Share Feedback</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Help us improve Smart Hire</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-5 py-4">
                    {submitted ? (
                        <div className="text-center py-6">
                            <div className="text-3xl mb-2">🎉</div>
                            <p className="text-sm font-semibold text-gray-900">Thanks for your feedback!</p>
                            <p className="text-xs text-gray-400 mt-1">We appreciate you taking the time.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Star rating */}
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                    Overall experience <span className="text-gray-400">(optional)</span>
                                </label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star === rating ? 0 : star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            className="transition-transform hover:scale-110"
                                        >
                                            <Star
                                                className={`h-6 w-6 transition-colors ${
                                                    star <= (hoverRating || rating)
                                                        ? 'fill-amber-400 text-amber-400'
                                                        : 'text-gray-200'
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                    Category
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => setCategory(cat)}
                                            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                                                category === cat
                                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                    Message <span className="text-red-400">*</span>
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Tell us what you think..."
                                    rows={3}
                                    required
                                    className="w-full text-sm text-gray-700 placeholder:text-gray-300 border border-gray-200 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                                />
                            </div>

                            {error && (
                                <p className="text-xs text-red-500">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={submitting || !message.trim()}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
                            >
                                {submitting ? 'Sending...' : 'Send Feedback'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}
