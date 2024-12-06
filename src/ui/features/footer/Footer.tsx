import {
  CheckIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  XCircleIcon,
} from '@arctic-kit/icons';
import { Box, SnowThemeArgs, IconButton } from '@arctic-kit/snow';
import { styled } from '@pigment-css/react';

const FooterContainer = styled.footer(
  ({ theme: { vars: theme } }: SnowThemeArgs) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
    height: 40,
    padding: '4px 8px',
    backgroundColor: 'var(--header-bg-color)',
    color: theme.colors.neutral[1000],
    fontSize: theme.font.size[25],
    borderTop: `1px solid ${theme.colors.grey[500]}`,

    svg: {
      width: 14,
    },
  })
);

type FooterProps = {
  isValid: boolean;
  nodes?: number;
  edges?: number;
  editorHidden?: boolean;
  onToggleEditorHideControl: () => void;
};

export function Footer({
  isValid,
  nodes = 0,
  edges = 0,
  editorHidden,
  onToggleEditorHideControl,
}: FooterProps) {
  return (
    <FooterContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 4,
          }}
        >
          <IconButton onClick={onToggleEditorHideControl} noBorder>
            {editorHidden ? (
              <ChevronDoubleRightIcon />
            ) : (
              <ChevronDoubleLeftIcon />
            )}
          </IconButton>

          <span>
            {isValid ? (
              <CheckIcon
                color="var(--snow-colors-success-main)"
                strokeWidth={2}
              />
            ) : (
              <XCircleIcon
                color="var(--snow-colors-error-main)"
                strokeWidth={2}
              />
            )}
          </span>
          <span>{isValid ? 'Valid' : 'Invalid'}</span>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 4,
          }}
        >
          <span>{`Nodes: ${nodes}, Edges: ${edges}`}</span>
        </Box>
      </Box>
    </FooterContainer>
  );
}
