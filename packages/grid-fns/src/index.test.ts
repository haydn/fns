import { describe, expect, test } from "bun:test";
import {
  createGrid,
  getValue,
  measureDistance,
  mooreNeighbors,
  normalizeCell,
  normalizeGrid,
  orthogonalNeighbors,
  setValue,
  sizeGrid,
} from "./index";

describe("createGrid", () => {
  test("base case", () => {
    expect(createGrid(1, 1)).toEqual([[0]]);
  });
  test("multiple cells", () => {
    expect(createGrid(2, 2)).toEqual([
      [0, 0],
      [0, 0],
    ]);
  });
  test("bad dimensions", () => {
    expect(createGrid(-245, 2.4)).toEqual([[0], [0]]);
  });
  test("prefilled cells", () => {
    expect(createGrid(2, 2, () => 0.5)).toEqual([
      [0.5, 0.5],
      [0.5, 0.5],
    ]);
  });
  test("numbered cells", () => {
    expect(createGrid(2, 3, ([x, y]) => y * 2 + x)).toEqual([
      [0, 1],
      [2, 3],
      [4, 5],
    ]);
  });
});

describe("getValue", () => {
  test("getValue", () => {
    expect(getValue([], [0, 0])).toEqual(0);

    expect(
      getValue(
        [
          [0.8, 0.3],
          [0.7, 0.9],
        ],
        [1, 1],
      ),
    ).toEqual(0.9);

    expect(
      getValue(
        [
          [0.8, 0.3],
          [0.7, 0.9],
        ],
        [0.2, 1.9],
      ),
    ).toEqual(0.7);

    expect(
      getValue(
        [
          [0.8, 0.3],
          [0.7, 0.9],
        ],
        [5, -5],
      ),
    ).toEqual(0.3);
  });
});

describe("measureDistance", () => {
  test("base case", () => {
    expect(measureDistance([[0]], [0, 0], [0, 0])).toEqual(0);
  });
  test("simple", () => {
    expect(measureDistance(createGrid(3, 3), [0, 0], [2, 2])).toEqual(4);
  });
  test("inverse", () => {
    expect(measureDistance(createGrid(3, 3), [2, 2], [0, 0])).toEqual(4);
  });
  test("complex", () => {
    expect(measureDistance(createGrid(6, 6), [1, 3], [4, 3])).toEqual(3);
  });
  test("out of bounds", () => {
    expect(measureDistance(createGrid(3, 3), [0, 0], [5, 5])).toEqual(4);
  });
});

describe("mooreNeighbors", () => {
  test("simple", () => {
    expect(mooreNeighbors(createGrid(3, 3), [1, 1])).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
      [2, 1],
      [0, 2],
      [1, 2],
      [2, 2],
    ]);
  });
  test("complex", () => {
    expect(mooreNeighbors(createGrid(9, 9), [3, 2])).toEqual([
      [2, 1],
      [3, 1],
      [4, 1],
      [2, 2],
      [4, 2],
      [2, 3],
      [3, 3],
      [4, 3],
    ]);
  });
});

describe("normalizeCell", () => {
  test("base case", () => {
    expect(normalizeCell(createGrid(1, 1), [0, 0])).toEqual([0, 0]);
  });
  test("normalizeCell", () => {
    expect(normalizeCell(createGrid(5, 5), [0.1, 0.9])).toEqual([0, 0]);
    expect(normalizeCell(createGrid(5, 5), [1.1, 1.9])).toEqual([1, 1]);
    expect(normalizeCell(createGrid(5, 5), [-454, 4351])).toEqual([0, 4]);
  });
  test("normalizeCell", () => {
    expect(normalizeCell(createGrid(5, 5), [0.1, 0.9])).toEqual([0, 0]);
    expect(normalizeCell(createGrid(5, 5), [1.1, 1.9])).toEqual([1, 1]);
    expect(normalizeCell(createGrid(5, 5), [-454, 4351])).toEqual([0, 4]);
  });
  test("normalizeCell", () => {
    expect(normalizeCell(createGrid(5, 5), [0.1, 0.9])).toEqual([0, 0]);
    expect(normalizeCell(createGrid(5, 5), [1.1, 1.9])).toEqual([1, 1]);
    expect(normalizeCell(createGrid(5, 5), [-454, 4351])).toEqual([0, 4]);
  });
});

describe("normalizeGrid", () => {
  test("base case", () => {
    expect(normalizeGrid([])).toEqual([[0]]);
  });
  test("no columns", () => {
    expect(normalizeGrid([[]])).toEqual([[0]]);
  });
  test("uneven rows", () => {
    expect(normalizeGrid([[1], [1, 1, 1], [1, 1]])).toEqual([
      [1, 0, 0],
      [1, 1, 1],
      [1, 1, 0],
    ]);
  });
});

describe("orthogonalNeighbors", () => {
  test("simple", () => {
    expect(orthogonalNeighbors(createGrid(3, 3), [1, 1])).toEqual([
      [1, 0],
      [2, 1],
      [1, 2],
      [0, 1],
    ]);
  });
  test("complex", () => {
    expect(orthogonalNeighbors(createGrid(9, 9), [3, 2])).toEqual([
      [3, 1],
      [4, 2],
      [3, 3],
      [2, 2],
    ]);
  });
});

describe("setValue", () => {
  test("base case", () => {
    expect(setValue([[0]], [0, 0], 1)).toEqual([[1]]);
  });
  test("out of bounds", () => {
    expect(setValue([[0]], [-1, 100], 1)).toEqual([[1]]);
  });
});

describe("sizeGrid", () => {
  test("base case", () => {
    expect(sizeGrid([])).toEqual([1, 1]);
  });
  test("empty grid", () => {
    expect(sizeGrid([[]])).toEqual([1, 1]);
  });
  test("single cell", () => {
    expect(sizeGrid([[0]])).toEqual([1, 1]);
  });
  test("normalized", () => {
    expect(sizeGrid(createGrid(10, 5))).toEqual([10, 5]);
  });
  test("unnormalized", () => {
    expect(sizeGrid([[], [0, 0, 0], [0], [], []])).toEqual([3, 5]);
  });
});
