class GameOfLife {
    constructor() {

        alert(2, canvas);
        console.log(canvas.width);

        this.cell_size = 5;
        this.dead_color = "#181818";
        this.alive_color = "#FF756B";
        this.cells_in_column = Math.floor(canvas.width / this.cell_size);
        this.cells_in_row = Math.floor(canvas.height / this.cell_size);
        this.active_array = [];
        this.inactive_array = [];

        this.arrayInit = () => {
            // creating 2 2d arrays
            for ( let i = 0; i < this.cells_in_row; i++) {
                this.active_array[i] = [];
                for (let j = 0; j < this.cells_in_column; j++) {
                    this.active_array[i][j] = 0;
                }
            }
            this.inactive_array = this.active_array;
        };

        this.arrayRandomize = () => {
            // looping thru active array and randomizing values
            for (let row in this.cells_in_row) {
                for (let column in this.cells_in_column) {
                    this.active_array[row][column] = Math.round(Math.random());
                }
            }
        };

        this.fillArray = () => {
            for (let row in this.cells_in_row) {
                for (let column in this.cells_in_column) {
                    let color = this.active_array[row][column]? this.alive_color : this.dead_color;
                    ctx.fillStyle(color);
                    const size = this.cell_size;
                    ctx.fillRect(j * size, i * size, this.size, this.size);
                }
            }
        };

        this.countNeighbours = (row, col) => {
            let total = 0;
            const nRows = [row];
            const nCols = [col];

            if (row === 0) {
                nRows.push(row + 1);
            } else if (row === this.cells_in_row.length - 1) {
                nRows.push(row - 1);
            } else {arrayInit
            }
            if (col === 0) {
                col === 0 && nCols.push(row + 1);
            } else if (row === this.cells_in_column.length - 1) {
                nCols.push(row - 1);
            } else {
                nCols.push(row + 1);
                nCols.push(row - 1);
            }

            for (let nRow of nRows) {
                for (let nCol of nCols) {
                    this.active_array[nRow][nCol] && total++;
                }
            }
            return total;
        };

        this.updateCellValue = (row, col) => {
            const neighbours = this.countNeighbours(row, col);
            return neighbours > 4 || neighbours < 3 ? 0 : 1;
        };

        this.updateLifeCycle = () => {
            for (let row in this.cells_in_row) {
                for (let column in this.cells_in_column) {
                    const new_state = this.updateCellValue(row, column);
                    this.inactive_array[row][column] = new_state;
                }
            }

            this.active_array = this.inactive_array;
        };

        this.run = () => {
            this.updateLifeCycle();
            this.fillArray();
        }
    }

}