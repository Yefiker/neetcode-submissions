class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {string}
     */
    minWindow(s, t) {
        let countT = {};
        for (let char of t) {
            countT[char] = (countT[char] || 0) + 1;
        }
        let need = Object.keys(countT).length;
        let left = 0;
        let window = {};
        let have = 0;
        let result = [-1, -1];
        let minLength = Infinity;

        for (let right = 0; right < s.length; right++) {
            const char = s[right];
            window[char] = (window[char] || 0) + 1;
            if(countT[s[right]] !== undefined && window[s[right]] === countT[s[right]]) {
                have++;
            }

        while(have === need) {
            const currentWindow = right - left + 1;
            if(currentWindow < minLength) {
                minLength = currentWindow;
                result = [left, right];
               
            }
            window[s[left]]--;
                
                if(countT[s[left]] !== undefined && window[s[left]] < countT[s[left]]) {
                    have--;
                }
                left++;
            }
        }
        return minLength === Infinity ? "" : s.slice(result[0], result[1] + 1);
    
    }
}
