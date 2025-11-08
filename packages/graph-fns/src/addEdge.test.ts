import { describe, expect, test } from "bun:test";
import { addEdge } from "../src";

describe("addEdge", () => {
  test("base case", () => {
    expect(
      addEdge(
        {
          a: { a: 0, b: 0 },
          b: { a: 0, b: 0 },
        },
        ["a", "b"],
      ),
    ).toEqual({
      a: { a: 0, b: 1 },
      b: { a: 0, b: 0 },
    });
  });

  test("adding an edge that already exists should be a no-op", () => {
    expect(
      addEdge(
        {
          a: { a: 0, b: 1.5 },
          b: { a: 0, b: 0 },
        },
        ["a", "b"],
      ),
    ).toEqual({
      a: { a: 0, b: 1.5 },
      b: { a: 0, b: 0 },
    });
  });

  test("add undirected edge", () => {
    expect(
      addEdge(
        {
          a: { a: 0, b: 0 },
          b: { a: 0, b: 0 },
        },
        ["a", "b"],
        { undirected: true },
      ),
    ).toEqual({
      a: { a: 0, b: 1 },
      b: { a: 1, b: 0 },
    });
  });
});
