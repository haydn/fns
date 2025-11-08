import { describe, expect, test } from "bun:test";
import { transpose } from "../src";

describe("transpose", () => {
  test("base case", () => {
    expect(
      transpose({
        a: { a: 0 },
      }),
    ).toEqual({
      a: { a: 0 },
    });
  });

  test("single edge", () => {
    expect(
      transpose({
        a: { a: 0, b: 1 },
        b: { a: 0, b: 0 },
      }),
    ).toEqual({
      a: { a: 0, b: 0 },
      b: { a: 1, b: 0 },
    });
  });

  test("weighted edge", () => {
    expect(
      transpose({
        a: { a: 0, b: -0.5 },
        b: { a: 0, b: 0 },
      }),
    ).toEqual({
      a: { a: 0, b: 0 },
      b: { a: -0.5, b: 0 },
    });
  });

  test("multiple edges", () => {
    expect(
      transpose({
        a: { a: 0, b: 1, c: 1 },
        b: { a: 0, b: 0, c: 1 },
        c: { a: 0, b: 0, c: 0 },
      }),
    ).toEqual({
      a: { a: 0, b: 0, c: 0 },
      b: { a: 1, b: 0, c: 0 },
      c: { a: 1, b: 1, c: 0 },
    });
  });

  test("complete graph", () => {
    expect(
      transpose({
        a: { a: 1, b: 1, c: 1 },
        b: { a: 1, b: 1, c: 1 },
        c: { a: 1, b: 1, c: 1 },
      }),
    ).toEqual({
      a: { a: 1, b: 1, c: 1 },
      b: { a: 1, b: 1, c: 1 },
      c: { a: 1, b: 1, c: 1 },
    });
  });
});
