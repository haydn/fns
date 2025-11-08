import { describe, expect, test } from "bun:test";
import { removeVertex } from "../src";

describe("removeVertex", () => {
  test("basic", () => {
    expect(
      removeVertex(
        {
          a: { a: 0, b: 1, c: 0 },
          b: { a: 0, b: 0, c: 1 },
          c: { a: 1, b: 0, c: 0 },
        },
        "b",
      ),
    ).toEqual({
      a: { a: 0, c: 0 },
      c: { a: 1, c: 0 },
    });
  });
});
