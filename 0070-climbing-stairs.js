const cache = [];

var climbStairs = function(n) {
    if (n==1) return 1;
    if (n==2) return 2;
    if (n==3) return 3;

    if (cache[n] !== undefined) return cache[n];

    let result = climbStairs(n-2);
    result += climbStairs(n-1);

    cache[n] = result;
    return result;
};

console.log(climbStairs(100));