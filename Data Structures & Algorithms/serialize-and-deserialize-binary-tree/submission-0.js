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

class Codec {
    /**
     * Encodes a tree to a single string.
     *
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
     *
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
