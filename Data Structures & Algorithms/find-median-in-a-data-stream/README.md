# Find Median from Data Stream

## Complexity

- **Time Complexity:**
  - `addNum`: $O(\log N)$ — Each insertion and potential heap rebalancing operation takes logarithmic time relative to the number of elements.
  - `findMedian`: $O(1)$ — Accessing the median is instantaneous by inspecting the root(s) of the heaps via `.front()`.
- **Space Complexity:** $O(N)$ — Storing all incoming stream elements across both heaps.

## Intuition

To find the median dynamically as numbers stream in without resorting to $O(N \log N)$ sorting for every query, we use the **Two-Heap Pattern**:

- **Lower Half (`leftMaxHeap`):** A Max-Heap storing the smaller half of the numbers. Its root gives us the largest of the small numbers.
- **Upper Half (`rightMinHeap`):** A Min-Heap storing the larger half of the numbers. Its root gives us the smallest of the large numbers.
- **Size Balancing:** We maintain an invariant where both heaps are equal in size, or the `leftMaxHeap` holds at most one extra element. This guarantees that the median is always sitting right at the root(s).

## Common Pitfalls

- **Incorrect Queue API Methods:** Using standard array methods (`push`, `pop`, `peek`) instead of LeetCode priority queue methods (`enqueue`, `dequeue`, `front`).
- **Imbalanced Heaps:** Forgetting to rebalance the heaps when one grows more than 1 element larger than the other, which breaks the $O(1)$ median lookup invariant.

## Solution

```javascript
class MedianFinder {
  constructor() {
    this.leftMaxHeap = new MaxPriorityQueue();
    this.rightMinHeap = new MinPriorityQueue();
  }

  /**
   * @param {number} num
   * @return {void}
   */
  addNum(num) {
    // Step 1: Direct number to the correct heap
    if (this.leftMaxHeap.size() === 0 || num <= this.leftMaxHeap.front()) {
      this.leftMaxHeap.enqueue(num);
    } else {
      this.rightMinHeap.enqueue(num);
    }

    // Step 2: Rebalance heaps to maintain size invariants
    if (this.leftMaxHeap.size() > this.rightMinHeap.size() + 1) {
      this.rightMinHeap.enqueue(this.leftMaxHeap.dequeue());
    } else if (this.rightMinHeap.size() > this.leftMaxHeap.size()) {
      this.leftMaxHeap.enqueue(this.rightMinHeap.dequeue());
    }
  }

  /**
   * @return {number}
   */
  findMedian() {
    // If left heap has more elements, its root is the median
    if (this.leftMaxHeap.size() > this.rightMinHeap.size()) {
      return this.leftMaxHeap.front();
    }

    // Otherwise, return the average of both roots
    return (this.leftMaxHeap.front() + this.rightMinHeap.front()) / 2;
  }
}
```
