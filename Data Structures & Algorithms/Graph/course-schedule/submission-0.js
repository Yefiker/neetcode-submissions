class Solution {
    /**
     * @param {number} numCourses
     * @param {number[][]} prerequisites
     * @return {boolean}
     */
    canFinish(numCourses, prerequisites) {
        const adj = Array.from({ length: numCourses }, () => []);

        for (let [course, prereq] of prerequisites) {
            adj[course].push(prereq);
        }

        const visiting = new Set();
        const visited = new Set();

        function dfs(course) {
            if(visiting.has(course)) return false;
            if(visited.has(course)) return true;

            visiting.add(course);

            for (const pre of adj[course]) {
                if(!dfs(pre)) return false;
            }

            visiting.delete(course);
            visited.add(course);
            return true;
        }

        for (let c = 0; c < numCourses; c++) {
            if(!dfs(c)) return false;
        }
        return true;
    }
}
