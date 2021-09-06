/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
    const strLen = s.length;
    let pos = 0;

    const isWhiteSpace = function(char) {
        return char == " ";
    };
    const isNumber = function(char) {
        // kinda optimization
        return char == "0" || char == "1" || char == "2" ||
            char == "3" || char == "4" || char == "5" ||
            char == "6" || char == "7" || char == "8" ||
            char == "9";
    }

    while (pos<strLen && isWhiteSpace(s[pos])) pos++;

    let result = "";

    if (s[pos] == "-") {
        result = "-";
        pos++;
    } else if (s[pos] == "+") {
        pos++;
    }

    while (pos<strLen && isNumber(s[pos])) {
        result = result.concat(s[pos]);
        pos++;
    }

    result = parseInt(result);

    if (isNaN(result)) return 0;
    if (result < -2147483648) return -2147483648;
    if (result > 2147483647) return 2147483647;

    return result;
};
