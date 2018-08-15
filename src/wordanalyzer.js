export default (excerpt) => {
    if (!excerpt || !excerpt.length) {
        return {};
    }

    const totalSentences = excerpt.split('\n').reduce((coll, line) => {
        if (line.trim()) {
            return coll.concat(line.split('.').map(s => s.trim()).filter(s => s));
        }
        return coll;
    }, []);

    const totalWords = totalSentences.reduce((words, sentence) => {
        return words.concat(sentence.split(' ').filter(s => s));
    }, []);

    const totalAdverbs = totalWords.filter(w => /ly$/i.test(w));

    const adverbPercentage = ((totalAdverbs.length / totalWords.length) * 100).toFixed(2) + '%';

    const totalSyllables = totalWords.reduce((syllables, word) => {
        const matches = word.match(/[aeiou][bcdfghjklmnpqrstvwxyz]/ig);
        const step = matches ? matches.length : 1;
        return syllables + step;
    }, 0);

    const grade = ((0.39 * (totalWords.length / totalSentences.length)) + (11.8 * (totalSyllables / totalWords.length)) - 15.59).toFixed(2);

    return {
        sentences: totalSentences.length,
        words: totalWords.length,
        adverbs: totalAdverbs.length,
        adverbPercentage,
        syllables: totalSyllables.length,
        grade
    };
};

