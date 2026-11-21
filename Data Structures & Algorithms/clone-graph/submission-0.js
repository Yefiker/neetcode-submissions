/**
 * // Definition for a Node.
 * class Node {
 *     constructor(val = 0, neighbors = []) {
 *       this.val = val;
 *       this.neighbors = neighbors;
 *     }
 * }
 */

class Solution {
    /**
     * @param {Node} node
     * @return {Node}
     */
    cloneGraph(node) {
        if (!node) return null;

        const visited = new Map();

        function dfs(currentNode) {
            if (visited.has(currentNode)) {
                return visited.get(currentNode);
            }
            const clone = new Node(currentNode.val);
            visited.set(currentNode, clone);

            for (const neighbor of currentNode.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }

    return clone;
  }

  return dfs(node);
}
}
