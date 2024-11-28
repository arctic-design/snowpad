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

  // Convert `null` values to "null" string
  const transformData = (value: any) => (value === null ? 'null' : value);

  // Handle the case where the root is an array
  if (Array.isArray(data)) {
    data.forEach((element, arrayIndex) => {
      const elementSiblingIndex = currentSiblingIndex + arrayIndex * 5; // Add spacing between top-level items
      const childData = generateFlowData(
        transformData(element),
        null, // No parentId for root array items
        depth,
        elementSiblingIndex
      );
      nodes.push(...childData.nodes);
      edges.push(...childData.edges);
    });

    return { nodes, edges }; // Return early since root is an array
  }

  // Handle primitives (e.g., "name": "John Doe", "age": 30")
  const primitives = Object.entries(data)
    .filter(
      ([_, value]) =>
        !Array.isArray(value) && typeof transformData(value) !== 'object'
    )
    .map(([key, value]) => `${key}: ${transformData(value)}`)
    .join(', ');

  let primitivesNodeId: string | null = null;

  if (primitives) {
    primitivesNodeId = `node-${++nodeIdCounter}`;
    nodes.push({
      id: primitivesNodeId,
      type: 'custom',
      position: {
        x: depth * horizontalSpacing,
        y: currentSiblingIndex * verticalSpacing, // Initial position for root node
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
    ([_, value]) =>
      Array.isArray(value) || typeof transformData(value) === 'object'
  );

  let childVerticalStart = currentSiblingIndex; // Track the vertical starting position for children
  if (nestedObject.length > 0) {
    nestedObject.forEach(([key, value], index) => {
      const isArray = Array.isArray(value);

      const label = `${key}(${isArray ? value.length : 1})`;
      const objectNodeId = `node-${++nodeIdCounter}`;

      // Position child nodes to the right of the parent node
      nodes.push({
        id: objectNodeId,
        type: 'custom',
        position: {
          x: (depth + 1) * horizontalSpacing,
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
          // Handle arrays of strings correctly
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
              transformData(element),
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
          transformData(value),
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
