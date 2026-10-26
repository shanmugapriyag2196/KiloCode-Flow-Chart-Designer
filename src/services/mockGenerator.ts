import type { FlowGraph, FlowNode, FlowEdge, NodeType } from '../models/graph';

export function mockGenerate(_description: string): FlowGraph {
  const N = (id: string, type: NodeType, label: string): FlowNode => ({ id, type, position: { x: 0, y: 0 }, data: { label } });
  const E = (id: string, s: string, t: string, label?: string): FlowEdge => ({ id, source: s, target: t, label });

  const nodes: FlowNode[] = [
    N('start', 'start', 'Start'),
    N('s1', 'process', '1. Get email attachment from Outlook and save to Local Folder'),
    N('s2', 'inputOutput', '2. Amazon Textractor extracts PDF data'),
    N('s3', 'process', '3. Cenpoint login & PO lookup'),
    N('d1', 'decision', 'Is there any PO No?'),
    N('s4', 'notification', '4. Email to Ashley (No PO)'),
    N('s5', 'process', '5. Aggregate Web App'),
    N('s6', 'notification', '6. Email to buyer'),
    N('d2', 'decision', 'Buyer App = Verified?'),
    N('s7', 'success', '7. Export to local folder'),
    N('s8', 'notification', '8. Notify manager'),
    N('s9', 'inputOutput', '9. Lookup PO data'),
    N('s10', 'process', '10. Validate invoice'),
    N('s11', 'notification', '11. Send alert email'),
    N('s12', 'success', '12. Export success'),
    N('s13', 'inputOutput', '13. Extract line items'),
    N('s14', 'notification', '14. Email discrepancy'),
    N('s15', 'success', '15. Load to QuickBooks'),
    N('end', 'end', 'End'),
  ];

  const edges: FlowEdge[] = [
    E('e0', 'start', 's1'),
    E('e1', 's1', 's2'),
    E('e2', 's2', 's3'),
    E('e3', 's3', 'd1'),
    E('e4', 'd1', 's4', 'No'),
    E('e5', 'd1', 's5', 'Yes'),
    E('e6', 's5', 's6'),
    E('e7', 's6', 'd2'),
    E('e8', 'd2', 's7', 'Yes'),
    E('e9', 'd2', 's8', 'No'),
    E('e10', 's7', 's9'),
    E('e11', 's9', 's10'),
    E('e12', 's10', 's11'),
    E('e13', 's11', 's12'),
    E('e14', 's12', 's13'),
    E('e15', 's13', 's14'),
    E('e16', 's14', 's15'),
    E('e17', 's15', 'end'),
    E('e18', 's4', 'end'),
    E('e19', 's8', 'end'),
  ];

  return { nodes, edges };
}
