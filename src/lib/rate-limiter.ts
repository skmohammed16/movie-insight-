/**
 * Simple sliding-window in-memory rate limiter.
 * Tracks requests per IP with a configurable window and max requests.
 */

interface RateLimitEntry {
    timestamps: number[];
}

class RateLimiter {
    private store = new Map<string, RateLimitEntry>();
    private readonly windowMs: number;
    private readonly maxRequests: number;

    constructor(windowMs: number = 60 * 1000, maxRequests: number = 10) {
        this.windowMs = windowMs;
        this.maxRequests = maxRequests;
    }

    /**
     * Check if a request from the given identifier is allowed.
     * Returns { allowed, retryAfterMs }.
     */
    check(identifier: string): { allowed: boolean; retryAfterMs?: number } {
        const now = Date.now();
        const entry = this.store.get(identifier);

        if (!entry) {
            this.store.set(identifier, { timestamps: [now] });
            return { allowed: true };
        }

        // Filter out timestamps outside the window
        entry.timestamps = entry.timestamps.filter(
            (ts) => now - ts < this.windowMs
        );

        if (entry.timestamps.length >= this.maxRequests) {
            const oldestInWindow = entry.timestamps[0];
            const retryAfterMs = this.windowMs - (now - oldestInWindow);
            return { allowed: false, retryAfterMs };
        }

        entry.timestamps.push(now);
        return { allowed: true };
    }
}

// Singleton rate limiter: 10 requests per minute
export const apiRateLimiter = new RateLimiter(60 * 1000, 10);
