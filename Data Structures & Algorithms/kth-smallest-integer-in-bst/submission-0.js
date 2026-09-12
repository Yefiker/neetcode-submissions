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
     * @param {number} k
     * @return {number}
     */
    kthSmallest(root, k) {
        let stack = [];
        while(root !== null || stack.length > 0) {
            while(root !== null) {
                stack.push(root);
                root = root.left;
            }
            root = stack.pop();
            k--;
            
            if(k === 0) return root.val;
            root = root.right;
        }
    }
}
