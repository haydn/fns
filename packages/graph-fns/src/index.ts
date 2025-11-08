// types

/**
 * A graph in a representation convenient for using with [D3.js force-directed
 * graphs](https://github.com/d3/d3-force).
 */
export type D3Graph<T extends string = string> = {
  nodes: Array<{
    id: T;
  }>;
  links: Array<{
    source: T;
    target: T;
  }>;
};

/**
 * A connection between two vertices in a graph.
 * ([Wikipedia](<https://en.wikipedia.org/wiki/Edge_(graph_theory)>))
 */
export type Edge<T extends string = string> = [T, T];

/**
 * A graph [adjacency matrix](https://en.wikipedia.org/wiki/Adjacency_matrix)
 * where each number in the matrix describes the edge from vertex `u` to vertex
 * `v`. By default, a value of `1` is used to indicate there is a edge between
 * the two vertices, but any value other than `0` can be used to signify the
 * presence of an edge (i.e. a weighted graph). ```
 */
export type Graph<T extends string = string> = Record<T, Record<T, number>>;

// functions

/**
 * Adds a new edge to the graph from vertex `u` to vertex `v`.
 *
 * **Note**: `addEdge(graph, edge)` is equivalent to `setEdge(graph, edge, 1)`.
 *
 * Also see:
 *
 * - [removeEdge](#removeEdge)
 * - [getEdge](#getEdge)
 * - [setEdge](#setEdge)
 *
 * @example
 * ```js
 * let graph = create(["A", "B", "C"]);
 * //=> Graph { "A", "B", "C" }
 *
 * graph = addEdge(graph, ["A", "B"]);
 * //=> Graph { "A" -> "B", "C" }
 * ```
 */
export const addEdge = <T extends string = string>(
  graph: Graph<T>,
  [u, v]: Edge<T>,
  options?: { undirected?: boolean },
): Graph<T> => {
  const result = clone<T>(graph);

  if (result[u][v] === 0) {
    result[u][v] = 1;
  }

  if (options?.undirected && result[v][u] === 0) {
    result[v][u] = 1;
  }

  return result;
};

/**
 * Adds a new vertex to the graph. The new vertex will not have any edges
 * connecting it to existing vertices in the graph.
 *
 * **Note**: If the vertex already exists the graph will be returned unmodified.
 *
 * Also see:
 *
 * - [removeVertex](#removeVertex)
 */
export const addVertex = <T1 extends string = string, T2 extends string = string>(
  graph: Graph<T1>,
  vertex: T2,
): Graph<T1 | T2> => {
  if (vertex in graph) return graph as Graph<T1 | T2>;

  const result = clone<T1>(graph) as Graph<T1 | T2>;

  for (const v of Object.keys(result) as Array<T1 | T2>) result[v][vertex] = 0;
  result[vertex] = {} as Graph<T1 | T2>[T1 | T2];
  for (const v of Object.keys(result) as Array<T1 | T2>) result[vertex][v] = 0;

  return result;
};

/**
 * Given a [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph), returns
 * all ancestors of the given vertex (i.e. vertices from which there is a
 * directed path to the given vertex).
 *
 * **Note**: If the given graph contains cycles (checked with
 * [isCyclic](#isCyclic)), an error will be thrown.
 *
 * Also see:
 *
 * - [descendants](#descendants)
 * - [parents](#parents)
 */
export const ancestors = <T1 extends string = string, T2 extends T1 = T1>(
  graph: Graph<T1>,
  vertex: T2,
): Set<T1> => {
  if (isCyclic(graph)) throw "Cannot retrieve ancestors in a graph that contains cycles.";

  let result: Set<T1> = new Set();

  for (const parent of parents(graph, vertex)) {
    result = new Set([...result, parent, ...ancestors(graph, parent)]);
  }

  return result;
};

