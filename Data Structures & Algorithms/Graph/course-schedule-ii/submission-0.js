class Solution {
    /**
     * @param {number} numCourses
     * @param {number[][]} prerequisites
     * @return {number[]}
     */
    findOrder(numCourses, prerequisites) {
        const adj = Array.from({ length: numCourses}, () => []);
        for (const [course, prereq] of prerequisites) {
            adj[course].push(prereq);
        }

        const visiting = new Set();
        const visited = new Set();
        const order = [];

        function dfs(course) {
            if(visited.has(course)) return true;
            if(visiting.has(course)) return false;

            visiting.add(course);
            
            for (const pre of adj[course]) {
                if(!dfs(pre)) return false;
            }
            visiting.delete(course);
            visited.add(course);
            order.push(course);
            return true;
        }
        for (let c = 0; c < numCourses; c++) {
            if(!dfs(c)) return [];
        }
        return order;
    }
}
