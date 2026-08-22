# LRU Cache

## Complexity

- **Time Complexity:** $O(1)$ for both `get` and `put` operations.
- **Space Complexity:** $O(C)$ where $C$ is the `capacity` of the cache to store key-value pairs.

## Intuition

An LRU (Least Recently Used) cache requires $O(1)$ key lookups and $O(1)$ node updates to track usage order.

While the standard textbook implementation pairs a **Doubly Linked List** with a **Hash Map**, JavaScript's built-in `Map` object maintains key insertion order internally. We can exploit this behavior:

- **Updating MRU (Most Recently Used):** Delete the existing key and re-insert it (`map.delete(key); map.set(key, val);`). This moves the key to the back of the map's insertion order.
- **Evicting LRU (Least Recently Used):** The first key returned by `this.cache.keys().next().value` represents the oldest (least recently used) entry.

## Common Pitfalls

- **Forgetting to update order on `get`:** Reading a key via `get(key)` counts as accessing it! If you don't delete and re-set the key inside `get`, it won't be marked as most recently used.
- **Order on `put` for existing keys:** When updating an existing key's value, delete it _before_ re-inserting so it jumps to the back of the queue instead of staying in its old position.

## Solution

```javascript
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
    if (!this.cache.has(key)) return -1;

    // Move key to the back (MRU)
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
    // If key exists, delete old entry to refresh position
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);

    // Evict LRU if over capacity
    if (this.cache.size > this.capacity) {
      let lru = this.cache.keys().next().value;
      this.cache.delete(lru);
    }
  }
}
```
