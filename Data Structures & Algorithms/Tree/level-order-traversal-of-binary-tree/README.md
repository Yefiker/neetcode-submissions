# Binary Tree Level Order Traversal

## Complexity

- **Time Complexity:** $O(n)$ — Every node in the binary tree is enqueued and dequeued exactly once.
- **Space Complexity:** $O(w)$ — Where $w$ is the maximum width of the binary tree (up to $O(n)$ nodes stored in the queue at the bottom level of a complete binary tree).

## Intuition

Level order traversal requires visiting nodes horizontally level-by-level. A queue (FIFO) allows processing nodes in the order they were discovered. By capturing `queue.length` before processing each level, we isolate nodes belonging to the current level from their newly enqueued children.

## Common Pitfalls

- **Dynamic Queue Size Pitfall:** Evaluating `i < queue.length` directly in the `for` loop header. Since pushing children increases `queue.length`, the loop will fail to separate individual levels.
- **Incorrect Child Insertion Order:** Enqueueing `node.right` before `node.left`, which reverses the expected left-to-right node ordering.

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
   * @return {number[][]}
   */
  levelOrder(root) {
    if (root === null) return [];

    let result = [];
    let queue = [root];

    while (queue.length > 0) {
      let levelSize = queue.length;
      let currentLevel = [];

      for (let i = 0; i < levelSize; i++) {
        let node = queue.shift();
        currentLevel.push(node.val);

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }

      result.push(currentLevel);
    }

    return result;
  }
}
```
