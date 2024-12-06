import {
  ActionMenu,
  ActionMenuItem,
  Box,
  SnowThemeArgs,
  ThemeSwitch,
} from '@arctic-kit/snow';
import { styled } from '@pigment-css/react';

const HeaderContainer = styled.header(
  ({ theme: { vars: theme } }: SnowThemeArgs) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
    height: 40,
    padding: '4px 8px',
    backgroundColor: 'var(--header-bg-color)',
    color: theme.colors.neutral[1000],
    fontSize: theme.font.size[50],
    borderBottom: `1px solid ${theme.colors.grey[500]}`,

    svg: {
      width: 16,
    },
  })
);

export function Header({
  onDarkModeChange,
}: {
  onDarkModeChange: (isDarkMode: boolean) => void;
}) {
  return (
    <HeaderContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 8,
        }}
      >
        <ActionMenu label="File" variant="text" itemSize="small">
          <ActionMenuItem label="Import" />
          <ActionMenuItem label="Export" />
        </ActionMenu>
      </Box>
      <Box>
        <ThemeSwitch onChange={onDarkModeChange} />
      </Box>
    </HeaderContainer>
  );
}

export function HeaderSkeleton() {
  return <HeaderContainer></HeaderContainer>;
}
