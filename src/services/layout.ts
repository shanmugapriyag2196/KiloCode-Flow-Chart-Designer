import dagre from '@dagrejs/dagre';
import type { FlowGraph } from '../models/graph';

export function autoLayout(graph: FlowGraph): FlowGraph {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: 'TB', nodesep: 60, ranksep: 80 });
  for (const n of graph.nodes) g.setNode(n.id, { width: 140, height: 60 });
  for (const e of graph.edges) g.setEdge(e.source, e.target);
  dagre.layout(g);
  const nodes = graph.nodes.map(n => {
    const pos = g.node(n.id);
    return { ...n, position: { x: pos.x - 70, y: pos.y - 30 } };
  });
  return { nodes, edges: graph.edges };
}
