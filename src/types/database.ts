export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          age: number | null;
          gender: 'male' | 'female' | null;
          height_cm: number | null;
          weight_kg: number | null;
          activity_level: string | null;
          daily_calorie_target: number | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          age?: number | null;
          gender?: 'male' | 'female' | null;
          height_cm?: number | null;
          weight_kg?: number | null;
          activity_level?: string | null;
          daily_calorie_target?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          age?: number | null;
          gender?: 'male' | 'female' | null;
          height_cm?: number | null;
          weight_kg?: number | null;
          activity_level?: string | null;
          daily_calorie_target?: number | null;
          created_at?: string;
        };
      };
      journal_entries: {
        Row: {
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
        };
        Insert: {
          id?: string;
          user_id: string;
          entry_date: string;
          meal_type: string;
          food_name: string;
          calories: number;
          protein_g?: number | null;
          carbs_g?: number | null;
          fat_g?: number | null;
          sodium_mg?: number | null;
          fiber_g?: number | null;
          sugar_g?: number | null;
          threshold_status?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          entry_date?: string;
          meal_type?: string;
          food_name?: string;
          calories?: number;
          protein_g?: number | null;
          carbs_g?: number | null;
          fat_g?: number | null;
          sodium_mg?: number | null;
          fiber_g?: number | null;
          sugar_g?: number | null;
          threshold_status?: string | null;
          created_at?: string;
        };
      };
      scan_history: {
        Row: {
          id: string;
          user_id: string;
          result: Json;
          accepted: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          result: Json;
          accepted?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          result?: Json;
          accepted?: boolean;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
