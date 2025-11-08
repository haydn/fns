import { describe, expect, test } from "bun:test";
import { descendants } from "../src";

describe("descendants", () => {
  test('simple line { "A" -> "B", "B" -> "C" }', () => {
    expect(
      descendants(
        {
          a: { a: 0, b: 1, c: 0 },
          b: { a: 0, b: 0, c: 1 },
          c: { a: 0, b: 0, c: 0 },
        },
        "a",
      ),
    ).toEqual(new Set(["b", "c"]));
  });

  test('multiple paths { "A" -> "B", "B" -> "C", "B" -> "D", "C" -> "D" }', () => {
    expect(
      descendants(
        {
          a: { a: 0, b: 1, c: 0, d: 0 },
          b: { a: 0, b: 0, c: 1, d: 1 },
          c: { a: 0, b: 0, c: 0, d: 1 },
          d: { a: 0, b: 0, c: 0, d: 0 },
        },
        "a",
      ),
    ).toEqual(new Set(["b", "c", "d"]));
  });

  test("graphs with cycles should throw an error", () => {
    expect(() => {
      descendants(
        {
          a: { a: 0, b: 1 },
          b: { a: 1, b: 0 },
        },
        "a",
      );
    }).toThrowError();
  });
});
