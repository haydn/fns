import { describe, expect, test } from "bun:test";
import { fromD3 } from "../src";

describe("fromD3", () => {
  test("basic", () => {
    expect(
      fromD3({
        nodes: [{ id: "a" }, { id: "b" }, { id: "c" }],
        links: [
          { source: "a", target: "b" },
          { source: "a", target: "c" },
          { source: "a", target: "a" },
        ],
      }),
    ).toEqual({
      a: { a: 1, b: 1, c: 1 },
      b: { a: 0, b: 0, c: 0 },
      c: { a: 0, b: 0, c: 0 },
    });
  });

  test("undirected", () => {
    expect(
      fromD3(
        {
          nodes: [{ id: "a" }, { id: "b" }, { id: "c" }],
          links: [
            { source: "a", target: "a" },
            { source: "a", target: "b" },
            { source: "a", target: "c" },
          ],
        },
        { undirected: true },
      ),
    ).toEqual({
      a: { a: 1, b: 1, c: 1 },
      b: { a: 1, b: 0, c: 0 },
      c: { a: 1, b: 0, c: 0 },
    });
  });
});
