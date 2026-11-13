# Subsets II

## Complexity

- **Time Complexity:** $O(N \cdot 2^N)$ — In the worst-case scenario, we explore all subsets of length $N$, taking $O(N)$ to copy each valid subset into our results array. Sorting takes $O(N \log N)$.
- **Space Complexity:** $O(N)$ — For the recursion call stack and `currentPath` storage up to maximum depth $N$.

## Intuition

To generate all unique subsets from an array containing duplicate elements:

- **Sorting First:** We sort `nums` (`nums.sort((a, b) => a - b)`) to group identical values adjacently.
- **Every Node is Valid:** Just like standard Subsets, every node visited in the decision tree represents a valid subset.
- **Duplicate Sibling Skip:** To prevent generating identical subsets, we skip adjacent duplicate elements at the same recursion level using:
  ```javascript
  if (i > startIndex && nums[i] === nums[i - 1]) {
      continue;
  }
  ```
