export interface ScoreResult {
  score: number;
  breakdown: {
    semantic: number;
    skill: number;
    category: number;
    mode?: string;
  } | null;
}

/**
 * Score a resume against a job description using the NLP backend.
 * Returns null on any failure (timeout, backend error, misconfiguration).
 * Callers decide how to handle null (sentinel -1, skip, retry).
 */
export async function scoreResume(
  resumeText: string,
  jobDescription: string,
  timeoutMs = 30_000,
): Promise<ScoreResult | null> {
  const backendUrl = process.env.BACKEND_URL?.replace(/\/$/, '');
  const apiKey = process.env.API_KEY;

  if (!backendUrl || !apiKey) return null;
  if (!resumeText.trim()) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${backendUrl}/score-single`, {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resume_text: resumeText,
        job_description: jobDescription,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      console.error('Scoring backend error:', res.status, await res.text());
      return null;
    }

    const { score, breakdown } = await res.json();
    return { score, breakdown: breakdown ?? null };
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      console.error('Scoring timeout after', timeoutMs, 'ms');
    } else {
      console.error('Scoring error:', err);
    }
    return null;
  } finally {
    clearTimeout(timer);
  }
}
