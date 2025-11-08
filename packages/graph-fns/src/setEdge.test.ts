import { describe, expect, test } from "bun:test";
import { setEdge } from "../src";

describe("setEdge", () => {
  test("set", () => {
    expect(
      setEdge(
        {
          a: { a: 0, b: 0 },
          b: { a: 0, b: 0 },
        },
        ["a", "b"],
        1,
      ),
    ).toEqual({
      a: { a: 0, b: 1 },
      b: { a: 0, b: 0 },
    });
  });

  test("unset", () => {
    expect(
      setEdge(
        {
          a: { a: 0, b: 1 },
          b: { a: 0, b: 0 },
        },
        ["a", "b"],
        0,
      ),
    ).toEqual({
      a: { a: 0, b: 0 },
      b: { a: 0, b: 0 },
    });
  });

  test("set weighted", () => {
    expect(
      setEdge(
        {
          a: { a: 0, b: 1 },
          b: { a: 0, b: 0 },
        },
        ["a", "b"],
        1.5,
      ),
    ).toEqual({
      a: { a: 0, b: 1.5 },
      b: { a: 0, b: 0 },
    });
  });

  test("undirected", () => {
    expect(
      setEdge(
        {
          a: { a: 0, b: 1 },
          b: { a: 0, b: 0 },
        },
        ["a", "b"],
        1.5,
        { undirected: true },
      ),
    ).toEqual({
      a: { a: 0, b: 1.5 },
      b: { a: 1.5, b: 0 },
    });
  });
});
