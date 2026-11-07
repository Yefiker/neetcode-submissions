# Design Twitter

## Complexity

- **Time Complexity:**
  - `postTweet`: $O(1)$ — Appends a new tweet object to the user's list in constant time.
  - `follow` / `unfollow`: $O(1)$ — Set insertions and deletions operate in constant time.
  - `getNewsFeed`: $O(T \log T)$ — Where $T$ is the total number of tweets posted by the user and all their followees combined. All relevant tweets are gathered, sorted by timestamp descending, and sliced to the top 10.
- **Space Complexity:** $O(U + T)$ — Where $U$ is the total number of users and their follow sets, and $T$ is the total number of tweets stored across the entire system.

## Intuition

Twitter is modeled around three core components: timestamps for global ordering, user tweet histories, and followee graphs.

- **Global Timestamp:** Every tweet receives a unique, monotonically increasing timestamp so we can easily determine chronological recency across all users.
- **Self-Inclusion:** A user is implicitly included in their own news feed, ensuring their personal tweets always appear alongside those of people they follow.
- **Efficient Lookups:** Using JavaScript `Map` and `Set` structures allows $O(1)$ lookups for user tweets and instantaneous follow/unfollow updates without duplicate entries.

## Common Pitfalls

- **Forgetting Self-Follow/Inclusion:** Failing to include the user's own `userId` in the news feed aggregator, which causes users to see updates from people they follow but miss their own posts.
- **Unfollowing Self:** Allowing a user to accidentally unfollow themselves, breaking their ability to see their own feed. A simple guard (`if (followerId === followeeId) return;`) prevents this.

## Solution

```javascript
class Twitter {
  constructor() {
    this.time = 0;
    this.tweets = new Map(); // userId -> [{ tweetId, time }]
    this.following = new Map(); // userId -> Set of followeeIds
  }

  /**
   * @param {number} userId
   * @param {number} tweetId
   * @return {void}
   */
  postTweet(userId, tweetId) {
    if (!this.tweets.has(userId)) {
      this.tweets.set(userId, []);
    }
    this.tweets.get(userId).push({ tweetId, time: this.time++ });
  }

  /**
   * @param {number} userId
   * @return {number[]}
   */
  getNewsFeed(userId) {
    const userFollows = this.following.get(userId) || new Set();
    const relevantUsers = new Set([userId, ...userFollows]);

    const allTweets = [];
    for (const id of relevantUsers) {
      const userTweets = this.tweets.get(id);
      if (userTweets) {
        allTweets.push(...userTweets);
      }
    }

    // Sort by timestamp descending (newest first)
    allTweets.sort((a, b) => b.time - a.time);
    return allTweets.slice(0, 10).map((tweet) => tweet.tweetId);
  }

  /**
   * @param {number} followerId
   * @param {number} followeeId
   * @return {void}
   */
  follow(followerId, followeeId) {
    if (!this.following.has(followerId)) {
      this.following.set(followerId, new Set());
    }
    this.following.get(followerId).add(followeeId);
  }

  /**
   * @param {number} followerId
   * @param {number} followeeId
   * @return {void}
   */
  unfollow(followerId, followeeId) {
    if (followerId === followeeId) return;

    if (this.following.has(followerId)) {
      this.following.get(followerId).delete(followeeId);
    }
  }
}
```
