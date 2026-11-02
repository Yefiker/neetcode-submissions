# Kth Largest Element in a Stream

## Approaches & Complexity

### 1. The Simple Approach (Array Sorting / Shifting)

- **Concept:** Maintain an array of elements, sort it on every insertion, and trim elements exceeding size $k$. Alternatively, maintain a sorted array using binary search insertions.
- **Time Complexity:** $O(n \log n)$ per `add` operation due to repeated sorting or $O(n)$ due to shifting elements. This can lead to Time Limit Exceeded (TLE) errors on large streams.
- **Space Complexity:** $O(n)$ to store the underlying elements.

### 2. The Optimal Approach (Custom Min-Heap)

- **Concept:** Maintain a fixed-size **Min-Heap** of size $k$. The root of the heap always holds the smallest of the $k$ largest elements, which is precisely the $k$th largest element in the stream.
- **Time Complexity:**
  - `add(val)`: $O(\log k)$ — Pushing to the heap and bubbling up/down operates logarithmically relative to the fixed heap size $k$, regardless of total stream size $n$.
- **Space Complexity:** $O(k)$ — The heap strictly caps its storage at a maximum of $k$ elements.

## Intuition

To find the $k$th largest element efficiently without sorting the entire dataset, we only need to keep track of the top $k$ largest numbers. A Min-Heap allows us to instantly access the smallest among those top $k$ elements (at the root). Whenever a new number arrives, we push it into the heap and pop the minimum if the size exceeds $k$, ensuring the root always answers our query in $O(1)$ peek time.

## Common Pitfalls

- **Inefficient Array Operations:** Relying on `.sort()` or `.shift()` inside an `add` loop, which degrades performance to $O(n)$ or $O(n \log n)$.
- **Heap Size Bounds:** Forgetting to pop or replace the root element when the heap exceeds size $k$, which corrupts the invariant.

## Solution (Optimal Min-Heap Implementation)

```javascript
class KthLargest {
  /**
   * @param {number} k
   * @param {number[]} nums
   */
  constructor(k, nums) {
    this.heap = [];
    this.k = k;

    for (let num of nums) {
      this.add(num);
    }
  }

  /**
   * @param {number} val
   * @return {number}
   */
  add(val) {
    this.heap.push(val);
    this.bubbleUp();

    if (this.heap.length > this.k) {
      this.heap[0] = this.heap.pop();
      this.bubbleDown();
    }
    return this.heap[0];
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] < this.heap[parentIndex]) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      let leftChild = 2 * index + 1;
      let rightChild = 2 * index + 2;
      let smallest = index;

      if (leftChild < length && this.heap[leftChild] < this.heap[smallest]) {
        smallest = leftChild;
      }
      if (rightChild < length && this.heap[rightChild] < this.heap[smallest]) {
        smallest = rightChild;
      }

      if (smallest === index) break;

      this.swap(index, smallest);
      index = smallest;
    }
  }
}
```