/**
 * Returns all the vertices that are children of the given vertex (i.e. there is
 * an edge starting at the given vertex going to the child vertex).
 *
 * **Note**: If there is an edge that both starts and ends at the given vertex,
 * it will be considered a child of itself and included in the result.
 *
 * Also see:
 *
 * - [parents](#parents)
 * - [descendants](#descendants)
 */
export const children = <T1 extends string = string, T2 extends T1 = T1>(
  graph: Graph<T1>,
  vertex: T2,
): Set<T1> => {
  const result: Set<T1> = new Set();
  const vertices = Object.keys(graph) as Array<T1>;

  for (const v of vertices) {
    if (graph[vertex][v] !== 0) {
      result.add(v);
    }
  }

  return result;
};

/**
 * Creates a copy of the graph.
 */
export const clone = <T extends string = string>(graph: Graph<T>): Graph<T> => {
  const result = {} as Graph<T>;

  for (const u in graph) {
    result[u] = {} as Graph<T>[T];
    for (const v in graph[u]) {
      result[u][v] = graph[u][v];
    }
  }

  return result;
}; /**
 * Creates a new graph. The new graph can be seeded with an optional number of
 * vertices, but it will not contain any edges.
 *
 * The `vertices` argument is a list of vertices with which to seed the graph.
 * Additional vertices can be added using [addVertex](#addVertex), but it is
 * more efficient to create them upfront when possible.
 *
 * To create a graph using existing ID's you can use a pattern like this:
 *
 * @example
 * ```js
 * const users = [
 *   { id: "412", name: "Jane" },
 *   { id: "34", name: "Kate" },
 *   { id: "526", name: "Mike" },
 *   { id: "155", name: "Tony" },
 * ];
 *
 * const graph = create(users.map((user) => user.id));
 * ```
 */
export const create = <T extends string = string>(vertices: Array<T>): Graph<T> => {
  const result = {} as Graph<T>;

  for (const u of vertices) {
    result[u] = {} as Graph<T>[T];
    for (const v of vertices) {
      result[u][v] = 0;
    }
  }

  return result;
};

/**
 * Returns the [degree](<https://en.wikipedia.org/wiki/Degree_(graph_theory)>)
 * for the given vertex.
 *
 * By default `weighted` is `false`, if set to `true` the result will be the sum
 * of the edge weights (which could be zero or a negative value).
 *
 * Also see:
 *
 * - [indegree](#indegree)
 * - [outdegree](#outdegree)
 */
export const degree = <T1 extends string = string, T2 extends T1 = T1>(
  graph: Graph<T1>,
  vertex: T2,
  options?: { weighted?: boolean; undirected?: boolean },
): number => {
  if (options?.undirected && !isUndirected(graph)) {
    throw Error(
      "Unable to calculate degree. Expected an undirected graph, but got a directed graph.",
    );
  }
  const resolvedGraph = options?.undirected ? toDirected(graph) : graph;
  return (
    indegree(resolvedGraph, vertex, { weighted: options?.weighted }) +
    outdegree(resolvedGraph, vertex, { weighted: options?.weighted })
  );
};

/**
 * Given a [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph), returns
 * all descendants of the given vertex (i.e. vertices to which there is a
 * directed path from the given vertex).
 *
 * **Note**: If the given graph contains cycles (checked with
 * [isCyclic](#isCyclic)), an error will be thrown.
 *
 * Also see:
 *
 * - [ancestors](#ancestors)
 * - [children](#children)
 */
export const descendants = <T1 extends string = string, T2 extends T1 = T1>(
  graph: Graph<T1>,
  vertex: T2,
): Set<T1> => {
  if (isCyclic(graph)) {
    throw Error("Cannot retrieve descendants in a graph that contains cycles.");
  }

  let result: Set<T1> = new Set();

  for (const child of children(graph, vertex)) {
    result = new Set([...result, child, ...descendants(graph, child)]);
  }

  return result;
};

/**
 * Returns all the edges in the graph (i.e. any edge with a value other than
 * `0`).
 */
