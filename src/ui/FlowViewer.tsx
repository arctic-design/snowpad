'use client';
import dagre from '@dagrejs/dagre';
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  ReactFlowProvider,
  addEdge,
  OnConnect,
  Position,
  Node,
  Edge,
  MarkerType,
  useReactFlow,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { generateFlowData } from '@/utility/generateFlowData';
import { CustomNode } from './CustomNode';

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction: 'LR' | 'TB' = 'LR'
): { nodes: Node[]; edges: Edge[] } => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setGraph({ rankdir: direction });
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const isHorizontal = direction === 'LR';

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes: Node[] = nodes.map((node) => {
    const dagreNode = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: dagreNode.x - nodeWidth / 2,
        y: dagreNode.y - nodeHeight / 2,
      },
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
    };
  });

  return { nodes: layoutedNodes, edges };
};

type FlowViewerProps = {
  jsonData: Record<string, unknown>;
  onFlowCountChange: ({
    nodeCount,
    edgeCount,
  }: {
    nodeCount: number;
    edgeCount: number;
  }) => void;
  sidebarExpanded: boolean;
  isDarkMode?: boolean;
};

const FlowViewerContent: React.FC<FlowViewerProps> = ({
  jsonData,
  onFlowCountChange,
  sidebarExpanded,
  isDarkMode,
}) => {
  const { fitView } = useReactFlow();

  // Memoize the generation and layout of nodes and edges to avoid unnecessary computations
  const layoutedElements = useMemo(() => {
    const { nodes, edges } = generateFlowData(jsonData);
    return getLayoutedElements(nodes, edges);
  }, [jsonData]);

  // Initialize state with memoized nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(
    layoutedElements.nodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    layoutedElements.edges
  );

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  useEffect(() => {
    // Update nodes and edges when layoutedElements change
    setNodes(layoutedElements.nodes);
    setEdges(layoutedElements.edges);
    onFlowCountChange({
      nodeCount: layoutedElements.nodes.length,
      edgeCount: layoutedElements.edges.length,
    });

    // Fit the view to the updated nodes and edges
    fitView();
  }, [layoutedElements, setNodes, setEdges, fitView, onFlowCountChange]);

  useEffect(() => {
    setTimeout(() => {
      fitView({ duration: 500 });
    }, 400);
  }, [sidebarExpanded, fitView]);

  return (
    <ReactFlow
      colorMode={isDarkMode ? 'dark' : 'system'}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      nodeTypes={{ custom: CustomNode }}
      defaultEdgeOptions={{
        animated: true,
        type: 'smoothstep',
        markerEnd: { type: MarkerType.ArrowClosed },
      }}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export const FlowViewer: React.FC<FlowViewerProps> = ({
  jsonData,
  onFlowCountChange,
  ...otherProps
}) => (
  <ReactFlowProvider>
    <FlowViewerContent
      jsonData={jsonData}
      onFlowCountChange={onFlowCountChange}
      {...otherProps}
    />
  </ReactFlowProvider>
);
