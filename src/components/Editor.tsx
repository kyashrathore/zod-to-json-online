import React from 'react';
import MonacoEditor from '@monaco-editor/react';

interface EditorProps {
  language: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
}

export const Editor: React.FC<EditorProps> = ({ 
  language, 
  value, 
  onChange, 
  readOnly = false,
  placeholder
}) => {
  const handleEditorChange = (value: string | undefined) => {
    if (onChange && typeof value === 'string') {
      onChange(value);
    }
  };

  const getPlaceholderValue = () => {
    if (!placeholder || value) return '';
    return placeholder;
  };

  return (
    <div className="h-full w-full relative">
      {!value && placeholder && (
        <div className="absolute inset-0 p-4 text-slate-500 pointer-events-none">
          {placeholder}
        </div>
      )}
      <MonacoEditor
        height="100%"
        width="100%"
        language={language}
        value={value || getPlaceholderValue()}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          fontFamily: 'Menlo, Monaco, "Courier New", monospace',
          lineNumbers: 'on',
          readOnly,
          automaticLayout: true,
          theme: 'vs-dark',
          wordWrap: 'on',
          tabSize: 2,
          padding: { top: 16 }
        }}
      />
    </div>
  );
};