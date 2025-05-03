import React, { useState, useCallback, useEffect } from 'react';
import { Editor } from './Editor';
import { FormatSelector } from './FormatSelector';
import { ExampleSelector } from './ExampleSelector';
import { SourceFormat, TargetFormat } from '../types/formats';
import { convert } from '../utils/converter';
import { ArrowRight, Copy, RefreshCw } from 'lucide-react';

const ConversionTool: React.FC = () => {
  const [sourceFormat, setSourceFormat] = useState<SourceFormat>('zod');
  const [targetFormat, setTargetFormat] = useState<TargetFormat>('json');
  const [inputCode, setInputCode] = useState<string>('');
  const [outputCode, setOutputCode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Reset output when source or target format changes
  useEffect(() => {
    setOutputCode('');
    setError(null);
  }, [sourceFormat, targetFormat]);

  const handleConvert = useCallback(async () => {
    if (!inputCode.trim()) {
      setError('Please enter some code to convert');
      setOutputCode('');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await convert(inputCode, sourceFormat, targetFormat);
      setOutputCode(result);
      setError(null);
    } catch (err) {
      console.error('Conversion error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setOutputCode('');
    } finally {
      setIsLoading(false);
    }
  }, [inputCode, sourceFormat, targetFormat]);

  const copyToClipboard = useCallback(() => {
    if (!outputCode) return;

    navigator.clipboard.writeText(outputCode)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }, [outputCode]);

  const handleLoadExample = (example: string) => {
    setInputCode(example);
    setOutputCode('');
    setError(null);
  };

  const getInputLanguage = (format: SourceFormat) => {
    return format === 'zod' ? 'typescript' : 'json';
  };

  const getOutputLanguage = (format: TargetFormat) => {
    return format === 'json' ? 'json' : 'yaml';
  };

  const handleSourceFormatChange = (value: string) => {
    setSourceFormat(value as SourceFormat);
    setInputCode('');
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 bg-slate-800 p-4 rounded-lg shadow-lg">
        <div className="flex-1 flex items-center gap-2">
          <FormatSelector 
            label="From" 
            options={[
              { value: 'zod', label: 'Zod Schema' },
              { value: 'json', label: 'JSON Schema' }
            ]} 
            value={sourceFormat}
            onChange={handleSourceFormatChange}
          />
          <div className="mx-2 text-slate-400">
            <ArrowRight size={20} />
          </div>
          <FormatSelector 
            label="To" 
            options={[
              { value: 'json', label: 'JSON Schema' },
              { value: 'yaml', label: 'YAML' }
            ]} 
            value={targetFormat}
            onChange={(value) => setTargetFormat(value as TargetFormat)}
          />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleConvert}
            disabled={isLoading || !inputCode}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:opacity-50 rounded-md transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : null}
            Convert
          </button>
          <button
            onClick={copyToClipboard}
            disabled={!outputCode}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded-md transition-colors flex items-center gap-2"
            title="Copy to clipboard"
          >
            <Copy size={16} />
            {copySuccess ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/50 text-red-200 p-4 rounded-lg border border-red-700">
          <h3 className="font-semibold mb-1">Error</h3>
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium text-slate-300">{sourceFormat === 'zod' ? 'Zod Schema' : 'JSON Schema'}</h2>
            <ExampleSelector sourceFormat={sourceFormat} onSelect={handleLoadExample} />
          </div>
          <div className="h-[70vh] border border-slate-700 rounded-lg overflow-hidden">
            <Editor
              language={getInputLanguage(sourceFormat)}
              value={inputCode}
              onChange={setInputCode}
              placeholder={`${sourceFormat === 'zod' ? `import {z} from "zod";
// enter you zod schema below, export default schema you want to convert to json
` : 'JSON Schema here'}`}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-xl font-medium text-slate-300">{targetFormat === 'json' ? 'JSON Schema' : 'YAML'}</h2>
          <div className="h-[70vh] border border-slate-700 rounded-lg overflow-hidden">
            <Editor
              language={getOutputLanguage(targetFormat)}
              value={outputCode}
              onChange={setOutputCode}
              readOnly
              placeholder="Conversion result will appear here..."
            />
          </div>
        </div>
      </div>

      <div className="mt-8 bg-slate-800 p-4 rounded-lg text-sm">
        <h3 className="text-lg font-medium text-slate-300 mb-2">Tips</h3>
        <ul className="list-disc list-inside space-y-1 text-slate-400">
          <li>For Zod schemas, enter the schema code (e.g., <code className="bg-slate-700 px-1 rounded">z.string().email()</code>)</li>
          <li>Use the example button to see sample code for each format</li>
          <li>Click "Convert" to see the result in your selected output format</li>
          <li>Copy button will copy the converted code to your clipboard</li>
        </ul>
      </div>
    </div>
  );
};

export default ConversionTool;