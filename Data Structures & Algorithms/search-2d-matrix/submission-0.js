class Solution {
    /**
     * @param {number[][]} matrix
     * @param {number} target
     * @return {boolean}
     */
    searchMatrix(matrix, target) {
        let rows = matrix.length;
        let cols = matrix[0].length;
        let left = 0;
        let right = (rows * cols) - 1;

        while(left <= right) {
            let mid = Math.floor(left + (right - left) / 2);
            let r = Math.floor(mid/cols);
            let c = mid % cols;

            let val = matrix[r][c];

            if(val === target) return true;
            else if(val < target) left = mid + 1;
            else {
                right = mid -1;
            }
        }
        return false;
    }
}
