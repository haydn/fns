import { describe, expect, test } from "bun:test";
import { degree } from "../src";

describe("degree", () => {
  test("base case", () => {
    expect(degree({ a: { a: 0 } }, "a")).toBe(0);
  });

  test("the unweighted degree should be the count of edges", () => {
    expect(
      degree(
        {
          a: { a: 0, b: 1, c: 0 },
          b: { a: 2, b: 0, c: 0 },
          c: { a: -0.5, b: 0, c: 0 },
        },
        "a",
      ),
    ).toBe(3);
  });

  test("the weighted degree should be the sum of edge weights", () => {
    expect(
      degree(
        {
          a: { a: 0, b: 1, c: 0 },
          b: { a: 2, b: 0, c: 0 },
          c: { a: -0.5, b: 0, c: 0 },
        },
        "a",
        { weighted: true },
      ),
    ).toBe(2.5);
  });

  test("loops should count twice towards the degree", () => {
    expect(
      degree(
        {
          a: { a: 1.5 },
        },
        "a",
      ),
    ).toBe(2);
  });

  test("loops should count twice towards the weighted degree", () => {
    expect(
      degree(
        {
          a: { a: 1.5 },
        },
        "a",
        { weighted: true },
      ),
    ).toBe(3);
  });

  test("reciprocal edges should only be counted once in undirected mode", () => {
    expect(
      degree(
        {
          a: { a: 0, b: 1, c: 1 },
          b: { a: 1, b: 0, c: 0 },
          c: { a: 1, b: 0, c: 0 },
        },
        "a",
        { undirected: true },
      ),
    ).toBe(2);
  });

  test("using the undirected option on a directed graph should throw an error", () => {
    expect(() => {
      degree(
        {
          a: { a: 0, b: 1 },
          b: { a: 0, b: 0 },
        },
        "a",
        { undirected: true },
      );
    }).toThrowError();
  });
});
