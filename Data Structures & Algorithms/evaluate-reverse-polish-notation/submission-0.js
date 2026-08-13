class Solution {
    /**
     * @param {string[]} tokens
     * @return {number}
     */
    evalRPN(tokens) {
        let stack = [];

        for(let token of tokens) {
            if(token === '+' || token === '-' || token === '*' || token === '/') {
                let b = stack.pop();
                let a = stack.pop();
                let result;

                switch(token) {
                    case '+': 
                        result = a + b;
                        break;
                    case '-':
                        result = a - b;
                        break;
                    case '*':
                        result = a * b;
                        break;
                    case '/':
                        result = Math.trunc((a / b) | 0);
                        break;
                } 
            stack.push(result);
            }
            else {
            let stringToInteger = Number(token);
            stack.push(stringToInteger);
            }
        }
        return stack.pop();
    }
}
