const canvas = document.querySelector('#gamefield');
const ctx = canvas.getContext('2d');
console.log(11);
window.onload = () => {
    const game = new GameOfLife(ctx, canvas);
    game.init();
    // alert(1);
    // game.arrayRandomize();
    // game.fillArray();

    // window.setInterval(() => {
    //     game.run();
    // }, 300);
}

