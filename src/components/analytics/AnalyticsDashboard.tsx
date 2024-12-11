import React, { useState } from 'react';
import { Grid } from './Grid';
import { UserActivity } from './cards/UserActivity';
import { SessionAnalytics } from './cards/SessionAnalytics';
import { ResourceTracking } from './cards/ResourceTracking';
import { PerformanceMetrics } from './cards/PerformanceMetrics';
import { DashboardHeader } from './DashboardHeader';
import { useTheme } from '../../context/ThemeContext';

interface AnalyticsDashboardProps {
  onBack?: () => void;
}

export function AnalyticsDashboard({ onBack }: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState('7d');
  const { theme } = useTheme();

  return (
    <div className="flex-1 overflow-hidden bg-[#1A1A1A]">
      <div className="h-full flex flex-col">
        <DashboardHeader 
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          onBack={onBack}
        />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {/* User Activity Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UserActivity.Queries timeRange={timeRange} />
              <UserActivity.ActiveUsers timeRange={timeRange} />
            </section>

            {/* Session Analytics Section */}
            <section>
              <SessionAnalytics.Attendance timeRange={timeRange} />
            </section>

            {/* Resource Tracking Section */}
            <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <ResourceTracking.Documents timeRange={timeRange} />
              </div>
              <div className="lg:col-span-1">
                <ResourceTracking.Categories timeRange={timeRange} />
              </div>
            </section>

            {/* Performance Metrics Section */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <PerformanceMetrics.Satisfaction timeRange={timeRange} />
              <PerformanceMetrics.Health timeRange={timeRange} />
              <PerformanceMetrics.ResponseTime timeRange={timeRange} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}