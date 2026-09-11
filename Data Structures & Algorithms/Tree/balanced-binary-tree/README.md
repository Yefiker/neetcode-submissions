# Balanced Binary Tree

## Complexity

- **Time Complexity:** $O(n)$ — Every node in the binary tree is visited at most once due to the bottom-up sentinel propagation.
- **Space Complexity:** $O(h)$ — Where $h$ is the height of the tree, representing the recursive call stack depth ($O(\log n)$ for a balanced tree, $O(n)$ for a skewed tree).

## Intuition

A binary tree is height-balanced if the height difference between the left and right subtrees of every node is at most 1. By executing a post-order traversal (left, right, root), we compute subtree heights bottom-up. Returning `-1` as a sentinel value whenever an imbalance is detected allows the algorithm to short-circuit and terminate early without redundant height computations.

## Common Pitfalls

- **Naïve $O(n^2)$ Top-Down Strategy:** Repeatedly calling a helper `getHeight()` function at every level, which recalculates subtree heights from scratch for each node.
- **Scoping Methods in JS:** Forgetting to prefix internal class method calls with `this.` when using recursive helpers (`this.dfs(...)`).

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
   * @param {TreeNode} root
   * @return {boolean}
   */
  isBalanced(root) {
    return this.dfs(root) !== -1;
  }

  /**
   * @param {TreeNode} node
   * @return {number}
   */
  dfs(node) {
    if (node === null) return 0;

    let left = this.dfs(node.left);
    if (left === -1) return -1;

    let right = this.dfs(node.right);
    if (right === -1) return -1;

    if (Math.abs(left - right) > 1) return -1;

    return 1 + Math.max(left, right);
  }
}
```
