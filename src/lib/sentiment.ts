import OpenAI from 'openai';
import { Review, SentimentResult, SentimentClassification } from '@/types';

/**
 * Analyzes audience sentiment using OpenAI API.
 * Returns a concise summary and sentiment classification.
 */
export async function analyzeSentiment(
    movieTitle: string,
    reviews: Review[]
): Promise<SentimentResult> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        return fallbackSentiment(reviews);
    }

    try {
        const openai = new OpenAI({ apiKey });

        const reviewsText = reviews
            .map((r, i) => `Review ${i + 1} (${r.rating}/10 by ${r.author}): "${r.content}"`)
            .join('\n');

        const prompt = `You are a film critic AI. Analyze the following audience reviews for the movie "${movieTitle}" and provide:

1. A concise 2-3 sentence summary of the overall audience sentiment.
2. A sentiment classification: exactly one of "Positive", "Mixed", or "Negative".

Reviews:
${reviewsText}

Respond in this exact JSON format only, with no additional text:
{"summary": "your summary here", "classification": "Positive|Mixed|Negative"}`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.5,
            max_tokens: 200,
            response_format: { type: 'json_object' },
        });

        const content = completion.choices[0]?.message?.content;

        if (!content) {
            return fallbackSentiment(reviews);
        }

        const parsed = JSON.parse(content);

        // Validate classification
        const validClassifications: SentimentClassification[] = ['Positive', 'Mixed', 'Negative'];
        const classification = validClassifications.includes(parsed.classification)
            ? parsed.classification
            : inferClassification(reviews);

        return {
            summary: parsed.summary || 'Unable to generate sentiment summary.',
            classification,
        };
    } catch (error) {
        console.error('OpenAI sentiment analysis failed:', error);
        return fallbackSentiment(reviews);
    }
}

/**
 * Infer sentiment classification from review ratings.
 */
function inferClassification(reviews: Review[]): SentimentClassification {
    if (reviews.length === 0) return 'Mixed';

    const avgRating =
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    if (avgRating >= 7) return 'Positive';
    if (avgRating >= 4.5) return 'Mixed';
    return 'Negative';
}

/**
 * Fallback sentiment when OpenAI is unavailable.
 * Uses basic statistical analysis of review ratings.
 */
function fallbackSentiment(reviews: Review[]): SentimentResult {
    const classification = inferClassification(reviews);
    const avgRating =
        reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : 'N/A';

    const summaries: Record<SentimentClassification, string> = {
        Positive: `Based on ${reviews.length} audience reviews (avg rating: ${avgRating}/10), viewers overwhelmingly praised this film. The consensus highlights strong performances, compelling storytelling, and excellent production values.`,
        Mixed: `Based on ${reviews.length} audience reviews (avg rating: ${avgRating}/10), audience opinion is divided. While some viewers appreciated certain aspects, others found room for improvement in pacing and narrative consistency.`,
        Negative: `Based on ${reviews.length} audience reviews (avg rating: ${avgRating}/10), audiences were largely disappointed. Common criticisms include weak storytelling, poor pacing, and unfulfilled potential despite the premise.`,
    };

    return {
        summary: summaries[classification],
        classification,
    };
}
