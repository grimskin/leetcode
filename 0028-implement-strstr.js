/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (needle.length == 0) return 0;
    const lastIndex = haystack.length - needle.length;
    if (lastIndex < 0) return -1;
    if (lastIndex == 0) return needle==haystack ? 0 : -1;

    const checkNeedle = (haystack, needle, start) => {
        for (let i=1; i<needle.length; i++) {
            if (needle[i] !== haystack[i+start]) return false;
        }

        return true;
    };

    let i=0;
    while (i <= lastIndex) {
        if (haystack[i] === needle[0]) {
            if (checkNeedle(haystack, needle, i)) {
                return i;
            }
        }
        i++;
    }

    return -1;
};