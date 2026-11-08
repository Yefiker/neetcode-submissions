class MedianFinder {
    constructor() {
        this.leftMaxHeap = new MaxPriorityQueue();
        this.rightMinHeap = new MinPriorityQueue();
    }

    /**
     *
     * @param {number} num
     * @return {void}
     */
    addNum(num) {
        if (this.leftMaxHeap.size() === 0 || num <= this.leftMaxHeap.front()) {
            this.leftMaxHeap.enqueue(num);
        } else {
            this.rightMinHeap.enqueue(num);
        }

        if(this.leftMaxHeap.size() > this.rightMinHeap.size() + 1) {
            this.rightMinHeap.enqueue(this.leftMaxHeap.pop());
        } else if (this.rightMinHeap.size() > this.leftMaxHeap.size()) {
            this.leftMaxHeap.enqueue(this.rightMinHeap.dequeue());
        }
    }

    /**
     * @return {number}
     */
    findMedian() {
        if(this.leftMaxHeap.size() > this.rightMinHeap.size()) {
           return this.leftMaxHeap.front(); 
        }

        return (this.leftMaxHeap.front() + this.rightMinHeap.front()) / 2;
    }
}
