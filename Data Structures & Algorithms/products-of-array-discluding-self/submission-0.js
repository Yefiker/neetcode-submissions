class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    productExceptSelf(nums) {
        let leftProduct = 1;
        let output = [];
        for(let i = 0; i<nums.length; i++) {
            output[i] = leftProduct;
            leftProduct *= nums[i];
        }

        let rightProduct = 1;
        for(let i = nums.length - 1; i >= 0; i--) {
            output[i] *= rightProduct;
            rightProduct *= nums[i];

        }
        return output;
    }
}
