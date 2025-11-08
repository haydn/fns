import { describe, expect, test } from "bun:test";
import { indegree } from "../src";

describe("indegree", () => {
  test("unweighted", () => {
    expect(
      indegree(
        {
          a: { a: 0, b: 1, c: 0 },
          b: { a: 2, b: 0, c: 0 },
          c: { a: 0.5, b: 0, c: 0 },
        },
        "a",
      ),
    ).toEqual(2);
  });

  test("weighted", () => {
    expect(
      indegree(
        {
          a: { a: 0, b: 1, c: 0 },
          b: { a: 2, b: 0, c: 0 },
          c: { a: 0.5, b: 0, c: 0 },
        },
        "a",
        { weighted: true },
      ),
    ).toEqual(2.5);
  });
});
