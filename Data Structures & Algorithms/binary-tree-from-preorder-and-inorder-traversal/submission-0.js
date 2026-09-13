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
     * @param {number[]} preorder
     * @param {number[]} inorder
     * @return {TreeNode}
     */
    buildTree(preorder, inorder) {
        const inMap = new Map();
        for (let i = 0; i < inorder.length; i++) {
            inMap.set(inorder[i], i);
        }

        let preIdx = 0;

        function helper(inStart, inEnd) {
            if(inStart > inEnd) return null;

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
