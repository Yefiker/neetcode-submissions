# Merge K Sorted Lists

## Complexity

- **Time Complexity:** $O(N \log k)$ — Where $N$ is the total number of nodes across all $k$ linked lists. Each reduction round processes all $N$ nodes, and there are $\log k$ total rounds.
- **Space Complexity:** $O(1)$ — Beyond the array allocated during pairwise reductions (or $O(\log k)$ stack space if implemented recursively).

## Intuition

Sequential merging (merging list 1 into list 2, then list 3, etc.) results in an $O(k \cdot N)$ runtime because nodes in earlier lists are re-processed repeatedly.

We can optimize this using **Divide and Conquer (Pairwise Merging)**:

1. Group the $k$ lists into pairs and merge each pair using the standard two-list merge algorithm.
2. After the first round, $k$ lists become $k/2$ lists.
3. Repeat the process until only $1$ fully merged list remains.

This reduces the total number of merge passes from $k$ down to $\log k$.

## Common Pitfalls

- **Incorrect Loop Step (`i++` instead of `i += 2`):** Stepping by `1` causes lists to be merged multiple times in the same round instead of pairing adjacent lists uniquely.
- **Out of Bounds for Odd Number of Lists:** When $k$ is odd, the last list in the round doesn't have a pair (`i + 1 >= lists.length`). Handle this by passing `null` as `l2`.
- **Missing Scope Prefix in JavaScript:** Calling `mergeTwoLists` inside the `Solution` class requires `this.mergeTwoLists(...)`.

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
   * @param {ListNode[]} lists
   * @return {ListNode}
   */
  mergeKLists(lists) {
    if (!lists || lists.length === 0) return null;

    while (lists.length > 1) {
      let mergedLists = [];

      for (let i = 0; i < lists.length; i += 2) {
        let l1 = lists[i];
        let l2 = i + 1 < lists.length ? lists[i + 1] : null;

        mergedLists.push(this.mergeTwoLists(l1, l2));
      }

      lists = mergedLists;
    }

    return lists[0];
  }

  /**
   * Helper method to merge two sorted linked lists
   */
  mergeTwoLists(l1, l2) {
    let dummy = new ListNode(0);
    let tail = dummy;

    while (l1 && l2) {
      if (l1.val < l2.val) {
        tail.next = l1;
        l1 = l1.next;
      } else {
        tail.next = l2;
        l2 = l2.next;
      }
      tail = tail.next;
    }

    tail.next = l1 || l2;
    return dummy.next;
  }
}
```
