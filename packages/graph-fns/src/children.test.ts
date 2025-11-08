import { describe, expect, test } from "bun:test";
import { children } from "../src";

describe("children", () => {
  test("basic", () => {
    expect(
      children(
        {
          a: { a: 0, b: 1, c: 1 },
          b: { a: 0, b: 0, c: 0 },
          c: { a: 0, b: 0, c: 0 },
        },
        "a",
      ),
    ).toEqual(new Set(["b", "c"]));
  });

  test("loops should cause the vertex to be listed as a child of itself", () => {
    expect(
      children(
        {
          a: { a: 1 },
        },
        "a",
      ),
    ).toEqual(new Set(["a"]));
  });
});
