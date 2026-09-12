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
    dfs(node, min, max) {
        if(node === null) return true;
        if(node.val <= min || node.val >= max) return false;
        return (
            this.dfs(node.left, min, node.val) &&          this.dfs(node.right, node.val, max)
        )
    }
}
