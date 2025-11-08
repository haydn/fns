import { describe, expect, test } from "bun:test";
import { removeEdge } from "../src";

describe("removeEdge", () => {
  test("basic", () => {
    expect(
      removeEdge(
        {
          a: { a: 0, b: 2 },
          b: { a: 0, b: 0 },
        },
        ["a", "b"],
      ),
    ).toEqual({
      a: { a: 0, b: 0 },
      b: { a: 0, b: 0 },
    });
  });

  test("weighted edge", () => {
    expect(
      removeEdge(
        {
          a: { a: 0, b: 1.5, c: 0 },
          b: { a: 0, b: 0, c: 0.5 },
          c: { a: 2, b: 0, c: 0 },
        },
        ["a", "b"],
      ),
    ).toEqual({
      a: { a: 0, b: 0, c: 0 },
      b: { a: 0, b: 0, c: 0.5 },
      c: { a: 2, b: 0, c: 0 },
    });
  });

  test("undirected", () => {
    expect(
      removeEdge(
        {
          a: { a: 0, b: 1 },
          b: { a: 1, b: 0 },
        },
        ["a", "b"],
        { undirected: true },
      ),
    ).toEqual({
      a: { a: 0, b: 0 },
      b: { a: 0, b: 0 },
    });
  });
});
