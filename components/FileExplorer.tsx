
import React, { useState } from 'react';
import { repositorySchema } from '../data/repositorySchema';
import { FileNode } from '../types';

interface FileTreeProps {
  node: FileNode;
  level: number;
  onSelect: (node: FileNode) => void;
}

const FileTree: React.FC<FileTreeProps> = ({ node, level, onSelect }) => {
  const [isOpen, setIsOpen] = useState(level < 1);
  const isFolder = node.type === 'folder';

  return (
    <div className="select-none">
      <div
        onClick={() => {
          if (isFolder) setIsOpen(!isOpen);
          onSelect(node);
        }}
        className={`flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-slate-800/50 rounded transition-colors ${
          level > 0 ? 'ml-4' : ''
        }`}
      >
        <span className="w-4 flex items-center justify-center">
          {isFolder ? (
            <i className={`fas fa-chevron-${isOpen ? 'down' : 'right'} text-[10px] text-slate-500`}></i>
          ) : null}
        </span>
        <i
          className={`fas ${
            isFolder ? (isOpen ? 'fa-folder-open' : 'fa-folder') : 'fa-file-alt'
          } ${isFolder ? 'text-amber-500' : 'text-slate-400'} text-xs`}
        ></i>
        <span className={`text-xs font-mono ${isFolder ? 'text-slate-200' : 'text-slate-400'}`}>
          {node.name}
        </span>
      </div>
      {isFolder && isOpen && node.children && (
        <div className="border-l border-slate-800 ml-3">
          {node.children.map((child, idx) => (
            <FileTree key={idx} node={child} level={level + 1} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

const FileExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(repositorySchema[0]);

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Project Repository</h2>
          <p className="text-sm text-slate-500 font-mono">140+ Scholarly Files | Apache 2.0</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs border border-slate-700 transition-colors">
            <i className="fas fa-search mr-2"></i> Global Search
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs transition-colors">
            <i className="fas fa-download mr-2"></i> Clone Repo
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 overflow-hidden">
        {/* Sidebar Browser */}
        <div className="glass border border-slate-800/50 rounded-2xl p-4 overflow-y-auto custom-scrollbar">
          {repositorySchema.map((node, idx) => (
            <FileTree key={idx} node={node} level={0} onSelect={setSelectedFile} />
          ))}
        </div>

        {/* Content Preview */}
        <div className="glass border border-slate-800/50 rounded-2xl flex flex-col overflow-hidden bg-slate-950/30">
          <div className="bg-slate-900/50 border-b border-slate-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className="fas fa-file-code text-indigo-400"></i>
              <span className="text-sm font-mono text-slate-200">{selectedFile?.name || 'Select a file'}</span>
            </div>
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
            </div>
          </div>
          
          <div className="flex-1 p-8 overflow-y-auto font-mono text-sm">
            {selectedFile ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Description</h3>
                  <p className="text-slate-400 leading-relaxed italic">
                    {selectedFile.description || 'Scholarly source file for the GroupSync-Engage processing pipeline.'}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Preview</h3>
                  <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 text-slate-300 whitespace-pre">
{selectedFile.type === 'folder' ? (
`/* Folder: ${selectedFile.name} */
Contents: ${selectedFile.children?.length || 0} sub-items`
) : (
`import numpy as np
from typing import List, Optional

class ${selectedFile.name.replace('.py', '').charAt(0).toUpperCase() + selectedFile.name.replace('.py', '').slice(1)}Handler:
    """
    Core implementation for ${selectedFile.name}.
    Part of the GroupSync-Engage social neuro-computation suite.
    """
    def __init__(self, config: dict):
        self.config = config
        self.log = logger.get_logger(__name__)

    def process(self, data: np.ndarray) -> Optional[np.ndarray]:
        # Scholarly algorithm implementation goes here
        pass`
)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600">
                <i className="fas fa-mouse-pointer text-4xl mb-4 opacity-20"></i>
                <p>Select a file from the explorer to view its scholarly details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
