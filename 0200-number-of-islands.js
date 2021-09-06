var numIslands = function(grid) {
    const find = function (x, y) {
        if (grid[x][y].parent.i != x || grid[x][y].parent.j != y) {
            return find(grid[x][y].parent.i,grid[x][y].parent.j);
        }

        return [x,y];
    }

    const union = function (x, y, i, j) {
        let [parentX, parentY] = find(x, y);
        let [parentI, parentJ] = find(i, j);

        grid[parentI][parentJ].parent = {i: parentX, j:parentY};
        grid[i][j].parent = {i: parentX, j:parentY};
    }

    for (let i=0; i<grid.length; i++) {
        for (let j=0; j<grid[0].length; j++) {
            grid[i][j] = {parent:{i:i, j:j}, value:grid[i][j]};
            if (grid[i][j].value === "0") continue;

            if (i>0 && grid[i-1][j].value === "1") {
                union(i-1,j,i,j);
            }
            if (j>0 && grid[i][j-1].value === "1") {
                union(i,j-1,i,j);
            }
        }
    }

    let islands = 0;

    for (let i=0; i<grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j].value === "0") continue;

            if (grid[i][j].parent.i === i && grid[i][j].parent.j === j) {
                islands++;
            }
        }
    }
    return islands;
};