import type { FlowGraph, FlowNode, FlowEdge, NodeType } from '../models/graph';

export function mockGenerate(description: string): FlowGraph {
  const lines = description.split(/\n|;|\./).map(s => s.trim()).filter(Boolean);
  const nodes: FlowNode[] = [];
  const edges: FlowEdge[] = [];
  let prev: string | null = null;
  let counter = 0;
  const chunk = 5;
  for (const line of lines) {
    counter++;
    const id = `s${counter}`;
    const lower = line.toLowerCase();
    let type: NodeType = 'process';
    if (lower.includes('decide') || lower.includes('?') || lower.includes('if ')) type = 'decision';
    if (lower.includes('input') || lower.includes('read') || lower.includes('extract')) type = 'inputOutput';
    if (lower.includes('email') || lower.includes('notify') || lower.includes('alert')) type = 'notification';
    if (lower.includes('export') || lower.includes('success') || lower.includes('save')) type = 'success';
    const col = Math.floor((counter - 1) / chunk);
    const rowInChunk = (counter - 1) % chunk;
    const row = rowInChunk;
    const x = 200 + col * 320;
    const yy = row * 90;
    nodes.push({ id, type, position: { x, y: yy }, data: { label: `${counter}. ${line}` } });
    if (prev) edges.push({ id: `e-${prev}-${id}`, source: prev, target: id });
    prev = id;
  }
  return { nodes, edges };
}
