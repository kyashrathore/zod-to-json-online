import React from 'react';
import { BookOpen } from 'lucide-react';
import { exampleZodSchema, exampleJsonSchema } from '../examples/example-zod';
import { SourceFormat } from '../types/formats';

interface ExampleSelectorProps {
  sourceFormat: SourceFormat;
  onSelect: (example: string) => void;
}

export const ExampleSelector: React.FC<ExampleSelectorProps> = ({
  sourceFormat,
  onSelect
}) => {
  const handleLoadExample = () => {
    if (sourceFormat === 'zod') {
      onSelect(exampleZodSchema);
    } else {
      onSelect(exampleJsonSchema);
    }
  };

  return (
    <button
      onClick={handleLoadExample}
      className="text-sm flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors"
    >
      <BookOpen size={14} />
      <span>Load Example</span>
    </button>
  );
};