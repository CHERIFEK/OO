import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Feedback, MOOD_LABELS } from '../types';

interface MoodChartProps {
  feedbacks: Feedback[];
}

const MoodChart: React.FC<MoodChartProps> = ({ feedbacks }) => {
  const data = useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    feedbacks.forEach(f => {
      if (counts[f.rating as keyof typeof counts] !== undefined) {
        counts[f.rating as keyof typeof counts]++;
      }
    });

    return Object.keys(MOOD_LABELS).map((key) => {
      const rating = Number(key);
      return {
        rating,
        count: counts[rating as keyof typeof counts],
        label: MOOD_LABELS[rating].emoji,
        name: MOOD_LABELS[rating].label,
        color: MOOD_LABELS[rating].color
      };
    });
  }, [feedbacks]);

  return (
    <div className="h-64 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis 
            dataKey="label" 
            tick={{ fontSize: 20 }} 
            axisLine={false} 
            tickLine={false} 
          />
          <YAxis hide allowDecimals={false} />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="count" radius={[8, 8, 8, 8]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodChart;