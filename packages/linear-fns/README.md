<div align="center">
  <h1>
    <img src="https://unpkg.com/@haydn/linear-fns/logo.png" alt="linear-fns" width="160" />
  </h1>
  <p>A JavaScript utility library for linear algebra.</p>
  <p>
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/@haydn/linear-fns.svg">
    <img alt="npm" src="https://img.shields.io/npm/dw/@haydn/linear-fns.svg">
  </p>
</div>

## Features

- Lightweight.
- Pure functions.
- TypeScript declarations included.
- ESM package.

## Installation

```bash
bun add @haydn/linear-fns
deno add npm:@haydn/linear-fns
npm install @haydn/linear-fns
pnpm add @haydn/linear-fns
yarn add @haydn/linear-fns
```

## Usage

```js
import { addVec2, lengthVec2, normalizeVec2 } from "@haydn/linear-fns";

addVec2([1, 2], [3, 4]);
//=> [4, 6]

lengthVec2([3, 4]);
//=> 5

normalizeVec2([3, 4]);
//=> [0.6, 0.8]
```

<!-- TSDOC_START -->

## :toolbox: Functions

- [absVec2](#gear-absvec2)
- [addVec2](#gear-addvec2)
- [clampVec2](#gear-clampvec2)
- [crossVec2](#gear-crossvec2)
- [dotVec2](#gear-dotvec2)
- [divideVec2](#gear-dividevec2)
- [isEqualVec2](#gear-isequalvec2)
- [floorVec2](#gear-floorvec2)
- [lengthVec2](#gear-lengthvec2)
- [maxVec2](#gear-maxvec2)
- [minVec2](#gear-minvec2)
- [modVec2](#gear-modvec2)
- [multiplyVec2](#gear-multiplyvec2)
- [normalizeVec2](#gear-normalizevec2)
- [subtractVec2](#gear-subtractvec2)
- [vec2](#gear-vec2)

### :gear: absVec2

Calculates the absolute value of a two-dimensional vector.

| Function | Type |
| ---------- | ---------- |
| `absVec2` | `(v: Vec2) => Vec2` |

Parameters:

* `v`: The vector to take the absolute value of.


Returns:

The absolute value of the vector.

Examples:

```ts
absVec2([1, -2]);
//=> [1, 2]
```


### :gear: addVec2

Sums two two-dimensional vectors.

| Function | Type |
| ---------- | ---------- |
| `addVec2` | `(v1: Vec2, v2: Vec2) => Vec2` |

Parameters:

* `v1`: The first vector.
* `v2`: The second vector.


Returns:

The sum of the two vectors.

Examples:

```ts
addVec2([1, 2], [3, 4]);
//=> [4, 6]
```


### :gear: clampVec2

Clamps a two-dimensional vector between a minimum and maximum vector.

| Function | Type |
| ---------- | ---------- |
| `clampVec2` | `(v: Vec2, min: Vec2, max: Vec2) => Vec2` |

Parameters:

* `v`: The vector to clamp.
* `min`: The minimum vector.
* `max`: The maximum vector.


Returns:

A vector with the clamped x and y values.

Examples:

```ts
clampVec2([1, 2], [0, 0], [3, 3]);
//=> [1, 2]
```


### :gear: crossVec2

Calculates the cross product of two two-dimensional vectors.

| Function | Type |
| ---------- | ---------- |
| `crossVec2` | `(v1: Vec2, v2: Vec2) => number` |

Parameters:

* `v1`: The first vector.
* `v2`: The second vector.


Returns:

The cross product of the two vectors.

Examples:

```ts
crossVec2([1, 2], [3, 4]);
//=> -2
```


### :gear: dotVec2

Calculates the dot product of two two-dimensional vectors.

| Function | Type |
| ---------- | ---------- |
| `dotVec2` | `(v1: Vec2, v2: Vec2) => number` |

Parameters:

* `v1`: The first vector.
* `v2`: The second vector.


Returns:

The dot product of the two vectors.

Examples:

```ts
dotVec2([1, 2], [3, 4]);
//=> 11
```


### :gear: divideVec2

Divides two two-dimensional vectors.

| Function | Type |
| ---------- | ---------- |
| `divideVec2` | `(v1: Vec2, v2: Vec2) => Vec2` |

Parameters:

* `v1`: The first vector.
* `v2`: The second vector.


Returns:

The division of the two vectors.

Examples:

```ts
divideVec2([2, 10], [2, 2]);
//=> [1, 5]
```


### :gear: isEqualVec2

Determines if two two-dimensional vectors are equal.

| Function | Type |
| ---------- | ---------- |
| `isEqualVec2` | `([x1, y1]: Vec2, [x2, y2]: Vec2) => boolean` |

Parameters:

* `v1`: The first vector.
* `v2`: The second vector.


Returns:

True if the vectors are equal, false otherwise.

Examples:

```ts
isEqualVec2([1, 2], [1, 2]);
//=> true
```


### :gear: floorVec2

Rounds down the components of a two-dimensional vector.

| Function | Type |
| ---------- | ---------- |
| `floorVec2` | `(v: Vec2) => Vec2` |

Parameters:

* `v`: The vector to round down.


Returns:

The rounded down vector.

Examples:

```ts
floorVec2([2.5, 3.7]);
//=> [2, 3]
```


### :gear: lengthVec2

Calculates the length (magnitude) of a two-dimensional vector.

| Function | Type |
| ---------- | ---------- |
| `lengthVec2` | `(v: Vec2) => number` |

Parameters:

* `v`: The vector.


Returns:

The length of the vector.

Examples:

```ts
lengthVec2([3, 4]);
//=> 5
```


### :gear: maxVec2

Finds the maximum two-dimensional vector from a list of vectors.

| Function | Type |
| ---------- | ---------- |
| `maxVec2` | `(...vectors: Vec2[]) => Vec2` |

Parameters:

* `...vectors`: The vectors to compare.


Returns:

A vector with the maximum x and y values.

Examples:

```ts
maxVec2([1, 2], [5, 1], [3, 4]);
//=> [5, 4]
```


### :gear: minVec2

Finds the minimum two-dimensional vector from a list of vectors.

| Function | Type |
| ---------- | ---------- |
| `minVec2` | `(...vectors: Vec2[]) => Vec2` |

Parameters:

* `...vectors`: The vectors to compare.


Returns:

A vector with the minimum x and y values.

Examples:

```ts
minVec2([1, 2], [5, 1], [3, 4]);
//=> [1, 1]
```


### :gear: modVec2

Finds the modulus of two-dimensional vectors.

| Function | Type |
| ---------- | ---------- |
| `modVec2` | `(v1: Vec2, v2: Vec2) => Vec2` |

Parameters:

* `v1`: The first vector.
* `v2`: The second vector.


Returns:

The modulus of the vectors.

Examples:

```ts
modVec2([5, 7], [3, 4]);
//=> [2, 3]
```


### :gear: multiplyVec2

Multiplies two two-dimensional vectors.

| Function | Type |
| ---------- | ---------- |
| `multiplyVec2` | `(v1: Vec2, v2: Vec2) => Vec2` |

Parameters:

* `v1`: The first vector.
* `v2`: The second vector.


Returns:

The product of the vectors.

Examples:

```ts
multiplyVec2([2, 3], [4, 5]);
//=> [8, 15]
```


### :gear: normalizeVec2

Normalizes a two-dimensional vector.

| Function | Type |
| ---------- | ---------- |
| `normalizeVec2` | `(v: Vec2) => Vec2` |

Parameters:

* `v`: The vector.


Returns:

The normalized vector.

Examples:

```ts
normalizeVec2([3, 4]);
//=> [0.6, 0.8]
```


### :gear: subtractVec2

Subtracts two two-dimensional vectors.

| Function | Type |
| ---------- | ---------- |
| `subtractVec2` | `(v1: Vec2, v2: Vec2) => Vec2` |

Parameters:

* `v1`: The first vector.
* `v2`: The second vector.


Returns:

The difference of the vectors.

Examples:

```ts
subtractVec2([5, 6], [3, 2]);
//=> [2, 4]
```


### :gear: vec2

Constructs a two-dimensional vector.

| Function | Type |
| ---------- | ---------- |
| `vec2` | `(x: number, y?: number or undefined) => Vec2` |

Parameters:

* `x`: The x-coordinate of the vector.
* `y`: The y-coordinate of the vector. If not provided, defaults to the x-coordinate.


Returns:

The constructed vector.

Examples:

```ts
vec2(1, 2);
//=> [1, 2]

vec2(1);
//=> [1, 1]
```




## :cocktail: Types

- [Vec2](#gear-vec2)

### :gear: Vec2

| Type | Type |
| ---------- | ---------- |
| `Vec2` | `[number, number]` |


<!-- TSDOC_END -->
