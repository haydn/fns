import { describe, expect, test } from "bun:test";
import { isCyclic } from "../src";

describe("isCyclic", () => {
  test("directed graph", () => {
    expect(isCyclic({})).toBe(false);

    expect(
      isCyclic({
        a: { a: 0 },
      }),
    ).toBe(false);

    expect(
      isCyclic({
        a: { a: 0, b: 0 },
        b: { a: 0, b: 0 },
      }),
    ).toBe(false);

    expect(
      isCyclic({
        a: { a: 0, b: 1 },
        b: { a: 0, b: 0 },
      }),
    ).toBe(false);

    expect(
      isCyclic({
        a: { a: 0, b: 1, c: 1 },
        b: { a: 0, b: 0, c: 0 },
        c: { a: 0, b: 0, c: 0 },
      }),
    ).toBe(false);

    expect(
      isCyclic({
        a: { a: 1 },
      }),
    ).toBe(true);

    expect(
      isCyclic({
        a: { a: 0, b: 1 },
        b: { a: 1, b: 0 },
      }),
    ).toBe(true);

    expect(
      isCyclic({
        a: { a: 0, b: 1, c: 0 },
        b: { a: 0, b: 0, c: 1 },
        c: { a: 1, b: 0, c: 0 },
      }),
    ).toBe(true);

    expect(
      isCyclic({
        a: { a: 1, b: 0 },
        b: { a: 0, b: 1 },
      }),
    ).toBe(true);
  });

  test("undirected graph", () => {
    expect(isCyclic({}, { undirected: true })).toBe(false);

    expect(
      isCyclic(
        {
          a: { a: 0, b: 1 },
          b: { a: 1, b: 0 },
        },
        { undirected: true },
      ),
    ).toBe(false);

    expect(
      isCyclic(
        {
          a: { a: 0, b: 1, c: 0 },
          b: { a: 1, b: 0, c: 1 },
          c: { a: 0, b: 1, c: 0 },
        },
        { undirected: true },
      ),
    ).toBe(false);

    expect(
      isCyclic(
        {
          a: { a: 0, b: 1, c: 1 },
          b: { a: 1, b: 0, c: 1 },
          c: { a: 1, b: 1, c: 0 },
        },
        { undirected: true },
      ),
    ).toBe(true);

    expect(() => {
      isCyclic(
        {
          a: { a: 0, b: 1 },
          b: { a: 0, b: 0 },
        },
        { undirected: true },
      );
    }).toThrowError();
  });
});
