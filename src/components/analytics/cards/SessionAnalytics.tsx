import React from 'react';
import { Card } from '../Card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from '../CustomTooltip';

const generateRealisticAttendanceData = () => {
  const baseAttendees = 22;
  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (11 - i));
    
    const randomFactor = 0.85 + Math.random() * 0.3;
    const attendees = Math.round(baseAttendees * randomFactor);
    
    return {
      month: date.toLocaleDateString('en-US', { 
        month: 'short',
        year: '2-digit'
      }),
      attendees
    };
  });
};

const data = {
  attendance: generateRealisticAttendanceData()
};

function Attendance({ timeRange }: { timeRange: string }) {
  return (
    <Card title="Monthly Session Attendance" subtitle="Participation trends">
      <div className="h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.attendance}>
            <defs>
              <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F46F25" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F46F25" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              content={({ active, payload, label }) => (
                <CustomTooltip
                  active={active}
                  payload={payload}
                  label={label}
                  labelFormatter={(label) => `Month: ${label}`}
                  valueFormatter={(value) => value.toLocaleString()}
                />
              )}
            />
            <Area
              type="monotone"
              dataKey="attendees"
              name="Attendees"
              stroke="#F46F25"
              fillOpacity={1}
              fill="url(#colorAttendance)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export const SessionAnalytics = {
  Attendance
};