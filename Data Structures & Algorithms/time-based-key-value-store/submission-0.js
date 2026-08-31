class TimeMap {
    constructor() {
        this.keyStore = new Map();
    }

    /**
     * @param {string} key
     * @param {string} value
     * @param {number} timestamp
     * @return {void}
     */
    set(key, value, timestamp) {
        if (!this.keyStore.has(key)) {
            this.keyStore.set(key, [])
        }
        this.keyStore.get(key).push({ value, timestamp });
    }

    /**
     * @param {string} key
     * @param {number} timestamp
     * @return {string}
     */
    get(key, timestamp) {

        if(!this.keyStore.has(key)) return "";
        
        let arr = this.keyStore.get(key);   

        let left = 0;
        let right = arr.length - 1;
        let res = "";
            
        while(left <= right) {
            let mid = Math.floor(left + (right - left) / 2);
                if(arr[mid].timestamp <= timestamp) {
                    res = arr[mid].value;
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
        }
        return res;
    }
}
