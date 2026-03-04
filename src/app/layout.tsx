import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AI Movie Insight Builder | Discover Movie Sentiments',
  description:
    'Explore movie details and AI-powered audience sentiment analysis. Enter any IMDb ID to get cast info, ratings, plot summaries, and intelligent sentiment insights.',
  keywords: ['movies', 'IMDb', 'AI', 'sentiment analysis', 'movie reviews', 'audience sentiment'],
  authors: [{ name: 'AI Movie Insight Builder' }],
  openGraph: {
    title: 'AI Movie Insight Builder',
    description: 'Discover movie insights with AI-powered audience sentiment analysis.',
    type: 'website',
    locale: 'en_US',
    siteName: 'AI Movie Insight Builder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Movie Insight Builder',
    description: 'Discover movie insights with AI-powered audience sentiment analysis.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

