import { getThresholdStatus, cn } from '../../lib/utils';

interface ThresholdBadgeProps {
  type: 'sodium' | 'fiber' | 'sugar';
  value: number;
  label?: string;
}

const colorStyles: Record<'green' | 'yellow' | 'red', string> = {
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  red: 'bg-red-100 text-red-800',
};

const labels: Record<ThresholdBadgeProps['type'], string> = {
  sodium: 'Sodium',
  fiber: 'Serat',
  sugar: 'Gula',
};

export function ThresholdBadge({ type, value, label }: ThresholdBadgeProps) {
  const status = getThresholdStatus(value, type);

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
      <span className="text-sm font-semibold text-gray-700">{label ?? labels[type]}</span>
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-gray-800">
          {value}
          <span className="text-xs font-medium text-gray-500 ml-0.5">{type === 'sodium' ? 'mg' : 'g'}</span>
        </span>
        <span className={cn('px-3 py-1 rounded-full text-xs font-bold', colorStyles[status.color])}>
          {status.label}
        </span>
      </div>
    </div>
  );
}
