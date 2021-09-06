/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x<0) return false;
    if (x<10) return true;

    const original = x;
    let reversed = 0;

    let carry;
    while (x) {
        carry = x % 10;
        reversed = reversed * 10 + (carry);
        x = (x - carry) / 10;
    }

    return original == reversed;
};