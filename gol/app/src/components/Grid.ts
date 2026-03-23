const neighborsOffsets = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

export default class Grid {
  width: number;
  height: number;
  current: number[][];
  history: number[][][];
  historyLimit: number;
  historyPos: number;

  constructor(width: number, height: number, historyLimit = 42) {
    this.width = width;
    this.height = height;
    this.current = Array.from({ length: height }, () => Array(width).fill(0));
    this.historyLimit = historyLimit;
    this.history = [];
    this.historyPos = 0;
  }

  static fromGrid(grid: number[][]) {
    const newGrid = new Grid(grid.length, grid[0].length);
    newGrid.current = grid;
    return newGrid;
  }

  remember() {
    if (this.history.length >= this.historyLimit) {
      this.history.shift();
    }
    this.history.push(this.current);
    return this;
  }

  back() {
    if (-1 * this.historyPos < this.history.length && this.history.length > 0) {
      this.historyPos -= 1;
      this.current = this.history.at(this.historyPos) || [];
    }
    return this;
  }

  forward() {
    if (this.historyPos < 0) {
      this.historyPos += 1;
      this.current = this.history.at(this.historyPos) || [];
      return;
    }
    const grid = this.current;
    function liveNeighborsCount(i: number, j: number) {
      return neighborsOffsets.filter(([iOffset, jOffset]) => {
        if (i + iOffset >= 0 && i + iOffset < grid.length) {
          return grid[i + iOffset][j + jOffset] == 1;
        }
        return false;
      }).length;
    }

    function decide(isAlive: number, i: number, j: number) {
      const neighbors = liveNeighborsCount(i, j);
      if (isAlive) {
        if (neighbors === 2 || neighbors === 3) {
          return 1;
        }
      } else {
        if (neighbors === 3) {
          return 1;
        }
      }
      return 0;
    }

    this.remember();
    this.current = grid.map((row, i) =>
      row.map((isAlive, j) => decide(isAlive, i, j)),
    );
    return this;
  }

  getLiveCells() {
    const liveCells: number[][] = [];
    this.current.forEach((row, i) =>
      row.forEach((isAlive, j) => {
        if (isAlive) {
          liveCells.push([i, j]);
        }
      }),
    );
    return liveCells;
  }

  setFromLiveCells(liveCells: number[][]) {
    liveCells.forEach(([i, j]) => {
      if (i >= 0 && i < this.height && j >= 0 && j < this.width) {
        this.current[i][j] = 1;
      }
    });
    return this;
  }
}
