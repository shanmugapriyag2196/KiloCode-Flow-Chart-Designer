import type { FlowGraph, FlowNode, FlowEdge, NodeType } from '../models/graph';

export function mockGenerate(_description: string): FlowGraph {
  const N = (id: string, type: NodeType, label: string, x: number, y: number): FlowNode => ({ id, type, position: { x, y }, data: { label } });
  const E = (id: string, s: string, t: string, label?: string): FlowEdge => ({ id, source: s, target: t, label });

  const L = 200, R = 520, S = 110;
  const nodes: FlowNode[] = [
    N('start', 'start', 'Start', L, 0),
    N('s1', 'process', '1. Get email attachment from Outlook and save to Local Folder', L, 1*S),
    N('s2', 'inputOutput', '2. Amazon Textractor extracts PDF data', L, 2*S),
    N('s3', 'process', '3. Cenpoint login & PO lookup', L, 3*S),
    N('d1', 'decision', 'Is there any PO No?', L, 4*S),
    N('s4', 'notification', '4. Email to Ashley (No PO)', L-160, 5*S),
    N('s5', 'process', '5. Aggregate Web App', L+160, 5*S),
    N('s6', 'notification', '6. Email to buyer', L+160, 6*S),
    N('d2', 'decision', 'Buyer App = Verified?', L+160, 7*S),
    N('s7', 'success', '7. Export to local folder', L+160, 8*S),
    N('s8', 'notification', '8. Notify manager', L, 8*S),
    N('s9', 'inputOutput', '9. Lookup PO data', L, 9*S),
    N('s10', 'process', '10. Validate invoice', L, 10*S),
    N('s11', 'notification', '11. Send alert email', L, 11*S),
    N('d3', 'decision', 'Buyer App = Completed?', R, 4*S),
    N('d4', 'decision', 'Manager App = Yes?', R, 6*S),
    N('s12', 'success', '12. Export success', R+160, 7*S),
    N('s13', 'inputOutput', '13. Extract line items', R+160, 8*S),
    N('s14', 'notification', '14. Email discrepancy', R, 9*S),
    N('s15', 'success', '15. Load to QuickBooks', R, 10*S),
    N('end', 'end', 'End', R, 11*S),
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
    E('e13', 's10', 'd3'),
    E('e14', 'd3', 'd4', 'Yes'),
    E('e15', 'd3', 's14', 'No'),
    E('e16', 'd4', 's12', 'Yes'),
    E('e17', 'd4', 's14', 'No'),
    E('e18', 's12', 's13'),
    E('e19', 's13', 's15'),
    E('e20', 's14', 's15'),
    E('e21', 's15', 'end'),
    E('e22', 's4', 'end'),
    E('e23', 's8', 'end'),
    E('e24', 's11', 'end'),
  ];

  return { nodes, edges };
}
