class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    maxSlidingWindow(nums, k) {
        let queue = [];
        let result = [];

        for(let right = 0; right < nums.length; right++) {
            while(queue.length > 0 && nums[queue[queue.length - 1]] < nums[right]) {
                queue.pop();
            }
            queue.push(right);

            if(queue[0] < right - k + 1) queue.shift();
            if(right >= k - 1) result.push(nums[queue[0]]);
        }
        return result;
    }
}
