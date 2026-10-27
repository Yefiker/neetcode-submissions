class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}
class WordDictionary {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * @param {string} word
     * @return {void}
     */
    addWord(word) {
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
        const dfs = (node, index) => {
            if (index === word.length) return node.isEndOfWord;
            let char = word[index];

            if(char === '.') {
                for (let key in node.children) {
                    if(dfs(node.children[key], index + 1)) {
                        return true;
                    }
                }
                return false;
            } else {
                if(!node.children[char]) return false;
                return dfs(node.children[char], index + 1);
            }
        };
        return dfs(this.root, 0);
    }
}
