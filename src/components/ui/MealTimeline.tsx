import { cn, formatNumber } from '../../lib/utils';
import type { FoodItem, MealCategory } from '../../types';

interface MealTimelineProps {
  items: FoodItem[];
}

const categoryConfig: Record<MealCategory, { label: string; icon: string; color: string }> = {
  Breakfast: { label: 'Sarapan', icon: 'coffee', color: 'bg-amber-100 text-amber-700' },
  Lunch: { label: 'Makan Siang', icon: 'lunch_dining', color: 'bg-orange-100 text-orange-700' },
  Dinner: { label: 'Makan Malam', icon: 'dark_mode', color: 'bg-indigo-100 text-indigo-700' },
  Snacks: { label: 'Camilan', icon: 'cookie', color: 'bg-pink-100 text-pink-700' },
};

export function MealTimeline({ items }: MealTimelineProps) {
  const grouped = items.reduce<Record<MealCategory, FoodItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] });

  return (
    <div className="space-y-4">
      {(Object.keys(grouped) as MealCategory[]).map((category) => {
        const meals = grouped[category];
        if (meals.length === 0) return null;
        const config = categoryConfig[category];

        return (
          <div key={category}>
            <div className="flex items-center gap-2 mb-3">
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', config.color)}>
                <span className="material-symbols-outlined text-base">{config.icon}</span>
              </div>
              <h3 className="font-jakarta text-sm font-bold text-on-surface-variant">{config.label}</h3>
            </div>
            <div className="space-y-3">
              {meals.map((meal) => (
                <div
                  key={meal.id}
                  className="bento-card bg-surface-container-lowest p-4 rounded-2xl flex items-center gap-4 border border-outline-variant"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface-mint flex items-center justify-center shrink-0">
                    <span className="material-symbols-filled text-xl text-primary">restaurant</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-jakarta text-body-lg font-bold text-on-surface truncate">{meal.food_name}</p>
                    <p className="font-jakarta text-body-md text-on-surface-variant">
                      {formatNumber(meal.calories)} kkal &middot; {meal.protein}p &middot; {meal.carbs}k &middot; {meal.fat}l
                    </p>
                  </div>
                  <span className="font-jakarta text-[10px] font-bold tracking-[0.05em] uppercase text-on-surface-variant shrink-0">
                    {meal.createdAt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
