class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}
class PrefixTree {

    constructor() {
        this.root = new TrieNode();
    }
        
    /**
     * @param {string} word
     * @return {void}
     */
    insert(word) {
        let curr = this.root;
        for (let char of word) {
            if (!curr.children[char]) {
                curr.children[char] = new TrieNode();
            }
            curr = curr.children[char];
        }
        curr.isEndOfWord = true;
    }

    /**
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        let curr = this.root;
        for (let char of word) {
            if (!curr.children[char]) {
                return false;
            } else {
                curr = curr.children[char];
            }
        } 
        return curr.isEndOfWord;
    }

    /**
     * @param {string} prefix
     * @return {boolean}
     */
    startsWith(prefix) {
        let curr = this.root;
        for (let char of prefix) {
            if (!curr.children[char]) {
                return false;
            } else {
                curr = curr.children[char];
            }
        } 
        return true;
    }
}
