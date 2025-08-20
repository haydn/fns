import { describe, expect, test } from "bun:test";
import {
  anchorToPoint,
  angleBetween,
  brandCircle,
  brandRectangle,
  createCircle,
  createRectangle,
  distance,
  intersectRectangle,
  isWithinCircle,
  isWithinPolygon,
  isWithinRectangle,
  isWithinSegment,
  normalizeCircle,
  normalizeRectangle,
  polygonFromCircle,
  polygonFromRectangle,
  print,
  sizeOfCircle,
  sizeOfRectangle,
  translate,
} from "./index";

describe("anchorToPoint", () => {
  test("base case", () => {
    expect(anchorToPoint([0, 0])).toEqual([0, 0]);
  });
  test("arbitrary point should be unchanged", () => {
    expect(anchorToPoint([0.8, 0.6])).toEqual([0.8, 0.6]);
  });
  test("normalized", () => {
    expect(anchorToPoint([100, 0])).toEqual([1, 0]);
    expect(anchorToPoint([-100, 0])).toEqual([0, 0]);
  });
  test("shorthand", () => {
    expect(anchorToPoint("tl")).toEqual([0, 0]);
    expect(anchorToPoint("tc")).toEqual([0.5, 0]);
    expect(anchorToPoint("tr")).toEqual([1, 0]);
    expect(anchorToPoint("cl")).toEqual([0, 0.5]);
    expect(anchorToPoint("cc")).toEqual([0.5, 0.5]);
    expect(anchorToPoint("cr")).toEqual([1, 0.5]);
    expect(anchorToPoint("bl")).toEqual([0, 1]);
    expect(anchorToPoint("bc")).toEqual([0.5, 1]);
    expect(anchorToPoint("br")).toEqual([1, 1]);
  });
});

describe("angleBetween", () => {
  test("north", () => {
    expect(angleBetween([0, 0], [0, -1])).toBeCloseTo(-Math.PI / 2);
  });
  test("east", () => {
    expect(angleBetween([0, 0], [1, 0])).toBeCloseTo(0);
  });
  test("south", () => {
    expect(angleBetween([0, 0], [0, 1])).toBeCloseTo(Math.PI / 2);
  });
  test("west", () => {
    expect(angleBetween([0, 0], [-1, 0])).toBeCloseTo(Math.PI);
  });
});

describe("brandCircle", () => {
  test("base case", () => {
    const circle = brandCircle([
      [0, 0],
      [1, 0],
    ]);
    expect(circle).toBeArray();
    expect(circle).toBeArrayOfSize(2);
    expect(circle[0]).toEqual([0, 0]);
    expect(circle[1]).toEqual([1, 0]);
  });
});

describe("brandRectangle", () => {
  test("base case", () => {
    const rectangle = brandRectangle([
      [0, 0],
      [1, 0],
    ]);
    expect(rectangle).toBeArray();
    expect(rectangle).toBeArrayOfSize(2);
    expect(rectangle[0]).toEqual([0, 0]);
    expect(rectangle[1]).toEqual([1, 0]);
  });
});

describe("createCircle", () => {
  test("base case", () => {
    expect(createCircle([0, 0], 0)).toEqual(
      brandCircle([
        [0, 0],
        [0, 0],
      ]),
    );
  });
  test("positive radius", () => {
    expect(createCircle([0, 0], 5)).toEqual(
      brandCircle([
        [0, 0],
        [5, 0],
      ]),
    );
  });
  test("arbitrary position", () => {
    expect(createCircle([55.5, 20.5], 4)).toEqual(
      brandCircle([
        [55.5, 20.5],
        [59.5, 20.5],
      ]),
    );
  });
  test("negative radius", () => {
    expect(createCircle([0, 0], -5)).toEqual(
      brandCircle([
        [0, 0],
        [5, 0],
      ]),
    );
  });
  test("tl anchor", () => {
    expect(createCircle([0, 0], 2, "tl")).toEqual(
      brandCircle([
        [2, 2],
        [4, 2],
      ]),
    );
  });
  test("br anchor", () => {
    expect(createCircle([0, 0], 2, "br")).toEqual(
      brandCircle([
        [-2, -2],
        [0, -2],
      ]),
    );
  });
});

