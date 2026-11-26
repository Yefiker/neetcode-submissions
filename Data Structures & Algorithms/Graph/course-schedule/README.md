# Course Schedule

## Complexity

- **Time Complexity:** $O(V + E)$ — Where $V$ is `numCourses` (vertices) and $E$ is the length of `prerequisites` (directed edges). Building the adjacency list takes $O(V + E)$, and each course and prerequisite edge is explored at most once because verified courses are cached in the `visited` set.
- **Space Complexity:** $O(V + E)$ — The adjacency list stores $V$ arrays and $E$ directed edges, while the `visiting` set, `visited` set, and recursion call stack each take up to $O(V)$ space.

## Intuition

To determine whether all `numCourses` can be completed given prerequisite pairs `[course, prereq]`, we model the courses as a **directed graph** and check whether it is a **Directed Acyclic Graph (DAG)** (i.e., contains no circular dependencies / cycles):

- **Adjacency List Representation:** Build `adj` where `adj[course]` lists all direct prerequisites required before taking `course`.
- **Two-Set Cycle Detection (`visiting` vs. `visited`):** In a directed graph, two paths converging on the same prerequisite (`0 → 2` and `1 → 2`) is valid, whereas looping back onto the active recursion path (`0 → 1 → 0`) is an invalid cycle:
  - **`visiting`:** Tracks courses on the current DFS call stack. Encountering a course already in `visiting` confirms a cycle (`return false`).
  - **`visited`:** Tracks courses whose entire prerequisite chain has already been proven cycle-free. Encountering a course in `visited` short-circuits immediately (`return true`), keeping the time complexity linear.
- **Disconnected Components:** Iterate through every course `0` to `numCourses - 1` so isolated subgraphs or unreferenced courses are still checked.

## Common Pitfalls

- **Using a Single `visited` Set:** A single `visited` set cannot distinguish between a cycle and a safe diamond dependency where two different courses share the same prerequisite. Always track active path nodes (`visiting`) separately from completed nodes (`visited`).
- **Forgetting `visiting.delete(course)` on Backtrack:** Leaving a completed course in `visiting` causes later paths that validly depend on that course to falsely trigger a cycle.

## Solution

```javascript
class Solution {
  /**
   * @param {number} numCourses
   * @param {number[][]} prerequisites
   * @return {boolean}
   */
  canFinish(numCourses, prerequisites) {
    // 1. Build directed adjacency list: course -> [prerequisites]
    const adj = Array.from({ length: numCourses }, () => []);
    for (const [course, prereq] of prerequisites) {
      adj[course].push(prereq);
    }

    const visiting = new Set(); // Nodes currently on the active recursion stack
    const visited = new Set(); // Nodes already verified to have no cycles

    // 2. DFS to detect cycles along any prerequisite chain
    function dfs(course) {
      if (visiting.has(course)) return false;
      if (visited.has(course)) return true;

      visiting.add(course);

      for (const pre of adj[course]) {
        if (!dfs(pre)) return false;
      }

      visiting.delete(course);
      visited.add(course);
      return true;
    }

    // 3. Verify every course (handles disconnected graph components)
    for (let c = 0; c < numCourses; c++) {
      if (!dfs(c)) return false;
    }

    return true;
  }
}
```
