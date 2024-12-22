'use client';
import {
  ActionMenu,
  ActionMenuItem,
  Box,
  SnowThemeArgs,
  ThemeSwitch,
} from '@arctic-kit/snow';
import { styled } from '@pigment-css/react';
import { useRef } from 'react';

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
  })
);

export function Header({
  onDarkModeChange,
  onImport,
}: {
  onDarkModeChange: (isDarkMode: boolean) => void;
  onImport: (inputFile: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        onImport(result as string);
      } catch (error) {
        console.error('Error parsing JSON file:', error);
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

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
          <ActionMenuItem label="Import" onClick={handleImportClick} />
          <ActionMenuItem label="Export" />
        </ActionMenu>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
      </Box>
      <ThemeSwitch onChange={onDarkModeChange} />
    </HeaderContainer>
  );
}

export function HeaderSkeleton() {
  return <HeaderContainer></HeaderContainer>;
}
