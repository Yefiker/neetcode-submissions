class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    largestRectangleArea(heights) {
        let maxArea = 0; 
        let stack = [];

        for(let i = 0; i < heights.length; i++) {
            let start = i;

            while(stack.length > 0 && stack[stack.length - 1][1] > heights[i]) {
                let [popIndex, popHeight] = stack.pop();
                let width = i - popIndex;
                let area = popHeight * width;
                maxArea = Math.max(maxArea, area);
                start = popIndex;
            }
            stack.push([start, heights[i]]);
        }
        for (let [index, height] of stack) {
            let width = heights.length - index;
            let area = height * width;
            maxArea = Math.max(maxArea, area);
        }
        return maxArea;
    }
}
