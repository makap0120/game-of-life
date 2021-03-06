class GameOfLife {
    constructor(ctx, canvas, size) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.cell_size = size ? size : 5;
        
        this.dead_color = "#181818";
        this.alive_color = "#FF756B";

        this.cells_in_row = Math.floor(this.canvas.width/this.cell_size);
        this.cells_in_column = Math.floor(this.canvas.height/this.cell_size);
        this.active_array = [];
        this.updated_array = [];

        this.loopCells = (innercb, outercb) => {
            for ( let r = 0; r < this.cells_in_row; r++) {
                outercb && outercb(r);
                for ( let c = 0; c < this.cells_in_column; c++ ) {
                    innercb(r, c);
                }
            }
        } 

        this.arrayInit = () => {
            this.loopCells((r, c) => {
                this.active_array[r][c] = Math.random() > .3 ? 1 : 0;
                this.updated_array[r][c] = 0;
            }, (r) => {
                this.active_array[r] = [];
                this.updated_array[r] = [];
            });
        };

        this.step = () => {
            this.loopCells((r,c) => {
                // draw
                this.ctx.fillStyle = this.active_array[r][c] ? this.alive_color: this.dead_color;
                this.ctx.fillRect(this.cell_size * r, this.cell_size * c, this.cell_size, this.cell_size);

                // prep updated array
                const ns = this.getNeighbours(r,c);
                if (this.active_array[r][c]) {
                    this.updated_array[r][c] = ns < 2 || ns > 3 ? 0 : 1;
                } else {
                    this.updated_array[r][c] = ns === 3 ? 1 : 0;
                }
            });
            // replace data
            this.active_array = this.updated_array;
        }

        this.getNeighbours = (r, c) => {
            let total = 0;
            const nRows = [r];
            const nCols = [c];

            if (r === 0) nRows.push(r + 1);
            else if (r === this.cells_in_row - 1) nRows.push(r - 1);
            else nRows.push(r + 1, r - 1);
            
            if (c === 0) nCols.push(c + 1);
            else if (c === this.cells_in_column - 1) nCols.push(c - 1);
            else nCols.push(c + 1, c - 1);

            try {
                for (let nr of nRows) {
                    for (let nc of nCols) {
                        this.active_array[nr][nc] && total++;
                    }
                }
            } catch(e) {
                console.error(this.cells_in_row, this.cells_in_column, this.active_array.length, this.active_array[60]);
                
                throw new Error(`row ${r}, col ${c}, ${JSON.stringify(nRows)}, ${JSON.stringify(nCols)}`);
            }
            
            return total;
        }

        this.init = () => {
            this.arrayInit();

            setInterval(() => {
                this.step();
            }, 600)
        }
    }
}