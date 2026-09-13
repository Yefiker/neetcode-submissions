# Construct Binary Tree from Preorder and Inorder Traversal

## Complexity

- **Time Complexity:** $O(n)$ — Pre-building the Hash Map takes $O(n)$ time, and each node is processed exactly once in $O(1)$ time.
- **Space Complexity:** $O(n)$ — The Hash Map takes $O(n)$ space, and the call stack takes $O(h)$ space ($O(\log n)$ balanced, $O(n)$ skewed).

## Intuition

`preorder[0]` provides the root node, while locating that root in `inorder` partitions the tree into left and right subtrees. By pairing a running preorder index pointer with an inorder boundary interval `(inStart, inEnd)`, we can recursively reconstruct subtrees without mutating or copying arrays.

## Common Pitfalls

- **Order of Subtree Construction:** Failing to build `root.left` before `root.right`, causing the pointer tracking the preorder sequence to pull right-subtree nodes prematurely.
- **Naive Searching:** Scanning `inorder` linearly for the root index at every step ($O(n^2)$ total) instead of using a Hash Map lookup ($O(n)$ total).

## Solution

```javascript
class Solution {
  buildTree(preorder, inorder) {
    const inMap = new Map();
    for (let i = 0; i < inorder.length; i++) {
      inMap.set(inorder[i], i);
    }

    let preIdx = 0;

    function helper(inStart, inEnd) {
      if (inStart > inEnd) return null;

      const rootVal = preorder[preIdx++];
      const rootNode = new TreeNode(rootVal);
      const mid = inMap.get(rootVal);

      rootNode.left = helper(inStart, mid - 1);
      rootNode.right = helper(mid + 1, inEnd);

      return rootNode;
    }

    return helper(0, inorder.length - 1);
  }
}
```
