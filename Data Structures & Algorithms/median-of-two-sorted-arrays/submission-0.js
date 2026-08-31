class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number}
     */
    findMedianSortedArrays(nums1, nums2) {
        let A = nums1;
        let B = nums2;
        if (A.length > B.length) {
            A = nums2;
            B = nums1;
        }

        let total = A.length + B.length;
        let half = Math.floor((total + 1) / 2);

        let left = 0;
        let right = A.length;

        while(left <= right) {
            let i = Math.floor((left + right) / 2);
            let j = half - i;

            let Aleft = (i > 0) ? A[i - 1] : -Infinity;
            let Aright = (i < A.length) ? A[i] : Infinity;
            let Bleft = (j > 0) ? B[j - 1] : -Infinity;
            let Bright = (j < B.length) ? B[j] : Infinity;

            if(Aleft <= Bright && Bleft <= Aright) {
                if (total % 2 !== 0) {
                    return Math.max(Aleft, Bleft);
                }
                return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
            } else if (Aleft > Bright) {
                right = i - 1;
            } else {
                left = i + 1;
            }

        }
    }
}
