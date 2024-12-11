import React from 'react';
import { Card } from '../Card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Star, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { CustomTooltip } from '../CustomTooltip';

const data = {
  satisfaction: {
    current: 4.5,
    total: 1234,
    trend: Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: '2-digit'
        }),
        rating: 4 + Math.random()
      };
    })
  },
  health: {
    uptime: 99.99,
    status: 'operational',
    incidents: 0
  },
  responseTime: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    time: Math.random() * 100 + 100
  }))
};

function Satisfaction({ timeRange }: { timeRange: string }) {
  return (
    <Card title="User Satisfaction" subtitle="Average rating and trends">
      <div className="mt-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.floor(data.satisfaction.current)
                    ? 'text-[#F46F25] fill-current'
                    : 'text-[#333333]'
                }`}
              />
            ))}
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold text-[#F4F5F1]">
              {data.satisfaction.current.toFixed(1)}
            </div>
            <div className="text-sm text-[#7F7F7F]">
              {data.satisfaction.total.toLocaleString()} ratings
            </div>
          </div>
        </div>

        <div className="h-[100px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.satisfaction.trend}>
              <XAxis 
                dataKey="date"
                tickFormatter={(value) => value.split(',')[0]}
              />
              <YAxis domain={[0, 5]} />
              <Tooltip 
                content={({ active, payload, label }) => (
                  <CustomTooltip
                    active={active}
                    payload={payload}
                    label={label}
                    labelFormatter={(label) => `Date: ${label}`}
                    valueFormatter={(value) => value.toFixed(1)}
                  />
                )}
              />
              <Line
                type="monotone"
                dataKey="rating"
                name="Rating"
                stroke="#F46F25"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}

function Health({ timeRange }: { timeRange: string }) {
  return (
    <Card title="System Health" subtitle="Current system status">
      <div className="mt-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-[#2A2A2A]/30">
            <div className="flex items-center gap-1.5 mb-1.5">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-xs text-[#BFBFBF]">Uptime</span>
            </div>
            <div className="text-lg font-semibold text-[#F4F5F1] truncate">
              {data.health.uptime}%
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#2A2A2A]/30">
            <div className="flex items-center gap-1.5 mb-1.5">
              <AlertCircle className="w-4 h-4 text-[#F46F25]" />
              <span className="text-xs text-[#BFBFBF]">Status</span>
            </div>
            <div className="text-lg font-semibold text-[#F4F5F1] truncate capitalize">
              {data.health.status}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#2A2A2A]/30">
            <div className="flex items-center gap-1.5 mb-1.5">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-xs text-[#BFBFBF]">Incidents</span>
            </div>
            <div className="text-lg font-semibold text-[#F4F5F1] truncate">
              {data.health.incidents}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-[#2A2A2A]/30">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-sm text-[#BFBFBF]">System Status</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-[#F4F5F1]">All Systems Operational</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#BFBFBF]">Last Incident</div>
              <div className="text-[#F4F5F1]">30+ days ago</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ResponseTime({ timeRange }: { timeRange: string }) {
  return (
    <Card title="Response Time" subtitle="Average response time trends">
      <div className="h-[200px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.responseTime}>
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip 
              content={({ active, payload, label }) => (
                <CustomTooltip
                  active={active}
                  payload={payload}
                  label={label}
                  labelFormatter={(label) => `Hour: ${label}:00`}
                  valueFormatter={(value) => `${value.toFixed(0)}ms`}
                />
              )}
            />
            <Line
              type="monotone"
              dataKey="time"
              name="Response Time"
              stroke="#F46F25"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export const PerformanceMetrics = {
  Satisfaction,
  Health,
  ResponseTime
};