describe("createRectangle", () => {
  test("base case", () => {
    expect(createRectangle([0, 0], 4, 2)).toEqual(
      brandRectangle([
        [0, 0],
        [4, 2],
      ]),
    );
  });
  test("arbitrary position", () => {
    expect(createRectangle([55.5, 20.5], 4, 2)).toEqual(
      brandRectangle([
        [55.5, 20.5],
        [59.5, 22.5],
      ]),
    );
  });
  test("negative dimensions", () => {
    expect(createRectangle([0, 0], -4, -2)).toEqual(
      brandRectangle([
        [0, 0],
        [4, 2],
      ]),
    );
    expect(createRectangle([4, 2], -4, -2)).toEqual(
      brandRectangle([
        [4, 2],
        [8, 4],
      ]),
    );
  });
  test("cc anchor", () => {
    expect(createRectangle([0, 0], 4, 2, "cc")).toEqual(
      brandRectangle([
        [-2, -1],
        [2, 1],
      ]),
    );
  });
  test("br anchor", () => {
    expect(createRectangle([0, 0], 4, 2, "br")).toEqual(
      brandRectangle([
        [-4, -2],
        [0, 0],
      ]),
    );
  });
  test("br anchor with negative dimensions", () => {
    expect(createRectangle([0, 0], -4, -2, "br")).toEqual(
      brandRectangle([
        [-4, -2],
        [0, 0],
      ]),
    );
  });
});

describe("distance", () => {
  test("base case", () => {
    expect(distance([0, 0], [0, 0])).toEqual(0);
  });
  test("positive", () => {
    expect(distance([0, 0], [3, 4])).toEqual(5);
    expect(distance([0, 0], [0.3, 0.4])).toEqual(0.5);
  });
  test("negative", () => {
    expect(distance([0, 0], [-3, -4])).toEqual(5);
    expect(distance([0, 0], [-0.3, -0.4])).toEqual(0.5);
  });
});

describe("intersectRectangle", () => {
  test("base case", () => {
    expect(
      intersectRectangle(createRectangle([0, 0], 0, 0), createRectangle([0, 0], 0, 0)),
    ).toEqual(createRectangle([0, 0], 0, 0));
  });
  test("overlapping", () => {
    expect(
      intersectRectangle(createRectangle([0, 0], 2, 2), createRectangle([1, 1], 2, 2)),
    ).toEqual(createRectangle([1, 1], 1, 1));
  });
  test("touching", () => {
    expect(
      intersectRectangle(createRectangle([0, 0], 1, 1), createRectangle([1, 1], 1, 1)),
    ).toEqual(createRectangle([1, 1], 0, 0));
  });
  test("no overlap", () => {
    expect(
      intersectRectangle(createRectangle([0, 0], 1, 1), createRectangle([2, 2], 1, 1)),
    ).toEqual(null);
  });
});

describe("isWithinCircle", () => {
  test("base case", () => {
    expect(isWithinCircle([0, 0], createCircle([0, 0], 0))).toEqual(true);
  });
  test("inside", () => {
    expect(isWithinCircle([10, 5], createCircle([10, 5], 1))).toEqual(true);
  });
  test("boundary", () => {
    expect(isWithinCircle([9, 5], createCircle([10, 5], 1))).toEqual(true);
  });
  test("outside", () => {
    expect(isWithinCircle([8, 5], createCircle([10, 5], 1))).toEqual(false);
  });
});

describe("isWithinPolygon", () => {
  test("base case", () => {
    expect(isWithinPolygon([0, 0], [])).toEqual(false);
  });
  test("one-point polygon", () => {
    expect(isWithinPolygon([0, 0], [[0, 0]])).toEqual(true);
    expect(isWithinPolygon([1, 1], [[0, 0]])).toEqual(false);
  });
  test("two-point polygon", () => {
    expect(
      isWithinPolygon(
        [0, 0],
        [
          [0, 0],
          [1, 0],
        ],
      ),
    ).toEqual(true);
    expect(
      isWithinPolygon(
        [1, 1],
        [
          [0, 0],
          [1, 0],
        ],
      ),
    ).toEqual(false);
  });
  test("inside", () => {
    expect(
      isWithinPolygon(
        [0.25, 5],
        [
          [0, 0],
          [10, 0],
          [0, 10],
        ],
      ),
    ).toEqual(true);
  });
  test("outside", () => {
    expect(
      isWithinPolygon(
        [-5, 5],
        [
          [0, 0],
          [10, 0],
          [0, 10],
        ],
      ),
    ).toEqual(false);
  });
  test("concave", () => {
    expect(
      isWithinPolygon(
        [5, 5],
        [
          [0, 0],
          [10, 0],
          [0, 5],
          [10, 10],
          [0, 10],
        ],
      ),
    ).toEqual(false);
  });
});

describe("isWithinRectangle", () => {
  test("base case", () => {
    expect(isWithinRectangle([0, 0], createRectangle([0, 0], 0, 0))).toEqual(true);
  });
  test("inside", () => {
    expect(isWithinRectangle([2, 1], createRectangle([0, 0], 4, 2))).toEqual(true);
    expect(isWithinRectangle([0.5, 0.5], createRectangle([0, 0], 1, 1))).toEqual(true);
  });
  test("outside", () => {
    expect(isWithinRectangle([-1, -1], createRectangle([0, 0], 0, 0))).toEqual(false);
    expect(isWithinRectangle([1, 1], createRectangle([0, 0], 0, 0))).toEqual(false);
  });
});

