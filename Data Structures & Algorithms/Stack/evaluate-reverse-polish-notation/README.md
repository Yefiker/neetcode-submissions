# Evaluate Reverse Polish Notation

## Complexity

- **Time Complexity:** $O(n)$ — We iterate through the array of `tokens` exactly once, performing $O(1)$ stack operations (`push` and `pop`) per token.
- **Space Complexity:** $O(n)$ — In the worst-case scenario (e.g., all numbers before operators), the stack stores up to $n$ numbers.

## Intuition

Reverse Polish Notation (RPN) is designed to evaluate expressions without parenthetical precedence using a **Stack** (LIFO):

1. Traverse `tokens` left to right.
2. If the token is a **number**, convert it to an integer and push it onto the stack.
3. If the token is an **operator** (`+`, `-`, `*`, `/`):
   - Pop the top number as the **second operand (`b`)**.
   - Pop the next top number as the **first operand (`a`)**.
   - Evaluate `a [operator] b` and push the result back onto the stack.
   - Note: For division, use `Math.trunc(a / b)` to truncate results toward zero.
4. Return the final remaining value in the stack.

## Common Pitfalls

- **Incorrect Operand Order:** Subtracting or dividing in reverse order (`b - a` or `b / a` instead of `a - b` or `a / b`). The second popped item is the left operand!
- **Truthy String Conditional Mistakes:** Writing `if (token === '+' || '-')` instead of explicitly comparing each character (`token === '+' || token === '-' || ...`).
- **Incorrect Rounding for Negative Division:** Using `Math.floor()` instead of `Math.trunc()`. `Math.floor(-0.5)` yields `-1`, whereas truncating toward zero requires `0`.

## Solution

```javascript
class Solution {
  evalRPN(tokens) {
    let stack = [];

    for (let token of tokens) {
      if (token === "+" || token === "-" || token === "*" || token === "/") {
        let b = stack.pop();
        let a = stack.pop();
        let result;

        switch (token) {
          case "+":
            result = a + b;
            break;
          case "-":
            result = a - b;
            break;
          case "*":
            result = a * b;
            break;
          case "/":
            result = Math.trunc(a / b);
            break;
        }
        stack.push(result);
      } else {
        stack.push(Number(token));
      }
    }

    return stack.pop();
  }
}
```
