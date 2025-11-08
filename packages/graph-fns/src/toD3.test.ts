import { describe, expect, test } from "bun:test";
import { toD3 } from "../src";

describe("toD3", () => {
  test("basic", () => {
    expect(
      toD3({
        a: { a: 1, b: 2, c: 0.5 },
        b: { a: 0, b: 0, c: 0 },
        c: { a: 0, b: 0, c: 0 },
      }),
    ).toEqual({
      nodes: [{ id: "a" }, { id: "b" }, { id: "c" }],
      links: [
        { source: "a", target: "a" },
        { source: "a", target: "b" },
        { source: "a", target: "b" },
        { source: "a", target: "c" },
      ],
    });
  });

  test("undirected", () => {
    expect(
      toD3(
        {
          a: { a: 0, b: 1, c: 1 },
          b: { a: 1, b: 0, c: 0 },
          c: { a: 1, b: 0, c: 0 },
        },
        { undirected: true },
      ),
    ).toEqual({
      nodes: [{ id: "a" }, { id: "b" }, { id: "c" }],
      links: [
        { source: "a", target: "b" },
        { source: "a", target: "c" },
      ],
    });
  });

  test("using the undirected option on a directed graph should throw an error", () => {
    expect(() => {
      toD3(
        {
          a: { a: 0, b: 1 },
          b: { a: 0, b: 0 },
        },
        { undirected: true },
      );
    }).toThrowError();
  });
});
