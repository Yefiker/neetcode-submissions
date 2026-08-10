class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @return {boolean}
     */
    checkInclusion(s1, s2) {
        if(s1.length > s2.length) return false;

        let s1Count = new Array(26).fill(0);
        let s2Count = new Array(26).fill(0);

        for(let i = 0; i < s1.length; i++) {

            let alpha = s1[i].charCodeAt(0) - 'a'.charCodeAt(0);
            s1Count[alpha]++;

            let beta = s2[i].charCodeAt(0) - 'a'.charCodeAt(0);
            s2Count[beta]++;
        }

        const matches = (s1Count, s2Count) => {
            for(let i = 0; i < 26; i++) {
                if(s1Count[i] !== s2Count[i]) return false;
            }
            return true;
        };

        for (let i = 0; i < s2.length - s1.length; i++){
            if(matches(s1Count, s2Count)) return true;
            s2Count[s2[i].charCodeAt(0) - 'a'.charCodeAt(0)]--;
            s2Count[s2[i + s1.length].charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }
        return matches(s1Count, s2Count);
    }
}
