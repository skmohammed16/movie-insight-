'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface MovieSearchProps {
    value: string;
    onChange: (value: string) => void;
    validationError: string | null;
    isLoading: boolean;
}

export function MovieSearch({ value, onChange, validationError, isLoading }: MovieSearchProps) {
    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="relative">
                {/* Search icon */}
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </div>

                <input
                    id="imdb-search"
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Enter IMDb ID (e.g., tt0133093)"
                    className={`w-full pl-12 pr-12 py-4 rounded-2xl text-base
                     bg-white/5 backdrop-blur-md border
                     ${validationError
                            ? 'border-red-500/50 focus:ring-red-500/30'
                            : 'border-white/10 focus:ring-indigo-500/30'
                        }
                     focus:outline-none focus:ring-2
                     text-gray-900 dark:text-white
                     placeholder-gray-400 dark:placeholder-gray-500
                     transition-all duration-200`}
                    autoComplete="off"
                    spellCheck="false"
                    aria-label="IMDb ID input"
                    aria-describedby={validationError ? 'search-error' : 'search-hint'}
                />

                {/* Loading spinner */}
                {isLoading && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <motion.div
                            className="w-5 h-5 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                    </div>
                )}
            </div>

            {/* Inline validation error */}
            <AnimatePresence>
                {validationError && (
                    <motion.p
                        id="search-error"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="mt-2 text-sm text-red-400 flex items-center gap-1.5 pl-1"
                        role="alert"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {validationError}
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Hint text */}
            {!validationError && (
                <p id="search-hint" className="mt-2 text-xs text-gray-400 dark:text-gray-500 pl-1">
                    Find a movie&apos;s IMDb ID from its URL: imdb.com/title/<span className="text-indigo-400">tt0133093</span>
                </p>
            )}
        </div>
    );
}
