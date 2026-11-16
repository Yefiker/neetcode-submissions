class Solution {
    /**
     * @param {string} s
     * @return {string[][]}
     */
    partition(s) {
        const result = [];
        const isPalindrome = (left, right) => {
            while(left < right) {
                if(s[left] !== s[right]) {
                    return false;
                }
                left++;
                right--;
            }
            return true;
        }
        const backtrack = (startIndex, currentPath) => {
            if(startIndex === s.length) {
                result.push([...currentPath]);
                return;
            }

            for (let endIndex = startIndex; endIndex < s.length; endIndex++) {
                if(isPalindrome(startIndex, endIndex)) {
                    currentPath.push(s.slice(startIndex, endIndex + 1));
                    backtrack(endIndex + 1, currentPath);
                    currentPath.pop();
                }
            }
        }
        backtrack(0, []);
        return result;
    }
}
