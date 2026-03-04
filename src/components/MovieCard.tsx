'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Movie } from '@/types';

interface MovieCardProps {
    movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
    const castList = movie.actors.split(',').map((a) => a.trim());
    const genres = movie.genre.split(',').map((g) => g.trim());

    return (
        <motion.div
            id="movie-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full overflow-hidden rounded-3xl
                 bg-white/5 backdrop-blur-lg border border-white/10
                 shadow-2xl shadow-black/10 dark:shadow-black/30"
        >
            <div className="flex flex-col md:flex-row">
                {/* Poster */}
                <div className="relative w-full md:w-72 h-96 md:h-auto flex-shrink-0">
                    {movie.poster && movie.poster !== 'N/A' ? (
                        <Image
                            src={movie.poster}
                            alt={`${movie.title} poster`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 288px"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800/50">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="64"
                                height="64"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-600"
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
                    )}
                    {/* Gradient overlay on poster */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/20" />
                </div>

                {/* Details */}
                <div className="flex-1 p-6 md:p-8 space-y-5">
                    {/* Title & Year */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
                        >
                            {movie.title}
                        </motion.h2>
                        <div className="flex items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <span>{movie.year}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-400" />
                            <span>{movie.runtime}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-400" />
                            <span>{movie.rated}</span>
                        </div>
                    </div>

                    {/* IMDb Rating */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl
                       bg-yellow-500/10 border border-yellow-500/20"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="text-yellow-500"
                        >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                            {movie.imdbRating}
                        </span>
                        <span className="text-xs text-gray-400">/10 IMDb</span>
                    </motion.div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2">
                        {genres.map((genre) => (
                            <span
                                key={genre}
                                className="px-3 py-1 text-xs font-medium rounded-full
                           bg-indigo-500/10 text-indigo-600 dark:text-indigo-400
                           border border-indigo-500/20"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>

                    {/* Plot */}
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                        {movie.plot}
                    </p>

                    {/* Director */}
                    <div className="text-sm">
                        <span className="text-gray-400">Directed by </span>
                        <span className="font-medium text-gray-700 dark:text-gray-200">{movie.director}</span>
                    </div>

                    {/* Cast */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                            Cast
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {castList.map((actor) => (
                                <motion.span
                                    key={actor}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="px-3 py-1 text-xs font-medium rounded-full
                             bg-white/10 text-gray-600 dark:text-gray-300
                             border border-white/10"
                                >
                                    {actor}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
