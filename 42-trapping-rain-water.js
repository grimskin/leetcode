/**
 * @see https://leetcode.com/problems/trapping-rain-water/
 */
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    const len = height.length;

    let currentShadow = 0;
    let shadowLtr = [];
    for (let i=0;i<len;i++) {
        if (height[i] > currentShadow) currentShadow = height[i];
        shadowLtr[i] = currentShadow;
    }
    currentShadow = 0;
    // let shadowRtl = [];
    let water = 0;
    for (let i=len-1;i>=0;i--) {
        if (height[i] > currentShadow) {
            currentShadow = height[i];
        } else {
            let doubleShadow = Math.min(currentShadow, shadowLtr[i]);
            if (doubleShadow > height[i]) water += doubleShadow - height[i];
        }
        // shadowRtl[i] = currentShadow;
    }
    return water;

    //     let water = 0;
    //     for (let i=0;i<len;i++) {
    //         let doubleShadow = Math.min(shadowLtr[i], shadowRtl[i]);
    //         if (doubleShadow > height[i]) water += doubleShadow - height[i];
    //     }

    //     return water;
};

console.log(trap([4,2,0,3,2,5])); // should be 9