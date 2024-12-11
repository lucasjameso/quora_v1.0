import React from 'react';
import { Menu } from 'lucide-react';

interface RelatedQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
  isLoading?: boolean;
}

export function RelatedQuestions({ questions, onSelect, isLoading = false }: RelatedQuestionsProps) {
  if (isLoading) {
    return (
      <div className="mt-4 p-4 rounded-lg bg-[#2A2A2A]/50 border border-[#333333]/30">
        <div className="flex items-center gap-2 text-[#7F7F7F]">
          <div className="animate-spin w-4 h-4 border-2 border-[#F46F25] border-t-transparent rounded-full" />
          <span>Generating related questions...</span>
        </div>
      </div>
    );
  }

  if (!questions.length) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Menu className="w-4 h-4 text-[#F4F5F1]" />
        <span className="text-sm font-medium text-[#F4F5F1]">Related</span>
      </div>
      <div className="space-y-1">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelect(question)}
            className="w-full flex items-center justify-between py-3 px-4
                     text-left text-[#F4F5F1] hover:text-[#F46F25]
                     transition-colors group"
          >
            <span className="flex items-center gap-3">
              <span className="text-[#F46F25] opacity-0 group-hover:opacity-100 transition-opacity">+</span>
              <span>{question}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}