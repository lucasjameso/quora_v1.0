import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, subtitle, children, className = '' }: CardProps) {
  return (
    <div className={`bg-[#2A2A2A] rounded-xl border border-[#333333]/30 p-6 ${className}`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-lg font-medium text-[#F4F5F1]">{title}</h3>
          {subtitle && (
            <p className="text-sm text-[#7F7F7F] mt-1">{subtitle}</p>
          )}
        </div>
        <button className="p-1 rounded-lg hover:bg-[#333333]/30 transition-colors">
          <MoreHorizontal className="w-5 h-5 text-[#7F7F7F]" />
        </button>
      </div>
      {children}
    </div>
  );
}