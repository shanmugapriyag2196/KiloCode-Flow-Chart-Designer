export type NodeType = 'start' | 'end' | 'process' | 'decision' | 'inputOutput' | 'connector' | 'notification' | 'success';

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
  end: '#22c55e',
  process: '#3b82f6',
  decision: '#f59e0b',
  inputOutput: '#06b6d4',
  connector: '#a855f7',
  notification: '#ec4899',
  success: '#16a34a',
};
