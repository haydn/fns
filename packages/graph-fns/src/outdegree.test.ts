import { describe, expect, test } from "bun:test";
import { outdegree } from "../src";

describe("outdegree", () => {
  test("unweighted", () => {
    expect(
      outdegree(
        {
          a: { a: 0, b: 2, c: 0.5 },
          b: { a: 1, b: 0, c: 0 },
          c: { a: 0, b: 0, c: 0 },
        },
        "a",
      ),
    ).toBe(2);
  });

  test("weighted", () => {
    expect(
      outdegree(
        {
          a: { a: 0, b: 2, c: 0.5 },
          b: { a: 1, b: 0, c: 0 },
          c: { a: 0, b: 0, c: 0 },
        },
        "a",
        { weighted: true },
      ),
    ).toBe(2.5);
  });
});
