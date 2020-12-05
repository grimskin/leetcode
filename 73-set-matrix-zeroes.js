/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    const rowsToClear = {};
    const colsToClear = {};

    const height = matrix.length;
    const width = matrix[0].length;

    for(let i=0; i<height; i++) {
        for(let j=0; j<width; j++) {
            if (matrix[i][j] !== 0) continue;

            rowsToClear[i] = i;
            colsToClear[j] = j;
        }
    }

    Object.keys(rowsToClear).forEach(i => {
        for (let j=0; j<width; j++) {
            matrix[i][j] = 0;
        }
    });

    Object.keys(colsToClear).forEach(i => {
        for (let j=0; j<height; j++) {
            matrix[j][i] = 0;
        }
    });
};

let matrix = [[1,1,1],[1,0,1],[1,1,1]];

console.log(matrix);

setZeroes(matrix);

console.log(matrix);
