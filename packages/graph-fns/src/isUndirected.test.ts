import { describe, expect, test } from "bun:test";
import { isUndirected } from "../src";

describe("isUndirected", () => {
  test("base case", () => {
    expect(isUndirected({})).toBe(true);
  });

  test("single vertex", () => {
    expect(isUndirected({ a: { a: 1 } })).toBe(true);
  });

  test("undirected", () => {
    expect(
      isUndirected({
        a: { a: 1, b: 1 },
        b: { a: 0, b: 0 },
      }),
    ).toBe(false);
  });

  test("directed", () => {
    expect(
      isUndirected({
        a: { a: 0, b: 1 },
        b: { a: 1, b: 0 },
      }),
    ).toBe(true);
  });
});
