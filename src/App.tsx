import { useState, useCallback, useRef } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls, type Node, type Edge, type NodeChange, type EdgeChange, type Connection, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { mockGenerate } from './services/mockGenerator';
import { validateGraph } from './services/validation';
import { NODE_COLORS } from './models/graph';
import type { FlowGraph } from './models/graph';
import CustomNode from './components/CustomNode';
import { toPng } from 'html-to-image';
const nodeTypes = { custom: CustomNode };

function toRF(graph: FlowGraph): { nodes: Node[]; edges: Edge[] } {
  return {
    nodes: (() => { let c = 0; return graph.nodes.map((n) => ({ id: n.id, type: 'custom', position: n.position, data: { label: n.data.label, bg: (NODE_COLORS as any)[n.type].bg, border: (NODE_COLORS as any)[n.type].border, text: (NODE_COLORS as any)[n.type].text, radius: (NODE_COLORS as any)[n.type].radius, badge: (n.type === 'start' || n.type === 'end') ? '' : (++c), type: n.type } })); })(),
    edges: graph.edges.map(e => ({ id: e.id, source: e.source, target: e.target, label: e.label, type: 'step', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, labelStyle: { fontWeight: 'bold', fontSize: 12 }, labelBgStyle: { fill: '#fff', fillOpacity: 0.9 }, labelBgPadding: [4, 6], style: { stroke: '#22c55e', strokeWidth: 2, strokeDasharray: '5 5' } })),
  };
}

export default function App() {
  const [input, setInput] = useState('Start process\nValidate input\nDecide approval?\nProcess request\nEnd');
  const [graph, setGraph] = useState<FlowGraph>(() => mockGenerate('Start process'));
  const [nodes, setNodes] = useState<Node[]>(() => toRF(graph).nodes);
  const [edges, setEdges] = useState<Edge[]>(() => toRF(graph).edges);
  const [errors, setErrors] = useState<string[]>([]);
  const [selected, setSelected] = useState<Node | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg,#0f172a,#1e293b)', color: '#fff' }}>
      <div style={{ padding: 12, background: 'linear-gradient(90deg,#6366f1,#ec4899)', display: 'flex', gap: 10, alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,.3)' }}>
        <img src="/Value-Global.png" alt="VG" style={{ height: 28 }} />
        <strong style={{ fontSize: 18 }}>VG Flowchart Designer</strong>
        <button onClick={regenerate} style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 8 }}>Generate</button>
        <button onClick={downloadImage} style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 8 }}>⬇ Download PNG</button>
      </div>
      <div style={{ flex: 1, display: 'flex', gap: 0, padding: 0 }}>
        <div style={{ width: 300, padding: 12, background: 'rgba(255,255,255,.08)', borderRadius: 0, display: 'flex', flexDirection: 'column', gap: 10, backdropFilter: 'blur(8px)' }}>
          <textarea value={input} onChange={e => setInput(e.target.value)} style={{ flex: 1, borderRadius: 8, border: 'none', padding: 8, color: '#000', background: '#fff' }} />
          <div style={{ color: '#fca5a5', fontSize: 12 }}>{errors.join('; ')}</div>
          {selected && <div style={{ background: 'rgba(255,255,255,.15)', padding: 8, borderRadius: 8 }}><b>Selected:</b> {String((selected.data as any)?.label)}</div>}
        </div>
        <div style={{ flex: 1, borderRadius: 0, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,.4)' }} ref={containerRef}>
          <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onNodeClick={(_, n) => setSelected(n)} fitView fitViewOptions={{ maxZoom: 0.75 }} proOptions={{ hideAttribution: true }}>
            <Background />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
