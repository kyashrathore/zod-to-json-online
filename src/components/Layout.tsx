import React, { ReactNode } from 'react';
import { Github } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white">
      <header className="bg-slate-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              Schema Converter
            </h1>
          </div>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="View Source on GitHub"
          >
            <Github size={20} />
          </a>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="bg-slate-800 py-4 text-center text-sm text-slate-400">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Schema Converter Tool</p>
        </div>
      </footer>
    </div>
  );
};