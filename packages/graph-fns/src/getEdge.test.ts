import { describe, expect, test } from "bun:test";
import { getEdge } from "../src";

describe("getEdge", () => {
  test("basic", () => {
    expect(
      getEdge(
        {
          a: { a: 0, b: 1.5 },
          b: { a: 0, b: 0 },
        },
        ["a", "b"],
      ),
    ).toEqual(1.5);
  });
});
