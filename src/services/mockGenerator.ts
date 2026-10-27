import type { FlowGraph, FlowNode, FlowEdge, NodeType } from '../models/graph';

export function mockGenerate(_description: string): FlowGraph {
  const N = (id: string, type: NodeType, label: string, x: number, y: number): FlowNode => ({ id, type, position: { x, y }, data: { label } });
  const E = (id: string, s: string, t: string, label?: string): FlowEdge => ({ id, source: s, target: t, label });

  const L = 200, R = 560, S = 120;
  const nodes: FlowNode[] = [
    N('start', 'start', 'Start', L, 0),
    N('s1', 'process', '1. Get an email attachment from Outlook and save it to Local Folder.', L, 1*S),
    N('s2', 'inputOutput', '2. Extract information from PDF using Amazon Textractor and save it in Excel.', L, 2*S),
    N('s3', 'process', '3. Login Cenpoint application, Enter Purchase Order No and Get their buyer name.', L, 3*S),
    N('d1', 'decision', 'Is there any PO No?', L, 4*S),
    N('s4', 'notification', '4. Send an email to Ashley.', L-180, 5*S),
    N('s5', 'process', '5. Login Aggregate Web App. Extract Excel details into Web App.', L+180, 5*S),
    N('s6', 'notification', '6. Send an Email to buyer get their account number.', L+180, 6*S),
    N('d2', 'decision', 'Buyer App = Verified?', L+180, 7*S),
    N('s7', 'success', '7. Export into Local folder.', L+180, 8*S),
    N('s8', 'notification', '8. Send an email to Ashley, these invoices is verified.', L, 8*S),
    N('s9', 'inputOutput', '9. Bot find If Account No is Presented Replace Verified into Completed...', L, 9*S),
    N('s10', 'process', '10. Bot Change Verified to Completed in Web App.', L, 10*S),
    N('d3', 'decision', 'Buyer App = Completed?', R, 4*S),
    N('d4', 'decision', 'Manager App = Yes?', R, 6*S),
    N('s12', 'success', '12. Export into Local folder.', R+180, 7*S),
    N('s13', 'inputOutput', '13. Load these files into Quickbook.', R+180, 8*S),
    N('s14', 'notification', '14. Send an email to Ashley, these invoices is verified.', R, 9*S),
    N('s15', 'process', '15. Bot Change Verified to Done in Web App.', R, 10*S),
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
    E('e12', 's10', 'd3'),
    E('e13', 'd3', 'd4', 'Yes'),
    E('e14', 'd3', 's14', 'No'),
    E('e15', 'd4', 's12', 'Yes'),
    E('e16', 'd4', 's14', 'No'),
    E('e17', 's12', 's13'),
    E('e18', 's13', 's15'),
    E('e19', 's14', 's15'),
    E('e20', 's15', 'end'),
  ];

  return { nodes, edges };
}
