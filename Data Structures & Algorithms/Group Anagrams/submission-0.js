class Solution {
    /**
     * @param {string[]} strs
     * @return {string[][]}
     */
    groupAnagrams(strs) {
       let myString = new Map();

       for (let i = 0; i <strs.length; i++) {
        let word = strs[i];
        let sortedKey = word.split('').sort().join('');

        if (!myString.has(sortedKey)) {
            myString.set(sortedKey, []);
        }
        myString.get(sortedKey).push(word);
       }

       return Array.from(myString.values());
    }
}
