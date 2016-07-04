'use strict';

const gameOfLife = document.getElementById('gameOfLife');
const ctxWidth = gameOfLife.width;
const ctxHeight = gameOfLife.height;
const ctx = gameOfLife.getContext('2d');

// The fade animation happens by having "dead" cells drop between states 0-15.
// "Alive" is state 16
const fillColors = [
  'transparent',
  'rgba(0,0,0,0.02)',
  'rgba(0,0,0,0.03)',
  'rgba(0,0,0,0.03)',
  'rgba(0,0,0,0.04)',
  'rgba(0,0,0,0.04)',
  'rgba(0,0,0,0.05)',
  'rgba(0,0,0,0.05)',
  'rgba(0,0,0,0.06)',
  'rgba(0,0,0,0.06)',
  'rgba(0,0,0,0.07)',
  'rgba(0,0,0,0.07)',
  'rgba(0,0,0,0.08)',
  'rgba(0,0,0,0.08)',
  'rgba(0,0,0,0.09)',
  'rgba(0,0,0,0.1)',
  'rgba(0,0,0,0.2)'
];

let worker;

/**
 * Draw a board onto the canvas
 * @param {Matrix} board - game of life board
 * @param {Number} width - cell width
 * @param {Number} height - cell height
 */
function drawBoard(board, width, height) {
  ctx.clearRect(0, 0, ctxWidth, ctxHeight);
  board.forEach((row, rIndex) => {
    row.forEach((cell, cIndex) => {
      ctx.fillStyle = fillColors[cell];
      ctx.fillRect(rIndex * width, cIndex * height, width, height);
    });
  });
}

/**
 * Draw the next board from a postMessage on the main thread
 * @param {Matrix} board - game of life board from worker
 */
function drawNext({data: board}) {
  let cellWidth = ctxWidth / board[0].length;
  let cellHeight = ctxHeight / board.length;
  drawBoard(board, cellWidth, cellHeight);
  setTimeout(function() {
    worker.postMessage('getNext');
  }, 60);
}

worker = new Worker('./scripts/gameOfLifeWorker.js');
worker.addEventListener('message', drawNext);

worker.postMessage('getNext');
