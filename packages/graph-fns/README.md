<div align="center">
  <h1>
    <img src="https://unpkg.com/graph-fns/logo.png" alt="graph-fns" width="160" />
  </h1>
  <p>A JavaScript utility library for working with graphs.</p>
  <p>
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/graph-fns.svg">
    <img alt="npm" src="https://img.shields.io/npm/dw/graph-fns.svg">
  </p>
</div>

## Features

- Lightweight.
- Pure functions.
- TypeScript declarations included.
- ESM package.

## Installation

```bash
bun add graph-fns
deno add npm:graph-fns
npm install graph-fns
pnpm add graph-fns
yarn add graph-fns
```

## Demo

https://h2788.csb.app/

![](screenshot.png)

## Usage

```js
import { create, addEdge, isCyclic, topologicalSort, degree, addVertex } from "graph-fns";

let graph = create(["A", "B", "C"]);
//=> Graph { "A", "B", "C" }

graph = addEdge(graph, ["A", "C"]);
//=> Graph { "A" -> "C", "B" }

graph = addEdge(graph, ["B", "A"]);
//=> Graph { "A" -> "C", "B" -> "A" }

isCyclic(graph);
//=> false

topologicalSort(graph);
//=> ["B", "A", "C"]

degree(graph, "A");
//=> 2

graph = addVertex(graph, "D");
//=> Graph { "A" -> "C", "B" -> "A", "D" }

graph = addEdge(graph, ["C", "D"]);
//=> Graph { "A" -> "C", "B" -> "A", "C" -> "D" }

descendants(graph, "A");
//=> Set { "C", "D" }

graph = addEdge(graph, ["D", "B"]);
//=> Graph { "A" -> "C", "B" -> "A", "C" -> "D", "D" -> "B" }

isCyclic(graph);
//=> true
```

<!-- TSDOC_START -->

## Functions