export const edges = <T extends string = string>(
  graph: Graph<T>,
  options?: { undirected?: boolean },
): Set<Edge<T>> => {
  if (options?.undirected && !isUndirected(graph)) {
    throw Error("Expected undirected graph, but got a directed graph.");
  }

  const resolvedGraph = options?.undirected ? toDirected(graph) : graph;
  const result: Set<Edge<T>> = new Set([]);
  const vertices = Object.keys(resolvedGraph) as Array<T>;

  for (const u of vertices) {
    for (const v of vertices) {
      if (resolvedGraph[u][v] !== 0) {
        result.add([u, v]);
      }
    }
  }

  return result;
};

/**
 * Converts a graph from a [D3Graph](#D3Graph) representation into a
 * [Graph](#Graph) representation.
 *
 * When the D3Graph contains multiple links between two nodes the resulting
 * graph will have inflated edge weights to reflect that.
 *
 * **Note**: Any extraneous data associated with nodes or links in the D3Graph representation will be ignored.
 *
 * Also see:
 *
 * - [toD3](#toD3)
 *
 * @example
 * ```js
 * const graph = fromD3({
 *   nodes: [{ id: "A" }, { id: "B" }, { id: "C" }],
 *   links: [
 *     { source: "A", target: "B" },
 *     { source: "A", target: "C" },
 *     { source: "A", target: "C" },
 *   ],
 * });
 * //=> Graph { "A" -> "B", "A" -> "C" }
 *
 * getEdge(["A", "B"]);
 * //=> 1
 * getEdge(["A", "C"]);
 * //=> 2
 * ```
 */
export const fromD3 = <T extends string = string>(
  d3Graph: D3Graph<T>,
  options?: { undirected?: boolean },
): Graph<T> => {
  const result = {} as Graph<T>;

  for (const u of d3Graph.nodes) {
    result[u.id] = {} as Graph<T>[T];
    for (const v of d3Graph.nodes) {
      result[u.id][v.id] = 0;
    }
  }

  for (const { source: u, target: v } of d3Graph.links) {
    result[u][v] = result[u][v] === 0 ? 1 : result[u][v] + 1;
    if (options?.undirected && u !== v) result[v][u] = result[v][u] === 0 ? 1 : result[v][u] + 1;
  }

  return result;
};

/**
 * Get the weight of the given edge.
 *
 * Also see:
 *
 * - [addEdge](#addEdge)
 * - [removeEdge](#removeEdge)
 * - [setEdge](#setEdge)
 */
export const getEdge = <T extends string = string>(graph: Graph<T>, [u, v]: Edge<T>): number =>
  graph[u][v];

/**
 * Returns the [indegree](https://en.wikipedia.org/wiki/Indegree) for the given
 * vertex.
 *
 * By default `weighted` is `false`, if set to `true` the result will be the sum
 * of the edge weights (which could be zero or a negative value).
 *
 * Also see:
 *
 * - [degree](#degree)
 * - [outdegree](#outdegree)
 */
export const indegree = <T1 extends string = string, T2 extends T1 = T1>(
  graph: Graph<T1>,
  vertex: T2,
  options?: { weighted?: boolean },
): number => {
  let result = 0;

  for (const u in graph) {
    if (graph[u][vertex] !== 0) {
      result += options?.weighted ? graph[u][vertex] : 1;
    }
  }

  return result;
};

/**
 * Returns `true` if the graph provided contains any
 * [cycles](<https://en.wikipedia.org/wiki/Cycle_(graph_theory)>) (including
 * "loops" — an edge that starts and ends at the same vertex), otherwise returns
 * `false`.
 */
export const isCyclic = (graph: Graph, options?: { undirected?: boolean }): boolean => {
  if (options?.undirected && !isUndirected(graph)) {
    throw Error("Expected undirected graph, but got a directed graph.");
  }

  const visited: Set<string> = new Set();

  for (const i in graph) {
    const cycleFound = visited.has(i)
      ? false
      : options?.undirected
        ? _isCyclicUndirected(graph, visited, undefined, i)
        : _isCyclicDirected(graph, visited, new Set(), i);
    if (cycleFound) return true;
  }

  return false;
};

