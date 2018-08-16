import nonAdverbs from './non-adverbs.json';

export const getSentences = (excerpt) => excerpt.split('\n').reduce((coll, line) => {
    if (line.trim()) {
        return coll.concat(line.split(/[.!?]/).map(s => s.trim()).filter(s => s));
    }
    return coll;
}, []);

export const getWords = (sentence) => sentence.split(' ').filter(s => s);

export const getSyllables = (word) => {
    const matches = word.replace(/^y/i, '')
        .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
        .match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
};

export const getAdverbs = (words) => words.filter(w => {
    return /ly[.!?"']?$/i.test(w) &&
        nonAdverbs.indexOf(w.match(/[a-z]+/i).shift().toLowerCase()) === -1;
}).length;

export default (excerpt) => {
    if (!excerpt || !excerpt.length) {
        return {};
    }

    const totalSentences = getSentences(excerpt);
    const totalWords = totalSentences.reduce((words, sentence) => {
        return words.concat(getWords(sentence));
    }, []);
    const totalAdverbs = getAdverbs(totalWords);
    const adverbPercentage = ((totalAdverbs / totalWords.length) * 100).toFixed(2) + '%';
    const totalSyllables = totalWords.reduce((syllables, word) => {
        return syllables + getSyllables(word);
    }, 0);
    const grade = ((0.39 * (totalWords.length / totalSentences.length)) + (11.8 * (totalSyllables / totalWords.length)) - 15.59).toFixed(2);

    return {
        sentences: totalSentences.length,
        words: totalWords.length,
        adverbs: totalAdverbs,
        adverbPercentage,
        syllables: totalSyllables,
        grade
    };
};

