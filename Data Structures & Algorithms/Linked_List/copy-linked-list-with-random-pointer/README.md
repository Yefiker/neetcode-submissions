# Copy List with Random Pointer

## Complexity

- **Time Complexity:** $O(n)$ — We iterate through the list of $n$ nodes twice: once to clone the nodes and once to assign pointers.
- **Space Complexity:** $O(n)$ — The Hash Map holds $n$ key-value pairs to map original nodes to their copies.

## Intuition

Deep copying a list with random pointers creates an "unborn node" dependency issue: a node's `random` pointer might refer to a node further down the list that hasn't been instantiated yet.

To solve this, we separate creation from linking using a **Two-Pass Hash Map** strategy:

1. **Pass 1 (Clone & Map):** Iterate through the original list, instantiate a new `Node(curr.val)` for every node, and store the mapping `originalNode -> clonedNode` in a Hash Map.
2. **Pass 2 (Link Pointers):** Reset the pointer back to `head`. Iterate through the list again and set `copy.next` and `copy.random` using `map.get(...)`.

## Common Pitfalls

- **Forgetting to Reset `curr = head`:** After Pass 1, `curr` is at `null`. Failing to reset `curr = head` before Pass 2 skips pointer assignment entirely.
- **Handling `null` Pointers:** Expecting `map.get(null)` to return valid pointers without defaulting to `null` (`map.get(curr.next) || null`).

## Solution

```javascript
class Solution {
  /**
   * @param {Node} head
   * @return {Node}
   */
  copyRandomList(head) {
    if (head === null) return null;

    let map = new Map();
    let curr = head;

    // Pass 1: Create all new nodes and store mapping
    while (curr !== null) {
      map.set(curr, new Node(curr.val));
      curr = curr.next;
    }

    // Pass 2: Reset pointer and wire up next & random references
    curr = head;
    while (curr !== null) {
      let copy = map.get(curr);
      copy.next = map.get(curr.next) || null;
      copy.random = map.get(curr.random) || null;
      curr = curr.next;
    }

    return map.get(head);
  }
}
```
