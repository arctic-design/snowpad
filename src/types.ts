export type CustomNodeDataType = {
  label: string | Record<string, string>;
  nodeType: 'org' | 'tenant' | 'contract' | 'auto';
  title: string;
};
