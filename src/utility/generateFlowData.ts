import { Node, Edge } from '@xyflow/react';

let nodeIdCounter = 0; // Unique counter for node IDs.
const horizontalSpacing = 200; // Spacing between levels
const verticalSpacing = 100; // Spacing between siblings

export const generateFlowData = (
  data: any,
  parentId: string | null = null,
  depth: number = 0,
  siblingIndex: number = 0
): { nodes: Node[]; edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let currentSiblingIndex = siblingIndex; // Track sibling position for vertical alignment

  // Handle primitives (e.g., "name": "John Doe", "age": 30)
  const primitives = Object.entries(data)
    .filter(([_, value]) => typeof value !== 'object')
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');

  let primitivesNodeId: string | null = null;

  if (primitives) {
    primitivesNodeId = `node-${++nodeIdCounter}`;
    nodes.push({
      id: primitivesNodeId,
      type: 'custom',
      position: {
        x: depth * horizontalSpacing,
        y: currentSiblingIndex * verticalSpacing, // Initial position for Node-1
      },
      data: { label: primitives },
    });

    if (parentId) {
      edges.push({
        id: `e-${parentId}-${primitivesNodeId}`,
        source: parentId,
        target: primitivesNodeId,
        deletable: false,
      });
    }

    currentSiblingIndex++; // Increment sibling index for the next node
  }

  // Handle nested objects and arrays
  const nestedObject = Object.entries(data).filter(
    ([, value]) => typeof value === 'object'
  );

  let childVerticalStart = currentSiblingIndex; // Track the vertical starting position for children
  if (nestedObject.length > 0) {
    nestedObject.forEach(([key, value], index) => {
      const isArray = Array.isArray(value);

      const label = `${key}(${isArray ? value.length : 1})`;
      const objectNodeId = `node-${++nodeIdCounter}`;

      // Position Node-2, Node-3 (child objects) to the right of Node-1
      nodes.push({
        id: objectNodeId,
        type: 'custom',
        position: {
          x: (depth + 1) * horizontalSpacing, // Move to the right of Node-1
          y: currentSiblingIndex * verticalSpacing,
        },
        data: { label },
      });

      edges.push({
        id: `e-${primitivesNodeId || parentId}-${objectNodeId}`,
        source: primitivesNodeId || parentId!,
        target: objectNodeId,
        deletable: false,
      });

      const childStartIndex = currentSiblingIndex; // Track the starting vertical index for children

      if (isArray) {
        if (typeof value[0] === 'string') {
          // Special handling for arrays of strings (e.g., "hobbies")
          value.forEach((element, arrayIndex) => {
            const arrayNodeId = `node-${++nodeIdCounter}`;
            nodes.push({
              id: arrayNodeId,
              type: 'custom',
              position: {
                x: (depth + 2) * horizontalSpacing,
                y: (currentSiblingIndex + arrayIndex) * verticalSpacing,
              },
              data: { label: `${element}` },
            });

            edges.push({
              id: `e-${objectNodeId}-${arrayNodeId}`,
              source: objectNodeId,
              target: arrayNodeId,
              deletable: false,
            });
          });

          currentSiblingIndex += value.length; // Increment for all array elements
        } else {
          // Process arrays of objects (e.g., "address", "roles")
          value.forEach((element, arrayIndex) => {
            const childData = generateFlowData(
              element,
              objectNodeId,
              depth + 2,
              currentSiblingIndex
            );
            nodes.push(...childData.nodes);
            edges.push(...childData.edges);
            currentSiblingIndex++; // Increment for each array element
          });
        }
      } else {
        // Process objects
        const childData = generateFlowData(
          value,
          objectNodeId,
          depth + 2,
          currentSiblingIndex
        );
        nodes.push(...childData.nodes);
        edges.push(...childData.edges);
        currentSiblingIndex++; // Increment for the next sibling
      }

      // Center the parent node (e.g., Node-2) relative to its children
      const childCount = currentSiblingIndex - childStartIndex;
      if (childCount > 1) {
        const parentNode = nodes.find((node) => node.id === objectNodeId);
        if (parentNode) {
          parentNode.position.y =
            ((childStartIndex + currentSiblingIndex - 1) / 2) * verticalSpacing;
        }
      }
    });
  }

  // Center Node-1 relative to its children
  if (nestedObject.length > 0) {
    const childCount = currentSiblingIndex - childVerticalStart;
    if (childCount > 1) {
      const rootNode = nodes.find((node) => node.id === primitivesNodeId);
      if (rootNode) {
        rootNode.position.y =
          ((childVerticalStart + currentSiblingIndex - 1) / 2) *
          verticalSpacing;
      }
    }
  }

  return { nodes, edges };
};
