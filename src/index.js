const canvas = document.querySelector('#gamefield');
const ctx = canvas.getContext('2d');

const game = new GameOfLife();

game.arrayInit();

window.onload = () => {
    alert(1);
    game.arrayRandomize();
    game.fillArray();

    window.setInterval(() => {
        game.run();
    }, 300);
}

