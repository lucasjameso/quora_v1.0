import React from 'react';
import { Source } from '../types';
import { X, ExternalLink, Download, Copy, FileText } from 'lucide-react';

interface SourcePanelProps {
  source?: Source;
  isOpen: boolean;
  onClose: () => void;
}

export function SourcePanel({ source, isOpen, onClose }: SourcePanelProps) {
  if (!isOpen || !source) return null;

  const handleCopy = () => {
    if (source.content) {
      navigator.clipboard.writeText(source.content);
    }
  };

  const handleDownload = () => {
    // Create a text file with .txt extension
    const content = `${source.title}\n\n${source.content}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    // Use .txt extension for proper text file handling
    a.download = source.filename?.replace('.pdf', '.txt') || 'document.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-[600px] bg-[#1A1A1A] border-l border-[#333333]/30 shadow-2xl transform transition-transform duration-300 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#333333]/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#F46F25]/10">
            <FileText className="w-5 h-5 text-[#F46F25]" />
          </div>
          <div>
            <h2 className="font-medium text-[#F4F5F1] text-sm">{source.title}</h2>
            {source.filename && (
              <span className="text-sm text-[#7F7F7F]">
                {source.filename.replace('.pdf', '.txt')}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-[#333333]/30 transition-colors"
        >
          <X className="w-5 h-5 text-[#7F7F7F]" />
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 p-4 border-b border-[#333333]/30">
        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#333333]/30 text-[#F4F5F1] transition-colors text-sm"
        >
          <Copy className="w-4 h-4" />
          <span>Copy Text</span>
        </button>
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#333333]/30 text-[#F4F5F1] transition-colors text-sm"
        >
          <Download className="w-4 h-4" />
          <span>Download Text</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto h-[calc(100vh-140px)]">
        <div className="prose prose-invert max-w-none">
          <div className="space-y-6">
            {/* Original Text */}
            <div className="bg-[#333333]/30 p-6 rounded-lg border border-[#333333]/50">
              <h3 className="text-lg font-medium text-[#F4F5F1] mb-4">
                Original Text
              </h3>
              <pre className="text-[#F4F5F1] whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {source.content}
              </pre>
            </div>

            {/* Key Requirements */}
            <div className="bg-[#333333]/30 p-6 rounded-lg border border-[#333333]/50">
              <h3 className="text-lg font-medium text-[#F4F5F1] mb-4">
                Key Requirements
              </h3>
              <ul className="list-disc list-inside text-[#F4F5F1] space-y-2">
                <li>Stairways must have handrails on each side</li>
                <li>Stair railings must be 30-34 inches in height</li>
                <li>Handrails required for stairs with 4+ risers</li>
                <li>Must withstand 200-pound load at any point</li>
              </ul>
            </div>

            {/* Implementation Notes */}
            <div className="bg-[#333333]/30 p-6 rounded-lg border border-[#333333]/50">
              <h3 className="text-lg font-medium text-[#F4F5F1] mb-4">
                Implementation Notes
              </h3>
              <div className="text-[#F4F5F1] space-y-2">
                <p>• Regular inspections required to ensure compliance</p>
                <p>• Documentation of measurements and load tests</p>
                <p>• Staff training on proper usage and maintenance</p>
                <p>• Immediate repairs required for any defects</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with metadata */}
      {(source.lastUpdated || source.jurisdiction) && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#333333]/30 bg-[#1A1A1A]">
          <div className="flex items-center justify-between text-sm text-[#7F7F7F]">
            {source.lastUpdated && (
              <span>Last updated: {new Date(source.lastUpdated).toLocaleDateString()}</span>
            )}
            {source.jurisdiction && <span>{source.jurisdiction}</span>}
          </div>
        </div>
      )}
    </div>
  );
}