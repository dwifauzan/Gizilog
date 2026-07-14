import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { Nutrition } from '../../types';

interface FoodPieChartProps {
  data: Nutrition;
  className?: string;
}

export function FoodPieChart({ data, className }: FoodPieChartProps) {
  const chartData = [
    { name: 'Protein', value: data.protein, color: '#2563EB' },
    { name: 'Lemak', value: data.fat, color: '#F59E0B' },
    { name: 'Karbohidrat', value: data.carbs, color: '#22C55E' },
  ].filter((d) => d.value > 0);

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}g`, '']}
            contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
