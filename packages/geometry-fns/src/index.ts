import type { Vec2 } from "@haydn/linear-fns";
import {
  absVec2,
  addVec2,
  isEqualVec2,
  lengthVec2,
  maxVec2,
  multiplyVec2,
  normalizeVec2,
  subtractVec2,
  vec2,
} from "@haydn/linear-fns";

// types

/**
 * A value used to describe an anchor point within a bounding rectangle. This can be either a
 * two-dimensional vector between 0 and 1 (where 0 is the left or top edge and 1 is the right or
 * bottom edge), or a shorthand string representing a predefined anchor point (where "tl" is the
 * top-left corner, "cc" is the center, "br" is the bottom-right corner etc).
 *
 * @example
 * ```ts
 * const anchorA: Anchor = [0, 0.8];
 * const anchorB: Anchor = "bc";
 * const anchorC: Anchor = [1, 34];
 * ```
 */
export type Anchor = "tl" | "tc" | "tr" | "cl" | "cc" | "cr" | "bl" | "bc" | "br" | Vec2;

/**
 * A circle primitive represented by the point at the center of the circle and a point on the
 * circumference. If the point on the circumference is directly to the right of the center point,
 * then the circle is considered to be normalized.
 */
export type Circle = [Point, Point] & { [__primitive]: { type: "Circle" } };

/**
 * Any geometric construction represented by an array of points.
 */
export type Figure = Circle | Polygon | Rectangle | Segment;

/**
 * A point in 2D space where the first value is the x-coordinate and the second value is the
 * y-coordinate.
 *
 * @example
 * ```ts
 * const point: Point = [12.5, -40.2];
 * ```
 */
export type Point = Vec2;

/**
 * A polygon represented by an array of points.
 *
 * @example
 * ```ts
 * const polygon: Polygon = [[45.67, 12.34], [-23.5, 0], [33.52, -24.6]];
 * ```
 */
export type Polygon = Array<Point>;

/**
 * A geometric construction that is an abstract representation of a shape. Extra information beyond
 * the dimensions of the shape are stored in a hidden property (e.g. the number of edges for a
 * regular polygon).
 */
export type Primitive = { [__primitive]: { type: string } } & (Circle | Rectangle);

/**
 * A rectangle primitive represented by two points at opposite corners. If the first point
 * represents the top-left corner and the second point represents the bottom-right corner, then
 * the rectangle is considered to be normalized.
 */
export type Rectangle = [Point, Point] & { [__primitive]: { type: "Rectangle" } };

/**
 * A segment represented by two points.
 *
 * @example
 * ```ts
 * const segment: Segment = [[25, 2], [76, 88]];
 * ```
 */
export type Segment = [Point, Point];

// constants

const __primitive: unique symbol = Symbol();

const ANCHOR: Record<Anchor & string, Vec2> = {
  tl: [0, 0],
  tc: [0.5, 0],
  tr: [1, 0],
  cl: [0, 0.5],
  cc: [0.5, 0.5],
  cr: [1, 0.5],
  bl: [0, 1],
  bc: [0.5, 1],
  br: [1, 1],
} as const;

// functions

/**
 * Converts shorthand anchor strings (e.g. `"tl"` or `"cr"`) to the equivalent point or, if a point
 * is provided, normalizes it.
 *
 * @param anchor Either a shorthand string (e.g. `"tl"` or `"cr"`) or a point (e.g. `[1, 0]`).
 * @returns A normalized point where the x and y values are between 0 and 1.
 *
 * @example
 * ```ts
 * anchorToPoint("tl");
 * //=> [0, 0]
 *
 * anchorToPoint("bc");
 * //=> [0.5, 1]
 *
 * anchorToPoint([100, 0]);
 * //=> [1, 0]
 *
 * anchorToPoint([-100, 0]);
 * //=> [0, 0]
 * ```
 */
export const anchorToPoint = (anchor: Anchor): Point =>
  typeof anchor === "string" ? ANCHOR[anchor] : maxVec2(vec2(0), normalizeVec2(anchor));

