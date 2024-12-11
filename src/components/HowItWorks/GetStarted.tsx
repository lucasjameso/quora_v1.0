import React from 'react';
import { ArrowRight } from 'lucide-react';

interface GetStartedProps {
  onBack?: () => void;
}

export function GetStarted({ onBack }: GetStartedProps) {
  return (
    <div className="mt-16 max-w-4xl">
      <div className="p-6 rounded-lg bg-gradient-to-r from-[#F46F25]/20 to-transparent border border-[#F46F25]/20">
        <h2 className="text-xl font-semibold text-[#F4F5F1] mb-4">Ready to Get Started?</h2>
        <p className="text-[#BFBFBF] mb-6">
          Explore InnovateHub's features and stay tuned for more updates as we continue to enhance 
          the platform based on your feedback and needs.
        </p>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#F46F25] hover:bg-[#F46F25]/90 text-white transition-colors"
        >
          <span>Start Exploring</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}