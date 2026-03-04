import { NextRequest, NextResponse } from 'next/server';
import { fetchMovie } from '@/lib/omdb';
import { movieCache } from '@/lib/cache';
import { apiRateLimiter } from '@/lib/rate-limiter';
import { validateImdbId } from '@/lib/validation';
import { Movie, MovieAPIResponse } from '@/types';

export async function GET(request: NextRequest): Promise<NextResponse<MovieAPIResponse>> {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    const rateCheck = apiRateLimiter.check(ip);

    if (!rateCheck.allowed) {
        return NextResponse.json(
            { success: false, error: `Rate limit exceeded. Try again in ${Math.ceil((rateCheck.retryAfterMs || 0) / 1000)}s.` },
            { status: 429 }
        );
    }

    // Input validation
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json(
            { success: false, error: 'IMDb ID is required. Use ?id=tt0133093' },
            { status: 400 }
        );
    }

    const validation = validateImdbId(id);
    if (!validation.valid) {
        return NextResponse.json(
            { success: false, error: validation.error },
            { status: 400 }
        );
    }

    // Check cache
    const cached = movieCache.get<Movie>(id);
    if (cached) {
        return NextResponse.json({ success: true, data: cached });
    }

    // Fetch from OMDb
    try {
        const movie = await fetchMovie(id);
        movieCache.set(id, movie);
        return NextResponse.json({ success: true, data: movie });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch movie data';
        return NextResponse.json(
            { success: false, error: message },
            { status: 404 }
        );
    }
}
