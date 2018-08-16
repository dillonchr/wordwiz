import * as w from './wordanalyzer.js';

describe('Word Analyzer', () => {
    it('doesn\'t explode', () => {
        expect(w).toBeDefined();
    });

    it('counts sentences', () => {
        expect(w.getSentences('This is one sentence. This is another.').length).toBe(2);
        expect(w.getSentences('This is a sentence? No this is.').length).toBe(2);
        expect(w.getSentences('This is a sentence? No this is! Also this is one.').length).toBe(3);
    });

    it('counts words', () => {
        expect(w.getWords('Now this is a proper short sentence.').length).toBe(7);
        expect(w.getWords('Now this is 1 proper short sentence.').length).toBe(7);
        expect(w.getWords('Do words-which-are-hyphenated-count?').length).toBe(2);
    });

    it('counts syllables', () => {
        expect(w.getSyllables('dynamic')).toBe(3);
        expect(w.getSyllables('gym')).toBe(1);
        expect(w.getSyllables('banana')).toBe(3);
        expect(w.getSyllables('initialization')).toBe(6);
        expect(w.getSyllables('character')).toBe(3);
        expect(w.getSyllables('stoop')).toBe(1);
        expect(w.getSyllables('crimson')).toBe(2);
        expect(w.getSyllables('happily')).toBe(3);
        expect(w.getSyllables('drives')).toBe(1);
    });

    it('counts adverbs', () => {
        expect(w.getAdverbs(['There', 'should', 'be', 'none.'])).toBe(0);
        expect(w.getAdverbs(['There', 'slyly', 'are', 'some.'])).toBe(1);
        expect(w.getAdverbs(['There', 'some', 'are', 'slyly.'])).toBe(1);
        expect(w.getAdverbs(['\'Finally\'', 'he', 'said', 'triumphantly!'])).toBe(2);
        expect(w.getAdverbs(['belly', 'chilly', 'folly', 'reply'])).toBe(0);
        expect(w.getAdverbs(['Belly', 'chIlly', 'follY', 'REPLY'])).toBe(0);
    });

    it('counts everything', () => {
        const a = w.default('There are 2 sentences inside here. But not really.');
        expect(a.sentences).toBe(2);
        expect(a.words).toBe(9);
        expect(a.adverbs).toBe(1);
        expect(parseInt(a.grade, 10)).toBeGreaterThan(0);
    });
});
