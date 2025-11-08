import { describe, expect, test } from "bun:test";
import { vertexPairs } from "../src";

describe("vertexPairs", () => {
  test("basic", () => {
    expect(
      vertexPairs({
        a: { a: 0, b: 0, c: 0 },
        b: { a: 0, b: 0, c: 0 },
        c: { a: 0, b: 0, c: 0 },
      }),
    ).toEqual(
      new Set([
        ["a", "a"],
        ["a", "b"],
        ["a", "c"],
        ["b", "b"],
        ["b", "c"],
        ["c", "c"],
      ]),
    );
  });
});
