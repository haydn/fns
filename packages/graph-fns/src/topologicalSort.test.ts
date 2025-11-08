import { describe, expect, test } from "bun:test";
import { topologicalSort } from "../src";

describe("topologicalSort", () => {
  test("base case", () => {
    expect(
      topologicalSort({
        a: { a: 0 },
      }),
    ).toEqual(["a"]);
  });

  test('no edges { "A", "B", "C" }', () => {
    expect(
      topologicalSort({
        a: { a: 0, b: 0, c: 0 },
        b: { a: 0, b: 0, c: 0 },
        c: { a: 0, b: 0, c: 0 },
      }),
    ).toEqual(["a", "b", "c"]);
  });

  test('basic { "C" -> "A", "A" -> "B" }', () => {
    expect(
      topologicalSort({
        a: { a: 0, b: 1, c: 0 },
        b: { a: 0, b: 0, c: 0 },
        c: { a: 1, b: 0, c: 0 },
      }),
    ).toEqual(["c", "a", "b"]);
  });

  test('ambiguous order { "B" -> "A", "C" -> "A" }', () => {
    expect(
      topologicalSort({
        a: { a: 0, b: 0, c: 0 },
        b: { a: 1, b: 0, c: 0 },
        c: { a: 1, b: 0, c: 0 },
      }),
    ).toEqual(["b", "c", "a"]);
  });

  test("weighted edges", () => {
    expect(
      topologicalSort({
        a: { a: 0, b: 0 },
        b: { a: 10.5, b: 0 },
      }),
    ).toEqual(["b", "a"]);
  });

  test("cycles should throw an error", () => {
    expect(() => {
      topologicalSort({
        a: { a: 0, b: 1 },
        b: { a: 1, b: 0 },
      });
    }).toThrowError();
  });
});
