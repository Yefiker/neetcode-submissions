# Best Time to Buy and Sell Stock

## Complexity

- **Time Complexity:** $O(n)$ — Single pass through the `prices` array using two pointers forming a sliding window.
- **Space Complexity:** $O(1)$ — Only scalar variables (`left`, `right`, `maxProfit`) are used.

## Intuition

I track the best day to buy (`left`) and sell (`right`) using a dynamic sliding window:

1. Initialize `left = 0` (buy) and `right = 1` (sell).
2. If `prices[left] < prices[right]`, I have a valid transaction! Calculate the profit `prices[right] - prices[left]` and update `maxProfit`.
3. If `prices[left] >= prices[right]`, I found a price that is lower than or equal to our current buying baseline. Slide `left = right` to make this lower price our new buying point.
4. Always advance `right++` to explore the next selling day.

## Common Pitfalls

- Sliding `left` by only incrementing `left++` instead of jumping directly to `right` (`left = right`), which wastes iterations.
- Forgetting to increment `right` outside of the `if/else` conditional, causing an infinite loop.

## Solution

```javascript
class Solution {
  maxProfit(prices) {
    let left = 0;
    let right = 1;
    let maxProfit = 0;

    while (right < prices.length) {
      if (prices[left] < prices[right]) {
        let profit = prices[right] - prices[left];
        maxProfit = Math.max(maxProfit, profit);
      } else {
        left = right;
      }
      right++;
    }

    return maxProfit;
  }
}
```
