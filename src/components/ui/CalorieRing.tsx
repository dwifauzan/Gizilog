import { cn, formatNumber } from '../../lib/utils';

interface CalorieRingProps {
  consumed: number;
  target: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function CalorieRing({
  consumed,
  target,
  size = 192,
  strokeWidth = 12,
  className,
}: CalorieRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(consumed / target, 1);
  const offset = circumference - percentage * circumference;
  const remaining = Math.max(target - consumed, 0);

  return (
    <div
      className={cn('relative flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="ring-gauge">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-surface-container-highest)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-jakarta text-headline-xl text-on-primary-container">
          {formatNumber(remaining)}
        </span>
        <span className="font-jakarta text-[12px] font-bold tracking-[0.05em] uppercase text-on-surface-variant">
          KCAL LAGI
        </span>
      </div>
    </div>
  );
}
