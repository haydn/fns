import { type DefineConfigItem, defineWorkspace } from "bunup";

const config: DefineConfigItem = {
  entry: ["src/index.ts"],
  format: ["esm"],
};

export default defineWorkspace([
  {
    name: "grid-fns",
    root: "packages/geometry-fns",
    config,
  },
  {
    name: "graph-fns",
    root: "packages/graph-fns",
    config,
  },
  {
    name: "grid-fns",
    root: "packages/grid-fns",
    config,
  },
  {
    name: "linear-fns",
    root: "packages/linear-fns",
    config,
  },
]);
