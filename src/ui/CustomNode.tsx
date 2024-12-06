import { memo } from 'react';
import { Handle, NodeProps, Position, Node } from '@xyflow/react';
import { styled } from '@pigment-css/react';
import { SnowThemeArgs } from '@arctic-kit/snow';

const NodeContainer = styled.div<{ selected?: boolean }>(
  ({ theme: { vars: theme } }: SnowThemeArgs) => ({
    minWidth: 120,
    padding: 8,
    borderRadius: 4,
    background: theme.colors.neutral[0],
    color: theme.colors.neutral[1000],
    border: `1px solid ${theme.colors.grey[900]}`,
  })
);

const NodeContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: 2,
  fontSize: 11,
  fontWeight: 500,
  '.title': {
    fontSize: 10,
  },
});

export type CustomNodeDataType = {
  label: string;
  nodeType: 'org' | 'tenant' | 'contract';
  title: string;
};

export const CustomNode = memo(
  ({ data, selected }: NodeProps<Node<CustomNodeDataType>>) => {
    return (
      <NodeContainer>
        {data.nodeType !== 'org' && (
          <Handle type="target" position={Position.Left} />
        )}
        <NodeContent>
          <div className="title">{data.title}</div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            {data.label.split(', ').map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </NodeContent>

        {data.nodeType !== 'contract' && (
          <Handle type="source" position={Position.Right} />
        )}
      </NodeContainer>
    );
  }
);
