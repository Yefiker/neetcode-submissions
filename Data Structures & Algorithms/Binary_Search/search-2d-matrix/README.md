# Search a 2D Matrix

## Complexity

- **Time Complexity:** $O(\log(M \times N))$ — Binary search over the entire virtual 1D array of size $M \times N$.
- **Space Complexity:** $O(1)$ — Performs search in-place with constant memory.

## Intuition

Because each row is sorted and the first element of any row is greater than the last element of the preceding row, the 2D matrix behaves as a single continuous sorted 1D array.

We can apply 1D binary search using a virtual range from `0` to `(rows * cols) - 1`. We convert the 1D midpoint `mid` into 2D grid coordinates:

- `row = Math.floor(mid / cols)`
- `col = mid % cols`

## Common Pitfalls

- **Confusing Row and Column Count:** Dividing or modulo-ing by `rows` instead of `cols` breaks coordinate translation. Always use `cols` for mapping.
- **Empty Matrix Input:** Ensure checking matrix dimensions safely before computing `cols`.

## Solution

```javascript
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
    let right = rows * cols - 1;

    while (left <= right) {
      let mid = Math.floor(left + (right - left) / 2);
      let r = Math.floor(mid / cols);
      let c = mid % cols;

      let val = matrix[r][c];

      if (val === target) return true;
      if (val < target) left = mid + 1;
      else right = mid - 1;
    }

    return false;
  }
}
```
