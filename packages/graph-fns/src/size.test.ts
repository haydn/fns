import { describe, expect, test } from "bun:test";
import { size } from "../src";

describe("size", () => {
  test("base case", () => {
    expect(size({})).toBe(0);
  });

  test("basic", () => {
    expect(
      size({
        a: { a: 0, b: 1 },
        b: { a: 0, b: 0 },
      }),
    ).toBe(1);
  });

  test("loops", () => {
    expect(
      size({
        a: { a: 1 },
      }),
    ).toBe(1);
  });

  test("weighted", () => {
    expect(
      size({
        a: { a: 1.8, b: 0, c: 0 },
        b: { a: 0, b: 0, c: 0.4 },
        c: { a: 1, b: 0, c: 0 },
      }),
    ).toBe(3);
  });

  test("multiple", () => {
    expect(
      size({
        a: { a: 3, b: 0, c: 0 },
        b: { a: 0, b: 0, c: 2 },
        c: { a: 1, b: 0, c: 0 },
      }),
    ).toBe(3);
  });

  test("undirected", () => {
    expect(
      size(
        {
          a: { a: 0, b: 1, c: 0 },
          b: { a: 1, b: 0, c: 1 },
          c: { a: 0, b: 1, c: 0 },
        },
        { undirected: true },
      ),
    ).toBe(2);
  });

  test("using the undirected option on a directed graph should throw an error", () => {
    expect(() => {
      size(
        {
          a: { a: 0, b: 1 },
          b: { a: 0, b: 0 },
        },
        { undirected: true },
      );
    }).toThrowError();
  });
});