/**
 * Calculates the angle between point a and point b.
 *
 * @param a The first point.
 * @param b The second point.
 * @returns The angle between the two points in radians where 0 is the three o'clock position.
 *
 * @example
 * ```ts
 * angleBetween([0, 0], [1, 0]);
 * //=> 0
 *
 * angleBetween([0, 0], [0, 1]);
 * //=> Math.PI / 2
 *
 * angleBetween([0, 0], [-1, 0]);
 * //=> Math.PI
 *
 * angleBetween([0, 0], [0, -1]);
 * //=> -Math.PI / 2
 * ```
 */
export const angleBetween = (a: Point, b: Point): number => Math.atan2(b[1] - a[1], b[0] - a[0]);

/**
 * Brands a circle primitive for type safety.
 *
 * @param circle The circle to brand.
 * @returns The branded circle primitive.
 *
 * @example
 * ```ts
 * brandCircle([[0, 0], [1, 0]]);
 * //=> Circle { center: (0,0), radius: 1 }
 * ```
 */
export const brandCircle = (circle: [Vec2, Vec2]): Circle =>
  Object.assign(circle, {
    [__primitive]: { type: "Circle" } as const,
  });

/**
 * Brands a rectangle primitive for type safety.
 *
 * @param rectangle The rectangle to brand.
 * @returns The branded rectangle primitive.
 *
 * @example
 * ```ts
 * brandRectangle([[0, 0], [1, 1]]);
 * //=> Rectangle { position: (0,0), width: 1, height: 1 }
 * ```
 */
export const brandRectangle = (rectangle: [Vec2, Vec2]): Rectangle =>
  Object.assign(rectangle, {
    [__primitive]: { type: "Rectangle" } as const,
  });

/**
 * Constructs a circle primitive.
 *
 * @param center
 * @param radius The radius of the circle.
 * @param anchor
 * @returns A circle object where the first vector is the center and the second is offset to the
 * right by the radius amount.
 *
 * @example
 * ```ts
 * createCircle([0, 0], 1);
 * //=> Circle { center: (0,0), radius: 1 }
 * ```
 */
export const createCircle = (center: Point, radius: number, anchor: Anchor = "cc"): Circle => {
  const absRadius = Math.abs(radius);
  const offset = multiplyVec2(
    [absRadius, absRadius],
    addVec2(multiplyVec2(anchorToPoint(anchor), vec2(-2)), vec2(1)),
  );
  return translate(brandCircle([center, addVec2(center, [absRadius, 0])]), offset);
};

/**
 * Constructs a rectangle primitive.
 *
 * @param position
 * @param width The width of the rectangle. If a negative value is provided, its absolute value will
 * be used.
 * @param height The height of the rectangle. If a negative value is provided, its absolute value
 * will be used.
 * @param anchor
 * @returns A normalized rectangle.
 *
 * @example
 * ```ts
 * createRectangle([0, 0], 2, 3);
 * //=> Rectangle { position: (0,0), width: 2, height: 3 }
 * ```
 */
export const createRectangle = (
  position: Point,
  width: number,
  height: number,
  anchor: Anchor = "tl",
): Rectangle => {
  const rectangle = brandRectangle([position, addVec2(position, absVec2([width, height]))]);
  const offset = subtractVec2(
    vec2(0),
    multiplyVec2(sizeOfRectangle(rectangle), anchorToPoint(anchor)),
  );
  return translate(rectangle, offset);
};

// export const describePrimitive = <P extends Primitive>(primitive: P): P[typeof __primitive] => ({
//   ...primitive[__primitive],
// });

// export const updatePrimitive = <P extends Primitive>(
//   primitive: P,
//   updates:
//     | Partial<Omit<P[typeof __primitive], "type">>
//     | ((current: P[typeof __primitive]) => Partial<Omit<P[typeof __primitive], "type">>),
// ): P => {
//   const result = [...primitive] as P;
//   Object.assign(result, {
//     [__primitive]:
//       typeof updates === "function"
//         ? updates(primitive[__primitive])
//         : { ...primitive[__primitive], ...updates },
//   });
//   return result;
// };

