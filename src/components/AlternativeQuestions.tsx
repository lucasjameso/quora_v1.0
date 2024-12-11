import React from 'react';
import { AlternativeQuestion } from '../types';
import { Lightbulb } from 'lucide-react';

interface AlternativeQuestionsProps {
  alternatives: AlternativeQuestion[];
  onSelect: (question: string) => void;
}

export function AlternativeQuestions({ alternatives, onSelect }: AlternativeQuestionsProps) {
  if (alternatives.length === 0) return null;

  return (
    <div className="p-4 bg-gray-50 border-t">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        <h3 className="font-medium">Alternative Questions</h3>
      </div>
      <div className="space-y-2">
        {alternatives.map((question) => (
          <button
            key={question.id}
            onClick={() => onSelect(question.content)}
            className="w-full text-left p-2 rounded-lg bg-white hover:bg-gray-100 transition-colors"
          >
            {question.content}
          </button>
        ))}
      </div>
    </div>
  );
}