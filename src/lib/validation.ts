/**
 * Validates an IMDb ID format.
 * Valid format: starts with "tt" followed by 1-10 digits.
 */
export function validateImdbId(id: string): { valid: boolean; error?: string } {
    if (!id || id.trim().length === 0) {
        return { valid: false, error: 'IMDb ID is required' };
    }

    const trimmed = id.trim();

    if (!/^tt\d{1,10}$/.test(trimmed)) {
        return {
            valid: false,
            error: 'Invalid format. IMDb ID must start with "tt" followed by numbers (e.g., tt0133093)',
        };
    }

    return { valid: true };
}