/**
 * Calculates the absolute distance between two points.
 *
 * @param a The first point.
 * @param b The second point.
 * @returns The absolute distance between the two points.
 *
 * @example
 * ```ts
 * distance([0, 0], [3, 4]);
 * //=> 5
 * ```
 */
export const distance = (a: Point, b: Point): number =>
  Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);

/**
 * Calculates the intersection of two rectangles.
 *
 * @param a The first rectangle.
 * @param b The second rectangle.
 * @returns The intersection of the two rectangles, or null if they do not intersect.
 *
 * @example
 * ```ts
 * intersectRectangle(createRectangle([0, 0], 10, 10), createRectangle([5, 5], 15, 15));
 * //=> Rectangle { position: (5,5), width: 10, height: 10 }
 * ```
 */
export const intersectRectangle = (a: Rectangle, b: Rectangle): Rectangle | null => {
  const [[aMinX, aMinY], [aMaxX, aMaxY]] = normalizeRectangle(a);
  const [[bMinX, bMinY], [bMaxX, bMaxY]] = normalizeRectangle(b);
  if (aMaxX < bMinX || aMinX > bMaxX || aMaxY < bMinY || aMinY > bMaxY) return null;
  return brandRectangle([
    [Math.max(aMinX, bMinX), Math.max(aMinY, bMinY)],
    [Math.min(aMaxX, bMaxX), Math.min(aMaxY, bMaxY)],
  ]);
};

/**
 * Determines if a point is within a circle. Points on the circumference are considered within the
 * circle.
 *
 * @param point The point to check.
 * @param circle The circle to check against.
 * @returns True if the point is within the circle, false otherwise.
 *
 * @example
 * ```ts
 * isWithinCircle([0, 0], createCircle([0, 0], 10));
 * //=> true
 * ```
 */
export const isWithinCircle = (point: Point, circle: Circle): boolean => {
  const [a, b] = circle;
  return distance(a, point) <= distance(a, b);
};

/**
 * Determines if a point is within a polygon. Points on the boundary are considered within the
 * polygon. Will always return false if the polygon is empty. Points on the boundary are considered
 * within the polygon.
 *
 * @param point The point to check.
 * @param polygon The polygon to check against.
 * @returns True if the point is within the polygon, false otherwise.
 *
 * @example
 * ```ts
 * isWithinPolygon([5, 5], [[0, 0], [10, 0], [10, 10], [0, 10]]);
 * //=> true
 * ```
 */
export const isWithinPolygon = (point: Point, polygon: Polygon): boolean => {
  if (polygon.length === 0) return false;

  if (polygon.length === 1) {
    const [a] = take(polygon, 1);
    return isEqualVec2(point, a);
  }

  if (polygon.length === 2) {
    const segment = take(polygon, 2);
    return isWithinSegment(point, segment);
  }

  let total = 0;
  let angle = 0;
  let prev = angleBetween(point, take(polygon, -1)[0]);

  for (const i of polygon) {
    angle = angleBetween(point, i);
    total = total + ((prev - angle) % Math.PI);
    prev = angle;
  }

  return Math.abs(total) > Number.EPSILON;
};

/**
 * Determines if a point is within a rectangle. Points on the boundary are
 * considered within the rectangle.
 *
 * @param point The point to check.
 * @param rectangle The rectangle to check against.
 * @returns True if the point is within the rectangle, false otherwise.
 *
 * @example
 * ```ts
 * isWithinRectangle([5, 5], createRectangle([0, 0], 10, 10));
 * //=> true
 * ```
 */
export const isWithinRectangle = (point: Point, rectangle: Rectangle): boolean => {
  const [x, y] = point;
  const [[minX, minY], [maxX, maxY]] = normalizeRectangle(rectangle);
  return x >= minX && x <= maxX && y >= minY && y <= maxY;
};

