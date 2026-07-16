import type { FoodItem, Nutrition, UserProfile } from '../types';

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female' = 'male') {
  // Mifflin-St Jeor Equation
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
}

export function calculateDailyCalories(profile: Omit<UserProfile, 'dailyCalorieTarget'>) {
  const activityMultipliers: Record<UserProfile['activityLevel'], number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };
  const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender || 'male');
  return Math.round(bmr * activityMultipliers[profile.activityLevel]);
}

export function sumNutrition(items: FoodItem[]): Nutrition {
  return items.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      fat: acc.fat + item.fat,
      carbs: acc.carbs + item.carbs,
      sodium: (acc.sodium ?? 0) + (item.sodium ?? 0),
      fiber: (acc.fiber ?? 0) + (item.fiber ?? 0),
      sugar: (acc.sugar ?? 0) + (item.sugar ?? 0),
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0, sodium: 0, fiber: 0, sugar: 0 }
  );
}

export function formatNumber(value: number, digits = 1) {
  return Number.isInteger(value) ? value.toString() : value.toFixed(digits);
}

export function getActivityLabel(level: UserProfile['activityLevel']) {
  const labels: Record<UserProfile['activityLevel'], string> = {
    sedentary: 'Sedentari (jarang bergerak)',
    light: 'Ringan (1-2x olahraga/minggu)',
    moderate: 'Sedang (3-4x olahraga/minggu)',
    active: 'Aktif (5-6x olahraga/minggu)',
    very_active: 'Sangat Aktif (setiap hari)',
  };
  return labels[level];
}

type ThresholdColor = 'green' | 'yellow' | 'red';

export function getThresholdStatus(value: number, type: 'sodium' | 'fiber' | 'sugar'): { label: string; color: ThresholdColor } {
  // WHO-inspired daily thresholds (mg/g)
  const limits = {
    sodium: { warning: 1500, danger: 2300 },
    fiber: { warning: 20, danger: 35 },
    sugar: { warning: 25, danger: 50 },
  };
  const limit = limits[type];

  if (type === 'fiber') {
    if (value >= limit.warning && value <= limit.danger) return { label: 'IDEAL', color: 'green' };
    if (value > limit.danger) return { label: 'TINGGI', color: 'yellow' };
    return { label: 'RENDAH', color: 'red' };
  }

  if (value >= limit.danger) return { label: 'SANGAT TINGGI', color: 'red' };
  if (value >= limit.warning) return { label: 'TINGGI', color: 'yellow' };
  return { label: 'AMAN', color: 'green' };
}
