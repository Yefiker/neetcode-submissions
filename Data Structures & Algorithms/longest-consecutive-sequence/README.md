# Longest Consecutive Sequence

## Complexity

- **Time Complexity:** $O(n)$ — Although there is a nested `while` loop, each number is visited at most twice across the entire execution because we only initiate a sequence search from the start of a sequence.
- **Space Complexity:** $O(n)$ — To store all elements in a Hash Set for $O(1)$ lookups.

## Intuition

To achieve $O(n)$ linear time without sorting:

1. Convert `nums` into a `Set` for $O(1)$ lookup time and duplicate removal.
2. Iterate through each `num` in `numSet`.
3. Check if `num` is the **beginning** of a sequence by verifying that `num - 1` is NOT present in the Set.
4. If it is a sequence start, iteratively check for `num + 1`, `num + 2`, etc., keeping track of the streak length.
5. Update `longest` with the maximum streak found.

## Common Pitfalls

- Forgetting the negation `!` in `if (!numSet.has(num - 1))`. Checking without `!` causes sequence counting to start from non-head elements, missing the true start and increasing redundant work.

## Solution

```javascript
function longestConsecutive(nums) {
  let numSet = new Set(nums);
  let longest = 0;

  for (let num of numSet) {
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentStreak++;
      }

      longest = Math.max(longest, currentStreak);
    }
  }

  return longest;
}
```
