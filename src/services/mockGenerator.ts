import type { FlowGraph, FlowNode, FlowEdge, NodeType } from '../models/graph';

export function mockGenerate(description: string): FlowGraph {
  const lines = description.split(/\n|;|\./).map(s => s.trim()).filter(Boolean);
  const nodes: FlowNode[] = [{ id: 'start', type: 'start', position: { x: 200, y: 0 }, data: { label: 'Start' } }];
  const edges: FlowEdge[] = [];
  let prev = 'start';
  let y = 1;
  let counter = 0;
  const chunk = 5;
  for (const line of lines) {
    counter++;
    const id = `s${counter}`;
    const col = Math.floor((counter - 1) / chunk);
    const rowInChunk = (counter - 1) % chunk;
    const row = col % 2 === 1 ? (chunk - 1 - rowInChunk) : rowInChunk;
    const x = 200 + col * 320;
    const yy = row * 120;
    let type: NodeType = 'process';
    if (lower.includes('decide') || lower.includes('?') || lower.includes('if ')) type = 'decision';
    if (lower.includes('input') || lower.includes('read') || lower.includes('extract')) type = 'inputOutput';
    if (lower.includes('email') || lower.includes('notify') || lower.includes('alert')) type = 'notification';
    if (lower.includes('export') || lower.includes('success') || lower.includes('save')) type = 'success';
    nodes.push({ id, type, position: { x, y: yy }, data: { label: `${counter}. ${line}` } });
    edges.push({ id: `e-${prev}-${id}`, source: prev, target: id });
    if (type === 'decision') {
      const noId = `${id}-no`;
      const yesId = `${id}-yes`;
      nodes.push({ id: noId, type: 'notification', position: { x: 20, y: (y + 1) * 120 }, data: { label: 'No branch' } });
      nodes.push({ id: yesId, type: 'process', position: { x: 380, y: (y + 1) * 120 }, data: { label: 'Yes branch' } });
      edges.push({ id: `e-${id}-${noId}`, source: id, target: noId, label: 'No' });
      edges.push({ id: `e-${id}-${yesId}`, source: id, target: yesId, label: 'Yes' });
      prev = yesId;
      y += 2;
    } else {
      prev = id;
      y++;
    }
  }
  nodes.push({ id: 'end', type: 'end', position: { x: 200, y: y * 120 }, data: { label: 'End' } });
  edges.push({ id: `e-${prev}-end`, source: prev, target: 'end' });
  return { nodes, edges };
}
