import React from 'react';
import { Card } from '../Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from '../CustomTooltip';

const data = {
  documents: [
    { name: 'CCR, Title 8, Section 3270.1. Use of Rope Access Equipment', views: 187, downloads: 43 },
    { name: 'CCR, Title 8, Section 3214. Stair Rails and Handrails', views: 156, downloads: 38 },
    { name: 'CCR, Title 8, Section 3219. Maintenance of Exits', views: 134, downloads: 31 },
    { name: 'CCR, Title 8, Section 3231. Stairways', views: 112, downloads: 27 },
    { name: 'CCR, Title 8, Section 3232. Ramps', views: 98, downloads: 22 }
  ],
  categories: [
    { name: 'Industry Standards', value: 42 },
    { name: 'Regulatory Compliance', value: 35 },
    { name: 'Equipment Guidelines', value: 28 },
    { name: 'Maintenance Protocols', value: 25 },
    { name: 'Training Materials', value: 20 },
    { name: 'Technical Specifications', value: 15 }
  ]
};

function Documents({ timeRange }: { timeRange: string }) {
  return (
    <Card title="Top Accessed Documents" subtitle="Most viewed and downloaded resources">
      <div className="mt-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-[#333333]/30">
                <th className="text-left py-3 text-sm font-medium text-[#7F7F7F]">Document</th>
                <th className="text-right py-3 text-sm font-medium text-[#7F7F7F]">Views</th>
                <th className="text-right py-3 text-sm font-medium text-[#7F7F7F]">Downloads</th>
              </tr>
            </thead>
            <tbody>
              {data.documents.map((doc, index) => (
                <tr 
                  key={index}
                  className="border-b border-[#333333]/10 hover:bg-[#333333]/10 transition-colors"
                >
                  <td className="py-3 text-[#F4F5F1] pr-8">{doc.name}</td>
                  <td className="text-right py-3 text-[#BFBFBF]">{doc.views.toLocaleString()}</td>
                  <td className="text-right py-3 text-[#BFBFBF]">{doc.downloads.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}

function Categories({ timeRange }: { timeRange: string }) {
  return (
    <Card title="Resource Categories" subtitle="Distribution by type">
      <div className="h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data.categories} 
            layout="vertical"
            barSize={20}
            style={{ 
              backgroundColor: 'transparent'
            }}
          >
            <XAxis 
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#7F7F7F' }}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={120}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#BFBFBF', fontSize: '12px' }}
            />
            <Tooltip
              cursor={{ 
                fill: 'transparent'
              }}
              content={({ active, payload, label }) => (
                <CustomTooltip
                  active={active}
                  payload={payload}
                  label={label}
                  labelFormatter={(label) => `Category: ${label}`}
                  valueFormatter={(value) => `${value.toLocaleString()} resources`}
                />
              )}
            />
            <Bar 
              dataKey="value" 
              name="Resources"
              fill="#F46F25"
              radius={[0, 4, 4, 0]}
              background={{ fill: 'transparent' }}
              onMouseOver={(data, index) => {
                const bars = document.querySelectorAll('.recharts-bar-rectangle');
                bars[index]?.setAttribute('fill-opacity', '0.8');
              }}
              onMouseOut={(data, index) => {
                const bars = document.querySelectorAll('.recharts-bar-rectangle');
                bars[index]?.setAttribute('fill-opacity', '1');
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export const ResourceTracking = {
  Documents,
  Categories
};