class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isAnagram(s, t) {
        let myMap = new Map();
        if (s.length !== t.length) return false;
         
        for (let i = 0; i < s.length; i++) {
            let char = s[i];
            let count = myMap.has(char) ? myMap.get(char) : 0;
            

            myMap.set(char, count + 1);
        }


        for (let j = 0; j < t.length; j++) {
            let beta = t[j];
            let count = myMap.has(beta) ? myMap.get(beta) : 0;
            if(!myMap.has(beta) || count === 0) return false;

            myMap.set(beta, count - 1);
        }

        return true;
    }
}
