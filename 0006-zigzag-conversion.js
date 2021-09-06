/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if (numRows === 1) return s;

    let chunks;
    chunks = [];

    for (let i=0; i<numRows; i++) chunks.push('');

    const loopLength = 2 * numRows - 2;
    for (let i=0; i<s.length; i++) {
        const discriminate = i % loopLength;

        if (discriminate < numRows) {
            chunks[discriminate] += s[i];
        } else {
            chunks[loopLength-discriminate] += s[i];
        }
    }

    return chunks.join('');
};


console.log(convert('PAYPALISHIRING', 3));
console.log(convert('PAYPALISHIRING', 3) === 'PAHNAPLSIIGYIR');
console.log(convert('PAYPALISHIRING', 4));
console.log(convert('PAYPALISHIRING', 4) === 'PINALSIGYAHRPI');
