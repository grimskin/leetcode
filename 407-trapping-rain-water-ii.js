/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function(heightMap) {
    const width = heightMap.length;
    const height = heightMap[0].length;

    let shadow = [];

    let currentShadow;

    for (let i=0;i<width;i++) {
        shadow[i] = [];

        currentShadow = 0;
        for (let j=0; j<height; j++) {
            if (heightMap[i][j] > currentShadow) currentShadow = heightMap[i][j];
            shadow[i][j] = currentShadow;
        }
        currentShadow = 0;
        for (let j=height-1; j>=0; j--) {
            if (heightMap[i][j] > currentShadow) currentShadow = heightMap[i][j];
            shadow[i][j] = Math.min(shadow[i][j], currentShadow);
        }
    }

    for (let j=0; j<height; j++) {
        currentShadow = 0;
        for (let i=0;i<width;i++) {
            if (heightMap[i][j] > currentShadow) currentShadow = heightMap[i][j];
            shadow[i][j] = Math.min(shadow[i][j], currentShadow);
        }
        currentShadow = 0;
        for (let i=width-1;i>=0;i--) {
            if (heightMap[i][j] > currentShadow) currentShadow = heightMap[i][j];
            shadow[i][j] = Math.min(shadow[i][j], currentShadow);
        }
    }

    let changed = [];
    for (let i=1;i<width-1;i++) {
        for (let j=1; j<height-1; j++) {
            if (shadow[i][j] > heightMap[i][j]) {
                let oldValue = shadow[i][j];
                shadow[i][j] = Math.min(
                    shadow[i][j],
                    shadow[i+1][j],
                    shadow[i-1][j],
                    shadow[i][j+1],
                    shadow[i][j-1],
                );
                if (oldValue != shadow[i][j]) changed.push([i,j]);
            }
        }
    }

    while (changed.length) {
        let oldChanged = Array.from(changed);
        changed = [];

        while(oldChanged.length) {
            let [x, y] = oldChanged.pop();
            if (x==0 || y==0) continue;
            if (x==width-1 || y==height-1) continue;

            for (const index of [[-1,0],[1,0],[0,-1],[0,1]]) {
                let [dx, dy] = index;
                i = x + dx;
                j = y + dy;
                if (shadow[i][j] > heightMap[i][j]) {
                    let oldValue = shadow[i][j];
                    shadow[i][j] = Math.min(
                        shadow[i][j],
                        shadow[i+1][j],
                        shadow[i-1][j],
                        shadow[i][j+1],
                        shadow[i][j-1],
                    );
                    if (oldValue != shadow[i][j]) changed.push([i,j]);
                }
            }
        }
    }

    let water = 0;

    for (let i=0;i<width;i++) {
        for (let j=0; j<height; j++) {
            water += shadow[i][j] - heightMap[i][j];
        }
    }

    return water;
};

// console.log(trapRainWater([[14,17,18,16,14,16],[17,3,10,2,3,8],[11,10,4,7,1,7],[13,7,2,9,8,10],[13,1,3,4,8,6],[20,3,3,9,10,8]]));
console.log(trapRainWater([[13,7,2,9,8,10],[13,1,3,4,8,6],[20,3,3,9,10,8]]));

/*
[14,17,18,16,14,16]
[17,03,10,02,03,08]
[11,10,04,07,01,07]
[13,07,02,09,08,10]
[13,01,03,04,08,06]
[20,03,03,09,10,08]

 */