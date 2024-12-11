import React from 'react';
import { Check, ChevronDown } from 'lucide-react';

interface TimelineDetail {
  text: string;
}

interface TimelineItem {
  date: string;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
  details?: TimelineDetail[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  return (
    <div className="relative">
      {/* Progress Bar Background */}
      <div className="absolute top-5 left-0 right-0 h-1 bg-[#333333]/30" />
      
      {/* Animated Progress Bar */}
      <div 
        className="absolute top-5 left-0 h-1 bg-gradient-to-r from-[#F46F25] to-[#F46F25]/60"
        style={{
          width: `${(items.findIndex(item => item.status === 'current') + 1) * (100 / items.length)}%`,
          transition: 'width 1s ease-in-out'
        }}
      />

      {/* Timeline Items */}
      <div className="relative flex justify-between">
        {items.map((item, index) => (
          <div 
            key={index}
            className="flex flex-col items-center w-1/5"
          >
            {/* Indicator */}
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className={`w-10 h-10 rounded-full flex items-center justify-center
                transition-all duration-500 transform cursor-pointer
                ${item.status === 'completed' 
                  ? 'bg-green-500/20 text-green-400 scale-100 hover:bg-green-500/30' 
                  : item.status === 'current'
                  ? 'bg-[#F46F25]/20 text-[#F46F25] scale-110 animate-pulse hover:bg-[#F46F25]/30'
                  : 'bg-[#333333]/30 text-[#7F7F7F] scale-90 hover:bg-[#333333]/50'
                }
                ${item.status === 'upcoming' ? 'opacity-50' : 'opacity-100'}
              `}
            >
              {item.status === 'completed' ? (
                <Check className="w-5 h-5 animate-scale-check" />
              ) : (
                <div className={`w-3 h-3 rounded-full bg-current
                  ${item.status === 'current' ? 'animate-pulse' : ''}`} 
                />
              )}
            </button>

            {/* Content */}
            <div className={`mt-4 text-center transition-all duration-500 relative
              ${item.status === 'current' ? 'transform scale-105' : ''}
              ${item.status === 'upcoming' ? 'opacity-50' : 'opacity-100'}
            `}>
              <h4 className="text-[#F4F5F1] font-medium mb-1">{item.title}</h4>
              <span className="text-sm text-[#7F7F7F]">{item.date}</span>
              
              {/* Expand Button */}
              {item.details && (
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className={`mt-2 p-1 rounded-full transition-transform duration-300
                    ${expandedIndex === index ? 'rotate-180' : ''}`}
                >
                  <ChevronDown className="w-4 h-4 text-[#F46F25]" />
                </button>
              )}

              {/* Expanded Details */}
              {expandedIndex === index && item.details && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-64 z-10">
                  <div className="bg-[#2A2A2A] rounded-lg p-4 shadow-lg border border-[#333333]/30">
                    <ul className="space-y-2 text-left">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#F46F25] mt-1.5 flex-shrink-0" />
                          <span className="text-[#BFBFBF]">{detail.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View (Vertical Layout) */}
      <div className="md:hidden mt-8 space-y-6">
        {items.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-start gap-4">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                  ${item.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    item.status === 'current' ? 'bg-[#F46F25]/20 text-[#F46F25]' :
                    'bg-[#333333]/30 text-[#7F7F7F]'}`}
              >
                {item.status === 'completed' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-current" />
                )}
              </div>
              <div>
                <h4 className="text-[#F4F5F1] font-medium">{item.title}</h4>
                <span className="text-sm text-[#7F7F7F]">{item.date}</span>
              </div>
            </div>

            {/* Mobile Details */}
            {item.details && (
              <div className="ml-12 mt-2">
                <ul className="space-y-2">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F46F25] mt-1.5 flex-shrink-0" />
                      <span className="text-[#BFBFBF]">{detail.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}