const _isCyclicDirected = (
  graph: Graph,
  visited: Set<string>,
  path: Set<string>,
  vertex: string,
): boolean => {
  visited.add(vertex);
  path.add(vertex);

  for (const i in graph[vertex]) {
    if (graph[vertex][i] !== 0) {
      const cycleFound = path.has(i) ? true : _isCyclicDirected(graph, visited, path, i);
      if (cycleFound) return true;
    }
  }

  path.delete(vertex);

  return false;
};

const _isCyclicUndirected = (
  graph: Graph,
  visited: Set<string>,
  parent: string | undefined,
  vertex: string,
): boolean => {
  visited.add(vertex);

  for (const i in graph[vertex]) {
    if (graph[vertex][i] !== 0) {
      const cycleFound = visited.has(i)
        ? i !== parent
        : _isCyclicUndirected(graph, visited, vertex, i);
      if (cycleFound) return true;
    }
  }

  return false;
};

/**
 * Returns `true` if the graph can be considered an [undirected
 * graph](https://mathinsight.org/definition/undirected_graph) — every edge in
 * the graph (from vertex A to B) has a mutual edge (from vertex B to A) with an
 * equal weight. Loops are considered bidirectional and are allow in a
 * undirected graph.
 *
 * @example
 * ```js
 * let graph = create(["A", "B"]);
 * //=> Graph { "A", "B" }
 *
 * isUndirected(graph);
 * //=> true
 *
 * graph = addEdge(graph, ["A", "B"]);
 * //=> Graph { "A" -> "B" }
 *
 * isUndirected(graph);
 * //=> false
 *
 * graph = addEdge(graph, ["B", "A"]);
 * //=> Graph { "A" <-> "B" }
 *
 * isUndirected(graph);
 * //=> true
 * ```
 */
export const isUndirected = (graph: Graph): boolean => {
  for (const [u, v] of vertexPairs(graph)) {
    if (graph[u]?.[v] !== graph[v]?.[u]) return false;
  }
  return true;
};

/**
 * Converts a directed graph to an undirected graph by either adding edges to
 * make them mutual or balancing the weights of mutual edges that aren't already
 * equal.
 *
 * The `merge` function is used to determine the weight of edges in cases where
 * mutual edges with differing weights already exist. If not provide the default
 * method is to use the highest of the two edge weights (`(a, b) => Math.max(a,
 * b)`).
 *
 * @example
 * ```js
 * let graph = create(["A", "B", "C"]);
 * //=> Graph { "A", "B", "C" }
 *
 * graph = addEdge(graph, ["A", "B"]);
 * //=> Graph { "A" -> "B", "C" }
 *
 * graph = makeUndirected(graph);
 * //=> Graph { "A" <-> "B", "C" }
 * ```
 */
export const makeUndirected = <T extends string = string>(
  graph: Graph<T>,
  merge: (a: number, b: number) => number = (a, b) => Math.max(a, b),
): Graph<T> => {
  const result = clone(graph);

  for (const [u, v] of vertexPairs(graph)) {
    const weight =
      u === v || graph[u][v] === 0 || graph[v][u] === 0
        ? graph[u][v] || graph[v][u]
        : merge(graph[u][v], graph[v][u]);
    result[u][v] = weight;
    result[v][u] = weight;
  }

  return result;
};

/**
 * Returns the number of vertices in the graph.
 *
 * Also see:
 *
 * - [size](#size)
 *
 * @example
 * ```js
 * let graph = create(["A", "B", "C"]);
 * //=> Graph { "A", "B", "C" }
 *
 * order(graph);
 * //=> 3
 * ```
 */
export const order = (graph: Graph): number => {
  let result = 0;
  for (const _ in graph) result += 1;
  return result;
};

