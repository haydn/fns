import {
  absVec2,
  addVec2,
  clampVec2,
  floorVec2,
  subtractVec2,
  type Vec2,
  vec2,
} from "@haydn/linear-fns";

// types

/**
 * A cell in a grid where the first value is the column and the second value is the row.
 *
 * @example
 * ```ts
 * const [col, row]: Cell = [1, 2];
 * ```
 */
export type Cell = Vec2;

/**
 * A grid of numbers organized first by row and then by column.
 *
 * @example
 * ```ts
 * const myGrid: Grid = [
 *   [0, 1, 0],
 *   [0, 0, 6],
 *   [1, 2, 0],
 * ];
 * ```
 */
export type Grid = Array<Array<number>>;

// functions

/**
 * Creates a grid with the given dimensions.
 *
 * @param cols Number of columns.
 * @param rows Number of rows.
 * @param mapFn Optional function to set the initial value of each cell. If not
 * provided, all cells are initialized to 0.
 * @returns A grid with the given dimensions.
 *
 * @example
 * ```ts
 * createGrid([3, 3], ([row, col]) => (row + 1) * 10 + col);
 * //=> [[10, 11, 12], [20, 21, 22], [30, 31, 32]]
 * ```
 */
export const createGrid = (cols: number, rows: number, mapFn?: (point: Vec2) => number): Grid =>
  Array.from({ length: Math.max(1, Math.floor(rows)) }, (_, row) =>
    Array.from({ length: Math.max(1, Math.floor(cols)) }, (_, col) =>
      mapFn ? mapFn([col, row]) : 0,
    ),
  );

/**
 * Retrieves the value of a cell in the given grid.
 *
 * @param grid The grid.
 * @param cell The cell.
 * @returns The value of the cell or `0` if the cell has no specified value.
 *
 * @example
 * ```ts
 * getValue([[0, 0, 0], [0, 2.5, 0], [0, 0, 0]], [1, 1]);
 * //=> 2.5
 * ```
 */
export const getValue = (grid: Grid, cell: Cell): number => {
  const [col, row] = normalizeCell(grid, cell);
  return grid.at(row)?.at(col) ?? 0;
};

/**
 * Calculates the Manhattan distance between two cells in the given grid.
 *
 * @param grid The grid.
 * @param c1 The first cell.
 * @param c2 The second cell.
 * @returns The Manhattan distance between the two cells.
 *
 * @example
 * ```ts
 * distance(createGrid([3, 3]), [0, 0], [2, 2]);
 * //=> 4
 * ```
 */
export const measureDistance = (grid: Grid, c1: Cell, c2: Cell): number => {
  const [x, y] = absVec2(subtractVec2(normalizeCell(grid, c1), normalizeCell(grid, c2)));
  return x + y;
};

/**
 * Finds the Moore neighbors of a cell (the eight adjacent cells).
 *
 * @param grid The grid.
 * @param cell The cell for which to find neighbors.
 * @returns The Moore neighbors of the cell.
 *
 * @example
 * ```ts
 * mooreNeighbors(createGrid(3, 3), [1, 1]);
 * //=> [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2]]
 * ```
 */
export const mooreNeighbors = (grid: Grid, cell: Cell): Array<Cell> =>
  (
    [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ] satisfies Array<Vec2>
  ).map((v) => normalizeCell(grid, addVec2(v, cell)));

/**
 * Normalizes a cell by rounding down fractional coordinates and clamping it to the grid's bounds.
 *
 * @param grid The grid to normalize.
 * @param cell The cell to normalize.
 * @returns The normalized cell.
 *
 * @example
 * ```ts
 * normalizeCell(createGrid(3, 3), [1.5, 2.5]);
 * //=> [1, 2]
 * normalizeCell(createGrid(3, 3), [100, 100]);
 * //=> [2, 2]
 * ```
 */
export const normalizeCell = (grid: Grid, cell: Cell): Cell =>
  clampVec2(floorVec2(cell), vec2(0), subtractVec2(sizeGrid(grid), vec2(1)));

/**
 * Normalizes a grid by ensuring it has at least 1 cell and every row is the same length. Missing
 * cells are filled with 0.
 *
 * @param grid The grid to normalize.
 * @returns The normalized grid.
 *
 * @example
 * ```ts
 * normalizeGrid([
 *   [1, 2, 3],
 *   [4, 5],
 *   [6, 7, 8, 9],
 * ]);
 * //=> [
 * //   [1, 2, 3, 0],
 * //   [4, 5, 0, 0],
 * //   [6, 7, 8, 9],
 * // ]
 * ```
 */
export const normalizeGrid = (grid: Grid): Grid => {
  if (grid.length === 0) return [[0]];
  const maxRowLength = Math.max(1, ...grid.map(({ length }) => length));
  return grid.map((row) =>
    row.slice(0, maxRowLength).concat(Array(maxRowLength - row.length).fill(0)),
  );
};

/**
 * Finds the orthogonal neighbors of a cell (the four immediately adjacent cells) in a grid.
 *
 * @param grid A grid.
 * @param cell The cell for which to find neighbors.
 * @returns The orthogonal neighbors of the cell.
 *
 * @example
 * ```ts
 * orthogonalNeighbors(createGrid(3, 3), [1, 1]);
 * //=> [[0, 1], [1, 0], [1, 2], [2, 1]]
 * ```
 */
export const orthogonalNeighbors = (grid: Grid, cell: Cell): Array<Vec2> =>
  (
    [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ] satisfies Array<Vec2>
  ).map((v) => normalizeCell(grid, addVec2(v, cell)));

/**
 * Sets the value of a cell in a grid.
 *
 * @param grid The grid.
 * @param cell The cell.
 * @param value The value to set.
 * @returns The updated grid.
 *
 * @example
 * ```ts
 * setValue(createGrid(3, 3), [1, 1], 10);
 * ```
 */
export const setValue = (grid: Grid, cell: Cell, value: number): Grid => {
  const [cols, rows] = sizeGrid(grid);
  const [col, row] = normalizeCell(grid, cell);

  const result: Grid = [];

  for (let y = 0; y < rows; y++) {
    const cells: Array<number> = [];
    for (let x = 0; x < cols; x++) {
      cells.push(x === col && y === row ? value : (grid[y]?.[x] ?? 0));
    }
    result.push(cells);
  }

  return result;
};

/**
 * Calculates the size of a grid. Even if the grid is not normalized, the maximum size is returned.
 *
 * @param grid The grid of which to calculate the size.
 * @returns The number of columns and rows in the grid.
 *
 * @example
 * ```ts
 * sizeGrid([
 *   [1, 2, 3],
 *   [4, 5],
 *   [6, 7, 8, 9],
 * ]);
 * //=> [4, 3]
 * ```
 */
export const sizeGrid = (grid: Grid): Vec2 => [
  Math.max(1, ...grid.map(({ length }) => length)),
  Math.max(1, grid.length),
];
