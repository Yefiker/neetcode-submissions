# Diameter of Binary Tree

## Complexity

- **Time Complexity:** $O(n)$ — Every node is visited once during the post-order traversal.
- **Space Complexity:** $O(h)$ — Where $h$ is the height of the tree, representing the recursion stack depth ($O(n)$ worst case for a skewed tree, $O(\log n)$ for a balanced tree).

## Intuition

The diameter passing through any single node as a turning point is equal to `leftSubtreeHeight + rightSubtreeHeight`. By computing heights bottom-up using post-order DFS, we can check and update a global maximum diameter at every node while returning the current node's height up to its parent. Hello I am Yefiker

## Common Pitfalls

- **Confusing Height Return with Diameter Update:** The helper function must return the node's height (`1 + Math.max(left, right)`), NOT the diameter computed at that node.
- **Assuming Root-Centric Paths:** Forgetting that the longest path might be fully contained within a deep subtree.

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
  diameterOfBinaryTree(root) {
    let maxDiameter = 0;

    function getHeight(node) {
      if (node === null) return 0;

      let leftHeight = getHeight(node.left);
      let rightHeight = getHeight(node.right);

      maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

      return 1 + Math.max(leftHeight, rightHeight);
    }

    getHeight(root);
    return maxDiameter;
  }
}
```