/**
 * Returns the [outdegree](https://en.wikipedia.org/wiki/Outdegree) for the
 * given vertex.
 *
 * By default `weighted` is `false`, if set to `true` the result will be the sum
 * of the edge weights (which could be zero or a negative value).
 *
 * Also see:
 *
 * - [degree](#degree)
 * - [indegree](#indegree)
 */
export const outdegree = <T1 extends string = string, T2 extends T1 = T1>(
  graph: Graph<T1>,
  vertex: T2,
  options?: { weighted?: boolean },
): number => {
  let result = 0;

  for (const v in graph[vertex]) {
    if (graph[vertex][v] !== 0) {
      result += options?.weighted ? graph[vertex][v] : 1;
    }
  }

  return result;
};

/**
 * Returns all the vertices that are parents of the given vertex (i.e. there is
 * an edge starting at the parent vertex going to the given vertex).
 *
 * **Note**: If there is an edge that both starts and ends at the given vertex,
 * it will be considered a parent of itself and included in the result.
 *
 * Also see:
 *
 * - [ancestors](#ancestors)
 * - [children](#children)
 */
export const parents = <T1 extends string = string, T2 extends T1 = T1>(
  graph: Graph<T1>,
  vertex: T2,
): Set<T1> => {
  const result: Set<T1> = new Set();

  for (const u in graph) {
    if (graph[u][vertex] !== 0) {
      result.add(u);
    }
  }

  return result;
};

/**
 * Removes an edge from a graph.
 *
 * **Note**: `removeEdge(graph, edge)` is equivalent to `setEdge(graph, edge, 0)`.
 *
 * Also see:
 *
 * - [addEdge](#addEdge)
 * - [getEdge](#getEdge)
 * - [setEdge](#setEdge)
 *
 * @example
 * ```js
 * let graph = create(["A", "B", "C"]);
 * //=> Graph { "A", "B", "C" }
 *
 * graph = addEdge(graph, ["A", "B"]);
 * //=> Graph { "A" -> "B", "C" }
 *
 * graph = removeEdge(graph, ["A", "B"]);
 * //=> Graph { "A", "B", "C" }
 * ```
 */
export const removeEdge = <T1 extends string = string, T2 extends T1 = T1>(
  graph: Graph<T1>,
  [u, v]: [T2, T2],
  options?: { undirected?: boolean },
): Graph<T1> => {
  const result = clone(graph);

  result[u][v] = 0;
  if (options?.undirected) result[v][u] = 0;

  return result;
};

/**
 * Removes a vertex from a graph.
 *
 * Also see:
 *
 * - [addVertex](#addVertex)
 */
export const removeVertex = <T1 extends string = string, T2 extends T1 = T1>(
  graph: Graph<T1>,
  vertex: T2,
): Graph<Exclude<T1, T2>> => {
  const result = {} as Graph<Exclude<T1, T2>>;
  const vertices = Object.keys(graph) as Array<T1>;
  const newVertices = vertices.filter((x): x is Exclude<T1, T2> => x !== vertex);

  for (const u of newVertices) {
    result[u] = {} as Graph<Exclude<T1, T2>>[Exclude<T1, T2>];
    for (const v of newVertices) {
      result[u][v] = graph[u][v];
    }
  }

  return result;
};

/**
 * Set the weight of the given edge.
 *
 * **Note**: `setEdge(graph, edge, 1)` is equivalent to `addEdge(graph, edge)`
 * and `setEdge(graph, edge, 0)` is equivalent to `removeEdge(graph, edge)`.
 *
 * Also see:
 *
 * - [addEdge](#addEdge)
 * - [getEdge](#getEdge)
 * - [removeEdge](#removeEdge)
 *
 * @example
 * ```js
 * let graph = create(["A", "B", "C"]);
 * //=> Graph { "A", "B", "C" }
 *
 * graph = setEdge(graph, ["A", "B"], 1);
 * //=> Graph { "A" -> "B", "C" }
 *
 * graph = setEdge(graph, ["A", "B"], 0);
 * //=> Graph { "A", "B", "C" }
 * ```
 */
