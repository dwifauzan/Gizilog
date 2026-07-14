export type MealCategory = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';

export interface Nutrition {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  sodium?: number;
  fiber?: number;
  sugar?: number;
}

export interface FoodItem extends Nutrition {
  id: string;
  food_name: string;
  createdAt: string;
  category: MealCategory;
}

export interface UserProfile {
  name: string;
  email: string;
  weight: number;
  height: number;
  age: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  dailyCalorieTarget: number;
}

export interface DailyLog {
  date: string;
  items: FoodItem[];
}

export interface WeeklyStat {
  day: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface WeightStat {
  month: string;
  weight: number;
}

export interface AIInsight {
  title: string;
  message: string;
  recommendation: string;
}
