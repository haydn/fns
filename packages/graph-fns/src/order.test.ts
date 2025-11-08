import { describe, expect, test } from "bun:test";
import { order } from "../src";

describe("order", () => {
  test("base case", () => {
    expect(order({})).toBe(0);
  });

  test("single node", () => {
    expect(order({ a: { a: 0 } })).toBe(1);
  });

  test("two nodes", () => {
    expect(
      order({
        a: { a: 0, b: 0 },
        b: { a: 0, b: 0 },
      }),
    ).toBe(2);
  });
});
