import { describe, it, expect } from 'vitest';
import { mockGenerate } from '../services/mockGenerator';
import { validateGraph } from '../services/validation';

describe('mockGenerate', () => {
  it('generates nodes and edges', () => {
    const g = mockGenerate('Start\nDecide?');
    expect(g.nodes.length).toBeGreaterThan(0);
    expect(g.edges.length).toBeGreaterThan(0);
  });
});

describe('validateGraph', () => {
  it('detects duplicate ids', () => {
    const g = mockGenerate('a');
    g.nodes.push({ ...g.nodes[0], id: g.nodes[0].id });
    const errs = validateGraph(g);
    expect(errs.some(e => e.message.includes('Duplicate'))).toBe(true);
  });
});
