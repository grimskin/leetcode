/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    const sign = x>-1 ? 1 : -1;

    x *= sign;
    x = parseInt(x.toString().split("").reverse().join(""));
    x *= sign;

    if (x<-2147483648) return 0;
    if (x>2147483647) return 0;
    return x;
};