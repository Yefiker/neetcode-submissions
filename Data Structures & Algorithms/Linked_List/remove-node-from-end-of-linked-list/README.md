# Remove Nth Node From End of List

## Complexity

- **Time Complexity:** $O(n)$ — We traverse the list in a single pass using two pointers.
- **Space Complexity:** $O(1)$ — Constant extra space used for pointer references.

## Intuition

To remove the $N$-th node from the end of a singly linked list in a **single pass**, we use the **Two-Pointer Gap Strategy** (Fast and Slow pointers with a fixed offset).

If `fast` is placed exactly **$N + 1$ steps ahead** of `slow`:

1. When `fast` moves all the way to `null` (the end of the list), `slow` will stop at the **node directly preceding** the target node we want to remove.
2. We can then delete the target node in $O(1)$ time by redirecting pointers: `slow.next = slow.next.next`.

### Key Pattern: Dummy Node

Using a **Dummy Node** (`dummy.next = head`) before the actual head simplifies edge cases:

- Removing the very first node (when $N = \text{length of list}$).
- Returning `dummy.next` ensures we always have a reference to the updated head of the list.

## Common Pitfalls

- **Off-by-One in Pointer Gap:** Creating a gap of only $N$ steps puts `slow` directly _on_ the target node instead of the node _before_ it, making deletion impossible.
- **Null Pointer Reference when $N = \text{List Length}$:** Without a dummy node, advancing `fast` by $N + 1$ steps can lead to accessing `.next` on a `null` object.

## Solution

```javascript
class Solution {
  /**
   * @param {ListNode} head
   * @param {number} n
   * @return {ListNode}
   */
  removeNthFromEnd(head, n) {
    let dummy = new ListNode(0);
    dummy.next = head;

    let slow = dummy;
    let fast = dummy;

    // Step 1: Advance fast by n + 1 steps to create the offset
    for (let i = 0; i < n + 1; i++) {
      fast = fast.next;
    }

    // Step 2: Move both pointers together until fast reaches the end
    while (fast !== null) {
      slow = slow.next;
      fast = fast.next;
    }

    // Step 3: Skip the target node
    slow.next = slow.next.next;

    return dummy.next;
  }
}
```
