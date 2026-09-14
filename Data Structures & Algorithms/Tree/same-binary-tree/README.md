# Same Tree

## Complexity

- **Time Complexity:** $O(n)$ — Where $n$ is the total number of nodes in the smaller tree. Every node pair is visited once.
- **Space Complexity:** $O(h)$ — Call stack depth corresponds to tree height $h$ ($O(\log n)$ balanced, $O(n)$ worst case for skewed trees).

## Intuition

Two binary trees are equivalent if and only if they share identical topology and node values at every position. Comparing corresponding nodes `(p, q)` simultaneously during a preorder traversal allows early termination the moment a structural or value discrepancy is found.

## Common Pitfalls

- **Null Reference Errors:** Attempting to read `val` on a `null` pointer by swapping base case order.
- **Ignoring Structure:** Checking node values without verifying that both nodes exist or both terminate together.

## Solution

```javascript
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

class Solution {
  /**
   * @param {TreeNode} p
   * @param {TreeNode} q
   * @return {boolean}
   */
  isSameTree(p, q) {
    if (p === null && q === null) return true;
    if (p === null || q === null) return false;
    if (p.val !== q.val) return false;

    return this.isSameTree(p.left, q.left) && this.isSameTree(p.right, q.right);
  }
}
```
