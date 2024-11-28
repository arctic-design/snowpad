'use client';
import dagre from '@dagrejs/dagre';
import React, { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  MarkerType,
  addEdge,
  OnConnect,
  Node,
  Edge,
  useReactFlow,
  Position,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { generateFlowData } from '@/utility/generateFlowData';
import { CustomNode } from './CustomNode';

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction: 'LR' | 'TB' = 'LR'
): { nodes: Node[]; edges: Edge[] } => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

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
};

const FlowViewerContent: React.FC<FlowViewerProps> = ({ jsonData }) => {
  const { fitView } = useReactFlow();
  const { nodes: initialNodes, edges: initialEdges } =
    generateFlowData(jsonData);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  useEffect(() => {
    const { nodes, edges } = generateFlowData(jsonData);
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);

    fitView();
  }, [jsonData, setNodes, setEdges, fitView]);

  console.log('nodes: ', nodes);
  console.log('edges: ', edges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      nodeTypes={{ custom: CustomNode }}
      defaultEdgeOptions={{
        animated: true,
        // type: 'smoothstep',
        markerEnd: { type: MarkerType.ArrowClosed },
      }}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export const FlowViewer: React.FC<FlowViewerProps> = ({ jsonData }) => (
  <ReactFlowProvider>
    <FlowViewerContent jsonData={jsonData} />
  </ReactFlowProvider>
);
