# Time Based Key-Value Store

## Complexity

- **Time Complexity:**
  - `set`: $O(1)$ because timestamps are strictly increasing and we only append to the array.
  - `get`: $O(\log N)$ where $N$ is the number of values stored for the given key (standard binary search).
- **Space Complexity:** $O(M \times N)$ total space to store all key-value-timestamp entries.

## Intuition

Because timestamps arrive in strictly increasing order, storing timestamp-value pairs in an array per key automatically keeps the array sorted. Finding the most recent value at or before a given timestamp reduces to finding the largest element $\le \text{target}$, which can be solved with binary search.

## Common Pitfalls

- **Typing Errors on Property Names:** Calling `.get()` on an uninitialized property name like `this.key` instead of `this.keyStore`.
- **Missing Keys:** Forgetting to handle cases where `get()` is called on a non-existent key (return `""`).

## Solution

```javascript
class TimeMap {
  constructor() {
    this.keyStore = new Map();
  }

  /**
   * @param {string} key
   * @param {string} value
   * @param {number} timestamp
   * @return {void}
   */
  set(key, value, timestamp) {
    if (!this.keyStore.has(key)) {
      this.keyStore.set(key, []);
    }
    this.keyStore.get(key).push({ value, timestamp });
  }

  /**
   * @param {string} key
   * @param {number} timestamp
   * @return {string}
   */
  get(key, timestamp) {
    if (!this.keyStore.has(key)) return "";

    let arr = this.keyStore.get(key);
    let left = 0;
    let right = arr.length - 1;
    let res = "";

    while (left <= right) {
      let mid = Math.floor(left + (right - left) / 2);
      if (arr[mid].timestamp <= timestamp) {
        res = arr[mid].value;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return res;
  }
}
```
