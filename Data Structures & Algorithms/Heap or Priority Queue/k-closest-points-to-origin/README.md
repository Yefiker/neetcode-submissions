# K Closest Points to Origin

## Complexity

- **Time Complexity:** $O(N \log K)$ — Where $N$ is the number of points in the array and $K$ is the target count. Each insertion (`enqueue`) and potential deletion (`dequeue`) operates logarithmically relative to the heap size $K$.
- **Space Complexity:** $O(K)$ — The Max-Heap strictly bounds its storage to a maximum of $K$ elements at any given time.

## Intuition

To find the $K$ closest points to the origin $(0, 0)$, we want to keep track of the smallest $K$ Euclidean distances ($x^2 + y^2$).

- Using a **Max-Heap** is the secret weapon here: by capping the heap size at $K$, the element sitting at the root (the top) will always be the **farthest** point among our current selection.
- Whenever a new point arrives, we push it into the heap. If the size exceeds $K$, we instantly pop the root, throwing away the farthest point. This guarantees that only the $K$ closest points survive.

## Common Pitfalls

- **Missing Priority Callback for Objects:** In JavaScript environments like LeetCode, passing complex data types (like arrays) into a `MaxPriorityQueue` requires an explicit priority function callback so the heap knows how to rank them based on $x^2 + y^2$.
- **Forgetting to Drop the Square Root:** Computing $\sqrt{x^2 + y^2}$ introduces floating-point operations. Since relative distance ordering remains identical, comparing raw squared distances ($x^2 + y^2$) is faster and cleaner.

## Solution

```javascript
class Solution {
  /**
   * @param {number[][]} points
   * @param {number} k
   * @return {number[][]}
   */
  kClosest(points, k) {
    // Initialize a Max-Heap with a priority callback using squared Euclidean distance
    const maxHeap = new MaxPriorityQueue(
      (point) => point[0] * point[0] + point[1] * point[1],
    );

    for (let point of points) {
      maxHeap.enqueue(point);
      // If the heap grows larger than k, pop the element with the largest distance
      if (maxHeap.size() > k) {
        maxHeap.dequeue();
      }
    }

    // Collect the remaining k closest points from the heap
    const result = [];
    while (!maxHeap.isEmpty()) {
      result.push(maxHeap.dequeue());
    }

    return result;
  }
}
```
