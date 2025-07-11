'use client';

import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  Suspense,
} from 'react';
import { JSONEditor } from '@/ui/JSONEditor';
import { FlowViewer } from '@/ui/FlowViewer';
import { validateJSON } from '@/utility/validateJSON';
import { simpleDataStructure } from './data';
import { Header, HeaderSkeleton } from './features/header';
import { styled } from '@pigment-css/react';
import { SnowThemeArgs } from '@arctic-kit/snow';
import { Footer } from './features/footer';

const ContentContainer = styled.div({
  display: 'flex',
  height: 'calc(100vh - 80px)',
});

const EditorViewContainer = styled.div<{ hide?: boolean }>(
  ({ theme: { vars: theme } }: SnowThemeArgs) => ({
    width: '30vw',
    height: '100%',
    backgroundColor: theme.colors.neutral[0],
    transition: 'ease width 0.3s',
    variants: [
      {
        props: { hide: true },
        style: {
          width: 0,
        },
      },
    ],
  })
);

const FlowViewerContainer = styled.div(() => ({
  // width: '70vw',
  flex: 1,
  height: '100%',
}));

const initialJson = JSON.stringify(simpleDataStructure, null, 2);

// Debounce function
function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const JSONViewerScreen: React.FC = () => {
  const [jsonInput, setJsonInput] = useState(initialJson);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [error, setError] = useState('');
  const [jsonData, setJsonData] = useState<any>(simpleDataStructure);
  const [totalNodeAndEdges, setTotalNodeAndEdges] = useState({
    nodeCount: 0,
    edgeCount: 0,
  });
  const [hideEditor, setHideEditor] = useState(false);

  // Callback to validate and format JSON
  const validateAndFormatJson = useCallback((input: string) => {
    const [isValid, parsedOrError] = validateJSON(input);
    if (isValid) {
      const formatted = JSON.stringify(parsedOrError, null, 2);
      if (formatted !== input) {
        setJsonInput(formatted);
      }
      setJsonData(parsedOrError);
      setError('');
    } else {
      setError(parsedOrError as string);
      setJsonData({});
    }
  }, []);

  // Debounced version of the validation function
  const debouncedValidateAndFormatJson = useMemo(
    () => debounce(validateAndFormatJson, 500),
    [validateAndFormatJson]
  );

  // Effect to run validation when jsonInput changes
  useEffect(() => {
    debouncedValidateAndFormatJson(jsonInput);
  }, [jsonInput, debouncedValidateAndFormatJson]);

  // Handle user input in the editor
  const handleJSONChange = useCallback((value: string) => {
    setJsonInput(value);
  }, []);

  const handleImport = useCallback((raw: string) => {
    // parse (or bail)
    try {
      const parsed = JSON.parse(raw);
      const pretty = JSON.stringify(parsed, null, 2);

      // overwrite BOTH the data _and_ the editor contents
      setError('');
      setJsonInput(pretty);
    } catch (e: any) {
      setError(e.message || 'Invalid JSON');
    }
  }, []);

  return (
    <>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header onDarkModeChange={setIsDarkMode} onImport={handleImport} />
      </Suspense>
      <ContentContainer>
        <EditorViewContainer hide={hideEditor}>
          <JSONEditor
            value={jsonInput}
            onChange={handleJSONChange}
            isDarkMode={isDarkMode}
          />
        </EditorViewContainer>
        <FlowViewerContainer>
          <FlowViewer
            jsonData={jsonData}
            onFlowCountChange={setTotalNodeAndEdges}
            sidebarExpanded={!hideEditor}
            isDarkMode={isDarkMode}
          />
        </FlowViewerContainer>
      </ContentContainer>
      <Suspense fallback={<HeaderSkeleton />}>
        <Footer
          isValid={!error}
          nodes={totalNodeAndEdges.nodeCount}
          edges={totalNodeAndEdges.edgeCount}
          onToggleEditorHideControl={() => setHideEditor(!hideEditor)}
          editorHidden={hideEditor}
        />
      </Suspense>
    </>
  );
};

export default JSONViewerScreen;
