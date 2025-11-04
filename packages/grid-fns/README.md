<div align="center">
  <h1>
    <img src="https://unpkg.com/@haydn/grid-fns/logo.png" alt="grid-fns" width="160" />
  </h1>
  <p>A JavaScript utility library for working with grids.</p>
  <p>
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/@haydn/grid-fns.svg">
    <img alt="npm" src="https://img.shields.io/npm/dw/@haydn/grid-fns.svg">
  </p>
</div>

## Features

- Lightweight.
- Pure functions.
- TypeScript declarations included.
- ESM package.

## Installation

```bash
bun add @haydn/grid-fns
deno add npm:@haydn/grid-fns
npm install @haydn/grid-fns
pnpm add @haydn/grid-fns
yarn add @haydn/grid-fns
```

## Usage

```js
import { createGrid } from '@haydn/grid-fns';

const grid = createGrid(3, 3);
//=> [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
```

<!-- TSDOC_START -->

## :toolbox: Functions

- [createGrid](#gear-creategrid)
- [getValue](#gear-getvalue)
- [measureDistance](#gear-measuredistance)
- [mooreNeighbors](#gear-mooreneighbors)
- [normalizeCell](#gear-normalizecell)
- [normalizeGrid](#gear-normalizegrid)
- [orthogonalNeighbors](#gear-orthogonalneighbors)
- [setValue](#gear-setvalue)
- [sizeGrid](#gear-sizegrid)

### :gear: createGrid

Creates a grid with the given dimensions.

| Function | Type |
| ---------- | ---------- |
| `createGrid` | `(cols: number, rows: number, mapFn?: ((point: Vec2) => number) or undefined) => Grid` |

Parameters:

* `cols`: Number of columns.
* `rows`: Number of rows.
* `mapFn`: Optional function to set the initial value of each cell. If not
provided, all cells are initialized to 0.


Returns:

A grid with the given dimensions.

Examples:

```ts
createGrid([3, 3], ([row, col]) => (row + 1) * 10 + col);
//=> [[10, 11, 12], [20, 21, 22], [30, 31, 32]]
```


### :gear: getValue

Retrieves the value of a cell in the given grid.

| Function | Type |
| ---------- | ---------- |
| `getValue` | `(grid: Grid, cell: Vec2) => number` |

Parameters:

* `grid`: The grid.
* `cell`: The cell.


Returns:

The value of the cell or `0` if the cell has no specified value.

Examples:

```ts
getValue([[0, 0, 0], [0, 2.5, 0], [0, 0, 0]], [1, 1]);
//=> 2.5
```


### :gear: measureDistance

Calculates the Manhattan distance between two cells in the given grid.

| Function | Type |
| ---------- | ---------- |
| `measureDistance` | `(grid: Grid, c1: Vec2, c2: Vec2) => number` |

Parameters:

* `grid`: The grid.
* `c1`: The first cell.
* `c2`: The second cell.


Returns:

The Manhattan distance between the two cells.

Examples:

```ts
distance(createGrid([3, 3]), [0, 0], [2, 2]);
//=> 4
```


### :gear: mooreNeighbors

Finds the Moore neighbors of a cell (the eight adjacent cells).

| Function | Type |
| ---------- | ---------- |
| `mooreNeighbors` | `(grid: Grid, cell: Vec2) => Vec2[]` |

Parameters:

* `grid`: The grid.
* `cell`: The cell for which to find neighbors.


Returns:

The Moore neighbors of the cell.

Examples:

```ts
mooreNeighbors(createGrid(3, 3), [1, 1]);
//=> [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2]]
```


### :gear: normalizeCell

Normalizes a cell by rounding down fractional coordinates and clamping it to the grid's bounds.

| Function | Type |
| ---------- | ---------- |
| `normalizeCell` | `(grid: Grid, cell: Vec2) => Vec2` |

Parameters:

* `grid`: The grid to normalize.
* `cell`: The cell to normalize.


Returns:

The normalized cell.

Examples:

```ts
normalizeCell(createGrid(3, 3), [1.5, 2.5]);
//=> [1, 2]
normalizeCell(createGrid(3, 3), [100, 100]);
//=> [2, 2]
```


### :gear: normalizeGrid

Normalizes a grid by ensuring it has at least 1 cell and every row is the same length. Missing
cells are filled with 0.

| Function | Type |
| ---------- | ---------- |
| `normalizeGrid` | `(grid: Grid) => Grid` |

Parameters:

* `grid`: The grid to normalize.


Returns:

The normalized grid.

Examples:

```ts
normalizeGrid([
  [1, 2, 3],
  [4, 5],
  [6, 7, 8, 9],
]);
//=> [
//   [1, 2, 3, 0],
//   [4, 5, 0, 0],
//   [6, 7, 8, 9],
// ]
```


### :gear: orthogonalNeighbors

Finds the orthogonal neighbors of a cell (the four immediately adjacent cells) in a grid.

| Function | Type |
| ---------- | ---------- |
| `orthogonalNeighbors` | `(grid: Grid, cell: Vec2) => Vec2[]` |

Parameters:

* `grid`: A grid.
* `cell`: The cell for which to find neighbors.


Returns:

The orthogonal neighbors of the cell.

Examples:

```ts
orthogonalNeighbors(createGrid(3, 3), [1, 1]);
//=> [[0, 1], [1, 0], [1, 2], [2, 1]]
```


### :gear: setValue

Sets the value of a cell in a grid.

| Function | Type |
| ---------- | ---------- |
| `setValue` | `(grid: Grid, cell: Vec2, value: number) => Grid` |

Parameters:

* `grid`: The grid.
* `cell`: The cell.
* `value`: The value to set.


Returns:

The updated grid.

Examples:

```ts
setValue(createGrid(3, 3), [1, 1], 10);
```


### :gear: sizeGrid

Calculates the size of a grid. Even if the grid is not normalized, the maximum size is returned.

| Function | Type |
| ---------- | ---------- |
| `sizeGrid` | `(grid: Grid) => Vec2` |

Parameters:

* `grid`: The grid of which to calculate the size.


Returns:

The number of columns and rows in the grid.

Examples:

```ts
sizeGrid([
  [1, 2, 3],
  [4, 5],
  [6, 7, 8, 9],
]);
//=> [4, 3]
```




## :cocktail: Types

- [Cell](#gear-cell)
- [Grid](#gear-grid)

### :gear: Cell

A cell in a grid where the first value is the column and the second value is the row.

| Type | Type |
| ---------- | ---------- |
| `Cell` | `Vec2` |

Examples:

```ts
const [col, row]: Cell = [1, 2];
```


### :gear: Grid

A grid of numbers organized first by row and then by column.

| Type | Type |
| ---------- | ---------- |
| `Grid` | `Array<Array<number>>` |

Examples:

```ts
const myGrid: Grid = [
  [0, 1, 0],
  [0, 0, 6],
  [1, 2, 0],
];
```



<!-- TSDOC_END -->
