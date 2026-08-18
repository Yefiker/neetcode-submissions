# Merge Two Sorted Lists

## Complexity

- **Time Complexity:** $O(n + m)$ — We iterate through both lists at most once, where $n$ and $m$ are the lengths of `list1` and `list2`.
- **Space Complexity:** $O(1)$ — We reuse the existing nodes by re-pointing their `.next` references in-place without creating new list nodes.

## Intuition

Think of two sorted lists like two face-up sorted decks of cards. To merge them into one sorted sequence, we compare the top cards of both lists and continuously pick the smaller node to append to our new list.

### Key Pattern: The Dummy Node

To avoid writing verbose edge-case logic for determining the initial head of the merged list, we create a **Dummy Node** (`new ListNode(0)`).

- `dummy` keeps a fixed reference to the starting point of the list.
- `tail` acts as a moving pointer that appends the next smallest node.
- When one list becomes empty (`null`), we directly attach the remaining non-empty list to `tail.next` since it is already sorted.
- Finally, `dummy.next` points directly to the true head of the merged list.

## Common Pitfalls

- **Forgetting to Advance `tail`:** Appending to `tail.next` without moving `tail = tail.next` causes subsequent nodes to overwrite each other.
- **Not Handling Leftover Elements:** Loop terminates when _either_ list becomes `null`. Forgetting to link `tail.next = list1 || list2` leaves remaining sorted nodes disconnected.

## Solution

```javascript
class Solution {
  /**
   * @param {ListNode} list1
   * @param {ListNode} list2
   * @return {ListNode}
   */
  mergeTwoLists(list1, list2) {
    let dummy = new ListNode(0);
    let tail = dummy;

    while (list1 !== null && list2 !== null) {
      if (list1.val <= list2.val) {
        tail.next = list1;
        list1 = list1.next;
      } else {
        tail.next = list2;
        list2 = list2.next;
      }
      tail = tail.next;
    }

    // Attach whatever remains in list1 or list2
    tail.next = list1 || list2;

    return dummy.next;
  }
}
```
