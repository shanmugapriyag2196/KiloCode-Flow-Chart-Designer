import type { FlowGraph, FlowNode, FlowEdge, NodeType } from '../models/graph';

let counter = 0;
const id = () => `n${++counter}`;

export function mockGenerate(description: string): FlowGraph {
  counter = 0;
  const lines = description.split(/\n|;|\./).map(s => s.trim()).filter(Boolean);
  const nodes: FlowNode[] = [];
  const edges: FlowEdge[] = [];
  const start: FlowNode = { id: id(), type: 'start', position: { x: 0, y: 0 }, data: { label: 'Start' } };
  nodes.push(start);
  let prev = start.id;
  for (const line of lines) {
    const lower = line.toLowerCase();
    let type: NodeType = 'process';
    if (lower.includes('decide') || lower.includes('?') || lower.includes('if ')) type = 'decision';
    if (lower.includes('input') || lower.includes('read')) type = 'inputOutput';
    const n: FlowNode = { id: id(), type, position: { x: 0, y: 0 }, data: { label: line } };
    nodes.push(n);
    edges.push({ id: `e${prev}-${n.id}`, source: prev, target: n.id, label: type === 'decision' ? 'Yes' : undefined });
    if (type === 'decision') {
      const endNode: FlowNode = { id: id(), type: 'end', position: { x: 0, y: 0 }, data: { label: 'End (No)' } };
      nodes.push(endNode);
      edges.push({ id: `e${n.id}-${endNode.id}`, source: n.id, target: endNode.id, label: 'No' });
    }
    prev = n.id;
  }
  const end: FlowNode = { id: id(), type: 'end', position: { x: 0, y: 0 }, data: { label: 'End' } };
  nodes.push(end);
  edges.push({ id: `e${prev}-${end.id}`, source: prev, target: end.id });
  // simple vertical layout
  nodes.forEach((n, i) => { n.position = { x: 250, y: i * 120 }; });
  return { nodes, edges };
}
