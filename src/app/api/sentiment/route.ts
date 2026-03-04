import { NextRequest, NextResponse } from 'next/server';
import { analyzeSentiment } from '@/lib/sentiment';
import { getReviews } from '@/lib/reviews';
import { sentimentCache } from '@/lib/cache';
import { apiRateLimiter } from '@/lib/rate-limiter';
import { validateImdbId } from '@/lib/validation';
import { SentimentResult, SentimentAPIResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<SentimentAPIResponse>> {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    const rateCheck = apiRateLimiter.check(ip);

    if (!rateCheck.allowed) {
        return NextResponse.json(
            { success: false, error: `Rate limit exceeded. Try again in ${Math.ceil((rateCheck.retryAfterMs || 0) / 1000)}s.` },
            { status: 429 }
        );
    }

    // Parse and validate body
    let body: { imdbId?: string; movieTitle?: string };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { success: false, error: 'Invalid JSON body' },
            { status: 400 }
        );
    }

    const { imdbId, movieTitle } = body;

    if (!imdbId || !movieTitle) {
        return NextResponse.json(
            { success: false, error: 'Both imdbId and movieTitle are required' },
            { status: 400 }
        );
    }

    const validation = validateImdbId(imdbId);
    if (!validation.valid) {
        return NextResponse.json(
            { success: false, error: validation.error },
            { status: 400 }
        );
    }

    // Check cache
    const cacheKey = `sentiment:${imdbId}`;
    const cached = sentimentCache.get<SentimentResult>(cacheKey);
    if (cached) {
        return NextResponse.json({ success: true, data: cached });
    }

    // Analyze sentiment
    try {
        const reviews = getReviews(imdbId);
        const result = await analyzeSentiment(movieTitle, reviews);
        sentimentCache.set(cacheKey, result);
        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Sentiment analysis failed';
        return NextResponse.json(
            { success: false, error: message },
            { status: 500 }
        );
    }
}
