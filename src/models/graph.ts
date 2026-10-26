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

export const NODE_COLORS: Record<NodeType, { bg: string; border: string; text: string; radius: number | string }> = {
  start: { bg: '#9DF4B7', border: '#00B050', text: '#0B3B18', radius: 9999 },
  end: { bg: '#9DF4B7', border: '#00B050', text: '#0B3B18', radius: 9999 },
  process: { bg: '#E6F0FF', border: '#2B7FFF', text: '#0A2540', radius: 12 },
  decision: { bg: '#FFF6D6', border: '#FFC107', text: '#3E2723', radius: 0 },
  inputOutput: { bg: '#F0E6FF', border: '#8A2BE2', text: '#1E0A3C', radius: 12 },
  connector: { bg: '#F0E6FF', border: '#8A2BE2', text: '#1E0A3C', radius: 12 },
  notification: { bg: '#FFE6F0', border: '#FF3377', text: '#4A041D', radius: 12 },
  success: { bg: '#E2F8E7', border: '#10B981', text: '#064E3B', radius: 12 },
};
