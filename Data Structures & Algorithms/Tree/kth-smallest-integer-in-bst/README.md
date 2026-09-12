# Kth Smallest Element in a BST

## Complexity

- **Time Complexity:** $O(h + k)$ — Where $h$ is the height of the tree. We traverse down to the leftmost leaf ($O(h)$) and then visit $k$ nodes before returning early.
- **Space Complexity:** $O(h)$ — The explicit stack holds at most $h$ nodes at any point ($O(\log n)$ for a balanced tree, $O(n)$ for a skewed tree).

## Intuition

Because an in-order traversal of a BST yields nodes in monotonically increasing order, we do not need to sort the tree or store every element. Using an explicit stack to simulate in-order traversal allows us to lazily evaluate nodes one by one in ascending order and short-circuit the moment we reach the $k^{\text{th}}$ element.

## Common Pitfalls

- **Off-by-One Indexing Errors:** Misinterpreting 1-based indexing for $k$, leading to checking conditions before decrementing.
- **Over-computing:** Collecting all $n$ elements into an array or running full recursive traversals instead of stopping early at $k$.

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
   * @param {number} k
   * @return {number}
   */
  kthSmallest(root, k) {
    let stack = [];

    while (root !== null || stack.length > 0) {
      // Dive to the leftmost node
      while (root !== null) {
        stack.push(root);
        root = root.left;
      }

      // Process current smallest node
      root = stack.pop();
      k--;

      if (k === 0) return root.val;

      // Explore right subtree
      root = root.right;
    }
  }
}
```
