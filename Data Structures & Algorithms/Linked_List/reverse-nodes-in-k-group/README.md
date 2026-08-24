# Reverse Nodes in k-Group

## Complexity

- **Time Complexity:** $O(N)$ — Where $N$ is the number of nodes in the linked list. Each node is traversed twice: once to check if a group of size $k$ exists, and once to reverse it.
- **Space Complexity:** $O(1)$ — Pointer adjustments are performed in-place using a few scalar variables.

## Intuition

Reversing in groups of $k$ requires isolating sub-segments of length $k$ and reversing them without breaking the connections to surrounding nodes.

We track two boundary nodes:

- `groupPrev`: The node sitting directly _before_ the current $k$-group.
- `groupNext`: The node sitting directly _after_ the current $k$-group ($k + 1$-th node).

By initializing `prev = groupNext` during standard list reversal, the tail of our newly reversed sub-group automatically links to the rest of the list. We then re-link `groupPrev.next = kth` and shift `groupPrev` forward to prepare for the next round.

## Common Pitfalls

- **Losing the Next Group Reference:** Failing to save `kth.next` before reversing destroys the reference to remaining unreversed nodes.
- **Reversing Incomplete Groups:** The problem requires leaving remaining tail nodes ($< k$) unchanged. Always verify $k$ nodes exist using a helper before initiating a group swap.
- **Dangling Pointer Bugs:** Forgetting to update `groupPrev` to point to the tail of the newly reversed group causes cycle creation or infinite loops.

## Solution

```javascript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */

class Solution {
  /**
   * @param {ListNode} head
   * @param {number} k
   * @return {ListNode}
   */
  reverseKGroup(head, k) {
    let dummy = new ListNode(0, head);
    let groupPrev = dummy;

    while (true) {
      let kth = this.getKth(groupPrev, k);
      if (!kth) break;

      let groupNext = kth.next;
      let prev = groupNext;
      let curr = groupPrev.next;

      while (curr !== groupNext) {
        let tmp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = tmp;
      }

      let oldHead = groupPrev.next;
      groupPrev.next = kth;
      groupPrev = oldHead;
    }

    return dummy.next;
  }

  getKth(curr, k) {
    while (curr && k > 0) {
      curr = curr.next;
      k--;
    }
    return curr;
  }
}
```
