import { Handle, Position } from '@xyflow/react';

export default function CustomNode({ data }: any) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: data.radius === 9999 ? 9999 : (data.radius === 0 ? 0 : 12), clipPath: data.radius === 0 ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : undefined, background: data.bg, border: `2px solid ${data.border}`, width: 250, boxShadow: '0 4px 6px -1px rgba(0,0,0,.05)', fontFamily: 'Inter,system-ui,sans-serif', color: data.text }}>
      <Handle type="target" position={Position.Top} />
      {data.badge && <div style={{ width: 24, height: 24, borderRadius: '50%', background: data.border, color: '#fff', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{data.badge}</div>}
      <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3, textAlign: 'left' }}>{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
