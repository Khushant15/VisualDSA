// src/algorithms/nQueens.js
/**
 * N-Queens Backtracking Algorithm with visualization hooks
 * Places N queens on an N×N board so that no two queens attack each other.
 * 
 * @param {string[][]} board - The N×N board (2D array with '.' or 'Q')
 * @param {Function} setArray - State setter (unused, kept for signature consistency)
 * @param {Function} setColorArray - Visualization hook for highlighting cells
 * @param {number} delay - Delay in ms between placements for visualization
 * @param {Object} stopRef - React ref with .current property to stop execution
 * @param {Function} updateStats - Stats update hook (unused, kept for consistency)
 * @returns {Promise<string[][]>} Array of all valid N-Queens solutions
 */
export async function nQueensWithStop(
  board,
  setArray,
  setColorArray,
  delay,
  stopRef,
  updateStats
) {
  const n = board.length;
  const solutions = [];

  /**
   * Check if placing a queen at (row, col) is safe
   * @param {number} row - Row index
   * @param {number} col - Column index
   * @returns {boolean} True if position is safe
   */
  const isSafe = (row, col) => {
    // Check horizontal (left side only, as we place column by column)
    for (let j = 0; j < col; j++) {
      if (board[row][j] === 'Q') return false;
    }

    // Check upper-left diagonal
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }

    // Check lower-left diagonal
    for (let i = row + 1, j = col - 1; i < n && j >= 0; i++, j--) {
      if (board[i][j] === 'Q') return false;
    }

    return true;
  };

  /**
   * Recursively place queens column by column
   * @param {number} col - Current column to place queen in
   */
  async function place(col) {
    // Check if visualization was stopped
    if (stopRef?.current) return;

    // Base case: all queens placed successfully
    if (col === n) {
      const solution = board.map(row => [...row]);
      solutions.push(solution);
      return;
    }

    // Try placing queen in each row of current column
    for (let row = 0; row < n; row++) {
      if (isSafe(row, col)) {
        // Place queen
        board[row][col] = 'Q';

        // Visualization: highlight current placement
        if (setColorArray) {
          setColorArray([[row, col]]);
        }

        // Delay for visualization
        if (delay > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }

        // Recursively place remaining queens
        await place(col + 1);

        // Backtrack: remove queen for next iteration
        board[row][col] = '.';

        // Optional: visualize backtracking
        if (setColorArray && delay > 0) {
          setColorArray([]);
          await new Promise(resolve => setTimeout(resolve, delay / 2));
        }
      }
    }
  }

  await place(0);
  return solutions;
}
