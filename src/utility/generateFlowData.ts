import { Node, Edge } from '@xyflow/react';

let nodeIdCounter = 0; // Unique counter for node IDs.
const position = { x: 0, y: 0 };

// Transform null values to a readable format
const transformData = (value: any): string | any =>
  value === null ? 'null' : value;

// Create a node
const createNode = (id: string, label: string): Node => ({
  id,
  type: 'custom',
  position,
  data: { label },
});

// Create an edge
const createEdge = (source: string, target: string): Edge => ({
  id: `e-${source}-${target}`,
  source,
  target,
  deletable: false,
});

const findPrimitives = (data: any) => {
  const primitives = Object.entries(data)
    .filter(([_, value]) => typeof value !== 'object' && !Array.isArray(value))
    .map(([key, value]) => `${key}: ${transformData(value)}`)
    .join(', ');

  return primitives;
};

// Main function to generate nodes and edges
export const generateFlowData = (
  data: any,
  parentId: string | null = null
): { nodes: Node[]; edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  let currentParentId = parentId;

  if (typeof data !== 'object') {
    const primitiveNodeId = `node-${++nodeIdCounter}`;
    nodes.push(createNode(primitiveNodeId, data));
    if (currentParentId) {
      edges.push(createEdge(currentParentId, primitiveNodeId));
    }
  } else if (typeof data === 'object') {
    if (!Array.isArray(data)) {
      const primitives = findPrimitives(data);

      if (primitives) {
        const primitivesNodeId = `node-${++nodeIdCounter}`;
        nodes.push(createNode(primitivesNodeId, primitives));

        if (currentParentId) {
          edges.push(createEdge(currentParentId, primitivesNodeId));
        }

        currentParentId = primitivesNodeId;
      }

      Object.entries(data)
        .filter(([_, value]) => typeof value === 'object')
        .forEach(([key, value]) => {
          let objectNodeId = `node-${++nodeIdCounter}`;

          if (Array.isArray(value)) {
            nodes.push(createNode(objectNodeId, `${key}(${value.length})`));
          } else {
            nodes.push(createNode(objectNodeId, `${key}`));
          }
          if (currentParentId) {
            edges.push(createEdge(currentParentId, objectNodeId));
          }

          const childData = generateFlowData(value, objectNodeId);
          nodes.push(...childData.nodes);
          edges.push(...childData.edges);
        });
    } else {
      if (!currentParentId) {
        currentParentId = `node-${++nodeIdCounter}`;
      }
      data.forEach((dataItem) => {
        const childData = generateFlowData(dataItem, currentParentId);
        nodes.push(...childData.nodes);
        edges.push(...childData.edges);
      });
    }
  }

  return { nodes, edges };
};
