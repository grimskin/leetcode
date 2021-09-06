/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    const validateSet = set => {
        const checker = {};

        for(let i=0; i<9; i++) {
            if (set[i] === '.') continue;

            if (checker[set[i]]) return false;

            checker[set[i]] = true;
        }

        return true;
    }

    for (let i=0;i<9;i++) {
        if (!validateSet(board[i])) return false;

        const column = [];
        for (let j=0;j<9;j++) {
            column.push(board[j][i]);
        }
        if (!validateSet(column)) return false;
    }

    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            const block = [];

            block.push(board[i*3+0][j*3+0]);
            block.push(board[i*3+0][j*3+1]);
            block.push(board[i*3+0][j*3+2]);
            block.push(board[i*3+1][j*3+0]);
            block.push(board[i*3+1][j*3+1]);
            block.push(board[i*3+1][j*3+2]);
            block.push(board[i*3+2][j*3+0]);
            block.push(board[i*3+2][j*3+1]);
            block.push(board[i*3+2][j*3+2]);

            if (!validateSet(block)) return false;
        }
    }

    return true;
};

console.log(isValidSudoku(
    [["5","3",".",".","7",".",".",".","."]
    ,["6",".",".","1","9","5",".",".","."]
    ,[".","9","8",".",".",".",".","6","."]
    ,["8",".",".",".","6",".",".",".","3"]
    ,["4",".",".","8",".","3",".",".","1"]
    ,["7",".",".",".","2",".",".",".","6"]
    ,[".","6",".",".",".",".","2","8","."]
    ,[".",".",".","4","1","9",".",".","5"]
    ,[".",".",".",".","8",".",".","7","9"]]
));
console.log(isValidSudoku(
    [["8","3",".",".","7",".",".",".","."]
    ,["6",".",".","1","9","5",".",".","."]
    ,[".","9","8",".",".",".",".","6","."]
    ,["8",".",".",".","6",".",".",".","3"]
    ,["4",".",".","8",".","3",".",".","1"]
    ,["7",".",".",".","2",".",".",".","6"]
    ,[".","6",".",".",".",".","2","8","."]
    ,[".",".",".","4","1","9",".",".","5"]
    ,[".",".",".",".","8",".",".","7","9"]]
));