- [addEdge](#addedge)
- [addVertex](#addvertex)
- [ancestors](#ancestors)
- [children](#children)
- [clone](#clone)
- [create](#create)
- [degree](#degree)
- [descendants](#descendants)
- [edges](#edges)
- [fromD3](#fromd3)
- [getEdge](#getedge)
- [indegree](#indegree)
- [isCyclic](#iscyclic)
- [isUndirected](#isundirected)
- [makeUndirected](#makeundirected)
- [order](#order)
- [outdegree](#outdegree)
- [parents](#parents)
- [removeEdge](#removeedge)
- [removeVertex](#removevertex)
- [setEdge](#setedge)
- [size](#size)
- [toD3](#tod3)
- [toDirected](#todirected)
- [topologicalSort](#topologicalsort)
- [transpose](#transpose)
- [vertices](#vertices)
- [vertexPairs](#vertexpairs)

### addEdge

Adds a new edge to the graph from vertex `u` to vertex `v`.

**Note**: `addEdge(graph, edge)` is equivalent to `setEdge(graph, edge, 1)`.

Also see:

- [removeEdge](#removeEdge)
- [getEdge](#getEdge)
- [setEdge](#setEdge)

| Function | Type |
| ---------- | ---------- |
| `addEdge` | `<T extends string = string>(graph: Graph<T>, [u, v]: Edge<T>, options?: { undirected?: boolean or undefined; } or undefined) => Graph<T>` |

Examples:

```js
let graph = create(["A", "B", "C"]);
//=> Graph { "A", "B", "C" }

graph = addEdge(graph, ["A", "B"]);
//=> Graph { "A" -> "B", "C" }
```


### addVertex

Adds a new vertex to the graph. The new vertex will not have any edges
connecting it to existing vertices in the graph.

**Note**: If the vertex already exists the graph will be returned unmodified.

Also see:

- [removeVertex](#removeVertex)

| Function | Type |
| ---------- | ---------- |
| `addVertex` | `<T1 extends string = string, T2 extends string = string>(graph: Graph<T1>, vertex: T2) => Graph<T1 or T2>` |

### ancestors

Given a [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph), returns
all ancestors of the given vertex (i.e. vertices from which there is a
directed path to the given vertex).

**Note**: If the given graph contains cycles (checked with
[isCyclic](#isCyclic)), an error will be thrown.

Also see:

- [descendants](#descendants)
- [parents](#parents)

| Function | Type |
| ---------- | ---------- |
| `ancestors` | `<T1 extends string = string, T2 extends T1 = T1>(graph: Graph<T1>, vertex: T2) => Set<T1>` |

### children

Returns all the vertices that are children of the given vertex (i.e. there is
an edge starting at the given vertex going to the child vertex).

**Note**: If there is an edge that both starts and ends at the given vertex,
it will be considered a child of itself and included in the result.

Also see:

- [parents](#parents)
- [descendants](#descendants)

| Function | Type |
| ---------- | ---------- |
| `children` | `<T1 extends string = string, T2 extends T1 = T1>(graph: Graph<T1>, vertex: T2) => Set<T1>` |

### clone

Creates a copy of the graph.

| Function | Type |
| ---------- | ---------- |
| `clone` | `<T extends string = string>(graph: Graph<T>) => Graph<T>` |

### create

| Function | Type |
| ---------- | ---------- |
| `create` | `<T extends string = string>(vertices: T[]) => Graph<T>` |

### degree

Returns the [degree](<https://en.wikipedia.org/wiki/Degree_(graph_theory)>)
for the given vertex.

By default `weighted` is `false`, if set to `true` the result will be the sum
of the edge weights (which could be zero or a negative value).

Also see:

- [indegree](#indegree)
- [outdegree](#outdegree)

| Function | Type |
| ---------- | ---------- |
| `degree` | `<T1 extends string = string, T2 extends T1 = T1>(graph: Graph<T1>, vertex: T2, options?: { weighted?: boolean or undefined; undirected?: boolean or undefined; } or undefined) => number` |

### descendants

Given a [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph), returns
all descendants of the given vertex (i.e. vertices to which there is a
directed path from the given vertex).

**Note**: If the given graph contains cycles (checked with
[isCyclic](#isCyclic)), an error will be thrown.

Also see:

- [ancestors](#ancestors)
- [children](#children)

| Function | Type |
| ---------- | ---------- |
| `descendants` | `<T1 extends string = string, T2 extends T1 = T1>(graph: Graph<T1>, vertex: T2) => Set<T1>` |

### edges

Returns all the edges in the graph (i.e. any edge with a value other than
`0`).

| Function | Type |
| ---------- | ---------- |
| `edges` | `<T extends string = string>(graph: Graph<T>, options?: { undirected?: boolean or undefined; } or undefined) => Set<Edge<T>>` |

### fromD3

Converts a graph from a [D3Graph](#D3Graph) representation into a
[Graph](#Graph) representation.

When the D3Graph contains multiple links between two nodes the resulting
graph will have inflated edge weights to reflect that.

**Note**: Any extraneous data associated with nodes or links in the D3Graph representation will be ignored.

Also see:

- [toD3](#toD3)

| Function | Type |
| ---------- | ---------- |
| `fromD3` | `<T extends string = string>(d3Graph: D3Graph<T>, options?: { undirected?: boolean or undefined; } or undefined) => Graph<T>` |

Examples:

```js
const graph = fromD3({
  nodes: [{ id: "A" }, { id: "B" }, { id: "C" }],
  links: [
    { source: "A", target: "B" },
    { source: "A", target: "C" },
    { source: "A", target: "C" },
  ],
});
//=> Graph { "A" -> "B", "A" -> "C" }

getEdge(["A", "B"]);
//=> 1
getEdge(["A", "C"]);
//=> 2
```


### getEdge

Get the weight of the given edge.

Also see:

- [addEdge](#addEdge)
- [removeEdge](#removeEdge)
- [setEdge](#setEdge)

| Function | Type |
| ---------- | ---------- |
| `getEdge` | `<T extends string = string>(graph: Graph<T>, [u, v]: Edge<T>) => number` |

### indegree

Returns the [indegree](https://en.wikipedia.org/wiki/Indegree) for the given
vertex.

By default `weighted` is `false`, if set to `true` the result will be the sum
of the edge weights (which could be zero or a negative value).

Also see:

- [degree](#degree)
- [outdegree](#outdegree)

| Function | Type |
| ---------- | ---------- |
| `indegree` | `<T1 extends string = string, T2 extends T1 = T1>(graph: Graph<T1>, vertex: T2, options?: { weighted?: boolean or undefined; } or undefined) => number` |

### isCyclic

Returns `true` if the graph provided contains any
[cycles](<https://en.wikipedia.org/wiki/Cycle_(graph_theory)>) (including
"loops" — an edge that starts and ends at the same vertex), otherwise returns
`false`.

| Function | Type |
| ---------- | ---------- |
| `isCyclic` | `(graph: Graph<string>, options?: { undirected?: boolean or undefined; } or undefined) => boolean` |

### isUndirected

Returns `true` if the graph can be considered an [undirected
graph](https://mathinsight.org/definition/undirected_graph) — every edge in
the graph (from vertex A to B) has a mutual edge (from vertex B to A) with an
equal weight. Loops are considered bidirectional and are allow in a
undirected graph.

| Function | Type |
| ---------- | ---------- |
| `isUndirected` | `(graph: Graph<string>) => boolean` |

Examples:

```js
let graph = create(["A", "B"]);
//=> Graph { "A", "B" }

isUndirected(graph);
//=> true

graph = addEdge(graph, ["A", "B"]);
//=> Graph { "A" -> "B" }

isUndirected(graph);
//=> false

graph = addEdge(graph, ["B", "A"]);
//=> Graph { "A" <-> "B" }

isUndirected(graph);
//=> true
```


### makeUndirected

Converts a directed graph to an undirected graph by either adding edges to
make them mutual or balancing the weights of mutual edges that aren't already
equal.

The `merge` function is used to determine the weight of edges in cases where
mutual edges with differing weights already exist. If not provide the default
method is to use the highest of the two edge weights (`(a, b) => Math.max(a,
b)`).

| Function | Type |
| ---------- | ---------- |
| `makeUndirected` | `<T extends string = string>(graph: Graph<T>, merge?: (a: number, b: number) => number) => Graph<T>` |

Examples:

```js
let graph = create(["A", "B", "C"]);
//=> Graph { "A", "B", "C" }

graph = addEdge(graph, ["A", "B"]);
//=> Graph { "A" -> "B", "C" }

graph = makeUndirected(graph);
//=> Graph { "A" <-> "B", "C" }
```


### order

Returns the number of vertices in the graph.

Also see:

- [size](#size)

| Function | Type |
| ---------- | ---------- |
| `order` | `(graph: Graph<string>) => number` |

Examples:

```js
let graph = create(["A", "B", "C"]);
//=> Graph { "A", "B", "C" }

order(graph);
//=> 3
```


### outdegree

Returns the [outdegree](https://en.wikipedia.org/wiki/Outdegree) for the
given vertex.

By default `weighted` is `false`, if set to `true` the result will be the sum
of the edge weights (which could be zero or a negative value).

Also see:

- [degree](#degree)
- [indegree](#indegree)

| Function | Type |
| ---------- | ---------- |
| `outdegree` | `<T1 extends string = string, T2 extends T1 = T1>(graph: Graph<T1>, vertex: T2, options?: { weighted?: boolean or undefined; } or undefined) => number` |

### parents

Returns all the vertices that are parents of the given vertex (i.e. there is
an edge starting at the parent vertex going to the given vertex).

**Note**: If there is an edge that both starts and ends at the given vertex,
it will be considered a parent of itself and included in the result.

Also see:

- [ancestors](#ancestors)
- [children](#children)

| Function | Type |
| ---------- | ---------- |
| `parents` | `<T1 extends string = string, T2 extends T1 = T1>(graph: Graph<T1>, vertex: T2) => Set<T1>` |

### removeEdge

Removes an edge from a graph.

**Note**: `removeEdge(graph, edge)` is equivalent to `setEdge(graph, edge, 0)`.

Also see:

- [addEdge](#addEdge)
- [getEdge](#getEdge)
- [setEdge](#setEdge)

| Function | Type |
| ---------- | ---------- |
| `removeEdge` | `<T1 extends string = string, T2 extends T1 = T1>(graph: Graph<T1>, [u, v]: [T2, T2], options?: { undirected?: boolean or undefined; } or undefined) => Graph<T1>` |

Examples:

```js
let graph = create(["A", "B", "C"]);
//=> Graph { "A", "B", "C" }

graph = addEdge(graph, ["A", "B"]);
//=> Graph { "A" -> "B", "C" }

graph = removeEdge(graph, ["A", "B"]);
//=> Graph { "A", "B", "C" }
```


### removeVertex

Removes a vertex from a graph.

Also see:

- [addVertex](#addVertex)

| Function | Type |
| ---------- | ---------- |
| `removeVertex` | `<T1 extends string = string, T2 extends T1 = T1>(graph: Graph<T1>, vertex: T2) => Graph<Exclude<T1, T2>>` |

### setEdge

Set the weight of the given edge.

**Note**: `setEdge(graph, edge, 1)` is equivalent to `addEdge(graph, edge)`
and `setEdge(graph, edge, 0)` is equivalent to `removeEdge(graph, edge)`.

Also see:

- [addEdge](#addEdge)
- [getEdge](#getEdge)
- [removeEdge](#removeEdge)

| Function | Type |
| ---------- | ---------- |
| `setEdge` | `<T extends string = string>(graph: Graph<T>, [u, v]: Edge<T>, weight: number, options?: { undirected?: boolean or undefined; } or undefined) => Graph<T>` |

Examples:

```js
let graph = create(["A", "B", "C"]);
//=> Graph { "A", "B", "C" }

graph = setEdge(graph, ["A", "B"], 1);
//=> Graph { "A" -> "B", "C" }

graph = setEdge(graph, ["A", "B"], 0);
//=> Graph { "A", "B", "C" }
```


### size

Returns the number of edges in the graph.

Also see:

- [order](#order)

| Function | Type |
| ---------- | ---------- |
| `size` | `(graph: Graph<string>, options?: { undirected?: boolean or undefined; } or undefined) => number` |

Examples:

```js
let graph = create(["A", "B", "C"]);
//=> Graph { "A", "B", "C" }

graph = addEdge(graph, ["A", "B"]);
//=> Graph { "A" -> "B", "C" }

graph = addEdge(graph, ["B", "C"]);
//=> Graph { "A" -> "B", "B" -> "C" }

size(graph);
//=> 2
```


### toD3

Converts a graph from a [Graph](#Graph) representation into a [D3Graph](#D3Graph) representation.

Edges with a weight of 2 or greater will result in multiple links being generated in the D3Graph.

Also see:

- [fromD3](#fromD3)

| Function | Type |
| ---------- | ---------- |
| `toD3` | `<T extends string = string>(graph: Graph<T>, options?: { undirected?: boolean or undefined; } or undefined) => D3Graph<T>` |

Examples:

```js
let graph = create(["A", "B", "C"]);
//=> Graph { "A", "B", "C" }

graph = setEdge(graph, ["A", "B"], 1);
//=> Graph { "A" -> "B", "C" }

graph = setEdge(graph, ["A", "C"], 2);
//=> Graph { "A" -> "B", "A" -> "C" }

toD3(graph);
//=> {
//     nodes: [{ id: "A" }, { id: "B" }, { id: "C" }],
//     links: [
//       { source: "A", target: "B" },
//       { source: "A", target: "C" },
//       { source: "A", target: "C" },
//     ],
//   }
```


### toDirected

Converts an undirected graph to a directed graph by converting reciprocal
edges to a single directed edge.

| Function | Type |
| ---------- | ---------- |
| `toDirected` | `<T extends string = string>(graph: Graph<T>) => Graph<T>` |

### topologicalSort

Given a [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph), returns
an array of the graph's vertices sorted using a [topological
sort](https://en.wikipedia.org/wiki/Topological_sorting).

**Note**: If the given graph contains cycles (checked with
[isCyclic](#isCyclic)), an error will be thrown.

| Function | Type |
| ---------- | ---------- |
| `topologicalSort` | `(graph: Graph<string>) => string[]` |

Examples:

```js
let graph = create(["A", "B", "C"]);
//=> Graph { "A", "B", "C" }

graph = addEdge(graph, ["A", "C"]);
//=> Graph { "A" -> "C", "B" }

graph = addEdge(graph, ["C", "B"]);
//=> Graph { "A" -> "C", "C" -> "B" }

topologicalSort(graph);
//=> ["A", "C", "B"]
```


### transpose

Flips the orientation of all edges in a directed graph.

| Function | Type |
| ---------- | ---------- |
| `transpose` | `<T extends string = string>(graph: Graph<T>) => Graph<T>` |

Examples:

```js
let graph = create(["A", "B", "C"]);
//=> Graph { "A", "B", "C" }

graph = addEdge(graph, ["A", "B"]);
//=> Graph { "A" -> "B", "C" }

graph = addEdge(graph, ["B", "C"]);
//=> Graph { "A" -> "B", "B" -> "C" }

transpose(graph);
//=> Graph { "B" -> "A", "C" -> "B" }
```


### vertices

Returns the vertices in the graph.

| Function | Type |
| ---------- | ---------- |
| `vertices` | `<T extends string = string>(graph: Graph<T>) => Set<T>` |

### vertexPairs

Returns a list of all pairs of vertices in the graph irrespective of the edges present in the graph.

| Function | Type |
| ---------- | ---------- |
| `vertexPairs` | `<T extends string = string>(graph: Graph<T>) => Set<Edge<T>>` |

Examples:

```js
let graph = create(["A", "B", "C"]);
//=> Graph { "A", "B", "C" }

vertexPairs(graph);
//=> Set { ["A", "A"], ["A", "B"], ["A", "C"], ["B", "B"], ["B", "C"], ["C", "C"] }
```




## Types

- [D3Graph](#d3graph)
- [Edge](#edge)
- [Graph](#graph)

### D3Graph

A graph in a representation convenient for using with [D3.js force-directed
graphs](https://github.com/d3/d3-force).

| Type | Type |
| ---------- | ---------- |
| `D3Graph` | `{ nodes: Array<{ id: T; }>; links: Array<{ source: T; target: T; }>; }` |

### Edge

A connection between two vertices in a graph.
([Wikipedia](<https://en.wikipedia.org/wiki/Edge_(graph_theory)>))

| Type | Type |
| ---------- | ---------- |
| `Edge` | `[T, T]` |

### Graph

A graph [adjacency matrix](https://en.wikipedia.org/wiki/Adjacency_matrix)
where each number in the matrix describes the edge from vertex `u` to vertex
`v`. By default, a value of `1` is used to indicate there is a edge between
the two vertices, but any value other than `0` can be used to signify the
presence of an edge (i.e. a weighted graph). ```

| Type | Type |
| ---------- | ---------- |
| `Graph` | `Record<T, Record<T, number>>` |


<!-- TSDOC_END -->
