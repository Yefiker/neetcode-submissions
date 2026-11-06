class Solution {
    /**
     * @param {character[]} tasks
     * @param {number} n
     * @return {number}
     */
    leastInterval(tasks, n) {
        const counts = new Array(26).fill(0);
        let maxFreq = 0;

        for (const task of tasks) {
            const index = task.charCodeAt(0) - 65;
            counts[index]++;
            maxFreq = Math.max(maxFreq, counts[index]);
        }

        let maxCount = 0;
        for (const count of counts) {
            if (count === maxFreq) {
                maxCount++;
            }
        }

        const formulaTime = (maxFreq - 1) * (n + 1) + maxCount;

        return Math.max(tasks.length, formulaTime);
    }
}