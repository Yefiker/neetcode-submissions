# Valid Sudoku

## Complexity

- **Time Complexity:** $O(1)$ — The board is fixed at $9 \times 9$ (81 cells), making execution constant time.
- **Space Complexity:** $O(1)$ — Storing at most 81 entries across row, column, and box Sets.

## Intuition

We need to validate that no number 1–9 is duplicated in any row, column, or 3x3 box:

1. Initialize three arrays of Sets of length 9: `row`, `column`, and `boxes`.
2. Iterate through every cell `(r, c)`. Skip empty cells (`"."`).
3. Map cell `(r, c)` to its 3x3 sub-box index:
   $$\text{boxIndex} = \text{Math.floor}(r / 3) \times 3 + \text{Math.floor}(c / 3)$$
4. If `val` is already in `row[r]`, `column[c]`, or `boxes[boxIndex]`, return `false`.
5. Otherwise, add `val` to all three corresponding sets.
6. If all cells pass validation, return `true`.

## Common Pitfalls

- JavaScript Set `.add()` accepts only a single argument (`set.add(val)`).
- Ensure `return true;` is placed **outside** all loops so every row is checked before declaring the board valid.

## Solution

```javascript
function isValidSudoku(board) {
  let row = Array.from({ length: 9 }, () => new Set());
  let column = Array.from({ length: 9 }, () => new Set());
  let boxes = Array.from({ length: 9 }, () => new Set());

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let val = board[r][c];
      if (val === ".") continue;

      let boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);

      if (row[r].has(val) || column[c].has(val) || boxes[boxIndex].has(val)) {
        return false;
      }

      row[r].add(val);
      column[c].add(val);
      boxes[boxIndex].add(val);
    }
  }

  return true;
}
```
