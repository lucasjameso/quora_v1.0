import React from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  labelFormatter?: (label: string) => string;
  valueFormatter?: (value: number) => string;
}

export function CustomTooltip({ 
  active, 
  payload, 
  label,
  labelFormatter = (label) => label,
  valueFormatter = (value) => value.toString()
}: CustomTooltipProps) {
  if (!active || !payload) return null;

  return (
    <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg shadow-lg p-3">
      <p className="text-[#F4F5F1] font-medium text-sm mb-1">
        {labelFormatter(label || '')}
      </p>
      {payload.map((entry, index) => (
        <div 
          key={index}
          className="flex items-center gap-2 text-sm"
        >
          <span 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[#BFBFBF]">
            {entry.name}:
          </span>
          <span className="text-[#F4F5F1] font-medium">
            {valueFormatter(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}