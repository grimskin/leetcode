/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(words) {
    const rows = [
        "qwertyuiop".split(''),
        "asdfghjkl".split(''),
        "zxcvbnm".split(''),
    ];

    const result = [];

    const rowForLetter = letter => {
        if (rows[0].includes(letter)) return 0;
        if (rows[1].includes(letter)) return 1;
        return 2;
    };

    words.forEach(word => {
        const letters = word.toLowerCase().split('');
        let lastRow = rowForLetter(letters[0]);

        for (let i=1; i<letters.length; i++) {
            if (rowForLetter(letters[i]) !== lastRow) return;
            lastRow = rowForLetter(letters[i]);
        }

        result.push(word);
    });

    return result;
};

console.log(findWords(["Hello", "Alaska", "Dad", "Peace"]));
