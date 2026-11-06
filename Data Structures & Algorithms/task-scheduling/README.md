# Task Scheduler

## Complexity

- **Time Complexity:** $O(N)$ — Where $N$ is the total number of tasks. We make a single pass to count frequencies and a fixed-size pass over the 26 alphabet buckets.
- **Space Complexity:** $O(1)$ — Auxiliary storage is bounded strictly by the 26 uppercase English letters.

## Intuition

The most frequent task creates the primary time **bottleneck** because it dictates how many cool-down cycles must occur.

- If a task appears `maxFreq` times, it establishes `maxFreq - 1` framing blocks. Each block has a length of $n + 1$ (the task itself plus $n$ cooling slots).
- Any tasks that tie for the same maximum frequency (`maxCount`) will share the final slots of each block side-by-side.
- **The Greedy Formula:** The minimum time required to satisfy all cool-down constraints is calculated as:
  $$\text{formulaTime} = (\text{maxFreq} - 1) \times (n + 1) + \text{maxCount}$$
- **The Over-Saturation Edge Case:** If there are so many diverse tasks that all idle cooling slots are completely filled naturally without needing to stay idle, the answer is simply the total number of tasks (`tasks.length`). Thus, the final result is always $\max(\text{tasks.length}, \text{formulaTime})$.

## Common Pitfalls

- **Ignoring Frequency Ties:** Forgetting to count how many tasks share the exact same maximum frequency (`maxCount`), which results in incorrect spacing for the final block.
- **Overcomplicating with Heaps:** While a simulation using a Max-Heap and a cool-down queue works well for teaching state management, it introduces runtime version risks in standard coding environments. The $O(1)$ space greedy mathematical formula is cleaner and entirely bug-free.

## Solution

```javascript
class Solution {
  /**
   * @param {character[]} tasks
   * @param {number} n
   * @return {number}
   */
  leastInterval(tasks, n) {
    // Step 1: Count task frequencies and find the maximum frequency
    const counts = new Array(26).fill(0);
    let maxFreq = 0;

    for (const task of tasks) {
      const index = task.charCodeAt(0) - 65;
      counts[index]++;
      maxFreq = Math.max(maxFreq, counts[index]);
    }

    // Step 2: Count how many tasks share this maximum frequency
    let maxCount = 0;
    for (const count of counts) {
      if (count === maxFreq) {
        maxCount++;
      }
    }

    // Step 3: Calculate the minimum intervals using the greedy formula
    const formulaTime = (maxFreq - 1) * (n + 1) + maxCount;

    // Return the maximum between formula time and total task count
    return Math.max(tasks.length, formulaTime);
  }
}
```
