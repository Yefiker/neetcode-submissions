# Combination Sum II

## Complexity

- **Time Complexity:** $O(2^N)$ — In the worst-case scenario, we explore all subsets of the candidates array, optimized significantly by pruning branches that exceed the target and skipping duplicate groups.
- **Space Complexity:** $O(N)$ — For the recursion call stack and storage of the `currentPath` array up to the maximum depth $N$.

## Intuition

To find all unique combinations where each number in `candidates` may only be used **once**, and the input array contains **duplicates**:

- **Sorting First:** We sort the candidates array (`candidates.sort((a, b) => a - b)`) so that identical values are grouped together next to each other.
- **Single-Use Constraint (`i + 1`):** Unlike standard Combination Sum, we pass `i + 1` in our recursive call to ensure each element is used at most once per combination.
- **Duplicate Skipping Guard:** To prevent generating duplicate combinations from duplicate input numbers, we skip adjacent identical elements at the same recursion level using:
  ```javascript
  if (i > startIndex && candidates[i] === candidates[i - 1]) {
      continue;
  }
  ```
