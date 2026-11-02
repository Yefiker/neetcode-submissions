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
        }
    }

    /**
     * @param {number} val
     * @return {number}
     */
    add(val) {
        this.heap.push(val);
        this.bubbleUp();

        if(this.heap.length > this.k) {
            this.heap[0] = this.heap.pop();

            this.bubbleDown();
        }
        return this.heap[0];
    }

        swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    bubbleUp() {
        let index = this.heap.length - 1;

        while(index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);

            if(this.heap[index] < this.heap[parentIndex]) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    bubbleDown() {
        let index = 0;
        const length = this.heap.length;

        while(true) {
            let leftChild = 2 * index + 1;
            let rightChild = 2 * index + 2;
            let smallest = index;

            if(leftChild < length && this.heap[leftChild] < this.heap[smallest]) {
                smallest = leftChild;
            }

            if(rightChild < length && this.heap[rightChild] < this.heap[smallest]) {
                smallest = rightChild;
            }

            if(smallest === index) break;

            this.swap(index, smallest);
            index = smallest;
        }
    }
}
