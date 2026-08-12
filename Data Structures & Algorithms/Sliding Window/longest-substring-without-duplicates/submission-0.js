class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLongestSubstring(s) {
        let left = 0;
        let right = 0;
        let maxLength = 0;
        let mySet = new Set();

        for(let right = 0; right < s.length; right++) {
                while(mySet.has(s[right])) {
                    mySet.delete(s[left]);
                    left++;
                }

            mySet.add(s[right]);
            maxLength = Math.max(maxLength, right - left + 1);
        }

        return maxLength;
    }
}
