import React from 'react';
import { QueryType } from '../types';
import { FileSearch, Scale, BookOpen } from 'lucide-react';

interface QueryTypeSelectorProps {
  onSelect: (type: QueryType) => void;
  selectedType?: QueryType;
}

export function QueryTypeSelector({ onSelect, selectedType }: QueryTypeSelectorProps) {
  const types = [
    { 
      type: 'regulatory_analysis', 
      label: 'Regulatory Analysis', 
      icon: <FileSearch className="w-5 h-5" />,
      description: 'Analyze regulatory documents and extract key requirements'
    },
    { 
      type: 'compliance_check', 
      label: 'Compliance Check', 
      icon: <Scale className="w-5 h-5" />,
      description: 'Verify compliance against specific standards or regulations'
    },
    { 
      type: 'standard_interpretation', 
      label: 'Standard Interpretation', 
      icon: <BookOpen className="w-5 h-5" />,
      description: 'Get detailed interpretations of standards and guidelines'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {types.map(({ type, label, icon, description }) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className="group relative flex flex-col h-[140px] w-full rounded-xl bg-[#1C1C1C] border border-[#2A2A2A] p-4 hover:border-blue-500/20 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
              {icon}
            </div>
            <h3 className="text-base font-medium text-gray-200">{label}</h3>
          </div>
          
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
            {description}
          </p>

          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="absolute inset-0 bg-[#1C1C1C] border border-blue-500/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                  {icon}
                </div>
                <h3 className="text-base font-medium text-gray-200">{label}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}