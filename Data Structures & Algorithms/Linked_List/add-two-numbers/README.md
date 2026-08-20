# Add Two Numbers

## Complexity

- **Time Complexity:** $O(\max(m, n))$ — We iterate through both lists up to the length of the longer list (where $m$ and $n$ are the lengths of `l1` and `l2`).
- **Space Complexity:** $O(\max(m, n))$ — The space complexity is determined by the length of the newly generated result list.

## Intuition

The problem mimics digit-by-digit addition learned in grade school, processed from right to left (least significant to most significant digit). Because the input lists are already given in reverse order, the heads of `l1` and `l2` represent the ones place, allowing direct iteration from start to finish.

### Core Mechanics

1. **The Carry Loop:** We track a `carry` variable across iterations. In each step:
   $$\text{sum} = \text{val1} + \text{val2} + \text{carry}$$
2. **Splitting the Sum:**
   - **New Node Value:** `sum % 10` (keeps the ones digit).
   - **Next Carry:** `Math.floor(sum / 10)` (passes the tens digit to the next iteration).
3. **Loop Continuation (`carry > 0`):** Including `carry > 0` in the `while` loop condition ensures that an extra node is created if addition finishes with a remaining carry (e.g., $99 + 1 = 100$).

## Common Pitfalls

- **Null Pointer Dereferencing:** Accessing `.val` or `.next` on a list that has already reached `null`. Always use optional checks like `(l1 !== null) ? l1.val : 0`.
- **Forgetting the Final Carry:** Omitting `carry > 0` from the loop condition causes inputs like `[5]` + `[5]` to return `[0]` instead of `[0, 1]`.

## Solution

```javascript
class Solution {
  /**
   * @param {ListNode} l1
   * @param {ListNode} l2
   * @return {ListNode}
   */
  addTwoNumbers(l1, l2) {
    let dummy = new ListNode(0);
    let curr = dummy;
    let carry = 0;

    while (l1 !== null || l2 !== null || carry > 0) {
      let val1 = l1 !== null ? l1.val : 0;
      let val2 = l2 !== null ? l2.val : 0;

      let sum = val1 + val2 + carry;
      carry = Math.floor(sum / 10);

      curr.next = new ListNode(sum % 10);
      curr = curr.next;

      if (l1) l1 = l1.next;
      if (l2) l2 = l2.next;
    }

    return dummy.next;
  }
}
```
