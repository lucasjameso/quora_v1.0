import React from 'react';
import { Message } from '../../types';
import { Aperture, Sparkles, AlertTriangle, FileText } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BRAND_COLORS } from '../../lib/constants';

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  return (
    <div className="py-8 first:pt-0 last:pb-8">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex gap-6 items-start">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
            {message.sender === 'user' ? (
              <Aperture className="w-5 h-5 text-[#7F7F7F]" />
            ) : (
              <Sparkles className="w-5 h-5 text-[#7F7F7F]" />
            )}
          </div>

          <div className="flex-1">
            <div className="relative group">
              {message.attachment && (
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4 text-[#F46F25]" />
                  <span className="text-sm text-[#F4F5F1]">{message.attachment.name}</span>
                </div>
              )}

              <div className="prose prose-invert max-w-none">
                {message.isError ? (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-red-400 font-medium mb-1">Error</p>
                      <p className="text-red-300/90 text-sm">{message.content}</p>
                    </div>
                  </div>
                ) : message.isTyping ? (
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#F46F25]/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 bg-[#F46F25]/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 bg-[#F46F25]/60 rounded-full animate-bounce" />
                    </div>
                    <span className="text-[#7F7F7F] text-sm">EBM Consultant is typing...</span>
                  </div>
                ) : (
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    className="text-[#F4F5F1]/90"
                    components={{
                      p: ({ children }) => <p className="text-[#F4F5F1] mb-4">{children}</p>,
                      a: ({ children, href }) => (
                        <a 
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#F46F25] hover:text-[#F46F25]/80 transition-colors"
                        >
                          {children}
                        </a>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside space-y-2 mb-4">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside space-y-2 mb-4">{children}</ol>
                      ),
                      li: ({ children }) => (
                        <li className="text-[#F4F5F1]">{children}</li>
                      ),
                      code: ({ children }) => (
                        <code className="bg-[#333333]/30 px-1.5 py-0.5 rounded text-sm">{children}</code>
                      ),
                      pre: ({ children }) => (
                        <pre className="bg-[#333333]/30 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>
                      )
                    }}
                  >
                    {message.content}
                  </Markdown>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}