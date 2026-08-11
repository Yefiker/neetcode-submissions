# Sliding Window Maximum

## Complexity

- **Time Complexity:** $O(n)$ — Each index is pushed into and popped/shifted from the queue at most once.
- **Space Complexity:** $O(k)$ — The queue holds at most $k$ indices at any given point for the sliding window.

## Intuition

A naive $O(n \cdot k)$ approach recalculates `Math.max()` for each window. To achieve $O(n)$, we use a **Monotonic Decreasing Queue** storing indices:

1. **Maintain Order:** Before inserting `right`, pop all indices from the back of the queue whose corresponding values are smaller than `nums[right]`. These smaller elements can never be the maximum again.
2. **Push Current Index:** Append `right` to the back of the queue.
3. **Purge Expired Indices:** If the index at the front of the queue (`queue[0]`) falls outside the current window boundary (`queue[0] < right - k + 1`), remove it with `queue.shift()`.
4. **Record Maximum:** Once the window reaches size $k$ (`right >= k - 1`), `nums[queue[0]]` is the maximum for the current window.

## Common Pitfalls

- Storing array values instead of array indices in the queue, making it impossible to check if the maximum element has expired out of the left boundary.
- Forgetting the `right >= k - 1` check and pushing results before the first window reaches size $k$.
- Checking monotonic order with `<=` instead of `<`, which needlessly discards duplicate maximums.

## Solution

```javascript
class Solution {
  maxSlidingWindow(nums, k) {
    let queue = [];
    let result = [];

    for (let right = 0; right < nums.length; right++) {
      while (queue.length > 0 && nums[queue[queue.length - 1]] < nums[right]) {
        queue.pop();
      }
      queue.push(right);

      if (queue[0] < right - k + 1) {
        queue.shift();
      }

      if (right >= k - 1) {
        result.push(nums[queue[0]]);
      }
    }

    return result;
  }
}
```
