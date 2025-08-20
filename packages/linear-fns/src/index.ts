// types

export type Vec2 = [number, number];

// functions

/**
 * Calculates the absolute value of a two-dimensional vector.
 *
 * @param v The vector to take the absolute value of.
 * @returns The absolute value of the vector.
 *
 * @example
 * ```ts
 * absVec2([1, -2]);
 * //=> [1, 2]
 * ```
 */
export const absVec2 = (v: Vec2): Vec2 => [Math.abs(v[0]), Math.abs(v[1])];

/**
 * Sums two two-dimensional vectors.
 *
 * @param v1 The first vector.
 * @param v2 The second vector.
 * @returns The sum of the two vectors.
 *
 * @example
 * ```ts
 * addVec2([1, 2], [3, 4]);
 * //=> [4, 6]
 * ```
 */
export const addVec2 = (v1: Vec2, v2: Vec2): Vec2 => [v1[0] + v2[0], v1[1] + v2[1]];

/**
 * Clamps a two-dimensional vector between a minimum and maximum vector.
 *
 * @param v The vector to clamp.
 * @param min The minimum vector.
 * @param max The maximum vector.
 * @returns A vector with the clamped x and y values.
 *
 * @example
 * ```ts
 * clampVec2([1, 2], [0, 0], [3, 3]);
 * //=> [1, 2]
 * ```
 */
export const clampVec2 = (v: Vec2, min: Vec2, max: Vec2): Vec2 => maxVec2(min, minVec2(v, max));

/**
 * Calculates the cross product of two two-dimensional vectors.
 *
 * @param v1 The first vector.
 * @param v2 The second vector.
 * @returns The cross product of the two vectors.
 *
 * @example
 * ```ts
 * crossVec2([1, 2], [3, 4]);
 * //=> -2
 * ```
 */
export const crossVec2 = (v1: Vec2, v2: Vec2): number => v1[0] * v2[1] - v1[1] * v2[0];

/**
 * Calculates the dot product of two two-dimensional vectors.
 *
 * @param v1 The first vector.
 * @param v2 The second vector.
 * @returns The dot product of the two vectors.
 *
 * @example
 * ```ts
 * dotVec2([1, 2], [3, 4]);
 * //=> 11
 * ```
 */
export const dotVec2 = (v1: Vec2, v2: Vec2): number => v1[0] * v2[0] + v1[1] * v2[1];

/**
 * Divides two two-dimensional vectors.
 *
 * @param v1 The first vector.
 * @param v2 The second vector.
 * @returns The division of the two vectors.
 *
 * @example
 * ```ts
 * divideVec2([2, 10], [2, 2]);
 * //=> [1, 5]
 * ```
 */
export const divideVec2 = (v1: Vec2, v2: Vec2): Vec2 => [v1[0] / v2[0], v1[1] / v2[1]];

/**
 * Determines if two two-dimensional vectors are equal.
 *
 * @param v1 The first vector.
 * @param v2 The second vector.
 * @returns True if the vectors are equal, false otherwise.
 *
 * @example
 * ```ts
 * isEqualVec2([1, 2], [1, 2]);
 * //=> true
 * ```
 */
export const isEqualVec2 = ([x1, y1]: Vec2, [x2, y2]: Vec2): boolean => x1 === x2 && y1 === y2;

/**
 * Rounds down the components of a two-dimensional vector.
 *
 * @param v The vector to round down.
 * @returns The rounded down vector.
 *
 * @example
 * ```ts
 * floorVec2([2.5, 3.7]);
 * //=> [2, 3]
 * ```
 */
export const floorVec2 = (v: Vec2): Vec2 => [Math.floor(v[0]), Math.floor(v[1])];

/**
 * Calculates the length (magnitude) of a two-dimensional vector.
 *
 * @param v The vector.
 * @returns The length of the vector.
 *
 * @example
 * ```ts
 * lengthVec2([3, 4]);
 * //=> 5
 * ```
 */
export const lengthVec2 = (v: Vec2): number => Math.sqrt(v[0] * v[0] + v[1] * v[1]);

/**
 * Finds the maximum two-dimensional vector from a list of vectors.
 *
 * @param ...vectors The vectors to compare.
 * @returns A vector with the maximum x and y values.
 *
 * @example
 * ```ts
 * maxVec2([1, 2], [5, 1], [3, 4]);
 * //=> [5, 4]
 * ```
 */
export const maxVec2 = (...vectors: Vec2[]): Vec2 => [
  Math.max(...vectors.map(([x]) => x)),
  Math.max(...vectors.map(([_, y]) => y)),
];

/**
 * Finds the minimum two-dimensional vector from a list of vectors.
 *
 * @param ...vectors The vectors to compare.
 * @returns A vector with the minimum x and y values.
 *
 * @example
 * ```ts
 * minVec2([1, 2], [5, 1], [3, 4]);
 * //=> [1, 1]
 * ```
 */
export const minVec2 = (...vectors: Vec2[]): Vec2 => [
  Math.min(...vectors.map(([x]) => x)),
  Math.min(...vectors.map(([_, y]) => y)),
];

/**
 * Finds the modulus of two-dimensional vectors.
 *
 * @param v1 The first vector.
 * @param v2 The second vector.
 * @returns The modulus of the vectors.
 *
 * @example
 * ```ts
 * modVec2([5, 7], [3, 4]);
 * //=> [2, 3]
 * ```
 */
export const modVec2 = (v1: Vec2, v2: Vec2): Vec2 => [v1[0] % v2[0], v1[1] % v2[1]];

/**
 * Multiplies two two-dimensional vectors.
 *
 * @param v1 The first vector.
 * @param v2 The second vector.
 * @returns The product of the vectors.
 *
 * @example
 * ```ts
 * multiplyVec2([2, 3], [4, 5]);
 * //=> [8, 15]
 * ```
 */
export const multiplyVec2 = (v1: Vec2, v2: Vec2): Vec2 => [v1[0] * v2[0], v1[1] * v2[1]];

/**
 * Normalizes a two-dimensional vector.
 *
 * @param v The vector.
 * @returns The normalized vector.
 *
 * @example
 * ```ts
 * normalizeVec2([3, 4]);
 * //=> [0.6, 0.8]
 * ```
 */
export const normalizeVec2 = (v: Vec2): Vec2 => {
  const length = lengthVec2(v);
  return length === 0 ? [0, 0] : divideVec2(v, [length, length]);
};

/**
 * Subtracts two two-dimensional vectors.
 *
 * @param v1 The first vector.
 * @param v2 The second vector.
 * @returns The difference of the vectors.
 *
 * @example
 * ```ts
 * subtractVec2([5, 6], [3, 2]);
 * //=> [2, 4]
 * ```
 */
export const subtractVec2 = (v1: Vec2, v2: Vec2): Vec2 => [v1[0] - v2[0], v1[1] - v2[1]];

/**
 * Constructs a two-dimensional vector.
 *
 * @param x The x-coordinate of the vector.
 * @param y The y-coordinate of the vector. If not provided, defaults to the x-coordinate.
 * @returns The constructed vector.
 *
 * @example
 * ```ts
 * vec2(1, 2);
 * //=> [1, 2]
 *
 * vec2(1);
 * //=> [1, 1]
 * ```
 */
export const vec2 = (x: number, y?: number): Vec2 => [x, y ?? x];
