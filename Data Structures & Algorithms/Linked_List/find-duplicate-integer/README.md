# Find the Duplicate Number

## Complexity

- **Time Complexity:** $O(n)$ — Phase 1 and Phase 2 each traverse a fraction of the implicit linked list cycle, running in linear time.
- **Space Complexity:** $O(1)$ — Uses only two pointer variables without modifying the input array or using extra data structures.

## Intuition

Given an array of length $n + 1$ containing values in the range $[1, n]$, the array can be interpreted as a **singly linked list** where each index $i$ points to node `nums[i]`.

Because at least one number is repeated, multiple indices point to the same value, creating a **cycle in the pointer path**. The entry point of this cycle corresponds directly to the duplicate number.

We can apply **Floyd's Tortoise and Hare Cycle-Finding Algorithm**:

1. **Phase 1 (Detect Intersection):** Advance `slow` by 1 step (`nums[slow]`) and `fast` by 2 steps (`nums[nums[fast]]`). They are guaranteed to intersect inside the cycle.
2. **Phase 2 (Find Cycle Entrance):** Keep `slow` at the intersection point and initialize a new pointer `slow2 = 0`. Move both pointers forward 1 step at a time. The node where they meet is the start of the cycle (the duplicate value).

## Common Pitfalls

- **Skipping Phase 1:** Using `while (slow !== fast)` when initializing both pointers to `nums[0]` causes the loop condition to evaluate to `false` immediately. Use a `do...while` loop so the pointers take their first step before checking equality.
- **Phase 2 Initializer:** Setting `slow2 = nums[0]` instead of index `0` skips the first step of the path from the origin.

## Solution

```javascript
class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  findDuplicate(nums) {
    let slow = 0;
    let fast = 0;

    // Phase 1: Locate the intersection point in the cycle
    do {
      slow = nums[slow];
      fast = nums[nums[fast]];
    } while (slow !== fast);

    // Phase 2: Locate the entrance to the cycle (the duplicate)
    let slow2 = 0;
    while (slow !== slow2) {
      slow = nums[slow];
      slow2 = nums[slow2];
    }

    return slow2;
  }
}
```
