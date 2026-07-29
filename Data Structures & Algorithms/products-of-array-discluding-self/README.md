# Product of Array Except Self

## Complexity

- **Time Complexity:** $O(n)$ — Two linear passes over the array.
- **Space Complexity:** $O(1)$ — Extra space (excluding the output array).

## Intuition

For any index `i`, the product of all elements except `nums[i]` is:
$$\text{Output}[i] = (\text{Product of numbers to the LEFT}) \times (\text{Product of numbers to the RIGHT})$$

1. **Left Pass:** Iterate forward from index `0` to `n - 1`. Build running products of everything to the left of each index into `res`.
2. **Right Pass:** Iterate backward from index `n - 1` to `0`. Maintain a running `right` multiplier, multiplying it into `res[i]` and then updating `right *= nums[i]`.

## Common Pitfalls

- Initialize `left` and `right` accumulators to `1` (not `0`), as multiplying by `0` wipes out products.
- Perform the `res[i] *= right` multiplication **before** updating `right *= nums[i]` so that an element does not include itself in its right product.

## Solution

```javascript
function productExceptSelf(nums) {
  let n = nums.length;
  let res = new Array(n); // we can use "let res = []" too but we need to use .push(left) inorder to put then into the res array

  // Pass 1: Products to the left
  let left = 1;
  for (let i = 0; i < n; i++) {
    res[i] = left;
    left *= nums[i];
  }

  // Pass 2: Multiply products to the right
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= right;
    right *= nums[i];
  }

  return res;
}
```
