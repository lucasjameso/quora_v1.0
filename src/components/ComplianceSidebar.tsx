import React from 'react';
import { X, FileText, Calendar, Link as LinkIcon, Download, ExternalLink, BookOpen } from 'lucide-react';

interface ComplianceInfo {
  id: string;
  title: string;
  content: string;
  regulationText: string;
  lastUpdated: string;
  standards: Array<{
    id: string;
    name: string;
    link: string;
  }>;
  relatedDocs: Array<{
    id: string;
    title: string;
    type: string;
    link: string;
  }>;
}

interface ComplianceSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  info?: ComplianceInfo;
}

export function ComplianceSidebar({ isOpen, onClose, info }: ComplianceSidebarProps) {
  if (!isOpen || !info) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[500px] bg-[#1A1A1A] border-l border-[#333333]/30 shadow-2xl transform transition-transform duration-300 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#333333]/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#F46F25]/10">
            <FileText className="w-5 h-5 text-[#F46F25]" />
          </div>
          <div>
            <h2 className="font-medium text-[#F4F5F1]">{info.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4 text-[#7F7F7F]" />
              <span className="text-sm text-[#7F7F7F]">
                Last updated: {info.lastUpdated}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-[#333333]/30 transition-colors"
        >
          <X className="w-5 h-5 text-[#7F7F7F]" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Original Regulation */}
        <div className="p-6 border-b border-[#333333]/30">
          <h3 className="text-sm font-medium text-[#F4F5F1] mb-4">Original Regulation</h3>
          <div className="p-4 rounded-lg bg-[#333333]/30 text-[#F4F5F1]">
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {info.regulationText}
            </pre>
          </div>
        </div>

        {/* Related Standards */}
        <div className="p-6 border-b border-[#333333]/30">
          <h3 className="text-sm font-medium text-[#F4F5F1] mb-4">Related Standards</h3>
          <div className="space-y-3">
            {info.standards.map(standard => (
              <div
                key={standard.id}
                className="flex items-center justify-between p-3 rounded-lg bg-[#333333]/30"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-[#F46F25]" />
                  <span className="text-sm text-[#F4F5F1]">{standard.name}</span>
                </div>
                <a
                  href={standard.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-[#333333]/50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#F46F25]" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Related Documentation */}
        <div className="p-6">
          <h3 className="text-sm font-medium text-[#F4F5F1] mb-4">Related Documentation</h3>
          <div className="space-y-3">
            {info.relatedDocs.map(doc => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 rounded-lg bg-[#333333]/30"
              >
                <div className="flex items-center gap-3">
                  <LinkIcon className="w-4 h-4 text-[#F46F25]" />
                  <div>
                    <span className="text-sm text-[#F4F5F1] block">{doc.title}</span>
                    <span className="text-xs text-[#7F7F7F]">{doc.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.open(doc.link, '_blank')}
                    className="p-2 rounded-lg hover:bg-[#333333]/50 transition-colors"
                  >
                    <Download className="w-4 h-4 text-[#F46F25]" />
                  </button>
                  <a
                    href={doc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-[#333333]/50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-[#F46F25]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}