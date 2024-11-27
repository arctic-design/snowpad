'use client';
import Dagre from '@dagrejs/dagre';
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
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { generateFlowData } from '@/utility/generateFlowData';
import { CustomNode } from './CustomNode';

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: 'LR' });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    })
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - (node.measured?.width ?? 0) / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

type FlowViewerProps = {
  jsonData: any;
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
    console.log('jsonData: ', jsonData);

    // const layouted = getLayoutedElements(nodes, edges);

    // setNodes([...layouted.nodes]);
    // setEdges([...layouted.edges]);

    window.requestAnimationFrame(() => {
      fitView();
    });

    setNodes(nodes);
    setEdges(edges);
  }, [jsonData, setNodes, setEdges]);

  console.log('nodes: ', nodes);

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
        type: 'smoothstep',
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
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
