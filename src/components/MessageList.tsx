import React, { useState } from 'react';
import { FileText, Share2, Trash2, Edit2, Sparkles, Aperture, AlertTriangle, Link2 } from 'lucide-react';
import { Message, Source } from '../types';
import ReactMarkdown from 'react-markdown';
import { RelatedQuestions } from './FollowUpQuestions';
import { generateFollowUpQuestions } from '../lib/prompts';
import { BRAND_COLORS } from '../lib/constants';

interface MessageListProps {
  messages: Message[];
  onSourceClick: (source: Source) => void;
  onEdit?: (messageId: string) => void;
  onDelete?: (messageId: string) => void;
  onShare?: (messageId: string) => void;
  onSendMessage: (message: string) => void;
}

export function MessageList({ 
  messages, 
  onSourceClick, 
  onEdit, 
  onDelete, 
  onShare,
  onSendMessage 
}: MessageListProps) {
  const [loadingQuestions, setLoadingQuestions] = useState<{ [key: string]: boolean }>({});
  const [relatedQuestions, setRelatedQuestions] = useState<{ [key: string]: string[] }>({});

  React.useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.sender === 'bot' && !lastMessage.isTyping && !lastMessage.isError) {
      handleGenerateRelated(lastMessage.id, lastMessage.content);
    }
  }, [messages]);

  const handleGenerateRelated = async (messageId: string, content: string) => {
    if (relatedQuestions[messageId]) return;

    setLoadingQuestions(prev => ({ ...prev, [messageId]: true }));
    try {
      const questions = await generateFollowUpQuestions(content);
      setRelatedQuestions(prev => ({ ...prev, [messageId]: questions }));
    } catch (error) {
      console.error('Failed to generate related questions:', error);
    } finally {
      setLoadingQuestions(prev => ({ ...prev, [messageId]: false }));
    }
  };

  const renderMarkdown = (content: string) => {
    return (
      <ReactMarkdown
        className="prose prose-invert max-w-none"
        components={{
          p: ({ children }) => <p className="text-[#F4F5F1] mb-4">{children}</p>,
          h3: ({ children }) => (
            <h3 className="text-lg font-medium text-[#F4F5F1] mb-4">{children}</h3>
          ),
          ul: ({ children }) => (
            <ul className="space-y-2 mb-4">{children}</ul>
          ),
          li: ({ children }) => (
            <li className="flex items-start gap-3">
              <span className="mt-1.5 text-[#F4F5F1]">•</span>
              <span className="text-[#F4F5F1]">{children}</span>
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-[#F4F5F1]">{children}</strong>
          ),
          a: ({ children, href }) => (
            <button 
              onClick={() => {
                if (href) window.open(href, '_blank');
              }}
              className={`inline-flex items-center gap-1 text-[${BRAND_COLORS.orange}] hover:text-[${BRAND_COLORS.orangeHover}] transition-colors`}
            >
              <Link2 className="w-3 h-3" />
              <span className="underline underline-offset-2">{children}</span>
            </button>
          ),
          span: ({ children, style }) => (
            <span style={style}>{children}</span>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  // Rest of the component remains the same...
  
  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`py-8 first:pt-0 last:pb-8 ${
            message.sender === 'user' ? 'bg-transparent' : 'bg-transparent'
          }`}
        >
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
                <div className={`relative group transition-all ${
                  message.sender === 'user' ? 'pl-2' : 'pl-2'
                }`}>
                  {message.attachment && (
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className={`w-4 h-4 text-[${BRAND_COLORS.orange}]`} />
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
                          <span className={`w-2 h-2 bg-[${BRAND_COLORS.orange}]/60 rounded-full animate-bounce [animation-delay:-0.3s]`}></span>
                          <span className={`w-2 h-2 bg-[${BRAND_COLORS.orange}]/60 rounded-full animate-bounce [animation-delay:-0.15s]`}></span>
                          <span className={`w-2 h-2 bg-[${BRAND_COLORS.orange}]/60 rounded-full animate-bounce`}></span>
                        </div>
                        <span className="text-[#7F7F7F] text-sm">EBM Consultant is typing...</span>
                      </div>
                    ) : (
                      <>
                        {message.sender === 'user' ? (
                          <p className="text-[#F4F5F1]/90 italic">{message.content}</p>
                        ) : (
                          renderMarkdown(message.content)
                        )}

                        {message.sender === 'bot' && !message.isTyping && !message.isError && (
                          <RelatedQuestions
                            questions={relatedQuestions[message.id] || []}
                            onSelect={onSendMessage}
                            isLoading={loadingQuestions[message.id]}
                          />
                        )}
                      </>
                    )}
                  </div>

                  {/* Rest of the message rendering remains the same... */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}