export const setEdge = <T extends string = string>(
  graph: Graph<T>,
  [u, v]: Edge<T>,
  weight: number,
  options?: { undirected?: boolean },
): Graph<T> => {
  const result = clone(graph);

  result[u][v] = weight;
  if (options?.undirected) result[v][u] = weight;

  return result;
};

/**
 * Returns the number of edges in the graph.
 *
 * Also see:
 *
 * - [order](#order)
 *
 * @example
 * ```js
 * let graph = create(["A", "B", "C"]);
 * //=> Graph { "A", "B", "C" }
 *
 * graph = addEdge(graph, ["A", "B"]);
 * //=> Graph { "A" -> "B", "C" }
 *
 * graph = addEdge(graph, ["B", "C"]);
 * //=> Graph { "A" -> "B", "B" -> "C" }
 *
 * size(graph);
 * //=> 2
 * ```
 */
export const size = (graph: Graph, options?: { undirected?: boolean }): number => {
  if (options?.undirected && !isUndirected(graph)) {
    throw Error("Expected undirected graph, but got a directed graph.");
  }

  const resolvedGraph = options?.undirected ? toDirected(graph) : graph;
  let result = 0;

  for (const u in resolvedGraph) {
    for (const v in resolvedGraph[u]) {
      if (resolvedGraph[u][v] !== 0) {
        result += 1;
      }
    }
  }

  return result;
};

/**
 * Converts a graph from a [Graph](#Graph) representation into a [D3Graph](#D3Graph) representation.
 *
 * Edges with a weight of 2 or greater will result in multiple links being generated in the D3Graph.
 *
 * Also see:
 *
 * - [fromD3](#fromD3)
 *
 * @example
 * ```js
 * let graph = create(["A", "B", "C"]);
 * //=> Graph { "A", "B", "C" }
 *
 * graph = setEdge(graph, ["A", "B"], 1);
 * //=> Graph { "A" -> "B", "C" }
 *
 * graph = setEdge(graph, ["A", "C"], 2);
 * //=> Graph { "A" -> "B", "A" -> "C" }
 *
 * toD3(graph);
 * //=> {
 * //     nodes: [{ id: "A" }, { id: "B" }, { id: "C" }],
 * //     links: [
 * //       { source: "A", target: "B" },
 * //       { source: "A", target: "C" },
 * //       { source: "A", target: "C" },
 * //     ],
 * //   }
 * ```
 */
export const toD3 = <T extends string = string>(
  graph: Graph<T>,
  options?: { undirected?: boolean },
): D3Graph<T> => {
  if (options?.undirected && !isUndirected(graph)) {
    throw Error("Expected undirected graph, but got a directed graph.");
  }

  const resolvedGraph = options?.undirected ? toDirected(graph) : graph;
  const nodes: Array<{ id: T }> = [];
  const links: Array<{ source: T; target: T }> = [];
  const vertices = Object.keys(resolvedGraph) as Array<T>;

  for (const u of vertices) {
    nodes[nodes.length] = { id: u };
    for (const v of vertices) {
      if (resolvedGraph[u][v] !== 0) {
        let i = resolvedGraph[u][v];
        do {
          links.push({ source: u, target: v });
          i -= 1;
        } while (i > 0);
      }
    }
  }

  return { nodes, links };
};

/**
 * Converts an undirected graph to a directed graph by converting reciprocal
 * edges to a single directed edge.
 */
export const toDirected = <T extends string = string>(graph: Graph<T>): Graph<T> => {
  if (!isUndirected(graph)) {
    return graph;
  }

  const result = {} as Graph<T>;
  const vertices = Object.keys(graph) as Array<T>;

  for (let u = 0; u < vertices.length; u++) {
    const uVertex = vertices[u] as T;
    result[uVertex] = {} as Graph<T>[T];
    for (let v = 0; v < vertices.length; v++) {
      const vVertex = vertices[v] as T;
      result[uVertex][vVertex] = v >= u ? graph[uVertex][vVertex] : 0;
    }
  }

  return result;
};

