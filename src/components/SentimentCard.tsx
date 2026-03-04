'use client';

import { motion } from 'framer-motion';
import { SentimentResult, SentimentClassification } from '@/types';

interface SentimentCardProps {
    sentiment: SentimentResult;
}

const sentimentConfig: Record<
    SentimentClassification,
    { color: string; bg: string; border: string; icon: string; label: string }
> = {
    Positive: {
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        icon: '😊',
        label: 'Positive Sentiment',
    },
    Mixed: {
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
        icon: '🤔',
        label: 'Mixed Sentiment',
    },
    Negative: {
        color: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/20',
        icon: '😞',
        label: 'Negative Sentiment',
    },
};

export function SentimentCard({ sentiment }: SentimentCardProps) {
    const config = sentimentConfig[sentiment.classification];

    return (
        <motion.div
            id="sentiment-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="w-full rounded-3xl overflow-hidden
                 bg-white/5 backdrop-blur-lg border border-white/10
                 shadow-2xl shadow-black/10 dark:shadow-black/30
                 p-6 md:p-8"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20
                          flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-indigo-400"
                        >
                            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            AI Sentiment Analysis
                        </h3>
                        <p className="text-xs text-gray-400">Powered by audience review analysis</p>
                    </div>
                </div>

                {/* Sentiment badge */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full
                      ${config.bg} ${config.border} border`}
                >
                    <span className="text-lg">{config.icon}</span>
                    <span className={`text-sm font-semibold ${config.color}`}>
                        {sentiment.classification}
                    </span>
                </motion.div>
            </div>

            {/* Summary */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative"
            >
                <div className="absolute -left-1 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
                <p className="pl-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {sentiment.summary}
                </p>
            </motion.div>

            {/* Footer label */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-gray-500">
                    {config.label} • Based on audience reviews
                </span>
            </div>
        </motion.div>
    );
}
