import React, { useState, useRef, KeyboardEvent } from 'react';
import { Send, Loader2, Paperclip } from 'lucide-react';
import { FileUpload } from './FileUpload';

interface ChatInputProps {
  onSend: (message: string, file?: File) => void;
  isProcessing: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, isProcessing, placeholder = "Type a message..." }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if ((input.trim() || selectedFile) && !isProcessing) {
      onSend(input.trim(), selectedFile);
      setInput('');
      setSelectedFile(undefined);
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-end bg-[#2A2A2A] rounded-2xl border border-[#333333]/50">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            // Auto-resize textarea
            e.target.style.height = 'auto';
            e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className="w-full resize-none bg-transparent px-6 py-5 pr-24
                   text-[#F4F5F1] placeholder-[#7F7F7F]
                   focus:outline-none focus:ring-0
                   max-h-[200px] overflow-y-auto
                   scrollbar-thin scrollbar-thumb-[#F46F25]/20 scrollbar-track-transparent"
          disabled={isProcessing}
        />

        <div className="absolute right-3 bottom-3 flex items-center gap-2">
          <FileUpload
            onFileSelect={(file) => setSelectedFile(file)}
            selectedFile={selectedFile}
            onClear={() => setSelectedFile(undefined)}
          />

          <button
            type="submit"
            disabled={isProcessing || (!input.trim() && !selectedFile)}
            className="p-2 rounded-lg text-[#F46F25] hover:bg-[#F46F25]/5 
                     disabled:opacity-40 disabled:hover:bg-transparent
                     transition-all duration-200"
          >
            {isProcessing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
}