describe("isWithinSegment", () => {
  test("base case", () => {
    expect(
      isWithinSegment(
        [0, 0],
        [
          [0, 0],
          [0, 0],
        ],
      ),
    ).toEqual(true);
  });
  test("base case", () => {
    expect(
      isWithinSegment(
        [1, 1],
        [
          [0, 0],
          [0, 0],
        ],
      ),
    ).toEqual(false);
  });
  test("base case", () => {
    expect(
      isWithinSegment(
        [1, 1],
        [
          [1, 1],
          [1, 1],
        ],
      ),
    ).toEqual(true);
  });
  test("inside", () => {
    expect(
      isWithinSegment(
        [0.5, 0],
        [
          [0, 0],
          [1, 0],
        ],
      ),
    ).toEqual(true);
  });
  test("outside", () => {
    expect(
      isWithinSegment(
        [-1, 0],
        [
          [0, 0],
          [1, 0],
        ],
      ),
    ).toEqual(false);
  });
});

describe("polygonFromCircle", () => {
  test("base case", () => {
    expect(
      polygonFromCircle(
        brandCircle([
          [0, 0],
          [0, 0],
        ]),
        0,
      ),
    ).toEqual([]);
  });
  test("simple circle", () => {
    const [a, b, c, d] = polygonFromCircle(
      brandCircle([
        [0, 0],
        [1, 0],
      ]),
      4,
    );
    expect(a?.at(0)).toBeCloseTo(1);
    expect(a?.at(1)).toBeCloseTo(0);
    expect(b?.at(0)).toBeCloseTo(0);
    expect(b?.at(1)).toBeCloseTo(-1);
    expect(c?.at(0)).toBeCloseTo(-1);
    expect(c?.at(1)).toBeCloseTo(0);
    expect(d?.at(0)).toBeCloseTo(0);
    expect(d?.at(1)).toBeCloseTo(1);
  });
});

describe("polygonFromRectangle", () => {
  test("base case", () => {
    expect(
      polygonFromRectangle(
        brandRectangle([
          [0, 0],
          [0, 0],
        ]),
      ),
    ).toEqual([
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ]);
  });
  test("normalized rectangle", () => {
    expect(
      polygonFromRectangle(
        brandRectangle([
          [2, 3],
          [4, 5],
        ]),
      ),
    ).toEqual([
      [2, 3],
      [4, 3],
      [4, 5],
      [2, 5],
    ]);
  });
  test("non-normalized rectangle", () => {
    expect(
      polygonFromRectangle(
        brandRectangle([
          [4, 5],
          [2, 3],
        ]),
      ),
    ).toEqual([
      [2, 3],
      [4, 3],
      [4, 5],
      [2, 5],
    ]);
  });
  test("negatively positioned rectangle", () => {
    expect(
      polygonFromRectangle(
        brandRectangle([
          [-2, -3],
          [-4, -5],
        ]),
      ),
    ).toEqual([
      [-4, -5],
      [-2, -5],
      [-2, -3],
      [-4, -3],
    ]);
  });
});

describe("normalizeCircle", () => {
  test("base case", () => {
    expect(
      normalizeCircle(
        brandCircle([
          [0, 0],
          [0, 0],
        ]),
      ),
    ).toEqual(
      brandCircle([
        [0, 0],
        [0, 0],
      ]),
    );
  });
  test("normalized", () => {
    expect(
      normalizeCircle(
        brandCircle([
          [0, 0],
          [1, 0],
        ]),
      ),
    ).toEqual(
      brandCircle([
        [0, 0],
        [1, 0],
      ]),
    );
  });
  test("non-normalized", () => {
    expect(
      normalizeCircle(
        brandCircle([
          [1, 0],
          [0, 0],
        ]),
      ),
    ).toEqual(
      brandCircle([
        [1, 0],
        [2, 0],
      ]),
    );
  });
  test("negatively positioned", () => {
    expect(
      normalizeCircle(
        brandCircle([
          [-2, -3],
          [-4, -3],
        ]),
      ),
    ).toEqual(
      brandCircle([
        [-2, -3],
        [0, -3],
      ]),
    );
  });
});

