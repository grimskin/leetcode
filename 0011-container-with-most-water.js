/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let left = 0;
    let right = height.length-1;
    let maxVolume = 0;

    while (left != right) {
        let candidateSum = Math.min(height[left], height[right]) * (right - left);
        if (candidateSum > maxVolume) maxVolume = candidateSum;

        if (height[left] > height[right]) {
            let candidate = right;
            do {
                candidate--;
            } while ((left != candidate) && height[candidate] <= height[right]);
            right = candidate;
        } else {
            let candidate = left;
            do {
                candidate++;
            } while ((right != candidate) && height[candidate] <= height[left]);
            left = candidate;
        }
    }

    return maxVolume;
};
