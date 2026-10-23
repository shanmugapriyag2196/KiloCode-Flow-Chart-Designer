import { useState, useCallback, useRef } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, type Node, type Edge, type NodeChange, type EdgeChange, type Connection } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { mockGenerate } from './services/mockGenerator';
import { validateGraph } from './services/validation';
import { autoLayout } from './services/layout';
import { NODE_COLORS } from './models/graph';
import type { FlowGraph } from './models/graph';
import { toPng } from 'html-to-image';

function toRF(graph: FlowGraph): { nodes: Node[]; edges: Edge[] } {
  return {
    nodes: graph.nodes.map(n => ({ id: n.id, type: 'default', position: n.position, data: { label: n.data.label }, style: { background: NODE_COLORS[n.type], color: '#fff', border: 'none', borderRadius: n.type === 'start' || n.type === 'end' ? 999 : (n.type === 'decision' ? 0 : 8), padding: 10, clipPath: n.type === 'decision' ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : undefined, minWidth: 120, textAlign: 'center' as any, fontWeight: 600, fontSize: 13, whiteSpace: 'normal' as any, lineHeight: 1.2 } })),
    edges: graph.edges.map(e => ({ id: e.id, source: e.source, target: e.target, label: e.label, animated: true, style: { stroke: '#f472b6', strokeWidth: 2 } })),
  };
}

export default function App() {
  const [input, setInput] = useState('Start process\nValidate input\nDecide approval?\nProcess request\nEnd');
  const [graph, setGraph] = useState<FlowGraph>(() => autoLayout(mockGenerate('Start process\nValidate input\nDecide approval?\nProcess request\nEnd')));
  const [nodes, setNodes] = useState<Node[]>(() => toRF(graph).nodes);
  const [edges, setEdges] = useState<Edge[]>(() => toRF(graph).edges);
  const [errors, setErrors] = useState<string[]>([]);
  const [selected, setSelected] = useState<Node | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const regenerate = useCallback(() => {
    const g = autoLayout(mockGenerate(input));
    setGraph(g);
    const r = toRF(g);
    setNodes(r.nodes);
    setEdges(r.edges);
    setErrors(validateGraph(g).map(e => e.message));
  }, [input]);

  const onNodesChange = useCallback((c: NodeChange[]) => setNodes(nds => applyNodeChanges(c, nds)), []);
  const onEdgesChange = useCallback((c: EdgeChange[]) => setEdges(eds => applyEdgeChanges(c, eds)), []);
  const onConnect = useCallback((conn: Connection) => setEdges(eds => addEdge({ ...conn, id: `e${conn.source}-${conn.target}` }, eds)), []);

  const downloadImage = async () => {
    if (!containerRef.current) return;
    const dataUrl = await toPng(containerRef.current, { cacheBust: true, width: containerRef.current.scrollWidth, height: containerRef.current.scrollHeight });
    const a = document.createElement('a');
    a.href = dataUrl; a.download = 'flowchart.png'; a.click();
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg,#0f172a,#1e293b)', color: '#fff' }}>
      <div style={{ padding: 12, background: 'linear-gradient(90deg,#6366f1,#ec4899)', display: 'flex', gap: 10, alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,.3)' }}>
        <strong style={{ fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 }}><img src="/Value-Global.png" alt="VG" style={{ height: 28 }} /> VG Flowchart Designer</strong>
        <button onClick={regenerate} style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 8 }}>Generate</button>
        <button onClick={downloadImage} style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 8 }}>⬇ Download PNG</button>
      </div>
      <div style={{ flex: 1, display: 'flex', gap: 12, padding: 12 }}>
        <div style={{ width: 300, padding: 12, background: 'rgba(255,255,255,.08)', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 10, backdropFilter: 'blur(8px)' }}>
          <textarea value={input} onChange={e => setInput(e.target.value)} style={{ flex: 1, borderRadius: 8, border: 'none', padding: 8, color: '#000', background: '#fff' }} />
          <div style={{ color: '#fca5a5', fontSize: 12 }}>{errors.join('; ')}</div>
          {selected && <div style={{ background: 'rgba(255,255,255,.15)', padding: 8, borderRadius: 8 }}><b>Selected:</b> {String((selected.data as any)?.label)}</div>}
        </div>
        <div style={{ flex: 1, borderRadius: 12, overflow: 'auto', boxShadow: '0 8px 24px rgba(0,0,0,.4)' }} ref={containerRef}>
          <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onNodeClick={(_, n) => setSelected(n)} fitView>
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
