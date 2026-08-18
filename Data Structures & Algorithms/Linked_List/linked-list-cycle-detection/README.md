# Linked List Cycle Detection

## Complexity

- **Time Complexity:** $O(n)$ — If no cycle exists, the fast pointer reaches the end in $n/2$ steps. If a cycle exists, the fast pointer catches up to the slow pointer inside the loop within $O(n)$ steps.
- **Space Complexity:** $O(1)$ — Only two pointer variables (`slow` and `fast`) are used, requiring constant auxiliary memory.

## Intuition

This problem is solved using **Floyd's Tortoise and Hare Algorithm** (Fast and Slow Pointers):

1. **Slow Pointer:** Advances **1 step** at a time (`slow = slow.next`).
2. **Fast Pointer:** Advances **2 steps** at a time (`fast = fast.next.next`).

### Why It Works:

- **No Cycle:** The fast pointer will quickly reach `null` or `fast.next === null`, signaling the end of the list.
- **Cycle Present:** Both pointers will enter the circular loop. Because the fast pointer travels twice as fast as the slow pointer, the distance between them decreases by 1 node per iteration. Eventually, the fast pointer will lap the slow pointer and point to the exact same node (`slow === fast`).

### Interview Note: HashSet vs. Fast/Slow Pointers

- **HashSet Approach:** Store visited node references in a `Set`. $O(n)$ time and $O(n)$ space.
- **Two Pointers:** Preferred by interviewers because it achieves $O(1)$ space complexity.

## Common Pitfalls

- **Null Pointer Exceptions:** Checking `fast.next.next` without first ensuring that `fast` AND `fast.next` are not `null` will throw a runtime error (`TypeError: Cannot read properties of null`).
- **Initial Condition Trap:** Starting `slow` and `fast` at `head` means `slow === fast` is true before entering the loop. Ensure pointers step forward **before** checking equality.

## Solution

```javascript
class Solution {
  /**
   * @param {ListNode} head
   * @return {boolean}
   */
  hasCycle(head) {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
      slow = slow.next; // 1 step
      fast = fast.next.next; // 2 steps

      if (slow === fast) {
        return true; // Fast lapped slow inside a cycle
      }
    }

    return false; // Reached end of list -> No cycle
  }
}
```
