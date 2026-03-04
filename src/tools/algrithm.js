export const groupAnagrams = function(strs) {
    let hashMap = new Map();
    const len = strs.length;
    const result = []
    for(let i = 0; i < len; i ++) {
        const orderedStr = strs[i].split("").sort().join("")
        if (!hashMap.has(orderedStr)) {
            hashMap.set(orderedStr, [strs[i]])
        } else {
            hashMap.get(orderedStr).push(strs[i])
        }
    }
    hashMap.values().forEach(value => {
        result.push(value)
    })
    return result;
};


export const maxArea = function(height) {
    const len = height.length;
    let left = 0, right = len - 1;
    let maxAreaNum = 0, curAreaNum = 0;
    while(left < right) {
        curAreaNum = (right - left) * Math.min(height[left], height[right])
        maxAreaNum = Math.max(maxAreaNum, curAreaNum)
        if (height[left] < height[right]) {
            left ++;
        } else {
            right --;
        }
    }
    return maxAreaNum;
};

export const threeSum = function(nums) {
    const len = nums.length;
    nums.sort();
    const result = []
    for (let i = 0; i < len; i ++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let left = i + 1, right = len - 1;
        while(left < right) {
            let sum = nums[i] + nums[left] + nums[right];
            if (sum < 0) {
                left ++;
            } else if (sum > 0){
                right --;
            } else {
                result.push([nums[i], nums[left], nums[right]])
                left ++;
                right --;
                while(nums[left] === nums[left - 1]) l ++;
                while(nums[right] === nums[right - 1]) r--;

            }
        }
    }
    return result;
};