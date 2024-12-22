import { memo } from 'react';
import { Handle, NodeProps, Position, Node, NodeTypes } from '@xyflow/react';
import { styled } from '@pigment-css/react';
import { SnowThemeArgs } from '@arctic-kit/snow';
import { CustomNodeDataType } from '@/types';

const StringElementNode = styled.div(
  ({ theme: { vars: theme } }: SnowThemeArgs) => ({
    display: 'inline',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: theme.colors.primary[400],
  })
);

const RecordElementNode = styled.div(
  ({ theme: { vars: theme } }: SnowThemeArgs) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 4,
    '.key': {
      color: theme.colors.primary[400],
    },
  })
);

const NodeContainer = styled.div<{ selected?: boolean }>(
  ({ theme: { vars: theme } }: SnowThemeArgs) => ({
    // minWidth: 120,
    padding: '6px 8px',
    borderRadius: 4,
    // background: theme.colors.neutral[0],
    backgroundColor: theme.colors.grey[50],
    color: theme.colors.neutral[1000],
    border: `1px solid ${theme.colors.grey[900]}`,
  })
);

const NodeContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: 2,
  fontSize: 12,
  fontWeight: 500,
  '.title': {
    fontSize: 14,
  },
});

export const CustomNode = memo(
  ({ data, selected }: NodeProps<Node<CustomNodeDataType>>) => {
    const { label: dataLabel } = data;
    const isString = typeof dataLabel === 'string';
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
            {isString ? (
              <StringElementNode>{dataLabel}</StringElementNode>
            ) : (
              Object.keys(dataLabel).map((item) => (
                <RecordElementNode key={item}>
                  <span className="key">{`${item}:`}</span>
                  <span>{dataLabel[item]}</span>
                </RecordElementNode>
              ))
            )}
          </div>
        </NodeContent>

        {data.nodeType !== 'contract' && (
          <Handle type="source" position={Position.Right} />
        )}
      </NodeContainer>
    );
  }
);

export const nodeTypes = {
  custom: CustomNode,
} satisfies NodeTypes;
