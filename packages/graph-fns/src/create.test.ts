import { describe, expect, test } from "bun:test";
import { create } from "../src";

describe("create", () => {
  test("base case", () => {
    expect(create([])).toEqual({});
  });
  test("custom IDs are provided", () => {
    expect(create(["a", "b"])).toEqual({
      a: { a: 0, b: 0 },
      b: { a: 0, b: 0 },
    });
  });
});