/**
 * Given a [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph), returns
 * an array of the graph's vertices sorted using a [topological
 * sort](https://en.wikipedia.org/wiki/Topological_sorting).
 *
 * **Note**: If the given graph contains cycles (checked with
 * [isCyclic](#isCyclic)), an error will be thrown.
 *
 * @example
 * ```js
 * let graph = create(["A", "B", "C"]);
 * //=> Graph { "A", "B", "C" }
 *
 * graph = addEdge(graph, ["A", "C"]);
 * //=> Graph { "A" -> "C", "B" }
 *
 * graph = addEdge(graph, ["C", "B"]);
 * //=> Graph { "A" -> "C", "C" -> "B" }
 *
 * topologicalSort(graph);
 * //=> ["A", "C", "B"]
 * ```
 */
export const topologicalSort = (graph: Graph): Array<string> => {
  if (isCyclic(graph)) throw Error("Cannot sort a graph that contains cycles.");

  const result: Array<string> = [];
  const visited: Set<string> = new Set();
  const queue: Array<string> = [];
  const indegrees: { [id: string]: number } = {};
  const vertices = Object.keys(graph);

  for (const v of vertices) {
    indegrees[v] = indegree(graph, v);
  }

  for (const i in graph) {
    if (indegrees[i] === 0) {
      queue.push(i);
      visited.add(i);
    }
  }

  while (queue.length !== 0) {
    const v = queue.shift();
    if (v === undefined) continue;
    result.push(v);
    for (const i in graph) {
      if (graph[v]?.[i] !== 0 && !visited.has(i)) {
        indegrees[i] = (indegrees[i] ?? 0) - (graph[v]?.[i] ?? 0);
        if (indegrees[i] <= 0) {
          queue.push(i);
          visited.add(i);
        }
      }
    }
  }

  return result;
};

/**
 * Flips the orientation of all edges in a directed graph.
 *
 * @example
 * ```js
 * let graph = create(["A", "B", "C"]);
 * //=> Graph { "A", "B", "C" }
 *
 * graph = addEdge(graph, ["A", "B"]);
 * //=> Graph { "A" -> "B", "C" }
 *
 * graph = addEdge(graph, ["B", "C"]);
 * //=> Graph { "A" -> "B", "B" -> "C" }
 *
 * transpose(graph);
 * //=> Graph { "B" -> "A", "C" -> "B" }
 * ```
 */
export const transpose = <T extends string = string>(graph: Graph<T>): Graph<T> => {
  const result = {} as Graph<T>;
  const vertices = Object.keys(graph) as Array<T>;

  for (const u of vertices) {
    result[u] = {} as Graph<T>[T];
    for (const v of vertices) {
      result[u][v] = graph[v][u];
    }
  }

  return result;
};

/**
 * Returns the vertices in the graph.
 */
export const vertices = <T extends string = string>(graph: Graph<T>): Set<T> =>
  new Set<T>(Object.keys(graph) as Array<T>);

/**
 * Returns a list of all pairs of vertices in the graph irrespective of the edges present in the graph.
 *
 * @example
 * ```js
 * let graph = create(["A", "B", "C"]);
 * //=> Graph { "A", "B", "C" }
 *
 * vertexPairs(graph);
 * //=> Set { ["A", "A"], ["A", "B"], ["A", "C"], ["B", "B"], ["B", "C"], ["C", "C"] }
 * ```
 */
export const vertexPairs = <T extends string = string>(graph: Graph<T>): Set<Edge<T>> => {
  const result: Set<Edge<T>> = new Set();
  const vertices = Object.keys(graph) as Array<T>;

  for (let u = 0; u < vertices.length; u++) {
    for (let v = u; v < vertices.length; v++) {
      result.add([vertices[u] as T, vertices[v] as T]);
    }
  }

  return result;
};
