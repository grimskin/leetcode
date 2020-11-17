/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function(pushed, popped) {
    if (pushed.length === 0) return true;

    let poppedPointer = 0;
    let testArr = [];

    while(true) {
        if (testArr.length > 0) {
            if (testArr[testArr.length - 1] === popped[poppedPointer]) {
                testArr.pop();
                poppedPointer++;

                continue;
            }
        }
        if (pushed.length > 0) {
            testArr.push(pushed.shift());

            continue;
        }

        if (testArr.length === 0 && pushed.length === 0) return true;

        return false;
    }
};

console.log(validateStackSequences([1,2,3,4,5], [4,5,3,2,1]));