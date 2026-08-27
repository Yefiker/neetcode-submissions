# Koko Eating Bananas

## Complexity

- **Time Complexity:** $O(N \log(\max(P)))$ where $N$ is the number of piles and $P$ is the max pile size. Calculating total hours takes $O(N)$, repeated over $\log(\max(P))$ binary search steps.
- **Space Complexity:** $O(1)$ constant extra space.

## Intuition

Instead of searching inside a given array, this problem requires binary searching over an **answer space** (the speed $k$).

- **Min speed:** $k = 1$
- **Max speed:** $k = \max(\text{piles})$

For any speed $k$, the hours spent on a pile of size $p$ is $\lceil p / k \rceil$. Because total required hours decreases monotonically as speed $k$ increases, we can apply binary search:

- If `totalHours <= h`: $k$ is feasible. Record $k$ and try a smaller speed (`right = mid - 1`).
- If `totalHours > h`: $k$ is too slow. Increase speed (`left = mid + 1`).

## Common Pitfalls

- **Incorrect Max Boundary:** Setting `right = piles.length` instead of `Math.max(...piles)`.
- **Ceiling Division Precision:** Ensure using `Math.ceil(p / mid)` so remaining fractional hours round up correctly per problem rules.

## Solution

```javascript
class Solution {
  /**
   * @param {number[]} piles
   * @param {number} h
   * @return {number}
   */
  minEatingSpeed(piles, h) {
    let left = 1;
    let right = Math.max(...piles);
    let res = right;

    while (left <= right) {
      let mid = Math.floor(left + (right - left) / 2);

      let totalHours = 0;
      for (let p of piles) {
        totalHours += Math.ceil(p / mid);
      }

      if (totalHours <= h) {
        res = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return res;
  }
}
```
