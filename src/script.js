document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('analyzeButton').addEventListener('click', () => {
        const text = document.getElementById('textInput').value;

        if (text.trim() === '') {
            alert('Please enter some text to analyze.');
            return;
        }

        // 1. Word Count
        const words = text.split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;

        // 2. Character Count (including spaces)
        const charCount = text.length;

        // 3. Sentence Count
        // A sentence ends with a period, question mark, or exclamation point.
        const sentenceCount = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;

        // 4. Average Word Length
        const totalWordLength = words.reduce((sum, word) => sum + word.length, 0);
        const avgWordLength = (totalWordLength / wordCount).toFixed(2);

        // 5. Top Words
        // We'll create a map to count words, ignoring common "stop words."
        const wordMap = {};
        const commonWords = new Set(['the', 'a', 'an', 'and', 'is', 'it', 'in', 'of', 'to', 'for', 'with', 'on']);

        words.forEach(word => {
            const cleanedWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (cleanedWord && !commonWords.has(cleanedWord)) {
                wordMap[cleanedWord] = (wordMap[cleanedWord] || 0) + 1;
            }
        });

        const sortedWords = Object.entries(wordMap).sort(([, countA], [, countB]) => countB - countA);
        const topWords = sortedWords.slice(0, 5).map(entry => `${entry[0]} (${entry[1]})`).join(', ');

        // Update the HTML elements with the calculated values
            document.getElementById('wordCount').textContent = wordCount;
            document.getElementById('charCount').textContent = charCount;
            document.getElementById('sentenceCount').textContent = sentenceCount;
            document.getElementById('avgWordLength').textContent = isNaN(avgWordLength) ? '0' : avgWordLength;
            document.getElementById('topWords').textContent = topWords || 'N/A';
    });
});

document.getElementById('copyButton').addEventListener('click', () => {
    const resultsText = document.getElementById('results').innerText;
    navigator.clipboard.writeText(resultsText)
        .then(() => alert("Results copied to clipboard!"))
        .catch(err => console.error("Copy failed", err));
});
