import React from 'react';
import { Card } from '../Card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from '../CustomTooltip';

const generateRealisticData = () => {
  const baseUsers = 22;
  const sessionsPerWeek = 9;
  
  return {
    queries: Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      const dayOfWeek = date.getDay();
      
      const dailyFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.5 : 1;
      const randomVariation = 0.8 + Math.random() * 0.4;
      
      return {
        date: date.toLocaleDateString('en-US', { 
          month: 'short',
          day: 'numeric',
          year: '2-digit'
        }),
        queries: Math.round((sessionsPerWeek / 7) * dailyFactor * randomVariation * baseUsers)
      };
    }),
    activeUsers: Array.from({ length: 24 }, (_, i) => {
      const hour = i;
      const isWorkHour = hour >= 9 && hour <= 17;
      const baseActivity = isWorkHour ? baseUsers * 0.3 : baseUsers * 0.1;
      const randomVariation = 0.8 + Math.random() * 0.4;
      
      const date = new Date();
      date.setHours(hour, 0, 0);
      
      return {
        hour: date.toLocaleTimeString('en-US', { 
          hour: 'numeric',
          minute: '2-digit',
          hour12: true 
        }),
        users: Math.round(baseActivity * randomVariation)
      };
    })
  };
};

const data = generateRealisticData();

function Queries({ timeRange }: { timeRange: string }) {
  return (
    <Card title="Total Queries" subtitle="Usage trends over time">
      <div className="h-[200px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.queries}>
            <XAxis 
              dataKey="date"
              tickFormatter={(value) => value.split(',')[0]}
            />
            <YAxis />
            <Tooltip 
              content={({ active, payload, label }) => (
                <CustomTooltip
                  active={active}
                  payload={payload}
                  label={label}
                  labelFormatter={(label) => `Date: ${label}`}
                  valueFormatter={(value) => value.toLocaleString()}
                />
              )}
            />
            <Line 
              type="monotone" 
              dataKey="queries"
              name="Queries"
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

function ActiveUsers({ timeRange }: { timeRange: string }) {
  return (
    <Card title="Daily Active Users" subtitle="24-hour activity">
      <div className="h-[200px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.activeUsers}>
            <XAxis 
              dataKey="hour"
              interval={2}
              tickFormatter={(value) => value.replace(':00 ', '')}
            />
            <YAxis />
            <Tooltip 
              content={({ active, payload, label }) => (
                <CustomTooltip
                  active={active}
                  payload={payload}
                  label={label}
                  labelFormatter={(label) => `Time: ${label}`}
                  valueFormatter={(value) => value.toLocaleString()}
                />
              )}
            />
            <Line 
              type="monotone" 
              dataKey="users"
              name="Active Users"
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

export const UserActivity = {
  Queries,
  ActiveUsers
};