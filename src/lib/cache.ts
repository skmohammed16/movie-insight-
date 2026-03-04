/**
 * Simple in-memory TTL cache for API responses.
 * Entries expire after the configured TTL (default: 10 minutes).
 */

interface CacheEntry<T> {
    data: T;
    expiresAt: number;
}

class MemoryCache {
    private store = new Map<string, CacheEntry<unknown>>();
    private readonly defaultTTL: number;

    constructor(ttlMs: number = 10 * 60 * 1000) {
        this.defaultTTL = ttlMs;
    }

    get<T>(key: string): T | null {
        const entry = this.store.get(key);
        if (!entry) return null;

        if (Date.now() > entry.expiresAt) {
            this.store.delete(key);
            return null;
        }

        return entry.data as T;
    }

    set<T>(key: string, data: T, ttlMs?: number): void {
        this.store.set(key, {
            data,
            expiresAt: Date.now() + (ttlMs ?? this.defaultTTL),
        });
    }

    clear(): void {
        this.store.clear();
    }
}

// Singleton instances
export const movieCache = new MemoryCache();
export const sentimentCache = new MemoryCache();
