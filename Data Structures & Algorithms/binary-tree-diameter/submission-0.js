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
            if(node === null) return 0;

            let leftHeight = getHeight(node.left);
            let rightHeight = getHeight(node.right);
        

            maxDiameter = Math.max(maxDiameter, (leftHeight + rightHeight));

            return 1 + Math.max(leftHeight, rightHeight);
        }
        getHeight(root);
        return maxDiameter;
    }
}
