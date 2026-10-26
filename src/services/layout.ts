import type { FlowGraph } from '../models/graph';

export function autoLayout(graph: FlowGraph): FlowGraph {
  const half = Math.ceil(graph.nodes.length / 2);
  const nodes = graph.nodes.map((n, i) => {
    const col = i < half ? 0 : 1;
    const row = col === 0 ? i : i - half;
    return { ...n, position: { x: 200 + col * 320, y: row * 110 } };
  });
  return { nodes, edges: graph.edges };
}
