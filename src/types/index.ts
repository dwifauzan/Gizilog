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
  gender?: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  dailyCalorieTarget: number;
}

export interface Profile {
  id: string;
  name: string;
  age: number | null;
  gender: 'male' | 'female' | null;
  height_cm: number | null;
  weight_kg: number | null;
  activity_level: string | null;
  daily_calorie_target: number | null;
  created_at: string;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  entry_date: string;
  meal_type: string;
  food_name: string;
  calories: number;
  protein_g: number | null;
  carbs_g: number | null;
  fat_g: number | null;
  sodium_mg: number | null;
  fiber_g: number | null;
  sugar_g: number | null;
  threshold_status: string | null;
  created_at: string;
}

export interface ScanHistory {
  id: string;
  user_id: string;
  result: Record<string, unknown>;
  accepted: boolean;
  created_at: string;
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
