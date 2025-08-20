import { describe, expect, test } from "bun:test";
import {
  absVec2,
  addVec2,
  clampVec2,
  crossVec2,
  divideVec2,
  dotVec2,
  floorVec2,
  isEqualVec2,
  lengthVec2,
  maxVec2,
  minVec2,
  modVec2,
  multiplyVec2,
  normalizeVec2,
  subtractVec2,
  vec2,
} from "./index";

describe("absVec2", () => {
  test("base case", () => {
    expect(absVec2([0, 0])).toEqual([0, 0]);
  });
  test("positive", () => {
    expect(absVec2([21, 431.3])).toEqual([21, 431.3]);
  });
  test("negative", () => {
    expect(absVec2([-33.2, -24])).toEqual([33.2, 24]);
  });
  test("mixed", () => {
    expect(absVec2([23.41, -624])).toEqual([23.41, 624]);
  });
});

describe("addVec2", () => {
  test("base case", () => {
    expect(addVec2([0, 0], [0, 0])).toEqual([0, 0]);
  });
  test("positive and positive", () => {
    expect(addVec2([1, 2], [3, 4])).toEqual([4, 6]);
  });
  test("positive and negative", () => {
    expect(addVec2([5, 6], [-2, -3])).toEqual([3, 3]);
  });
  test("negative and negative", () => {
    expect(addVec2([-5, -6], [-2, -3])).toEqual([-7, -9]);
  });
  test("fractional", () => {
    expect(addVec2([0.1, 0.8], [-0.2, 100.54])).toEqual([-0.1, 101.34]);
  });
});

describe("clampVec2", () => {
  test("base case", () => {
    expect(clampVec2([0, 0], [0, 0], [0, 0])).toEqual([0, 0]);
  });
  test("below min", () => {
    expect(clampVec2([0, 0], [1, 2], [2, 3])).toEqual([1, 2]);
  });
  test("above max", () => {
    expect(clampVec2([4, 4], [1, 2], [2, 3])).toEqual([2, 3]);
  });
  test("mixed", () => {
    expect(clampVec2([0, 4], [1, 2], [2, 3])).toEqual([1, 3]);
  });
});

describe("crossVec2", () => {
  test("base case", () => {
    expect(crossVec2([0, 0], [0, 0])).toEqual(0);
  });
  test("simple", () => {
    expect(crossVec2([1, 2], [3, 4])).toEqual(-2);
  });
});

describe("dotVec2", () => {
  test("base case", () => {
    expect(dotVec2([0, 0], [0, 0])).toEqual(0);
  });
  test("simple", () => {
    expect(dotVec2([2, 3], [4, 5])).toEqual(23);
  });
});

describe("divideVec2", () => {
  test("base case", () => {
    expect(divideVec2([0, 0], [1, 1])).toEqual([0, 0]);
  });
  test("simple", () => {
    expect(divideVec2([20, 10], [10, 10])).toEqual([2, 1]);
  });
  test("zero", () => {
    expect(divideVec2([20, 10], [0, 0])).toEqual([Infinity, Infinity]);
  });
});

describe("isEqualVec2", () => {
  test("base case", () => {
    expect(isEqualVec2([0, 0], [0, 0])).toEqual(true);
  });
  test("equal", () => {
    expect(isEqualVec2([2, 3], [2, 3])).toEqual(true);
  });
  test("not equal", () => {
    expect(isEqualVec2([2, 3], [2, 4])).toEqual(false);
  });
});

describe("floorVec2", () => {
  test("base case", () => {
    expect(floorVec2([0, 0])).toEqual([0, 0]);
  });
  test("positive", () => {
    expect(floorVec2([5.6, 84.4])).toEqual([5, 84]);
  });
  test("negative", () => {
    expect(floorVec2([-5.6, -84.4])).toEqual([-6, -85]);
  });
});

describe("lengthVec2", () => {
  test("base case", () => {
    expect(lengthVec2([0, 0])).toEqual(0);
  });
  test("positive", () => {
    expect(lengthVec2([3, 4])).toEqual(5);
  });
  test("negative", () => {
    expect(lengthVec2([-3, -4])).toEqual(5);
  });
});

describe("maxVec2", () => {
  test("base case", () => {
    expect(maxVec2([0, 0])).toEqual([0, 0]);
  });
  test("positive", () => {
    expect(maxVec2([3, 4], [2, 5], [1, 2])).toEqual([3, 5]);
  });
  test("negative", () => {
    expect(maxVec2([-3, -4], [-2, -5], [-20, -7])).toEqual([-2, -4]);
  });
});

describe("minVec2", () => {
  test("base case", () => {
    expect(minVec2([0, 0])).toEqual([0, 0]);
  });
  test("positive", () => {
    expect(minVec2([3, 4], [2, 5], [1, 2])).toEqual([1, 2]);
  });
  test("negative", () => {
    expect(minVec2([-3, -4], [-2, -5], [-20, -7])).toEqual([-20, -7]);
  });
});

describe("modVec2", () => {
  test("base case", () => {
    expect(modVec2([0, 0], [1, 1])).toEqual([0, 0]);
  });
  test("zero", () => {
    expect(modVec2([0, 0], [0, 0])).toEqual([NaN, NaN]);
  });
  test("simple", () => {
    expect(modVec2([5, 13], [3, 7])).toEqual([2, 6]);
  });
});

describe("multiplyVec2", () => {
  test("base case", () => {
    expect(multiplyVec2([0, 0], [0, 0])).toEqual([0, 0]);
  });
  test("simple", () => {
    expect(multiplyVec2([2, 3], [4, 5])).toEqual([8, 15]);
  });
});

describe("normalizeVec2", () => {
  test("base case", () => {
    expect(normalizeVec2([0, 0])).toEqual([0, 0]);
  });
  test("already normalized", () => {
    expect(normalizeVec2([1, 0])).toEqual([1, 0]);
  });
  test("positive", () => {
    expect(normalizeVec2([3, 4])).toEqual([0.6, 0.8]);
  });
  test("negative", () => {
    expect(normalizeVec2([-3, -4])).toEqual([-0.6, -0.8]);
  });
  test("45 degrees", () => {
    expect(normalizeVec2([1, 1])).toEqual([0.7071067811865475, 0.7071067811865475]);
  });
});

describe("subtractVec2", () => {
  test("base case", () => {
    expect(subtractVec2([0, 0], [0, 0])).toEqual([0, 0]);
  });
  test("zero", () => {
    expect(subtractVec2([1, 1], [0, 0])).toEqual([1, 1]);
  });
  test("negative and positive", () => {
    expect(subtractVec2([-1, -2], [1, 1])).toEqual([-2, -3]);
  });
  test("mixed", () => {
    expect(subtractVec2([-0.1, 848.5], [0.4, -44.2])).toEqual([-0.5, 892.7]);
  });
});

describe("vec2", () => {
  test("base case", () => {
    expect(vec2(0)).toEqual([0, 0]);
  });
  test("single argument", () => {
    expect(vec2(45.6)).toEqual([45.6, 45.6]);
  });
  test("two arguments", () => {
    expect(vec2(4, 3)).toEqual([4, 3]);
  });
});
