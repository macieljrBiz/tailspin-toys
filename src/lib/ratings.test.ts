import { describe, it, expect } from 'vitest';
import { clampRating, getStarStates } from './ratings';

describe('clampRating', () => {
    it('returns the value unchanged when within range', () => {
        expect(clampRating(0)).toBe(0);
        expect(clampRating(3.5)).toBe(3.5);
        expect(clampRating(5)).toBe(5);
    });

    it('clamps values outside the 0–5 range', () => {
        expect(clampRating(-2)).toBe(0);
        expect(clampRating(7)).toBe(5);
    });
});

describe('getStarStates', () => {
    it('returns full and empty states for whole numbers', () => {
        expect(getStarStates(0)).toEqual(['empty', 'empty', 'empty', 'empty', 'empty']);
        expect(getStarStates(3)).toEqual(['full', 'full', 'full', 'empty', 'empty']);
        expect(getStarStates(5)).toEqual(['full', 'full', 'full', 'full', 'full']);
    });

    it('returns a half state when the fraction is at least 0.5', () => {
        expect(getStarStates(3.5)).toEqual(['full', 'full', 'full', 'half', 'empty']);
        expect(getStarStates(4.75)).toEqual(['full', 'full', 'full', 'full', 'half']);
    });

    it('rounds fractions below 0.5 down to an empty state', () => {
        expect(getStarStates(3.4)).toEqual(['full', 'full', 'full', 'empty', 'empty']);
    });

    it('always produces five star positions', () => {
        for (const rating of [0, 1, 2.5, 3.5, 4, 5]) {
            expect(getStarStates(rating)).toHaveLength(5);
        }
    });

    it('clamps ratings outside the 0–5 range', () => {
        expect(getStarStates(-1)).toEqual(['empty', 'empty', 'empty', 'empty', 'empty']);
        expect(getStarStates(6)).toEqual(['full', 'full', 'full', 'full', 'full']);
    });

    it('is deterministic for the same input', () => {
        expect(getStarStates(3.5)).toEqual(getStarStates(3.5));
    });
});
