import { describe, it, expect } from 'vitest';
import { validateImdbId } from '@/lib/validation';

describe('validateImdbId', () => {
    it('should accept valid IMDb IDs', () => {
        expect(validateImdbId('tt0133093')).toEqual({ valid: true });
        expect(validateImdbId('tt0000001')).toEqual({ valid: true });
        expect(validateImdbId('tt12345678')).toEqual({ valid: true });
        expect(validateImdbId('tt1')).toEqual({ valid: true });
    });

    it('should reject empty input', () => {
        const result = validateImdbId('');
        expect(result.valid).toBe(false);
        expect(result.error).toBeDefined();
    });

    it('should reject whitespace-only input', () => {
        const result = validateImdbId('   ');
        expect(result.valid).toBe(false);
        expect(result.error).toBeDefined();
    });

    it('should reject IDs without "tt" prefix', () => {
        const result = validateImdbId('0133093');
        expect(result.valid).toBe(false);
        expect(result.error).toContain('tt');
    });

    it('should reject IDs with wrong prefix', () => {
        const result = validateImdbId('nm0133093');
        expect(result.valid).toBe(false);
    });

    it('should reject IDs with non-numeric characters after "tt"', () => {
        expect(validateImdbId('ttabcdef').valid).toBe(false);
        expect(validateImdbId('tt01330a3').valid).toBe(false);
    });

    it('should reject IDs with special characters', () => {
        expect(validateImdbId('tt0133-093').valid).toBe(false);
        expect(validateImdbId('tt 0133093').valid).toBe(false);
    });

    it('should handle trimming of valid IDs', () => {
        expect(validateImdbId(' tt0133093 ')).toEqual({ valid: true });
    });
});
