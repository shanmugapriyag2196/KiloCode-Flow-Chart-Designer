import type { FlowGraph } from '../models/graph';

export function autoLayout(graph: FlowGraph): FlowGraph {
  const adj = new Map<string, { target: string; label?: string }[]>();
  for (const n of graph.nodes) adj.set(n.id, []);
  for (const e of graph.edges) adj.get(e.source)?.push({ target: e.target, label: e.label });

  const depth = new Map<string, number>();
  const offset = new Map<string, number>();
  const roots = graph.nodes.filter(n => n.type === 'start').map(n => n.id);
  if (!roots.length && graph.nodes.length) roots.push(graph.nodes[0].id);
  const queue: string[] = [...roots];
  for (const r of roots) { depth.set(r, 0); offset.set(r, 0); }
  while (queue.length) {
    const cur = queue.shift()!;
    const d = depth.get(cur) || 0;
    const o = offset.get(cur) || 0;
    for (const { target, label } of adj.get(cur) || []) {
      if (!depth.has(target)) {
        depth.set(target, d + 1);
        let newOff = o;
        if (label?.toLowerCase() === 'yes') newOff = o + 200;
        else if (label?.toLowerCase() === 'no') newOff = o - 200;
        offset.set(target, newOff);
        queue.push(target);
      }
    }
  }
  const nodes = graph.nodes.map(n => ({
    ...n,
    position: { x: 300 + (offset.get(n.id) || 0), y: (depth.get(n.id) || 0) * 150 },
  }));
  return { nodes, edges: graph.edges };
}
