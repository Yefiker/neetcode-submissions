# Median of Two Sorted Arrays

## Complexity

- **Time Complexity:** $O(\log(\min(M, N)))$ — Binary search is performed strictly over the shorter array.
- **Space Complexity:** $O(1)$ — Operates strictly in constant auxiliary space.

## Intuition

To find the median of two sorted arrays without merging them, we want to split the combined elements into two equal halves such that every element in the left half is $\le$ every element in the right half.

Binary searching for the cut index $i$ in the shorter array $A$ implicitly sets $j = \lfloor(M + N + 1) / 2\rfloor - i$ in array $B$.

A valid cut satisfies:

- `Aleft <= Bright`
- `Bleft <= Aright`

Where out-of-bounds left elements default to $-\infty$ and right elements to $+\infty$.

## Common Pitfalls

- **Not Searching the Smaller Array:** Forgetting to swap arrays so $A$ is smaller results in out-of-bounds indices for $j$.
- **Incorrect Half Formula:** Using `(total) / 2` instead of `(total + 1) / 2` makes odd total length median calculations awkward.

## Solution

```javascript
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

    while (left <= right) {
      let i = Math.floor((left + right) / 2);
      let j = half - i;

      let Aleft = i > 0 ? A[i - 1] : -Infinity;
      let Aright = i < A.length ? A[i] : Infinity;

      let Bleft = j > 0 ? B[j - 1] : -Infinity;
      let Bright = j < B.length ? B[j] : Infinity;

      if (Aleft <= Bright && Bleft <= Aright) {
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
```
