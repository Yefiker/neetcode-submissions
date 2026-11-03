class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeight(stones) {
        const maxHeap = new MaxPriorityQueue();

        for (const stone of stones) {
            maxHeap.enqueue(stone);
        }

        while(maxHeap.size() > 1 || maxHeap.length > 1){
            const y = maxHeap.dequeue();
            const x = maxHeap.dequeue();

            if(y !== x) {
                maxHeap.enqueue(y - x);
            }
        }

        return maxHeap.isEmpty() ? 0 : maxHeap.front();
    }
}
