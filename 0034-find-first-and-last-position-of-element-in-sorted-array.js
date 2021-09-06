/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    if (!nums.includes(target)) return [-1, -1];

    const len = nums.length;

    let pos = Math.round((len-1)/2), step = Math.round(len/4);

    while (nums[pos] != target) {
        if (nums[pos] > target) {
            pos -= step;
        } else {
            pos += step;
        }

        step = Math.round(step/2);
    }

    let left = pos;
    while (nums[left-1] == target && left > 0) left--;
    let right = pos;
    while (nums[right+1] == target && right < len-1) right++;

    return [left, right];
};