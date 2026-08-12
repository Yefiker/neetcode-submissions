class Solution {
    /**
     * @param {character[][]} board
     * @return {boolean}
     */
    isValidSudoku(board) {
        const row = Array.from({ length: 9}, () => new Set());
        const column = Array.from({ length: 9}, () => new Set());
        const boxes = new Map();

        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board.length; j++) {
                if (board[i][j] === ".") {
                    continue;
                }

                let val = board[i][j];
                let boxKey = Math.floor(i/3) + "-" + Math.floor(j/3);

                if(!boxes.has(boxKey)) {
                    boxes.set(boxKey, new Set());
                }

                if(row[i].has(val) || column[j].has(val) || boxes.get(boxKey).has(val)) {
                    return false;
                } else {
                    row[i].add(val)
                    column[j].add(val),
                    boxes.get(boxKey).add(val);
                }
            }
        }
        return true;
    }
}
