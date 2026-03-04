'use client';

import { useState, useEffect, useCallback } from 'react';
import { Movie, SentimentResult } from '@/types';
import { useDebounce } from './useDebounce';
import { validateImdbId } from '@/lib/validation';

interface UseMovieDataReturn {
    movie: Movie | null;
    sentiment: SentimentResult | null;
    isLoadingMovie: boolean;
    isLoadingSentiment: boolean;
    movieError: string | null;
    sentimentError: string | null;
    validationError: string | null;
    searchMovie: (id: string) => void;
    inputValue: string;
    setInputValue: (value: string) => void;
}

export function useMovieData(): UseMovieDataReturn {
    const [inputValue, setInputValue] = useState('');
    const [movie, setMovie] = useState<Movie | null>(null);
    const [sentiment, setSentiment] = useState<SentimentResult | null>(null);
    const [isLoadingMovie, setIsLoadingMovie] = useState(false);
    const [isLoadingSentiment, setIsLoadingSentiment] = useState(false);
    const [movieError, setMovieError] = useState<string | null>(null);
    const [sentimentError, setSentimentError] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);

    const debouncedId = useDebounce(inputValue, 400);

    const fetchMovieData = useCallback(async (imdbId: string) => {
        setIsLoadingMovie(true);
        setMovieError(null);
        setMovie(null);
        setSentiment(null);
        setSentimentError(null);

        try {
            const res = await fetch(`/api/movie?id=${encodeURIComponent(imdbId)}`);
            const data = await res.json();

            if (!data.success) {
                setMovieError(data.error || 'Failed to fetch movie data');
                setIsLoadingMovie(false);
                return;
            }

            setMovie(data.data);
            setIsLoadingMovie(false);

            // Fetch sentiment after movie loads
            fetchSentiment(imdbId, data.data.title);
        } catch {
            setMovieError('Network error. Please try again.');
            setIsLoadingMovie(false);
        }
    }, []);

    const fetchSentiment = async (imdbId: string, movieTitle: string) => {
        setIsLoadingSentiment(true);
        setSentimentError(null);

        try {
            const res = await fetch('/api/sentiment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imdbId, movieTitle }),
            });
            const data = await res.json();

            if (!data.success) {
                setSentimentError(data.error || 'Failed to analyze sentiment');
            } else {
                setSentiment(data.data);
            }
        } catch {
            setSentimentError('Failed to fetch sentiment analysis.');
        } finally {
            setIsLoadingSentiment(false);
        }
    };

    const searchMovie = useCallback((id: string) => {
        setInputValue(id);
    }, []);

    // Auto-fetch on debounced input change
    useEffect(() => {
        if (!debouncedId.trim()) {
            setValidationError(null);
            setMovie(null);
            setSentiment(null);
            setMovieError(null);
            setSentimentError(null);
            return;
        }

        const validation = validateImdbId(debouncedId);
        if (!validation.valid) {
            setValidationError(validation.error || 'Invalid IMDb ID');
            return;
        }

        setValidationError(null);
        fetchMovieData(debouncedId.trim());
    }, [debouncedId, fetchMovieData]);

    return {
        movie,
        sentiment,
        isLoadingMovie,
        isLoadingSentiment,
        movieError,
        sentimentError,
        validationError,
        searchMovie,
        inputValue,
        setInputValue,
    };
}
