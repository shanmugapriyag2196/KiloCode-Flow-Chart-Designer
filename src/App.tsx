import { useState, useCallback, useRef } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls, MiniMap, type Node, type Edge, type NodeChange, type EdgeChange, type Connection } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { mockGenerate } from './services/mockGenerator';
import { validateGraph } from './services/validation';
import { autoLayout } from './services/layout';
import { toPng } from 'html-to-image';
import type { FlowGraph } from './models/graph';

function toRF(graph: FlowGraph): { nodes: Node[]; edges: Edge[] } {
  return {
    nodes: graph.nodes.map(n => ({ id: n.id, type: 'default', position: n.position, data: { label: n.data.label }, style: { background: NODE_COLORS[n.type], color: '#fff', border: 'none', borderRadius: n.type === 'decision' ? 0 : 8, padding: 10, clipPath: n.type === 'decision' ? 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' : undefined, minWidth: 120, textAlign: 'center' as any } })),
    edges: graph.edges.map(e => ({ id: e.id, source: e.source, target: e.target, label: e.label, animated: true })),
  };
}

export default function App() {
  const [input, setInput] = useState('Start process\nValidate input\nDecide approval?\nProcess request\nEnd');
  const [graph, setGraph] = useState<FlowGraph>(() => autoLayout(mockGenerate('Start process\nValidate input\nDecide approval?\nProcess request\nEnd')));
  const [nodes, setNodes] = useState<Node[]>(() => toRF(graph).nodes);
  const [edges, setEdges] = useState<Edge[]>(() => toRF(graph).edges);
  const [errors, setErrors] = useState<string[]>([]);
const [selected, setSelected] = useState<Node | null>(null);
  const downloadImage = async () => {
    if (!containerRef.current) return;
    const dataUrl = await toPng(containerRef.current, { cacheBust: true });
    const a = document.createElement('a');
    a.href = dataUrl; a.download = 'flowchart.png'; a.click();
  };

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

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify({ nodes, edges }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'flowchart.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        setNodes(parsed.nodes || []);
        setEdges(parsed.edges || []);
        setErrors([]);
      } catch { setErrors(['Invalid JSON file']); }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 8, background: '#1e293b', color: '#fff', display: 'flex', gap: 8, alignItems: 'center' }}>
        <strong>Flowchart Designer (Demo/Mock)</strong>
        <button onClick={regenerate}>Generate</button>
        <button onClick={downloadImage}>⬇ Download PNG</button>
        <label style={{ cursor: 'pointer' }}>Import JSON<input type="file" accept="application/json" onChange={importJSON} style={{ display: 'none' }} /></label>
      </div>
      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ width: 280, padding: 8, borderRight: '1px solid #ccc', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <textarea value={input} onChange={e => setInput(e.target.value)} style={{ flex: 1 }} />
          <div style={{ color: 'red', fontSize: 12 }}>{errors.join('; ')}</div>
          {selected && <div><b>Selected:</b> {String((selected.data as any)?.label)}</div>}
        </div>
        <div style={{ flex: 1 }} ref={containerRef}>
          <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onNodeClick={(_, n) => setSelected(n)} fitView>
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
