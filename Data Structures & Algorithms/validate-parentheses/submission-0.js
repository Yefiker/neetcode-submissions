class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isValid(s) {
        const map = {
            ')' : '(',
            ']' : '[',
            '}' : '{'
        };
        let stack = [];

        for(let char of s) {
            if(char in map) {
                if(stack.length === 0) return false;
                let top = stack.pop();
                if(top !== map[char]) return false;
            } else {
                stack.push(char);
            }
        } 
        return stack.length === 0 ? true : false;
    }
}
