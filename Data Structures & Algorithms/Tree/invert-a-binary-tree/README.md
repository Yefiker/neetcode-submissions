# Invert Binary Tree

## Complexity

- **Time Complexity:** $O(n)$ — We visit every node in the tree exactly once.
- **Space Complexity:** $O(h)$ — Where $h$ is the height of the tree, corresponding to the maximum depth of the call stack. In the worst case (unbalanced line tree), space is $O(n)$; for a balanced tree, space is $O(\log n)$.

## Intuition

To create a mirror image of a binary tree, every parent node must swap its left and right child references. Using recursion, we can perform this swap locally at the current node, then delegate the same inversion task to both the left and right subtrees.

## Common Pitfalls

- **Forgetting Subtree Processing:** Only swapping `root.left` and `root.right` at the top level without calling `invertTree` on the subtrees leaves deeper levels un-inverted.
- **Pointer Overwriting:** Mutating `root.left = root.right` directly without storing `root.left` in a temporary variable first.

## Solution

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
class Solution {
  /**
   * @param {TreeNode} root
   * @return {TreeNode}
   */
  invertTree(root) {
    if (root === null) return null;

    // Swap children
    let temp = root.left;
    root.left = root.right;
    root.right = temp;

    // Recursively invert left and right subtrees
    this.invertTree(root.left);
    this.invertTree(root.right);

    return root;
  }
}
```
