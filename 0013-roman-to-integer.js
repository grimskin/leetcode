/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const map = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
    };

    const splitted = s.split('').reverse();

    let result = 0;
    let lastNumber = 0;

    splitted.forEach(val => {
        const digit = map[val];

        if (digit >= lastNumber) result += digit
        else result -= digit;

        lastNumber = digit;
    });

    return result;
};

console.log(romanToInt('XV'));
