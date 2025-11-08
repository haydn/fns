import { describe, expect, test } from "bun:test";
import { addVertex } from "../src";

describe("addVertex", () => {
  test("base case", () => {
    expect(addVertex({}, "a")).toEqual({
      a: { a: 0 },
    });
  });

  test("adding a vertex to an existing graph should create empty rows and columns", () => {
    expect(
      addVertex(
        {
          a: { a: 0 },
        },
        "b",
      ),
    ).toEqual({
      a: { a: 0, b: 0 },
      b: { a: 0, b: 0 },
    });
  });

  test("adding a vertex that already exists should be a no-op", () => {
    expect(
      addVertex(
        {
          a: { a: 0 },
        },
        "a",
      ),
    ).toEqual({
      a: { a: 0 },
    });
  });
});
