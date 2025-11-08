import { describe, expect, test } from "bun:test";
import { clone } from "../src";

describe("clone", () => {
  test("cloning should return a graph exactly equal to the original graph", () => {
    const original = {
      a: { a: 0, b: 1 },
      b: { a: 0, b: 0 },
    };

    expect(clone(original)).toEqual(original);
  });

  test("cloning should make a copy of the graph", () => {
    const original = {
      a: { a: 0, b: 1 },
      b: { a: 0, b: 0 },
    };

    expect(clone(original)).not.toBe(original);
    expect(clone(original).a).not.toBe(original.a);
    expect(clone(original).b).not.toBe(original.b);
  });
});
