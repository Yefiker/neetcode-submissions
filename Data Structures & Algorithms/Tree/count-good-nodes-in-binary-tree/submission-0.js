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
    goodNodes(root) {
        if(root === null) return 0;
        return this.dfs(root, root.val);
    }

    dfs(node, maxSoFar) {
        if(node === null) return 0;

        let count = node.val >= maxSoFar ? 1 : 0;
        let nextMax = Math.max(maxSoFar, node.val);

        return count + this.dfs(node.left, nextMax) + this.dfs(node.right, nextMax);
    }
}
