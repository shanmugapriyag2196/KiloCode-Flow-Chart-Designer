import type { FlowGraph } from '../models/graph';

export function autoLayout(graph: FlowGraph): FlowGraph {
  const half = Math.ceil(graph.nodes.length / 2);
  const nodes = graph.nodes.map((n, i) => {
    if (i < half) {
      return { ...n, position: { x: 200, y: i * 110 } };
    }
    const idx = i - half;
    const row = half - 1 - idx;
    return { ...n, position: { x: 520, y: row * 110 } };
  });
  return { nodes, edges: graph.edges };
}
