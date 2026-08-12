class Solution {
    /**
     * @param {number[]} prices
     * @return {number}
     */
    maxProfit(prices) {
        let left = 0;
        let right = 1;
        let maxProfite = 0;

        while(right < prices.length) {
            if(prices[left] < prices[right]) {
                let profite = prices[right] - prices[left];
                maxProfite = Math.max(maxProfite, profite);
            } else {
                left = right;
            }
            right++;
        }

        return maxProfite;
    }
}
