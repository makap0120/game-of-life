const canvas = document.querySelector('#gamefield');
const ctx = canvas.getContext('2d');
const game = new GameOfLife(ctx, canvas, 5);
game.init();

