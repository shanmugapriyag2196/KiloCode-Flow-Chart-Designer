import type { FlowGraph } from '../models/graph';

export function autoLayout(graph: FlowGraph): FlowGraph {
  const nodes = graph.nodes.map((n, i) => ({ ...n, position: { x: 250, y: i * 120 } }));
  return { nodes, edges: graph.edges };
}
