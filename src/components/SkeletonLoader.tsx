'use client';

import { motion } from 'framer-motion';

export function MovieSkeleton() {
    return (
        <div
            className="w-full rounded-3xl overflow-hidden
                 bg-white/5 backdrop-blur-lg border border-white/10
                 shadow-2xl shadow-black/10 dark:shadow-black/30"
        >
            <div className="flex flex-col md:flex-row animate-pulse">
                {/* Poster skeleton */}
                <div className="w-full md:w-72 h-96 md:h-[420px] bg-gray-700/30 flex-shrink-0" />

                {/* Content skeleton */}
                <div className="flex-1 p-6 md:p-8 space-y-5">
                    {/* Title */}
                    <div className="space-y-2">
                        <div className="h-8 w-3/4 bg-gray-700/30 rounded-lg" />
                        <div className="h-4 w-1/2 bg-gray-700/20 rounded-lg" />
                    </div>

                    {/* Rating */}
                    <div className="h-8 w-28 bg-gray-700/20 rounded-xl" />

                    {/* Genres */}
                    <div className="flex gap-2">
                        <div className="h-6 w-16 bg-gray-700/20 rounded-full" />
                        <div className="h-6 w-20 bg-gray-700/20 rounded-full" />
                        <div className="h-6 w-14 bg-gray-700/20 rounded-full" />
                    </div>

                    {/* Plot */}
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-700/20 rounded-lg" />
                        <div className="h-4 w-5/6 bg-gray-700/20 rounded-lg" />
                        <div className="h-4 w-2/3 bg-gray-700/20 rounded-lg" />
                    </div>

                    {/* Director */}
                    <div className="h-4 w-48 bg-gray-700/20 rounded-lg" />

                    {/* Cast */}
                    <div className="space-y-2">
                        <div className="h-3 w-10 bg-gray-700/10 rounded" />
                        <div className="flex gap-2">
                            <div className="h-6 w-24 bg-gray-700/20 rounded-full" />
                            <div className="h-6 w-28 bg-gray-700/20 rounded-full" />
                            <div className="h-6 w-20 bg-gray-700/20 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SentimentSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full rounded-3xl overflow-hidden
                 bg-white/5 backdrop-blur-lg border border-white/10
                 shadow-2xl shadow-black/10 dark:shadow-black/30
                 p-6 md:p-8 animate-pulse"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700/30" />
                    <div className="space-y-1.5">
                        <div className="h-5 w-44 bg-gray-700/30 rounded-lg" />
                        <div className="h-3 w-52 bg-gray-700/20 rounded-lg" />
                    </div>
                </div>
                <div className="h-9 w-28 bg-gray-700/20 rounded-full" />
            </div>

            {/* Summary lines */}
            <div className="pl-5 space-y-2">
                <div className="h-4 w-full bg-gray-700/20 rounded-lg" />
                <div className="h-4 w-5/6 bg-gray-700/20 rounded-lg" />
                <div className="h-4 w-3/4 bg-gray-700/20 rounded-lg" />
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-white/5">
                <div className="h-3 w-48 bg-gray-700/10 rounded" />
            </div>
        </motion.div>
    );
}
