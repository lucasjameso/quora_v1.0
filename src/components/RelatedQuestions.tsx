import React from 'react';
import { RelatedQuestion } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface RelatedQuestionsProps {
  questions: RelatedQuestion[];
  onSelect: (question: string) => void;
}

export function RelatedQuestions({ questions, onSelect }: RelatedQuestionsProps) {
  if (questions.length === 0) return null;

  return (
    <div className="p-4 bg-gray-50 border-t">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-purple-500" />
        <h3 className="font-medium">Related Questions</h3>
      </div>
      <div className="space-y-2">
        {questions.map((question) => (
          <button
            key={question.id}
            onClick={() => onSelect(question.content)}
            className="w-full group flex items-center justify-between p-3 rounded-lg bg-white hover:bg-purple-50 transition-colors border border-gray-100 hover:border-purple-200"
          >
            <span className="text-left text-gray-700 group-hover:text-purple-700">
              {question.content}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}