#### 3. `Two Sum/README.md`

````markdown
# Two Sum

## Complexity

- **Time Complexity:** $O(n)$ — Single pass lookup using Hash Map.
- **Space Complexity:** $O(n)$ — Hash Map stores up to $n$ element-to-index pairs.

## Intuition

For every number `x` in the array, its target complement is `difference = target - x`.

1. Compute `difference`.
2. Check if `difference` exists in our Hash Map.
3. If yes, return `[myMap.get(difference), current_index]`.
4. If no, save `myMap.set(x, current_index)` and continue.

## Common Pitfall

When returning the result, ensure the index retrieval `.get(difference)` is properly separated from the current index `i` inside the array: `[myMap.get(difference), i]`.

## Solution

```javascript
function twoSum(nums, target) {
  const myMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    let val = nums[i];
    let difference = target - val;

    if (myMap.has(difference)) {
      return [myMap.get(difference), i];
    }
    myMap.set(val, i);
  }
}
```
````
