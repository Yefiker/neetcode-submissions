# Last Stone Weight

## Complexity

- **Time Complexity:** $O(n \log n)$ — Where $n$ is the number of stones. Each insertion (`enqueue`) and extraction (`dequeue`) operation takes logarithmic time relative to the heap size.
- **Space Complexity:** $O(n)$ — To store all elements inside the Max-Heap structure.

## Intuition

By maintaining a Max-Heap, the heaviest stones are always bubbling up to the root for instant $O(1)$ access. Repeatedly extracting the top two elements lets us simulate the collision game efficiently without needing to sort the entire array after every single smash.

## Common Pitfalls

- **Returning the Wrong Heap Property:** Trying to read an empty heap or returning the wrong identifier when 0 stones remain.
- **Stale Elements:** Not handling the exact condition where $y === x$, which requires discarding both stones.

## Solution

```javascript
class Solution {
  /**
   * @param {number[]} stones
   * @return {number}
   */
  lastStoneWeight(stones) {
    const maxHeap = new MaxPriorityQueue();

    for (const stone of stones) {
      maxHeap.enqueue(stone);
    }

    while (maxHeap.size() > 1) {
      const y = maxHeap.dequeue();
      const x = maxHeap.dequeue();

      if (y !== x) {
        maxHeap.enqueue(y - x);
      }
    }

    return maxHeap.isEmpty() ? 0 : maxHeap.front();
  }
}
```
