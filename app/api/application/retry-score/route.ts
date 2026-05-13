import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-server';
import { requireRole } from '@/lib/auth';
import { scoreResume } from '@/lib/scoring-client';

export async function POST(request: Request) {
    try {
        const authResult = await requireRole('recruiter');
        if (authResult instanceof NextResponse) return authResult;
        const { userId } = authResult;

        const { applicationId } = await request.json();
        if (!applicationId) {
            return NextResponse.json({ error: 'applicationId is required' }, { status: 400 });
        }

        const { data: app, error: appError } = await supabase
            .from('applications')
            .select('id, job_id, resume_text, jobs(recruiter_id, job_description)')
            .eq('id', applicationId)
            .single();

        if (appError || !app) {
            return NextResponse.json({ error: 'Application not found' }, { status: 404 });
        }

        // @ts-ignore — nested join
        if (app.jobs.recruiter_id !== userId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const resumeText: string = app.resume_text ?? '';
        // @ts-ignore — nested join
        const jobDescription: string = app.jobs.job_description;

        if (!resumeText) {
            return NextResponse.json({ error: 'No resume text available to score' }, { status: 400 });
        }

        if (!process.env.BACKEND_URL || !process.env.API_KEY) {
            return NextResponse.json({ error: 'Scoring service not configured' }, { status: 503 });
        }

        const result = await scoreResume(resumeText, jobDescription);

        if (!result) {
            return NextResponse.json({ error: 'Scoring service unavailable' }, { status: 503 });
        }

        const now = new Date().toISOString();
        await supabase.from('scores').upsert(
            [{
                job_id: app.job_id,
                application_id: applicationId,
                score: result.score,
                breakdown: result.breakdown,
                scored_at: now,
            }],
            { onConflict: 'job_id,application_id' }
        );

        return NextResponse.json({ success: true, score: result.score });
    } catch (error) {
        console.error('Retry score error:', error);
        return NextResponse.json({ error: 'Scoring service is unavailable' }, { status: 503 });
    }
}
