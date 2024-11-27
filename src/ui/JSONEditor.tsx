'use client';

import React from 'react';
import MonacoEditor from '@monaco-editor/react';

type JSONEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const JSONEditor: React.FC<JSONEditorProps> = ({ value, onChange }) => {
  const handleEditorChange = (value?: string) => {
    if (value) onChange(value);
  };

  return (
    <MonacoEditor
      height="100vh"
      language="json"
      value={value}
      onChange={handleEditorChange}
      options={{
        automaticLayout: true,
        minimap: { enabled: false },
        wordWrap: 'on',
      }}
    />
  );
};

export { JSONEditor };
