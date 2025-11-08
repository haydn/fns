import { describe, expect, test } from "bun:test";
import { edges } from "../src";

describe("edges", () => {
  test("base case", () => {
    expect(edges({})).toEqual(new Set([]));
  });

  test("simple graph", () => {
    expect(
      edges({
        a: { a: 0, b: 1, c: 0 },
        b: { a: 0, b: 0, c: 1 },
        c: { a: 0, b: 0, c: 0 },
      }),
    ).toEqual(
      new Set([
        ["a", "b"],
        ["b", "c"],
      ]),
    );
  });

  test("weighted edges", () => {
    expect(
      edges({
        a: { a: 0, b: 2, c: 0 },
        b: { a: 0, b: 0, c: 1 },
        c: { a: 0.5, b: 0, c: 0 },
      }),
    ).toEqual(
      new Set([
        ["a", "b"],
        ["b", "c"],
        ["c", "a"],
      ]),
    );
  });

  test("undirected mode", () => {
    expect(
      edges(
        {
          a: { a: 1, b: 1, c: 0 },
          b: { a: 1, b: 0, c: 1 },
          c: { a: 0, b: 1, c: 0 },
        },
        { undirected: true },
      ),
    ).toEqual(
      new Set([
        ["a", "a"],
        ["a", "b"],
        ["b", "c"],
      ]),
    );
  });

  test("using the undirected option on a directed graph should throw an error", () => {
    expect(() => {
      edges(
        {
          a: { a: 0, b: 1 },
          b: { a: 0, b: 0 },
        },
        { undirected: true },
      );
    }).toThrowError();
  });
});
