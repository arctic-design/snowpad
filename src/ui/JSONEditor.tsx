'use client';

import React from 'react';
import MonacoEditor from '@monaco-editor/react';

type JSONEditorProps = {
  value: string;
  onChange: (value: string) => void;
  isDarkMode?: boolean;
};

const JSONEditor: React.FC<JSONEditorProps> = ({
  value,
  onChange,
  isDarkMode,
}) => {
  const handleEditorChange = (value?: string) => {
    if (value) onChange(value);
  };

  return (
    <MonacoEditor
      height="100%"
      language="json"
      value={value}
      onChange={handleEditorChange}
      options={{
        automaticLayout: true,
        minimap: { enabled: false },
        wordWrap: 'on',
      }}
      theme={isDarkMode ? 'vs-dark' : 'light'}
    />
  );
};

export { JSONEditor };
