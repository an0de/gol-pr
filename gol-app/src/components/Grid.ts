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
  current: number[][];
  history: number[][][];
  historyLimit: number;
  historyPos: number;

  constructor(grid: number[][], historyLimit = 42) {
    this.current = grid;
    this.historyLimit = historyLimit;
    this.history = [];
    this.historyPos = 0;
  }

  remember() {
    if (this.history.length >= this.historyLimit) {
      this.history.shift();
    }
    this.history.push(this.current);
  }

  back() {
    if (-1 * this.historyPos < this.history.length && this.history.length > 0) {
      this.historyPos -= 1;
      this.current = this.history.at(this.historyPos) || [];
    }
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
    return this.current;
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
}
