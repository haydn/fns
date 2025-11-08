import { describe, expect, test } from "bun:test";
import { vertices } from "../src";

describe("vertices", () => {
  test("basic", () => {
    expect(
      vertices({
        a: { a: 0, b: 0, c: 0 },
        b: { a: 0, b: 0, c: 0 },
        c: { a: 0, b: 0, c: 0 },
      }),
    ).toEqual(new Set(["a", "b", "c"]));
  });
});
