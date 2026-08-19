# Reorder List

## Complexity

- **Time Complexity:** $O(n)$ — We traverse the list to find the middle ($O(n)$), reverse the second half ($O(n)$), and weave the two halves together ($O(n)$).
- **Space Complexity:** $O(1)$ — All operations modify pointer references in-place without using extra memory.

## Intuition

The problem asks us to reorder a list from `[0, 1, 2, ..., n-1]` into `[0, n-1, 1, n-2, ...]`. Observing this pattern reveals that we are alternating nodes between the **first half** of the list and the **second half in reverse order**.

We break the solution down into 3 sub-problems:

1. **Find the Middle:** Use the **Fast & Slow Pointer** pattern (`slow` moves 1 step, `fast` moves 2 steps). When `fast` reaches the end, `slow` is at the midpoint.
2. **Reverse the Second Half:** Sever the connection after `slow` (`slow.next = null`) and reverse the remaining second half using the standard two-pointer reversal (`prev`, `curr`).
3. **Weave the Two Halves:** Alternate pointers between the `first` list (starting at `head`) and the `second` list (starting at `prev`), saving `first.next` and `second.next` in temporary variables before re-linking.

## Common Pitfalls

- **Losing Pointer Connections during Weaving:** Forgetting to save `first.next` and `second.next` into temporary variables before re-assigning pointers will sever the list mid-weave.
- **Not Severing the List (`slow.next = null`):** Forgetting to disconnect the end of the first half creates an infinite loop or circular list reference during the final weave.

## Solution

```javascript
class Solution {
  /**
   * @param {ListNode} head
   * @return {void} Do not return anything, modify head in-place instead.
   */
  reorderList(head) {
    if (!head || !head.next) return;

    // Step 1: Find the middle of the list
    let slow = head;
    let fast = head.next;

    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }

    // Step 2: Split and reverse the second half
    let second = slow.next;
    slow.next = null; // Sever the first half

    let prev = null;
    while (second !== null) {
      let temp = second.next;
      second.next = prev;
      prev = second;
      second = temp;
    }

    // Step 3: Weave the two lists together
    let first = head;
    second = prev; // Head of reversed second half

    while (second !== null) {
      let temp1 = first.next;
      let temp2 = second.next;

      first.next = second;
      second.next = temp1;

      first = temp1;
      second = temp2;
    }
  }
}
```
