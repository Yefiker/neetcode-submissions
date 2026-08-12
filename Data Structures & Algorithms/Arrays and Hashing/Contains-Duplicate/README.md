# Contains Duplicate

## Complexity

- **Time Complexity:** $O(n)$ — Single pass through the array.
- **Space Complexity:** $O(n)$ — Hash Set stores up to $n$ unique elements.

## Intuition

I use a Hash Set to track numbers I've seen so far. As I iterate through the array:

1. Check if the current number is already in the Set.
2. If it is, we found a duplicate $\rightarrow$ return `true`.
3. If not, add the number to the Set and continue.

## Common Pitfall

Avoid returning `false` inside the loop when a number isn't found in the Set on step 1. You must check the entire array before concluding there are no duplicates!

## Solution

```javascript
function hasDuplicate(nums) {
  const mySet = new Set();
  for (let i = 0; i < nums.length; i++) {
    let val = nums[i];
    if (mySet.has(val)) {
      return true;
    }
    mySet.add(val);
  }
  return false;
}
```
