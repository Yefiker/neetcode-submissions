# Kth Largest Element in an Array

## Complexity

- **Time Complexity:** $O(N \log K)$ — Where $N$ is the total number of elements in the array and $K$ is the target rank. Inserting and removing from a heap of fixed size $K$ takes logarithmic time per element.
- **Space Complexity:** $O(K)$ — The Min-Heap strictly bounds its storage to a maximum of $K$ elements at any given time.

## Intuition

To find the $K^{\text{th}}$ largest element in an unsorted array without sorting the entire dataset ($O(N \log N)$), we can use a **Min-Heap of size $K$**.

- Think of the heap as a VIP club that can only hold $K$ members.
- As we iterate through the array, we push each number into the heap. If the heap size exceeds $K$, we pop the root.
- Because it's a **Min-Heap**, the root is always the _smallest_ of our large numbers. Popping it throws away the smallest candidate, ensuring we only retain the top $K$ largest elements overall. The root will ultimately be the $K^{\text{th}}$ largest element.

## Common Pitfalls

- **Choosing the Wrong Heap Type:** Trying to use a Max-Heap instead of a Min-Heap for finding the $K^{\text{th}}$ _largest_ element. (A Min-Heap of size $K$ keeps the $K$ largest items and leaves the $K^{\text{th}}$ largest right at the root).
- **Sorting Inefficiencies:** Resorting to a full array sort, which wastes valuable time and space when a streaming heap approach is much faster.

## Solution

```javascript
class Solution {
  /**
   * @param {number[]} nums
   * @param {number} k
   * @return {number}
   */
  findKthLargest(nums, k) {
    const minHeap = new MinPriorityQueue();

    for (const num of nums) {
      minHeap.enqueue(num);
      if (minHeap.size() > k) {
        minHeap.dequeue();
      }
    }

    // The root of the min-heap represents the kth largest element
    return minHeap.front();
  }
}
```
