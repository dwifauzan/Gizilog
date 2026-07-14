import { cn } from '../../lib/utils';

interface MacroCardProps {
  label: string;
  value: number;
  unit: string;
  color: 'blue' | 'yellow' | 'red' | 'green';
  icon?: React.ReactNode;
}

const colorMap = {
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  yellow: 'bg-amber-50 text-amber-700 border-amber-100',
  red: 'bg-rose-50 text-rose-700 border-rose-100',
  green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
};

const dotMap = {
  blue: 'bg-blue-500',
  yellow: 'bg-amber-500',
  red: 'bg-rose-500',
  green: 'bg-emerald-500',
};

export function MacroCard({ label, value, unit, color, icon }: MacroCardProps) {
  return (
    <div className={cn('flex flex-col items-center p-4 rounded-2xl border', colorMap[color])}>
      {icon && <div className="mb-2">{icon}</div>}
      <span className="text-2xl font-extrabold">{value}</span>
      <span className="text-xs font-semibold uppercase tracking-wide opacity-80">{unit}</span>
      <div className="flex items-center gap-1.5 mt-2">
        <span className={cn('w-2 h-2 rounded-full', dotMap[color])} />
        <span className="text-xs font-medium">{label}</span>
      </div>
    </div>
  );
}
