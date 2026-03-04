// ─── Movie Types ────────────────────────────────────────
export interface Movie {
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  poster: string;
  imdbRating: string;
  imdbID: string;
  type: string;
}

// ─── Review Types ───────────────────────────────────────
export interface Review {
  author: string;
  content: string;
  rating: number; // 1-10
}

// ─── Sentiment Types ────────────────────────────────────
export type SentimentClassification = 'Positive' | 'Mixed' | 'Negative';

export interface SentimentResult {
  summary: string;
  classification: SentimentClassification;
}

// ─── API Response Types ─────────────────────────────────
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type MovieAPIResponse = APIResponse<Movie>;
export type SentimentAPIResponse = APIResponse<SentimentResult>;

// ─── OMDb Raw Response ──────────────────────────────────
export interface OMDbResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  imdbID: string;
  Type: string;
  Response: string;
  Error?: string;
}
