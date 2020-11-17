/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    nums.sort((a,b) => a-b);

    let number = 1;
    let pointer = 0;

    while (pointer < nums.length) {
        if (nums[pointer] > number) return number;
        if (nums[pointer] == number) number++;

        pointer++;
    }

    return number;
};

console.log(firstMissingPositive([1,2,0]));
