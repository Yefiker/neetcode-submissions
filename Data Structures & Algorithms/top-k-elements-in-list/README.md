# Top K Frequent Elements

## Complexity

- **Time Complexity:** $O(n)$ — We iterate over the array to build the frequency map and populate buckets of size $n + 1$.
- **Space Complexity:** $O(n)$ — For storing frequencies in the Hash Map and Bucket Array.

## Intuition

Rather than using $O(n \log n)$ sorting or an $O(n \log k)$ min-heap, we can achieve true $O(n)$ linear time using **Bucket Sort**:

1. **Count Frequencies:** Use a Hash Map to record occurrences of each number.
2. **Bucket Grouping:** Create an array of buckets `freq` where the index represents the frequency count (size `nums.length + 1`).
3. **Collect Results:** Walk backward from the highest possible frequency bucket to the lowest, adding numbers to our result array until we have collected $k$ elements.

## Common Pitfalls

- `freq` array length must be `nums.length + 1` to accommodate a number that appears $n$ times (at index $n$).
- Each bucket `freq[i]` is an array because multiple numbers can share the same frequency count.

## Solution

```javascript
function topKFrequent(nums, k) {
  const myMap = new Map();
  const res = [];
  const freq = Array.from({ length: nums.length + 1 }, () => []);

  for (let num of nums) {
    myMap.set(num, (myMap.get(num) || 0) + 1);
  }

  for (let [num, count] of myMap) {
    freq[count].push(num);
  }

  for (let i = freq.length - 1; i >= 0; i--) {
    for (let num of freq[i]) {
      res.push(num);
      if (res.length === k) return res;
    }
  }

  return res;
}
```
