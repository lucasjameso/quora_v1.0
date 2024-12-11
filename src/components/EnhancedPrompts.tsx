import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { generateRelatedQuestions } from '../lib/prompts';

interface EnhancedPromptsProps {
  isVisible: boolean;
  onSelect: (prompt: string) => void;
  currentInput?: string;
}

export function EnhancedPrompts({ isVisible, onSelect, currentInput }: EnhancedPromptsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchSuggestions() {
      if (!currentInput?.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const questions = await generateRelatedQuestions(currentInput);
        if (mounted) {
          setSuggestions(questions);
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to generate suggestions');
          setSuggestions([]);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    if (isVisible && currentInput) {
      fetchSuggestions();
    }

    return () => {
      mounted = false;
    };
  }, [isVisible, currentInput]);

  if (!isVisible) return null;

  return (
    <div className="mb-4">
      <div className="bg-[#2A2A2A] rounded-xl p-4 backdrop-blur-sm border border-[#333333]/50">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[#F46F25]" />
          <span className="text-sm font-medium text-[#F4F5F1]">Related Questions</span>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 text-[#F46F25] animate-spin" />
              <span className="text-[#7F7F7F]">EBM Consultant is typing...</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-4 text-[#7F7F7F]">{error}</div>
        ) : suggestions.length > 0 ? (
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSelect(suggestion)}
                className="w-full flex items-center justify-between p-3 rounded-lg
                         bg-[#333333]/30 hover:bg-[#333333]/50
                         text-left text-[#F4F5F1] transition-colors group"
              >
                <span className="pr-4">{suggestion}</span>
                <ArrowRight className="w-4 h-4 text-[#F46F25] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}