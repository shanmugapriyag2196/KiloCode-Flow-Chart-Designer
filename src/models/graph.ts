export type NodeType = 'start' | 'end' | 'process' | 'decision' | 'inputOutput' | 'connector';

export interface FlowNodeData {
  label: string;
  [key: string]: unknown;
}

export interface FlowNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: FlowNodeData;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface FlowGraph {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export const NODE_COLORS: Record<NodeType, string> = {
  start: '#22c55e',
  end: '#ef4444',
  process: '#3b82f6',
  decision: '#f59e0b',
  inputOutput: '#8b5cf6',
  connector: '#64748b',
};
