# Lowest Common Ancestor of a Binary Search Tree

## Complexity

- **Time Complexity:** $O(h)$ — Where $h$ is the height of the BST. We visit at most one node per level. In a balanced BST, time is $O(\log n)$; in a skewed BST, time is $O(n)$.
- **Space Complexity:** $O(1)$ — Iterative traversal uses constant extra memory.

## Intuition

The Lowest Common Ancestor (LCA) in a BST is the unique node where the lookup paths for `p` and `q` diverge. Because of the BST invariant (left < root < right):

1. If both `p.val` and `q.val` are smaller than `root.val`, search left.
2. If both `p.val` and `q.val` are larger than `root.val`, search right.
3. If `p` and `q` split across `root`, or if `root` equals `p` or `q`, the current node is the LCA.

## Common Pitfalls

- **Overcomplicating with Full DFS:** Treating the problem as a generic binary tree problem instead of taking advantage of the BST property to eliminate half of the remaining nodes at each step.
- **Missing Early Return:** Forgetting to return `root` in the `else` block, causing the pointer to walk past the target node down to `null`.

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
   * @param {TreeNode} p
   * @param {TreeNode} q
   * @return {TreeNode}
   */
  lowestCommonAncestor(root, p, q) {
    while (root !== null) {
      if (p.val < root.val && q.val < root.val) {
        root = root.left;
      } else if (p.val > root.val && q.val > root.val) {
        root = root.right;
      } else {
        return root;
      }
    }
    return null;
  }
}
```
