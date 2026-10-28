class TrieNode {
    constructor() {
        this.children = {};
        this.word = null; 
    }
}


class Solution {
    /**
     * @param {character[][]} board
     * @param {string[]} words
     * @return {string[]}
     */
    findWords(board, words) {
        const root = new TrieNode();
        for (const word of words) {
            let node = root;
            for (const char of word) {
                if (!node.children[char]) {
                    node.children[char] = new TrieNode();
                }
                node = node.children[char];
            }
            node.word = word;
        }

        const rows = board.length;
        const cols = board[0].length;
        const result = [];

        const dfs = (r, c, node) => {
            const char = board[r][c];
            
            if (char === '#' || !node.children[char]) return;

            node = node.children[char];

            if (node.word !== null) {
                result.push(node.word);
                node.word = null;
            }

            board[r][c] = '#';

            const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
            for (const [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                    dfs(nr, nc, node);
                }
            }

            board[r][c] = char;
        };

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                dfs(r, c, root);
            }
        }

        return result;
    }
}
