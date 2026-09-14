/**
 * Pure formatting helpers for game star ratings.
 *
 * Kept framework-free and side-effect-free so the logic is unit-testable
 * without the Astro runtime (see `ratings.test.ts`). Consumed by the
 * `StarRating.astro` component.
 */

/**
 * Clamps a rating into the displayable 0–5 range.
 */
export function clampRating(rating: number): number {
    return Math.min(5, Math.max(0, rating));
}

export type StarState = 'full' | 'half' | 'empty';

export function getStarStates(rating: number): StarState[] {
    const clamped = clampRating(rating);
    return Array.from({ length: 5 }, (_, index): StarState => {
        const remainingRating = clamped - index;
        if (remainingRating >= 1) return 'full';
        if (remainingRating >= 0.5) return 'half';
        return 'empty';
    });
}
