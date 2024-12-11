import React from 'react';
import { Download, Calendar, RefreshCcw, ArrowLeft } from 'lucide-react';

interface DashboardHeaderProps {
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
  onBack?: () => void;
}

export function DashboardHeader({ timeRange, onTimeRangeChange, onBack }: DashboardHeaderProps) {
  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  return (
    <div className="px-6 py-4 border-b border-[#333333]/30 bg-[#1A1A1A]">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#F46F25] hover:bg-[#F46F25]/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Chat</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[#F4F5F1]">Analytics Dashboard</h1>
            <p className="text-sm text-[#7F7F7F] mt-1">
              Monitor platform usage and performance metrics
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Time Range Selector */}
            <div className="flex items-center gap-2 bg-[#2A2A2A] rounded-lg p-1">
              {timeRanges.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => onTimeRangeChange(value)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    timeRange === value
                      ? 'bg-[#F46F25] text-white'
                      : 'text-[#7F7F7F] hover:text-[#F4F5F1] hover:bg-[#333333]/30'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg text-[#7F7F7F] hover:text-[#F4F5F1] hover:bg-[#333333]/30 transition-colors">
                <RefreshCcw className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg text-[#7F7F7F] hover:text-[#F4F5F1] hover:bg-[#333333]/30 transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}