describe("normalizeRectangle", () => {
  test("base case", () => {
    expect(
      normalizeRectangle(
        brandRectangle([
          [0, 0],
          [0, 0],
        ]),
      ),
    ).toEqual(
      brandRectangle([
        [0, 0],
        [0, 0],
      ]),
    );
  });
  test("normalized", () => {
    expect(
      normalizeRectangle(
        brandRectangle([
          [0, 0],
          [1, 1],
        ]),
      ),
    ).toEqual(
      brandRectangle([
        [0, 0],
        [1, 1],
      ]),
    );
  });
  test("non-normalized", () => {
    expect(
      normalizeRectangle(
        brandRectangle([
          [1, 1],
          [0, 0],
        ]),
      ),
    ).toEqual(
      brandRectangle([
        [0, 0],
        [1, 1],
      ]),
    );
  });
  test("negatively positioned", () => {
    expect(
      normalizeRectangle(
        brandRectangle([
          [-2, -3],
          [-4, -5],
        ]),
      ),
    ).toEqual(
      brandRectangle([
        [-4, -5],
        [-2, -3],
      ]),
    );
  });
});

describe("print", () => {
  test("number", () => {
    expect(print(0)).toEqual("0");
    expect(print(1)).toEqual("1");
    expect(print(-1)).toEqual("-1");
  });
  test("pi", () => {
    expect(print(Math.PI)).toEqual("π");
    expect(print(-Math.PI)).toEqual("-π");
    expect(print(Math.PI * 2)).toEqual("2π");
    expect(print(Math.PI * -4)).toEqual("-4π");
    expect(print(Math.PI * 6)).toEqual("6π");
  });
  test("point", () => {
    expect(print([0, 0])).toEqual("(0,0)");
  });
  test("segment", () => {
    expect(
      print([
        [1, 2],
        [3, 4],
      ]),
    ).toEqual("[ (1,2), (3,4) ]");
  });
  test("rectangle", () => {
    expect(print(createRectangle([1, 2], 3, 4))).toEqual(
      "Rectangle { position: (1,2), width: 3, height: 4 }",
    );
  });
  test("circle", () => {
    expect(print(createCircle([1, 2], 3))).toEqual("Circle { center: (1,2), radius: 3 }");
  });
});

describe("sizeOfCircle", () => {
  test("base case", () => {
    expect(
      sizeOfCircle(
        brandCircle([
          [0, 0],
          [0, 0],
        ]),
      ),
    ).toEqual(0);
  });
  test("positive", () => {
    expect(
      sizeOfCircle(
        brandCircle([
          [0, 0],
          [3, 4],
        ]),
      ),
    ).toEqual(5);
  });
  test("negative", () => {
    expect(
      sizeOfCircle(
        brandCircle([
          [0, 0],
          [-3, -4],
        ]),
      ),
    ).toEqual(5);
  });
  test("fractional", () => {
    expect(
      sizeOfCircle(
        brandCircle([
          [0, 0],
          [0.3, 0.4],
        ]),
      ),
    ).toEqual(0.5);
    expect(sizeOfCircle(createCircle([0, 0], 123.5))).toEqual(123.5);
  });
});

describe("sizeOfRectangle", () => {
  test("base case", () => {
    expect(
      sizeOfRectangle(
        brandRectangle([
          [0, 0],
          [0, 0],
        ]),
      ),
    ).toEqual([0, 0]);
  });
  test("positive dimensions", () => {
    expect(
      sizeOfRectangle(
        brandRectangle([
          [0, 0],
          [4, 2],
        ]),
      ),
    ).toEqual([4, 2]);
  });
  test("negative dimensions", () => {
    expect(
      sizeOfRectangle(
        brandRectangle([
          [0, 0],
          [-4, -2],
        ]),
      ),
    ).toEqual([4, 2]);
  });
  test("negative dimensions", () => {
    expect(
      sizeOfRectangle(
        brandRectangle([
          [-4, -2],
          [4, 2],
        ]),
      ),
    ).toEqual([8, 4]);
  });
});

describe("translate", () => {
  test("base case", () => {
    expect(translate([], [0, 0])).toEqual([]);
  });
  test("positive", () => {
    expect(translate([[0, 0]], [1, 2])).toEqual([[1, 2]]);
  });
  test("negative", () => {
    expect(translate([[0, 0]], [-1, -2])).toEqual([[-1, -2]]);
  });
  test("complex", () => {
    expect(translate([[10.25, -28.5]], [-0.25, 8])).toEqual([[10, -20.5]]);
  });
  test("circle", () => {
    expect(translate(createCircle([0, 0], 0), [1, 2])).toEqual(
      brandCircle([
        [1, 2],
        [1, 2],
      ]),
    );
  });
  test("rectangle", () => {
    expect(translate(createRectangle([0, 0], 0, 0), [1, 2])).toEqual(
      brandRectangle([
        [1, 2],
        [1, 2],
      ]),
    );
  });
});
