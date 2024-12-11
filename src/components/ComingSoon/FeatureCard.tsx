import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl bg-[#2A2A2A] border border-[#333333]/30 hover:border-[#F46F25]/20 transition-all duration-300 group">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-[#F46F25]/10">
          <Icon className="w-6 h-6 text-[#F46F25]" />
        </div>
        <div>
          <h3 className="text-[#F4F5F1] font-medium mb-2">{title}</h3>
          <p className="text-[#BFBFBF] text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}