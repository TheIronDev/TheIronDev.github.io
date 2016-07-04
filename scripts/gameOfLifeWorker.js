'use strict';

/**
 * Generate new game of life boards to draw
 *
 */

let board = [];
const maxCellValue = 16;
const maxRowCol = 200;
const generationThreshold = 0.92;

/**
 * Generate a new board from scratch using Math.random
 * @param {Number} threshold - threshold we use to decide if a cell is alive or not
 * @return {Array} new gol board
 */
function generateInitialBoard(threshold) {
  let newBoard = [];
  for (let r = 0; r < maxRowCol; r++) {
    let row = [];
    for (let c = 0; c < maxRowCol; c++) {
      let cell = (Math.random() > threshold) ? maxCellValue : 0;
      row.push(cell);
    }
    newBoard.push(row);
  }
  return newBoard;
}

/**
 * Get Neighbors of a current cell
 * @param {Matrix} board - Full Board
 * @param {Number} width - Board width
 * @param {Number} rowIndex - cells row index
 * @param {Number} colIndex - cells column index
 * @return {Array} neighbors
 */
function getNeighbors(board, width, rowIndex, colIndex) {
  let boardLength = board.length;
  let topRow = rowIndex - 1 >= 0 ? rowIndex - 1 : boardLength - 1;
  let bottomRow = (rowIndex + 1) % boardLength;

  let l = colIndex - 1 >= 0 ? colIndex - 1 : width - 1;
  let r = (colIndex + 1) % width;

  let t = board[topRow];
  let m = board[rowIndex];
  let b = board[bottomRow];

  return [t[l], t[colIndex], t[r], m[l], m[r], b[l], b[colIndex], b[r]];
}

/**
 * Get the next board state
 * @param {Matrix} board - current board
 * @return {Matrix} next board state
 */
function getNext(board) {
  return board.map(function(row, rowIndex) {
    return row.map(function(cell, colIndex) {
      let neighbors = getNeighbors(board, board[0].length, rowIndex, colIndex);
      let neighborCount = neighbors.reduce((memo, neighbor) => {
        return memo + (neighbor === maxCellValue);
      }, 0);

      if (neighborCount === 3) return maxCellValue;
      if (cell === maxCellValue && neighborCount === 2) return maxCellValue;

      return cell ? cell - 1 : 0;
    });
  });
}

/**
 * Check to see if two boards are deep-equal'd
 * @param {Matrix} board1 - gameOfLife board 1
 * @param {Matrix} board2 - gameOfLife board 2
 * @return {boolean} is equal or not
 */
function isDeepEqual(board1, board2) {
  let maxRow = board1.length;
  let maxCol = board1[0].length;
  for (let rows = 0; rows < maxRow; rows++) {
    for (let cols = 0; rows < maxCol; rows++) {
      if (board1[rows][cols] !== board2[rows][cols]) {
        return false;
      }
    }
  }
  return true;
}

board = generateInitialBoard(generationThreshold);
self.addEventListener('message', function() {
  let newBoard = getNext(board);
  if (isDeepEqual(board, newBoard)) {
    board = generateInitialBoard(generationThreshold);
  } else {
    board = newBoard;
  }
  self.postMessage(board);
});
