# Course Schedule II

## Complexity

- **Time Complexity:** $O(V + E)$ — Where $V$ is `numCourses` (vertices) and $E$ is the length of `prerequisites` (directed edges). Building the adjacency list takes $O(V + E)$, and every vertex and directed edge is processed at most once because completed nodes are cached in `visited`.
- **Space Complexity:** $O(V + E)$ — The adjacency list stores $V$ lists and $E$ edges, while the `visiting` set, `visited` set, `order` result array, and recursion call stack each use up to $O(V)$ space.

## Intuition

To return a valid ordering in which all `numCourses` can be completed given `[course, prereq]` pairs (or `[]` if a cycle makes completion impossible), we extend 3-state cycle detection with **Post-Order DFS Topological Sort**:

- **Adjacency List (`course -> [prerequisites]`):** Each entry `adj[course]` stores the prerequisites that must be completed before taking `course`.
- **Cycle Detection (`visiting` vs. `visited`):**
  - **`visiting`:** Tracks courses on the active DFS recursion stack. Revisiting a node in `visiting` confirms a cycle (`return false`), immediately aborting and returning `[]`.
  - **`visited`:** Tracks courses whose entire prerequisite chain has already been verified and added to `order`. Revisiting a node in `visited` short-circuits (`return true`) without duplicating work or adding duplicate entries to `order`.
- **Post-Order Recording:** Because `dfs(course)` recursively finishes all prerequisites in `adj[course]` _before_ reaching the end of the function, pushing `course` to `order` **after** the neighbor loop guarantees every prerequisite appears before the course that depends on it.

## Common Pitfalls

- **Pushing `course` Pre-Order (Before the Neighbor Loop):** Adding `course` to `order` before exploring `adj[course]` places dependent courses ahead of their prerequisites, inverting the dependency order. Always push `course` in **post-order** (after all recursive `dfs(pre)` calls succeed).
- **Forgetting `return true` at the End of `dfs`:** Omitting `return true` after marking `visited` causes `dfs(c)` to return `undefined`, making `!dfs(c)` evaluate to `true` and falsely return `[]`.

## Solution

```javascript
class Solution {
  /**
   * @param {number} numCourses
   * @param {number[][]} prerequisites
   * @return {number[]}
   */
  findOrder(numCourses, prerequisites) {
    // 1. Build directed adjacency list: course -> [prerequisites]
    const adj = Array.from({ length: numCourses }, () => []);
    for (const [course, prereq] of prerequisites) {
      adj[course].push(prereq);
    }

    const visiting = new Set(); // Nodes currently on the active recursion stack
    const visited = new Set(); // Nodes already verified and added to order
    const order = [];

    // 2. Post-order DFS for cycle detection and topological ordering
    function dfs(course) {
      if (visiting.has(course)) return false; // Cycle detected
      if (visited.has(course)) return true; // Already processed

      visiting.add(course);

      for (const pre of adj[course]) {
        if (!dfs(pre)) return false;
      }

      visiting.delete(course);
      visited.add(course);
      order.push(course); // Record in post-order after all prerequisites
      return true;
    }

    // 3. Process all courses (handles disconnected components)
    for (let c = 0; c < numCourses; c++) {
      if (!dfs(c)) return [];
    }

    return order;
  }
}
```
