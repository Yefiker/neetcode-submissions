# Graph Valid Tree

## Complexity

- **Time Complexity:** $O(V + E)$ — Where $V = n$ (vertices) and $E$ is the number of edges. Checking `edges.length !== n - 1` immediately bounds $E = V - 1$ for any candidate tree, so building the adjacency list and traversing every vertex and undirected edge once runs in $O(V)$ time.
- **Space Complexity:** $O(V + E)$ — The bidirectional adjacency list stores $V$ arrays and $2E$ edge entries, while the `visited` set and recursion call stack each use up to $O(V)$ space.

## Intuition

An undirected graph with `n` nodes forms a **valid tree** if and only if it is **acyclic** (contains no cycles) and **fully connected** (all `n` nodes belong to a single connected component):

- **Edge-Count Pruning (`edges.length !== n - 1`):** Any tree with `n` vertices has strictly `n - 1` edges. Fewer than `n - 1` edges guarantees a disconnected graph; more than `n - 1` edges guarantees at least one cycle.
- **Bidirectional Adjacency List:** Because edges are undirected, each `[u, v]` pair is added to both `adj[u]` and `adj[v]`.
- **Undirected Cycle Detection via `parent` Tracking:** When traversing from `parent` to `node`, `adj[node]` naturally points back to `parent`. Passing `parent` into `dfs(node, parent)` lets us ignore the immediate back-edge (`if (neighbor === parent) continue;`). Encountering any _other_ already-visited neighbor (`visited.has(neighbor)`) proves an alternate path exists, confirming a cycle (`return false`).
- **Single-Component Connectivity Check:** Starting DFS from node `0` and verifying `visited.size === n` ensures no isolated nodes or disconnected subgraphs exist.

## Common Pitfalls

- **Forgetting to Add Both Directions to `adj`:** Pushing only `adj[u].push(v)` treats an undirected graph as directed, allowing DFS from node `0` to miss reachable nodes or miss cycles.
- **Triggering False Cycles on the Immediate `parent` Edge:** Without `if (neighbor === parent) continue;`, stepping from `0 → 1` and seeing `0` in `adj[1]` immediately flags `0` as visited and falsely reports a cycle.
- **Checking Only for Cycles Without Checking Connectivity:** Two separate components (e.g., `0-1` and `2-3`) contain no cycles, so checking `visited.size === n` is essential to confirm the graph is a single connected tree.

## Solution

```javascript
class Solution {
  /**
   * @param {number} n
   * @param {number[][]} edges
   * @returns {boolean}
   */
  validTree(n, edges) {
    // A valid tree with n nodes must have exactly n - 1 edges
    if (edges.length !== n - 1) return false;

    // 1. Build undirected (bidirectional) adjacency list
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
      adj[u].push(v);
      adj[v].push(u);
    }

    const visited = new Set();

    // 2. DFS with parent tracking to detect undirected cycles
    function dfs(node, parent) {
      visited.add(node);

      for (const neighbor of adj[node]) {
        if (neighbor === parent) continue; // Ignore edge back to parent
        if (visited.has(neighbor)) return false; // Cycle detected
        if (!dfs(neighbor, node)) return false;
      }

      return true;
    }

    // 3. Ensure no cycles from node 0 and that all n nodes are connected
    if (!dfs(0, -1)) return false;
    return visited.size === n;
  }
}
```
