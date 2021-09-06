/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if (nums.length == 1) return 1;

    let left = 0;
    let right = 1;
    let numsLen = nums.length;

    do {
        if (nums[left] != nums[right]) {
            nums[left+1] = nums[right];
            left++;
        }
        right++;
    } while (right < numsLen);

    nums.length = left+1;

    return left+1;
};