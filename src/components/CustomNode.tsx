import { Handle, Position } from '@xyflow/react';

export default function CustomNode({ data, id }: any) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 12, background: data.bg || '#E6F0FF', border: `2px solid ${data.border || '#2B7FFF'}`, minWidth: 220, maxWidth: 300, boxShadow: '0 4px 6px -1px rgba(0,0,0,.05)', fontFamily: 'Inter,system-ui,sans-serif' }}>
      <Handle type="target" position={Position.Top} />
      <div style={{ width: 24, height: 24, borderRadius: '50%', background: data.border || '#2B7FFF', color: '#fff', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{data.badge || id}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#0A2540', lineHeight: 1.4, textAlign: 'left' }}>{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
