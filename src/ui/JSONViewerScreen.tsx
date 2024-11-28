'use client';

import React, { useEffect, useState } from 'react';
import { JSONEditor } from '@/ui/JSONEditor';
import { FlowViewer } from '@/ui/FlowViewer';
import { validateJSON } from '@/utility/validateJSON';
import { Box } from '@arctic-kit/snow';
import {
  companyOrgDataStructure,
  simpleDataStructure,
  complexDataStructure,
} from './data';

const initialJson = `${JSON.stringify(complexDataStructure, null, 2)}`;

const JSONViewerScreen: React.FC = () => {
  const [jsonInput, setJsonInput] = useState(initialJson);
  const [jsonData, setJsonData] = useState({});
  const [error, setError] = useState('');

  // Initialize `jsonData` with the parsed `initialJson`
  useEffect(() => {
    const [isValid, parsedOrError] = validateJSON(initialJson);
    if (isValid) {
      setJsonData(parsedOrError);
    } else {
      setError(parsedOrError); // In case the initial JSON is invalid
    }
  }, []);

  const handleJSONChange = (value: string) => {
    setJsonInput(value);
    const [isValid, parsedOrError] = validateJSON(value);

    if (isValid) {
      setError('');
      setJsonData(parsedOrError);
    } else {
      setError(parsedOrError);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Box sx={{ width: '30vw' }}>
        <JSONEditor value={jsonInput} onChange={handleJSONChange} />
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </Box>
      <div style={{ width: '70vw', height: '100vw' }}>
        <FlowViewer jsonData={jsonData} />
      </div>
    </div>
  );
};

export default JSONViewerScreen;
