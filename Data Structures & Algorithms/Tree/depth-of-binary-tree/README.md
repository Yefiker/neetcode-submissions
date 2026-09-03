# Maximum Depth of Binary Tree

## Complexity

- **Time Complexity:** $O(n)$ — Every node in the binary tree is visited exactly once.
- **Space Complexity:** $O(h)$ — Where $h$ is the height of the tree, corresponding to the call stack size. In the worst case (skewed tree), space is $O(n)$; for a balanced tree, space is $O(\log n)$.

## Intuition

The maximum depth of a binary tree is determined by the longer of its two subtrees plus $1$ for the current node. By employing a post-order depth-first search (DFS), we compute the depth from the leaves upward to the root.

## Common Pitfalls

- **Incorrect Function Call Arguments:** Passing two nodes into one recursive call (`this.maxDepth(a, b)`) instead of evaluating two distinct function calls within `Math.max()`.
- **Off-By-One Errors:** Forgetting to add `+ 1` to account for the current node level.

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
  maxDepth(root) {
    if (root === null) return 0;

    let depth =
      Math.max(this.maxDepth(root.left), this.maxDepth(root.right)) + 1;

    return depth;
  }
}
```
