# Subtree of Another Tree

## Complexity

- **Time Complexity:** $O(m \cdot n)$ worst-case — Where $m$ is the number of nodes in `root` and $n$ is the number of nodes in `subRoot`. For every node in `root`, we may traverse up to $n$ nodes in `subRoot`.
- **Space Complexity:** $O(h_{\text{root}} + h_{\text{subRoot}})$ — Call stack space determined by the max height of the main tree and subtree during recursive calls.

## Intuition

By leveraging the **Same Tree** pattern, we can treat the main tree as a collection of candidates. We traverse every candidate node in `root` and test whether the subtree starting at that node matches `subRoot` completely.

## Common Pitfalls

- **Early Termination on Partial Match:** Stopping the search if a node matches `subRoot.val` but fails `isSameTree`, without continuing to check the rest of `root.left` or `root.right`.
- **Null Boundary Confusion:** Returning `false` when `subRoot` is `null` instead of recognizing that an empty tree is a valid subtree of any node.

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
   * @param {TreeNode} subRoot
   * @return {boolean}
   */
  isSubtree(root, subRoot) {
    if (subRoot === null) return true;
    if (root === null) return false;

    if (this.isSameTree(root, subRoot)) return true;

    return (
      this.isSubtree(root.left, subRoot) || this.isSubtree(root.right, subRoot)
    );
  }

  /**
   * @param {TreeNode} p
   * @param {TreeNode} q
   * @return {boolean}
   */
  isSameTree(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    if (p.val !== q.val) return false;

    return this.isSameTree(p.left, q.left) && this.isSameTree(p.right, q.right);
  }
}
```
