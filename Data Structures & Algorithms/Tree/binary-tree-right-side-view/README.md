# Binary Tree Right Side View

## Complexity

- **Time Complexity:** $O(n)$ — Every node in the binary tree is enqueued and dequeued exactly once.
- **Space Complexity:** $O(w)$ — Where $w$ is the maximum width of the tree, representing the peak number of nodes stored in the queue at any level (up to $O(n)$ for a complete binary tree).

## Intuition

The right side view of a binary tree consists of the last node present at each horizontal level when traversing from left to right. By executing a Breadth-First Search (BFS) and taking a snapshot of the queue length at the start of each level, we can pinpoint the last node in each row (`i === levelSize - 1`) and record its value.

## Common Pitfalls

- **Assuming Right Child Superiority:** Believing you only need to traverse down `node.right` pointers. If a left subtree is deeper than a right subtree, its leaf nodes will be visible from the right side once the right subtree terminates.
- **Incorrect Index Check:** Off-by-one errors when checking for the end of the level (e.g., using `i === levelSize` instead of `i === levelSize - 1`).

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
   * @return {number[]}
   */
  rightSideView(root) {
    if (root === null) return [];

    let result = [];
    let queue = [root];

    while (queue.length > 0) {
      let levelSize = queue.length;

      for (let i = 0; i < levelSize; i++) {
        let node = queue.shift();

        // Capture only the rightmost node of the current level
        if (i === levelSize - 1) {
          result.push(node.val);
        }

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }

    return result;
  }
}
```
