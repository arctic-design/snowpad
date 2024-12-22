import { Node, Edge } from '@xyflow/react';

const position = { x: 0, y: 0 };

// Transform null values to a readable format
const transformData = (value: any): string | any =>
  value === null ? 'null' : value;

// Create a node
const createNode = (
  id: string,
  label: string | Record<string, string>
): Node => ({
  id,
  type: 'custom',
  position,
  data: { label, nodeType: 'string' },
});

// Create an edge
const createEdge = (source: string, target: string): Edge => ({
  id: `e-${source}-${target}`,
  source,
  target,
  deletable: false,
});

// Optimized function to find primitives
const findPrimitives = (data: any): Record<string, string> => {
  let primitivesRecord: Record<string, string> = {};
  for (const [key, value] of Object.entries(data)) {
    if (
      (typeof value !== 'object' || value === null) &&
      !Array.isArray(value)
    ) {
      primitivesRecord[key] = transformData(value) + '';
    }
  }
  return primitivesRecord;
};

// Main function to generate nodes and edges
export const generateFlowData = (
  data: any,
  parentId: string | null = null
): { nodes: Node[]; edges: Edge[] } => {
  let nodeIdCounter = 0; // Initialize nodeIdCounter inside the function

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const processData = (data: any, parentId: string | null): void => {
    let currentParentId = parentId;

    if (typeof data !== 'object' || data === null) {
      // Process primitives
      const primitiveNodeId = `node-${nodeIdCounter++}`;
      nodes.push(createNode(primitiveNodeId, transformData(data)));
      if (currentParentId) {
        edges.push(createEdge(currentParentId, primitiveNodeId));
      }
    } else if (Array.isArray(data)) {
      if (!currentParentId) {
        currentParentId = `node-${nodeIdCounter++}`;
      }
      for (const dataItem of data) {
        processData(dataItem, currentParentId);
      }
    } else {
      const primitives = findPrimitives(data);

      if (Object.keys(primitives).length > 0) {
        const primitivesNodeId = `node-${nodeIdCounter++}`;
        nodes.push(createNode(primitivesNodeId, primitives));

        if (currentParentId) {
          edges.push(createEdge(currentParentId, primitivesNodeId));
        }

        currentParentId = primitivesNodeId;
      }

      for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'object' && value !== null) {
          const objectNodeId = `node-${nodeIdCounter++}`;

          nodes.push(
            createNode(
              objectNodeId,
              Array.isArray(value) ? `${key}(${value.length})` : key
            )
          );

          if (currentParentId) {
            edges.push(createEdge(currentParentId, objectNodeId));
          }

          processData(value, objectNodeId);
        }
      }
    }
  };

  processData(data, parentId);

  return { nodes, edges };
};
