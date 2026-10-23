import type { FlowGraph } from '../models/graph';

export interface ValidationError { message: string; }

export function validateGraph(graph: FlowGraph): ValidationError[] {
  const errors: ValidationError[] = [];
  const ids = new Set<string>();
  for (const n of graph.nodes) {
    if (!n.id) errors.push({ message: 'Node missing id' });
    if (ids.has(n.id)) errors.push({ message: `Duplicate node id: ${n.id}` });
    ids.add(n.id);
  }
  const nodeIds = new Set(graph.nodes.map(n => n.id));
  for (const e of graph.edges) {
    if (!nodeIds.has(e.source)) errors.push({ message: `Edge source unknown: ${e.source}` });
    if (!nodeIds.has(e.target)) errors.push({ message: `Edge target unknown: ${e.target}` });
  }
  // unreachable nodes (no path from a start node)
  const starts = graph.nodes.filter(n => n.type === 'start');
  if (starts.length) {
    const adj = new Map<string, string[]>();
    for (const n of graph.nodes) adj.set(n.id, []);
    for (const e of graph.edges) adj.get(e.source)?.push(e.target);
    const seen = new Set<string>();
    const stack = starts.map(s => s.id);
    while (stack.length) {
      const cur = stack.pop()!;
      if (seen.has(cur)) continue;
      seen.add(cur);
      for (const t of adj.get(cur) || []) if (!seen.has(t)) stack.push(t);
    }
    for (const n of graph.nodes) {
      if (n.type !== 'start' && !seen.has(n.id)) errors.push({ message: `Unreachable node: ${n.id}` });
    }
  }
  return errors;
}
