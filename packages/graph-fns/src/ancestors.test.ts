import { describe, expect, test } from "bun:test";
import { ancestors } from "../src";

describe("ancestors", () => {
  test('simple line { "A" -> "B", "B" -> "C" }', () => {
    expect(
      ancestors(
        {
          a: { a: 0, b: 1, c: 0 },
          b: { a: 0, b: 0, c: 1 },
          c: { a: 0, b: 0, c: 0 },
        },
        "c",
      ),
    ).toEqual(new Set(["a", "b"]));
  });

  test('multiple paths { "A" -> "B", "B" -> "C", "B" -> "D", "C" -> "D" }', () => {
    expect(
      ancestors(
        {
          a: { a: 0, b: 1, c: 0, d: 0 },
          b: { a: 0, b: 0, c: 1, d: 1 },
          c: { a: 0, b: 0, c: 0, d: 1 },
          d: { a: 0, b: 0, c: 0, d: 0 },
        },
        "d",
      ),
    ).toEqual(new Set(["a", "b", "c"]));
  });

  test("graphs with cycles should throw an error", () => {
    expect(() => {
      ancestors(
        {
          a: { a: 0, b: 1 },
          b: { a: 1, b: 0 },
        },
        "b",
      );
    }).toThrowError();
  });
});
