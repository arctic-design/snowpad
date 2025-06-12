// generateFlowData.ts
import { Node, Edge } from '@xyflow/react';
type Q = { value: any; path: string; parent?: string };

// unchanged
function transformData(val: any): string {
  return val === null ? 'null' : String(val);
}

// now with a third “hideTitle” flag
function createNode(
  id: string,
  label: string | Record<string, string>,
  hideTitle = false
): Node {
  return {
    id,
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {
      // if hideTitle=true, title becomes '', and your CustomNode will skip rendering it
      title: hideTitle ? '' : Array.isArray(label) ? id : id.split('.').pop(),
      label,
      nodeType: 'auto',
    },
  };
}

function createEdge(src: string, tgt: string): Edge {
  return {
    id: `e-${src}-${tgt}`,
    source: src,
    target: tgt,
    animated: false,
    deletable: false,
  };
}

/**
 * Breadth‐first traversal of any JSON-like value.
 * Leaves now get hideTitle=true.
 */
export function generateFlowData(data: any) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const q: Q[] = [{ value: data, path: 'root' }];

  while (q.length) {
    const { value, path, parent } = q.shift()!;

    // detect a primitive leaf
    const isLeaf = value === null || typeof value !== 'object';

    // build the label as before
    let label: string | Record<string, string>;
    if (isLeaf) {
      label = transformData(value);
    } else if (Array.isArray(value)) {
      label = `${path.split('.').pop()}[${value.length}]`;
    } else {
      const rec: Record<string, string> = {};
      for (const [k, v] of Object.entries(value)) {
        if (v === null || typeof v !== 'object') {
          rec[k] = transformData(v);
        }
      }
      label = Object.keys(rec).length ? rec : path.split('.').pop()!;
    }

    // now pass isLeaf into createNode
    nodes.push(createNode(path, label, isLeaf));
    if (parent) edges.push(createEdge(parent, path));

    // enqueue non‐primitives
    if (value && typeof value === 'object') {
      if (Array.isArray(value)) {
        value.forEach((v, i) =>
          q.push({ value: v, path: `${path}[${i}]`, parent: path })
        );
      } else {
        Object.entries(value).forEach(([k, v]) => {
          if (v && typeof v === 'object') {
            q.push({ value: v, path: `${path}.${k}`, parent: path });
          }
        });
      }
    }
  }

  return { nodes, edges };
}
