class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @returns {boolean}
     */
    validTree(n, edges) {
        if (edges.length !== n - 1) return false;

        const adj = Array.from({ length: n}, () => []);
        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }
        const visited = new Set();

        function dfs(node, parent) {
            visited.add(node);

            for (const neighbor of adj[node]) {
                if (neighbor === parent) continue;
                if (visited.has(neighbor)) return false;
                if (!dfs(neighbor, node)) return false;
            }
            return true;
        }
        if (!dfs(0, -1)) return false;
        return visited.size === n;
    }
}
