class KthLargest {
    /**
     * @param {number} k
     * @param {number[]} nums
     */
    constructor(k, nums) {
        this.heap = [];
        this.k = k;
        
        for (let num of nums) {
            this.add(num);

            if(this.heap.length > this.k) {
                this.heap.pop();
            }
        }
    }

    /**
     * @param {number} val
     * @return {number}
     */
    add(val) {
        this.heap.push(val);
        this.heap.sort((a, b) => a - b);

        if(this.heap.length > this.k) {
            this.heap.shift();
        }
        return this.heap[0];
    }
}
