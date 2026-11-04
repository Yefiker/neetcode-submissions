class Solution {
    /**
     * @param {number[][]} points
     * @param {number} k
     * @return {number[][]}
     */
    kClosest(points, k) {
        const maxHeap = new MaxPriorityQueue(point => point[0] * point[0] + point[1] * point[1]);

        for (let point of points) {
            maxHeap.enqueue(point);
            if(maxHeap.size() > k) {
                maxHeap.dequeue();
            }
        }

        const result = [];
        while(!maxHeap.isEmpty()) {
            result.push(maxHeap.dequeue());
        }
        return result;
    }
}
