# Reverse Linked List

## Complexity

- **Time Complexity:** $O(n)$ — We traverse the linked list of $n$ nodes exactly once.
- **Space Complexity:** $O(1)$ — Pointer references (`prev`, `curr`, `temp`) operate in constant auxiliary space.

## Intuition

To reverse a singly linked list, we do not swap node values. Instead, we iterate through the list and flip each node's `next` pointer to point backwards to the preceding node.

Because changing `curr.next` breaks the connection to the rest of the list, we must store `curr.next` in a temporary variable (`temp`) before re-pointing `curr.next` to `prev`.

### Pointer Traversal Steps:

1. `temp = curr.next` — Save reference to the next node.
2. `curr.next = prev` — Reverse the current pointer.
3. `prev = curr` — Advance `prev` pointer forward.
4. `curr = temp` — Advance `curr` pointer forward.

When `curr` reaches `null`, `prev` will be pointing at the last node processed, which is the **new head** of the reversed list.

## Common Pitfalls

- **Losing List Access:** Forgetting to store `curr.next` before overwriting it will sever the chain and lose the remaining list.
- **Returning `curr` instead of `prev`:** When the loop terminates, `curr` is `null`, whereas `prev` holds the new head node.

## Solution

```javascript
class Solution {
  /**
   * @param {ListNode} head
   * @return {ListNode}
   */
  reverseList(head) {
    let prev = null;
    let curr = head;

    while (curr !== null) {
      let temp = curr.next;
      curr.next = prev;
      prev = curr;
      curr = temp;
    }

    return prev;
  }
}
```
