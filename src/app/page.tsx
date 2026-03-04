'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MovieSearch } from '@/components/MovieSearch';
import { MovieCard } from '@/components/MovieCard';
import { SentimentCard } from '@/components/SentimentCard';
import { MovieSkeleton, SentimentSkeleton } from '@/components/SkeletonLoader';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { useMovieData } from '@/hooks/useMovieData';

export default function Home() {
  const {
    movie,
    sentiment,
    isLoadingMovie,
    isLoadingSentiment,
    movieError,
    sentimentError,
    validationError,
    inputValue,
    setInputValue,
  } = useMovieData();

  return (
    <div className="min-h-screen bg-grid-pattern relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" />
              <line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="2" y1="7" x2="7" y2="7" />
              <line x1="2" y1="17" x2="7" y2="17" />
              <line x1="17" y1="17" x2="22" y2="17" />
              <line x1="17" y1="7" x2="22" y2="7" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 hidden sm:block">
            MovieInsight
          </span>
        </div>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center pt-12 sm:pt-20 pb-10 sm:pb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                       bg-indigo-500/10 border border-indigo-500/20
                       text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            AI-Powered Movie Intelligence
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="gradient-text">Movie Insight</span>
            <br />
            <span className="text-gray-900 dark:text-white">Builder</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10">
            Enter any IMDb ID to discover movie details and
            AI-generated audience sentiment analysis
          </p>

          {/* Search Input */}
          <MovieSearch
            value={inputValue}
            onChange={setInputValue}
            validationError={validationError}
            isLoading={isLoadingMovie}
          />
        </motion.section>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          <section className="space-y-6">
            {/* Movie Error */}
            {movieError && (
              <motion.div
                key="movie-error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ErrorDisplay
                  message={movieError}
                  onRetry={() => setInputValue(inputValue)}
                />
              </motion.div>
            )}

            {/* Movie Loading Skeleton */}
            {isLoadingMovie && (
              <motion.div
                key="movie-skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <MovieSkeleton />
              </motion.div>
            )}

            {/* Movie Card */}
            {movie && !isLoadingMovie && (
              <motion.div
                key={`movie-${movie.imdbID}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            )}

            {/* Sentiment Loading Skeleton */}
            {isLoadingSentiment && (
              <SentimentSkeleton />
            )}

            {/* Sentiment Error */}
            {sentimentError && !isLoadingSentiment && (
              <motion.div
                key="sentiment-error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ErrorDisplay message={sentimentError} />
              </motion.div>
            )}

            {/* Sentiment Card */}
            {sentiment && !isLoadingSentiment && (
              <motion.div
                key="sentiment-result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SentimentCard sentiment={sentiment} />
              </motion.div>
            )}
          </section>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-xs text-gray-400 dark:text-gray-600">
        Built with Next.js, TailwindCSS & OpenAI
      </footer>
    </div>
  );
}
