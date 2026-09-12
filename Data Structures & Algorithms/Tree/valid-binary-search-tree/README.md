# Validate Binary Search Tree

## Complexity

- **Time Complexity:** $O(n)$ — Every node is visited at most once.
- **Space Complexity:** $O(h)$ — Call stack depth corresponds to tree height $h$ ($O(\log n)$ balanced, $O(n)$ worst case for skewed trees).

## Intuition

A binary search tree mandates that all nodes in a left subtree are strictly smaller than their parent, and all nodes in a right subtree are strictly larger. Passing boundary limits `(min, max)` top-down allows each node to validate itself against the global constraints set by all of its ancestors.

## Common Pitfalls

- **Ignoring Global Ancestor Boundaries:** Only checking direct left and right children instead of enforcing inherited limits from higher parent nodes.
- **Handling Duplicates:** Failing to reject equal values (`node.val <= min` or `node.val >= max`), as standard BST definitions require strictly smaller/larger child values.

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
  isValidBST(root) {
    return this.dfs(root, -Infinity, Infinity);
  }

  /**
   * @param {TreeNode} node
   * @param {number} min
   * @param {number} max
   * @return {boolean}
   */
  dfs(node, min, max) {
    if (node === null) return true;

    if (node.val <= min || node.val >= max) {
      return false;
    }

    return (
      this.dfs(node.left, min, node.val) && this.dfs(node.right, node.val, max)
    );
  }
}
```
