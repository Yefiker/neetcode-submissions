class Solution {
    /**
     * @param {string} digits
     * @return {string[]}
     */
    letterCombinations(digits) {
        if(digits.length === 0) return [];

        const result = [];
        const digitToLetters = {
            '2': 'abc',
            '3': 'def',
            '4': 'ghi',
            '5': 'jkl',
            '6': 'mno',
            '7': 'pqrs',
            '8': 'tuv',
            '9': 'wxyz'
        };

        const backtrack = (index, currentPath) => {
            if(index === digits.length) {
                result.push(currentPath.join(''));
                return;
            }
            const letters = digitToLetters[digits[index]];

            for(const char of letters) {
                currentPath.push(char);
                backtrack(index + 1, currentPath);
                currentPath.pop();
            }
        }
        backtrack(0, []);
        return result;
    }
}
