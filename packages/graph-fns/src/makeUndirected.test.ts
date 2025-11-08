import { describe, expect, test } from "bun:test";
import { makeUndirected } from "../src";

describe("makeUndirected", () => {
  test("base case", () => {
    expect(makeUndirected({})).toEqual({});
  });

  test("single vertex", () => {
    expect(makeUndirected({ a: { a: 1 } })).toEqual({ a: { a: 1 } });
  });

  test("unweighted edges", () => {
    expect(
      makeUndirected({
        a: { a: 1, b: 1, c: 0 },
        b: { a: 0, b: 0, c: 1 },
        c: { a: 0, b: 0, c: 0 },
      }),
    ).toEqual({
      a: { a: 1, b: 1, c: 0 },
      b: { a: 1, b: 0, c: 1 },
      c: { a: 0, b: 1, c: 0 },
    });
  });

  test("weighted edges", () => {
    expect(
      makeUndirected({
        a: { a: 0.5, b: -1, c: 0 },
        b: { a: 0, b: 0, c: -1 },
        c: { a: 0, b: 0, c: 0 },
      }),
    ).toEqual({
      a: { a: 0.5, b: -1, c: 0 },
      b: { a: -1, b: 0, c: -1 },
      c: { a: 0, b: -1, c: 0 },
    });
  });

  test("custom merge function", () => {
    expect(
      makeUndirected(
        {
          a: { a: 2, b: 3, c: 0 },
          b: { a: 2, b: 0, c: 1 },
          c: { a: 0, b: 0, c: 0 },
        },
        (a, b) => a * b,
      ),
    ).toEqual({
      a: { a: 2, b: 6, c: 0 },
      b: { a: 6, b: 0, c: 1 },
      c: { a: 0, b: 1, c: 0 },
    });
  });
});
