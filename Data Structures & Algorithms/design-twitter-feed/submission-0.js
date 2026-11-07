class Twitter {
    constructor() {
        this.time = 0;
        this.tweets = new Map();
        this.following = new Map();
    }

    /**
     * @param {number} userId
     * @param {number} tweetId
     * @return {void}
     */
    postTweet(userId, tweetId) {
        if(!this.tweets.has(userId)) {
            this.tweets.set(userId, []);
        }
        this.tweets.get(userId).push({ tweetId, time: this.time++});
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
            if(userTweets) {
                allTweets.push(...userTweets);
            }
        }
        allTweets.sort((a, b) => b.time - a.time);
        return allTweets.slice(0, 10).map(tweet => tweet.tweetId);
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

        if(this.following.has(followerId)) {
            this.following.get(followerId).delete(followeeId);
        }
    }
}
