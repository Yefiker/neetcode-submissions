# Count Good Nodes in Binary Tree

## Complexity

- **Time Complexity:** $O(n)$ — Every node in the binary tree is visited exactly once during the DFS traversal.
- **Space Complexity:** $O(h)$ — Where $h$ is the height of the tree, representing the maximum call stack depth ($O(\log n)$ for a balanced tree, $O(n)$ for a skewed tree).

## Intuition

A node is considered "good" if its value is the largest or tied for the largest on the path from the root down to itself. This requires context propagation top-down from parent to child. By executing a pre-order DFS and passing an updated running maximum (`maxSoFar`) down the recursive call stack, each node independently evaluates whether it satisfies `node.val >= maxSoFar`.

## Common Pitfalls

- **Incorrect Initial Max Value:** Hardcoding `0` or small arbitrary numbers as the initial maximum instead of `root.val`, causing incorrect evaluations on trees with all-negative node values.
- **State Leakage Between Subtrees:** Sharing a global or mutable state for `maxSoFar` across both left and right recursive calls rather than scoping the updated maximum to the function scope of each child call.

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
   * @return {number}
   */
  goodNodes(root) {
    if (root === null) return 0;
    return this.dfs(root, root.val);
  }

  /**
   * @param {TreeNode} node
   * @param {number} maxSoFar
   * @return {number}
   */
  dfs(node, maxSoFar) {
    if (node === null) return 0;

    let count = node.val >= maxSoFar ? 1 : 0;
    let nextMax = Math.max(maxSoFar, node.val);

    return count + this.dfs(node.left, nextMax) + this.dfs(node.right, nextMax);
  }
}
```
