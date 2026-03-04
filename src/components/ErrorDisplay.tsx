'use client';

import { motion } from 'framer-motion';

interface ErrorDisplayProps {
    message: string;
    onRetry?: () => void;
}

export function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
    return (
        <motion.div
            id="error-display"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full rounded-3xl overflow-hidden
                 bg-red-500/5 backdrop-blur-lg border border-red-500/20
                 shadow-2xl shadow-black/10 dark:shadow-black/30
                 p-8 text-center"
        >
            {/* Error icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="w-16 h-16 mx-auto mb-4 rounded-full
                   bg-red-500/10 border border-red-500/20
                   flex items-center justify-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-400"
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
            </motion.div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Something went wrong
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                {message}
            </p>

            {onRetry && (
                <motion.button
                    onClick={onRetry}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 rounded-xl text-sm font-medium
                     bg-red-500/10 text-red-400 border border-red-500/20
                     hover:bg-red-500/20 transition-colors duration-200"
                >
                    Try Again
                </motion.button>
            )}
        </motion.div>
    );
}