/**
 * Determines if a point falls somewhere along a segment.
 *
 * @param point The point to check.
 * @param segment The segment to check against.
 * @returns True if the point is on the segment, false otherwise.
 *
 * @example
 * ```ts
 * isWithinSegment([5, 5], [[0, 0], [10, 10]]);
 * //=> true
 * ```
 */
export const isWithinSegment = (point: Point, segment: Segment): boolean => {
  const [x, y] = point;
  const [a, b] = segment;

  const dx = b[0] - a[0];
  const dy = b[1] - a[1];

  if (dx === 0 && dy === 0) return distance(point, a) <= Number.EPSILON;

  const t = ((x - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy);

  if (t < 0 || t > 1) return false;

  return distance(point, [a[0] + t * dx, a[1] + t * dy]) <= Number.EPSILON;
};

/**
 * Converts a rectangle primitive into a polygon. The points in the resulting polygon are ordered
 * clockwise starting from the top-left corner.
 *
 * @param rectangle The rectangle to convert.
 * @returns A polygon representation of the rectangle.
 *
 * @example
 * ```ts
 * polygonFromRectangle(createRectangle([0, 0], 10, 10));
 * //=> [[0, 0], [10, 0], [10, 10], [0, 10]]
 * ```
 */
export const polygonFromRectangle = (rectangle: Rectangle): Polygon => {
  const [a, b] = normalizeRectangle(rectangle);
  return [
    [a[0], a[1]],
    [b[0], a[1]],
    [b[0], b[1]],
    [a[0], b[1]],
  ];
};

/**
 * Converts a circle primitive into a polygon with the specified number of edges. The points in the
 * resulting polygon are ordered clockwise starting from the three o'clock position.
 *
 * @param circle The circle to convert.
 * @param numEdges The number of edges on the polygon.
 * @returns A polygon representation of the circle.
 *
 * @example
 * ```ts
 * polygonFromCircle(createCircle([0, 0], 5), 4);
 * //=> [[5, 0], [0, 5], [-5, 0], [0, -5]]
 * ```
 */
export const polygonFromCircle = (circle: Circle, numEdges = 32): Polygon => {
  const [center] = circle;
  const radius = sizeOfCircle(circle);
  const angleStep = (Math.PI * 2) / numEdges;

  const result: Polygon = [];

  for (let i = 0; i < numEdges; i++) {
    const angle = i * angleStep;
    const x = center[0] + radius * Math.cos(angle);
    const y = center[1] - radius * Math.sin(angle);
    result.push([x, y]);
  }

  return result;
};

/**
 * Normalizes a circle primitive by moving the circumference point to a position directly right of
 * the origin point (while preserving the radius).
 *
 * @param circle The circle to normalize.
 * @returns The normalized circle.
 *
 * @example
 * ```ts
 * normalizeCircle(brandCircle([[0, 0], [0, 5]]));
 * //=> [[0, 0], [5, 0]]
 * ```
 */
export const normalizeCircle = (circle: Circle): Circle => {
  const a = circle[0];
  const b = circle[1];
  return brandCircle([a, [a[0] + lengthVec2(subtractVec2(b, a)), a[1]]]);
};

/**
 * Normalizes a rectangle primitive by ensuring the first point represents the top-left corner and
 * the second point represents the bottom-right corner.
 *
 * @param rectangle The rectangle to normalize.
 * @returns The normalized rectangle.
 *
 * @example
 * ```ts
 * normalizeRectangle(brandRectangle([[5, 5], [0, 0]]));
 * //=> [[0, 0], [5, 5]]
 * ```
 */
export const normalizeRectangle = (rectangle: Rectangle): Rectangle => {
  const a = rectangle[0];
  const b = rectangle[1];
  return brandRectangle([
    [Math.min(a[0], b[0]), Math.min(a[1], b[1])],
    [Math.max(a[0], b[0]), Math.max(a[1], b[1])],
  ]);
};

/**
 * Prints a human-readable representation of a geometric value. Primitives are labeled with their
 * name and properties.
 *
 * @param value The geometric primitive to print.
 * @returns A string representation of value.
 *
 * @example
 * ```ts
 * print(createCircle([0, 0], 1));
 * //=> Circle { center: (0,0), radius: 1 }
 *
 * print(createRectangle([0, 0], 1, 1));
 * //=> Rectangle { position: (0,0), width: 1, height: 1 }
 *
 * print([0, 0]);
 * //=> (0,0)
 *
 * print([[0, 0], [1, 1]]);
 * //=> [(0,0), (1,1)]
 *
 * print(1);
 * //=> 1
 *
 * print(Math.PI);
 * //=> π
 * ```
 */
export const print = (value: Circle | Rectangle | Point | Array<Point> | number): string => {
  if (typeof value === "object" && __primitive in value) {
    switch (value[__primitive].type) {
      case "Circle": {
        return `Circle { center: ${print(value[0])}, radius: ${sizeOfCircle(value)} }`;
      }
      case "Rectangle": {
        const [width, height] = sizeOfRectangle(value);
        return `Rectangle { position: ${print(value[0])}, width: ${width}, height: ${height} }`;
      }
    }
  }
  if (Array.isArray(value)) {
    if (value.length === 2 && typeof value[0] === "number" && typeof value[1] === "number") {
      return `(${value.join(",")})`;
    }
    return `[ ${value.map((value) => print(value)).join(", ")} ]`;
  }
  if (Math.abs(value) > Number.EPSILON && Math.abs(value) % Math.PI < Number.EPSILON) {
    const multiples = Math.round(value / Math.PI);
    return Math.abs(multiples) === 1 ? (Math.sign(multiples) === 1 ? "π" : "-π") : `${multiples}π`;
  }
  return `${value}`;
};

/**
 * Calculates the radius of a circle primitive. This is the distance between the two points
 * representing the circle.
 *
 * @param circle A circle represented as a pair of points.
 * @returns The radius of the circle.
 *
 * @example
 * ```ts
 * sizeOfCircle(createCircle([0, 0], 5));
 * //=> 5
 * ```
 */
export const sizeOfCircle = (circle: [Point, Point]): number => distance(circle[0], circle[1]);

/**
 * Calculates the width and height of a rectangle. This is the absolute difference between the
 * x-coordinates and y-coordinates of the two points representing the rectangle.
 *
 * @param rectangle A rectangle represented as a pair of points.
 * @returns The width and height of the rectangle.
 *
 * @example
 * ```ts
 * sizeOfRectangle(createRectangle([5, 5], 3, 4));
 * //=> [3, 4]
 * ```
 */
export const sizeOfRectangle = (rectangle: [Point, Point]): Vec2 => {
  const [a, b] = rectangle;
  return [Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1])];
};

/**
 * Translates a figure by a given amount.
 *
 * @param figure The figure to translate.
 * @param offset The amount to translate the figure.
 * @returns The translated figure.
 *
 * @example
 * ```ts
 * translate(createRectangle([5, 6], 3, 4), [1, 2]);
 * //=> Rectangle { position: [6, 7], width: 3, height: 4 }
 * ```
 */
export const translate = <F extends Figure>(figure: F, offset: Vec2): F => {
  const result = figure.map((point) => addVec2(point, offset)) as F;
  if (__primitive in figure) Object.assign(result, { [__primitive]: { ...figure[__primitive] } });
  return result;
};

// utils

type Tuple<T, Size extends number> = Size extends 1 | -1
  ? [T]
  : Size extends 2 | -2
    ? [T, T]
    : Size extends 3 | -3
      ? [T, T, T]
      : Size extends 4 | -4
        ? [T, T, T, T]
        : Array<T>;

const take = <C extends number, T>(array: Array<T>, count: C): Tuple<T, C> => {
  if (array.length < count) throw Error("Array is too short");
  return (count <= -1 ? array.slice(count).reverse() : array.slice(0, count)) as Tuple<T, C>;
};
