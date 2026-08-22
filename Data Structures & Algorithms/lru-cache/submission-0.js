class LRUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        if(!this.cache.has(key)) return -1;

        let value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);

        return value;
        
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        if(this.cache.has(key)) {
            this.cache.delete(key);
        }

       
        this.cache.set(key, value);
        

        if(this.cache.size > this.capacity) {
            let lru = this.cache.keys().next().value;
            this.cache.delete(lru);
        }
    }
}
