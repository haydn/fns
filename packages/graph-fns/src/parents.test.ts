import { describe, expect, test } from "bun:test";
import { parents } from "../src";

describe("parents", () => {
  test("basic", () => {
    expect(
      parents(
        {
          a: { a: 0, b: 0, c: 1 },
          b: { a: 0, b: 0, c: 0.5 },
          c: { a: 0, b: 0, c: 0 },
        },
        "c",
      ),
    ).toEqual(new Set(["a", "b"]));
  });

  test("loops should cause the vertex to be listed as a parent of itself", () => {
    expect(
      parents(
        {
          a: { a: 1 },
        },
        "a",
      ),
    ).toEqual(new Set(["a"]));
  });
});
