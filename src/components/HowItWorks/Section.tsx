import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionProps {
  title: string;
  overview: string;
  icon: LucideIcon;
  features: string[];
  scenarios: string[];
}

export function Section({ title, overview, icon: Icon, features, scenarios }: SectionProps) {
  return (
    <section className="relative">
      <div className="max-w-4xl">
        {/* Section Header */}
        <div className="flex items-start gap-6 mb-12">
          <div className="p-3 rounded-lg bg-[#F46F25]/10">
            <Icon className="w-6 h-6 text-[#F46F25]" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#F4F5F1] mb-3">
              {title}
            </h2>
            <p className="text-[#BFBFBF] text-lg leading-relaxed">
              {overview}
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="ml-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Key Features */}
          <div className="relative p-8 rounded-lg bg-[#2A2A2A]/30">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#F46F25]/20 to-transparent" />
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-[#F4F5F1] tracking-wide">
                Key Features
              </h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F46F25]/40 mt-2 group-hover:bg-[#F46F25] transition-colors" />
                    <span className="text-[#BFBFBF] group-hover:text-[#F4F5F1] transition-colors">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* User Scenarios */}
          <div className="relative p-8 rounded-lg bg-[#2A2A2A]/50">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#F46F25]/20 to-transparent" />
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-[#F4F5F1] tracking-wide">
                User Scenarios
              </h3>
              <ul className="space-y-6">
                {scenarios.map((scenario, index) => (
                  <li key={index} className="group">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full 
                                    bg-[#F46F25]/10 text-[#F46F25] text-sm 
                                    group-hover:bg-[#F46F25]/20 transition-colors">
                        {index + 1}
                      </div>
                      <span className="text-[#BFBFBF] group-hover:text-[#F4F5F1] transition-colors">
                        {scenario}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-[#333333]/50 to-transparent" />
      </div>
    </section>
  );
}