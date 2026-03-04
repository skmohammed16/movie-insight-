import { Review } from '@/types';

/**
 * Structured mock review dataset.
 * Organized into sentiment pools for realistic variety.
 * This abstraction can be replaced with a real API call.
 */

const positiveReviews: Review[] = [
    { author: 'CinemaFan42', content: 'Absolutely stunning film. The performances were top-notch and the story kept me engaged throughout. A masterpiece of modern cinema.', rating: 9 },
    { author: 'MovieBuff99', content: 'One of the best movies I\'ve seen in years. The cinematography alone is worth the ticket price. Highly recommended!', rating: 10 },
    { author: 'FilmCritic01', content: 'A beautifully crafted story with exceptional acting. Every scene feels purposeful and emotionally resonant.', rating: 8 },
    { author: 'ScreenJunkie', content: 'This movie exceeded all my expectations. The direction is flawless and the soundtrack perfectly complements every moment.', rating: 9 },
    { author: 'ReelTalk', content: 'Incredible movie experience. The character development is remarkable and the plot twists are genuinely surprising.', rating: 8 },
    { author: 'PopcornLover', content: 'A must-watch for any film enthusiast. The visual effects blend seamlessly with the storytelling.', rating: 9 },
    { author: 'CinephileX', content: 'Breathtaking from start to finish. This is the kind of film that stays with you long after the credits roll.', rating: 10 },
    { author: 'AisleSeat', content: 'Perfect pacing, stellar cast, and a story that resonates deeply. This film sets a new standard.', rating: 9 },
    { author: 'FilmNerd_23', content: 'The attention to detail in every frame is remarkable. A true labor of love from the entire creative team.', rating: 8 },
    { author: 'SilverScreen', content: 'An emotional rollercoaster in the best possible way. This movie made me laugh, cry, and everything in between.', rating: 9 },
];

const mixedReviews: Review[] = [
    { author: 'HonestViewer', content: 'Decent movie with some genuinely great moments, but the pacing drags in the middle. Worth watching once.', rating: 6 },
    { author: 'CasualWatcher', content: 'Good performances but the script feels uneven. Some scenes are brilliant while others fall flat.', rating: 5 },
    { author: 'FilmForum', content: 'Visually impressive but narratively inconsistent. The first half promises more than the second half delivers.', rating: 6 },
    { author: 'CriticCorner', content: 'An ambitious project that doesn\'t quite stick the landing. Still entertaining enough to recommend with caveats.', rating: 5 },
    { author: 'BalancedView', content: 'The acting saves what is otherwise a predictable plot. Not bad, but not as groundbreaking as the hype suggests.', rating: 6 },
    { author: 'TwoStars', content: 'Has its moments of brilliance but too many subplots weigh it down. Could have been great with tighter editing.', rating: 5 },
    { author: 'WeekendMovieGoer', content: 'Enjoyable but forgettable. Good for a weekend watch but probably won\'t make my year-end list.', rating: 6 },
    { author: 'ArmchairCritic', content: 'The lead performance is outstanding but overshadowed by a meandering storyline. A frustratingly uneven film.', rating: 5 },
    { author: 'OscarWatch', content: 'Technically proficient with moments of genuine emotion, but the third act needed more work.', rating: 7 },
    { author: 'MatineeGoer', content: 'Not as bad as some critics say, but not as good as the trailers promised. Somewhere solidly in the middle.', rating: 6 },
];

const negativeReviews: Review[] = [
    { author: 'DisappointedFan', content: 'A complete waste of potential. The trailer was more compelling than the actual movie. Very disappointing.', rating: 3 },
    { author: 'HarshTruth', content: 'Overrated and underwhelming. The plot makes no sense and the characters are one-dimensional.', rating: 2 },
    { author: 'NotImpressed', content: 'Struggled to stay awake through this one. The pacing is glacial and the dialogue feels forced throughout.', rating: 3 },
    { author: 'RefundPlease', content: 'Save your money. This is a textbook example of style over substance with nothing meaningful to say.', rating: 2 },
    { author: 'CriticalEye', content: 'Despite the talented cast, the direction is aimless and the story collapses under its own weight.', rating: 3 },
    { author: 'ViewerRegret', content: 'Pretentious and hollow. Tries too hard to be clever but ends up being confusing and boring.', rating: 2 },
    { author: 'WastedTime', content: 'The worst movie I\'ve seen this year. Nothing about this works - not the acting, not the story, not the direction.', rating: 1 },
    { author: 'BluntReview', content: 'How this got greenlit is beyond me. A confused mess from beginning to end with no redeeming qualities.', rating: 2 },
    { author: 'RealTalkMovies', content: 'All flash, no substance. The special effects can\'t hide the fact that there\'s no heart in this film.', rating: 3 },
    { author: 'OneStarWonder', content: 'Insulting to the audience\'s intelligence. Lazy writing and phoned-in performances throughout.', rating: 1 },
];

/**
 * Simple hash function to generate a deterministic number from a string.
 */
function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

/**
 * Get mock reviews for a movie based on its IMDb ID.
 * Uses deterministic selection so results are consistent for the same ID.
 */
export function getReviews(imdbId: string): Review[] {
    const hash = hashString(imdbId);
    const reviews: Review[] = [];

    // Deterministically pick 3-4 reviews from each pool
    const pickFrom = (pool: Review[], count: number, offset: number): Review[] => {
        const picked: Review[] = [];
        for (let i = 0; i < count; i++) {
            const index = (hash + offset + i) % pool.length;
            picked.push(pool[index]);
        }
        return picked;
    };

    // Mix reviews from all sentiment pools for realistic variety
    reviews.push(...pickFrom(positiveReviews, 3 + (hash % 2), 0));
    reviews.push(...pickFrom(mixedReviews, 2 + (hash % 2), 10));
    reviews.push(...pickFrom(negativeReviews, 1 + (hash % 2), 20));

    return reviews;
}
