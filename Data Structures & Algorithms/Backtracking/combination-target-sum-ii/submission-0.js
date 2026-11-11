class Solution {
    /**
     * @param {number[]} candidates
     * @param {number} target
     * @return {number[][]}
     */
    combinationSum2(candidates, target) {
        const result = [];

        candidates.sort((a, b) => a - b);
        
        const backtrack = (startIndex, currentPath, currentSum) => {

            if(currentSum > target) {
                return;
            }

            if(currentSum === target) {
                result.push([...currentPath]);
                return;
            }
        for (let i = startIndex; i < candidates.length; i++) {
            if(i > startIndex && candidates[i] === candidates[i - 1]) {
                continue;
            }

            currentPath.push(candidates[i]);

            backtrack(i + 1, currentPath, currentSum + candidates[i]);
            currentPath.pop();
        }
    }
    backtrack(0, [], 0);
    return result;
    }
}
