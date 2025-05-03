import React from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface FormatSelectorProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  label,
  options,
  value,
  onChange
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm text-slate-400">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-slate-700 border border-slate-600 rounded-md px-3 py-2 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown size={16} className="text-slate-400" />
        </div>
      </div>
    </div>
  );
};