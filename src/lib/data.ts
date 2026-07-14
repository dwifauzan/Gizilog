import type { DailyLog, FoodItem, UserProfile, WeeklyStat, WeightStat, AIInsight } from '../types';

export const MOCK_USER: UserProfile = {
  name: 'Ahmad Rizky',
  email: 'ahmad@example.com',
  weight: 70,
  height: 175,
  age: 24,
  activityLevel: 'moderate',
  dailyCalorieTarget: 2500,
};

export const MOCK_TODAY_LOG: DailyLog = {
  date: new Date().toISOString().split('T')[0],
  items: [
    {
      id: '1',
      food_name: 'Nasi Goreng Ayam',
      calories: 450,
      protein: 18,
      fat: 16,
      carbs: 58,
      sodium: 980,
      fiber: 3,
      sugar: 4,
      createdAt: '07:30',
      category: 'Breakfast',
    },
    {
      id: '2',
      food_name: 'Salmon Panggang + Salad',
      calories: 620,
      protein: 42,
      fat: 28,
      carbs: 32,
      sodium: 720,
      fiber: 8,
      sugar: 6,
      createdAt: '12:45',
      category: 'Lunch',
    },
    {
      id: '3',
      food_name: 'Buah Pisang & Yogurt',
      calories: 180,
      protein: 6,
      fat: 3,
      carbs: 34,
      sodium: 60,
      fiber: 4,
      sugar: 22,
      createdAt: '15:30',
      category: 'Snacks',
    },
  ],
};

export const MOCK_WEEKLY_STATS: WeeklyStat[] = [
  { day: 'Sen', calories: 2100, protein: 95, fat: 68, carbs: 245 },
  { day: 'Sel', calories: 2350, protein: 110, fat: 75, carbs: 260 },
  { day: 'Rab', calories: 1980, protein: 88, fat: 62, carbs: 230 },
  { day: 'Kam', calories: 2500, protein: 120, fat: 82, carbs: 270 },
  { day: 'Jum', calories: 2300, protein: 105, fat: 74, carbs: 255 },
  { day: 'Sab', calories: 2650, protein: 130, fat: 90, carbs: 285 },
  { day: 'Min', calories: 2200, protein: 100, fat: 70, carbs: 250 },
];

export const MOCK_WEIGHT_STATS: WeightStat[] = [
  { month: 'Minggu 1', weight: 72.5 },
  { month: 'Minggu 2', weight: 72.1 },
  { month: 'Minggu 3', weight: 71.6 },
  { month: 'Minggu 4', weight: 71.0 },
];

export const MOCK_AI_INSIGHT: AIInsight = {
  title: 'Analisis Mingguan GiziLog',
  message: 'Asupan proteinmu cenderung stabil di atas 95g/hari, bagus untuk pemulihan otot. Namun, konsumsi lemak di akhir pekan meningkat signifikan.',
  recommendation: 'Pertimbangkan menggoreng dengan sedikit minyak atau pilih protein tanpa kulit. Tambahkan sayuran berdaun hijau untuk keseimbangan serat.',
};

export const FALLBACK_FOODS: FoodItem[] = [
  {
    id: 'f1',
    food_name: 'Nasi Putih + Ayam Goreng',
    calories: 520,
    protein: 28,
    fat: 18,
    carbs: 62,
    sodium: 850,
    fiber: 1,
    sugar: 1,
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    category: 'Lunch',
  },
  {
    id: 'f2',
    food_name: 'Gado-Gado',
    calories: 380,
    protein: 16,
    fat: 20,
    carbs: 38,
    sodium: 620,
    fiber: 9,
    sugar: 8,
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    category: 'Lunch',
  },
  {
    id: 'f3',
    food_name: 'Bakso Kuah',
    calories: 340,
    protein: 18,
    fat: 14,
    carbs: 34,
    sodium: 1450,
    fiber: 2,
    sugar: 2,
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    category: 'Dinner',
  },
];
