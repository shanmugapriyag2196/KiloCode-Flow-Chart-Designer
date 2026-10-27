import { Handle, Position } from '@xyflow/react';

export default function CustomNode({ data }: any) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px', borderRadius: data.radius === 9999 ? 9999 : (data.radius === 0 ? 0 : 8), clipPath: data.radius === 0 ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : undefined, background: data.bg, border: `2px solid ${data.border}`, width: 210, boxShadow: '0 2px 4px rgba(0,0,0,.05)', fontFamily: 'Inter,system-ui,sans-serif', color: data.text }}>
      <Handle type="target" position={Position.Top} />
      {data.badge && <div style={{ width: 20, height: 20, borderRadius: '50%', background: data.border, color: '#fff', fontWeight: 700, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{data.badge}</div>}
      <div style={{ fontSize: 11, fontWeight: 600, lineHeight: 1.2, textAlign: 'left' }}>{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
