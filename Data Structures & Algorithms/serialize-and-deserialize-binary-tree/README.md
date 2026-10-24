# Binary Tree Codec (Serialization & Deserialization)

A high-performance JavaScript implementation to serialize and deserialize a binary tree structure. This utility converts a live binary tree graph into a compact, comma-separated string layout and restores it back to its original object structure.

## Architectural Design

- **Traversal Strategy:** Pre-order Depth-First Search (DFS) (`Root ➡️ Left ➡️ Right`).
- **Format:** Comma-delimited text (`","`).
- **Null Reference Handling:** Null pointers are preserved explicitly via `"null"` string tokens to retain empty leaf slots without positional ambiguity.
- **State Management:** Tracking index pointer during restoration avoids destructive array shifting overhead ($O(1)$ operations).

---

## Code Implementation

```javascript
/**
 * Definition for a binary tree node.
 */
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class Codec {
  /**
   * Encodes a tree to a single string.
   * @param {TreeNode} root
   * @return {string}
   */
  serialize(root) {
    const result = [];

    function buildString(node) {
      if (node === null) {
        result.push("null");
        return;
      }
      result.push(node.val);
      buildString(node.left);
      buildString(node.right);
    }

    buildString(root);
    return result.join(",");
  }

  /**
   * Decodes your encoded data to tree.
   * @param {string} data
   * @return {TreeNode}
   */
  deserialize(data) {
    const values = data.split(",");
    let index = 0;

    function buildTree() {
      if (index >= values.length) return null;

      const currentVal = values[index];
      index++;

      if (currentVal === "null") {
        return null;
      }

      const node = new TreeNode(Number(currentVal));
      node.left = buildTree();
      node.right = buildTree();

      return node;
    }

    return buildTree();
  }
}
```

---

## Complexity Analysis

| Operation         | Time Complexity  | Space Complexity | Description                                                                             |
| :---------------- | :--------------- | :--------------- | :-------------------------------------------------------------------------------------- |
| **`serialize`**   | $\mathcal{O}(N)$ | $\mathcal{O}(N)$ | Visits every node exactly once; execution stack reaches depth equal to tree height $H$. |
| **`deserialize`** | $\mathcal{O}(N)$ | $\mathcal{O}(N)$ | Parses the tokens linearly and constructs $N$ distinct nodes sequentially.              |

_Where $N$ represents the total number of nodes in the binary tree._

---

## Usage Example

```javascript
// Initialize the Codec
const codec = new Codec();

// Construct a test tree:
//      1
//     / \
//    2   3
//       / \
//      4   5
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.right.left = new TreeNode(4);
root.right.right = new TreeNode(5);

// 1. Serialize the tree
const serializedString = codec.serialize(root);
console.log(serializedString);
// Output: "1,2,null,null,3,4,null,null,5,null,null"

// 2. Deserialize back to an object
const deserializedTree = codec.deserialize(serializedString);
console.log(deserializedTree.right.left.val);
// Output: 4
```
