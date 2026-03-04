import { Movie, OMDbResponse } from '@/types';

/**
 * Fetches movie data from the OMDb API.
 * Transforms the response into our internal Movie type.
 */
export async function fetchMovie(imdbId: string): Promise<Movie> {
    const apiKey = process.env.OMDB_API_KEY;

    if (!apiKey) {
        throw new Error('OMDb API key is not configured');
    }

    const url = `https://www.omdbapi.com/?i=${encodeURIComponent(imdbId)}&apikey=${apiKey}&plot=short`;

    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
        throw new Error(`OMDb API returned status ${response.status}`);
    }

    const data: OMDbResponse = await response.json();

    if (data.Response === 'False') {
        throw new Error(data.Error || 'Movie not found');
    }

    return {
        title: data.Title,
        year: data.Year,
        rated: data.Rated,
        released: data.Released,
        runtime: data.Runtime,
        genre: data.Genre,
        director: data.Director,
        writer: data.Writer,
        actors: data.Actors,
        plot: data.Plot,
        poster: data.Poster,
        imdbRating: data.imdbRating,
        imdbID: data.imdbID,
        type: data.Type,
    };
}
