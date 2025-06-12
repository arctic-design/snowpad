import { memo } from 'react';
import { Handle, NodeProps, Position, Node, NodeTypes } from '@xyflow/react';
import { styled } from '@pigment-css/react';
import { SnowThemeArgs } from '@arctic-kit/snow';
import { CustomNodeDataType } from '@/types';

const NodeContainer = styled.div<{ selected?: boolean }>(
  ({
    theme: { vars: t },
    selected,
  }: SnowThemeArgs & { selected?: boolean }) => ({
    backgroundColor: selected
      ? t.colors.secondary[100]
      : t.colors.secondary[50],
    border: `1px solid ${
      selected ? t.colors.secondary[500] : t.colors.grey[200]
    }`,
    // color: t.colors.neutral[1000],
    borderRadius: 8,
    boxShadow: selected
      ? `0 4px 12px ${t.colors.grey[400]}`
      : `0 1px 4px ${t.colors.grey[300]}`,
    padding: 8,
    minWidth: 140,
    transition: 'all 0.2s ease',
  })
);

const HeaderBar = styled.div(({ theme: { vars: t } }: SnowThemeArgs) => ({
  backgroundColor: t.colors.secondary[500],
  color: '#fff',
  padding: '4px 6px',
  borderRadius: '6px 6px 0 0',
  fontSize: 12,
  fontWeight: 600,
  margin: '-8px -8px 4px',
}));

const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  fontSize: 12,
  fontWeight: 500,
});

export const CustomNode = memo(
  ({ id, selected, data }: NodeProps<Node<CustomNodeDataType>>) => (
    <NodeContainer selected={selected}>
      <Handle type="target" position={Position.Left} style={{ top: 16 }} />
      {data.title && <HeaderBar>{data.title}</HeaderBar>}
      <Content>
        {typeof data.label === 'string' ? (
          <div>{data.label}</div>
        ) : (
          Object.entries(data.label).map(([k, v]) => (
            <div key={k}>
              <strong
                style={{ color: data.nodeType === 'auto' ? undefined : '#333' }}
              >
                {k}:
              </strong>{' '}
              {v}
            </div>
          ))
        )}
      </Content>
      <Handle type="source" position={Position.Right} style={{ top: 16 }} />
    </NodeContainer>
  )
);

export const nodeTypes = {
  custom: CustomNode,
} satisfies NodeTypes;
