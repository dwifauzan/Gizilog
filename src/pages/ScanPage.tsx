import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, RotateCcw, Check, ChevronDown, ChevronUp, Sparkles, AlertCircle } from 'lucide-react';
import { FoodPieChart } from '../components/ui/FoodPieChart';
import { ThresholdBadge } from '../components/ui/ThresholdBadge';
import { FALLBACK_FOODS } from '../lib/data';
import { cn, formatNumber } from '../lib/utils';
import type { FoodItem, Nutrition } from '../types';

const videoConstraints = {
  facingMode: 'environment',
};

const initialResult: FoodItem = {
  id: 'scan-result',
  food_name: 'Nasi Campur Sayur + Telur',
  calories: 540,
  protein: 22,
  fat: 18,
  carbs: 68,
  sodium: 1120,
  fiber: 6,
  sugar: 5,
  createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  category: 'Lunch',
};

export function ScanPage() {
  const webcamRef = useRef<Webcam>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<FoodItem | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [showMobileSheet, setShowMobileSheet] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) {
      setError('Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.');
      return;
    }
    setProcessing(true);
    setError(null);

    // Simulate AI processing delay
    setTimeout(() => {
      setProcessing(false);
      setResult(initialResult);
      setShowMobileSheet(true);
    }, 1800);
  }, [webcamRef]);

  const selectFallback = (food: FoodItem) => {
    setResult(food);
    setShowFallback(false);
  };

  const resetScan = () => {
    setResult(null);
    setShowFallback(false);
    setShowMobileSheet(true);
    setError(null);
  };

  const handleAccept = () => {
    // In a real app, persist to journal
    alert(`${result?.food_name} ditambahkan ke jurnal!`);
    resetScan();
  };

  const nutrition: Nutrition = {
    calories: result?.calories ?? 0,
    protein: result?.protein ?? 0,
    fat: result?.fat ?? 0,
    carbs: result?.carbs ?? 0,
    sodium: result?.sodium ?? 0,
    fiber: result?.fiber ?? 0,
    sugar: result?.sugar ?? 0,
  };

  return (
    <div className="h-[calc(100svh-96px)] lg:h-auto -mx-4 sm:-mx-6 lg:mx-0 lg:min-h-[calc(100svh-80px)]">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 h-full lg:h-auto lg:items-start">
        {/* Camera Section */}
        <div className="relative flex-1 lg:w-[45%] lg:flex-none lg:aspect-square lg:max-h-[70svh] bg-black rounded-none lg:rounded-3xl overflow-hidden">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Scan laser animation */}
          {!result && !processing && <div className="scan-line" />}

          {/* Overlay corners */}
          <div className="absolute inset-4 border-2 border-white/30 rounded-2xl pointer-events-none" />

          {/* Error */}
          {error && (
            <div className="absolute top-4 left-4 right-4 bg-red-600 text-white text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {/* Processing overlay */}
          {processing && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
              <Sparkles className="w-10 h-10 animate-pulse mb-3" />
              <p className="text-sm font-bold">Menganalisis makanan...</p>
            </div>
          )}

          {/* Shutter button - mobile center bottom */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center lg:hidden">
            <button
              type="button"
              onClick={capture}
              disabled={processing || !!result}
              className={cn(
                'w-20 h-20 rounded-full border-4 border-white/80 flex items-center justify-center transition-transform active:scale-95',
                processing || result ? 'bg-gray-400' : 'bg-white'
              )}
            >
              <Camera className="w-8 h-8 text-dark" />
            </button>
          </div>
        </div>

        {/* Result Panel - Desktop always visible */}
        <div
          className={cn(
            'lg:w-[55%] lg:flex-none bg-white lg:bg-transparent lg:rounded-none flex flex-col transition-all',
            result
              ? 'fixed inset-x-0 bottom-0 z-30 rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] lg:static lg:shadow-none animate-slide-up lg:animate-none'
              : 'hidden lg:flex items-center justify-center'
          )}
        >
          {/* Mobile sheet handle */}
          {result && (
            <button
              type="button"
              onClick={() => setShowMobileSheet(!showMobileSheet)}
              className="w-full flex justify-center py-3 lg:hidden"
            >
              {showMobileSheet ? <ChevronDown className="w-6 h-6 text-gray-400" /> : <ChevronUp className="w-6 h-6 text-gray-400" />}
            </button>
          )}

          <div className={cn('flex-1 overflow-y-auto p-4 lg:p-0', !showMobileSheet && 'hidden lg:block')}>
            {!result ? (
              <div className="text-center text-gray-400 py-12 lg:py-0">
                <Camera className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-bold text-gray-500">Ambil foto makananmu</p>
                <p className="text-sm mt-1">AI akan menganalisis kandungan gizi secara otomatis.</p>
              </div>
            ) : (
              <div className="space-y-5 pb-24 lg:pb-0">
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">Hasil Scan AI</p>
                  <h2 className="text-2xl font-extrabold text-dark">{result.food_name}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatNumber(result.calories)} kkal · {formatNumber(result.protein)}g protein ·{' '}
                    {formatNumber(result.carbs)}g karbo · {formatNumber(result.fat)}g lemak
                  </p>
                </div>

                {/* Sekat Piring - Chart + Indicators */}
                <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
                  <h3 className="text-base font-extrabold text-dark mb-1">Sekat Piring Makan</h3>
                  <p className="text-xs text-gray-500 mb-4">Rasio makronutrisi dari hasil analisis AI.</p>

                  <FoodPieChart data={nutrition} />

                  <div className="space-y-2 mt-4">
                    <ThresholdBadge type="sodium" value={result.sodium ?? 0} />
                    <ThresholdBadge type="fiber" value={result.fiber ?? 0} />
                    <ThresholdBadge type="sugar" value={result.sugar ?? 0} />
                  </div>
                </div>

                {/* Fallback / Manual Adjust */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowFallback(!showFallback)}
                    className="text-sm font-bold text-accent hover:underline"
                  >
                    {showFallback ? 'Tutup pilihan' : 'Bukan ini? / Manual Adjust'}
                  </button>

                  {showFallback && (
                    <div className="mt-3 space-y-2">
                      {FALLBACK_FOODS.map((food) => (
                        <button
                          key={food.id}
                          type="button"
                          onClick={() => selectFallback(food)}
                          className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:border-primary transition-colors text-left"
                        >
                          <div>
                            <p className="text-sm font-bold text-dark">{food.food_name}</p>
                            <p className="text-xs text-gray-500">
                              {food.calories} kkal · P:{food.protein}g · L:{food.fat}g · K:{food.carbs}g
                            </p>
                          </div>
                          <Check className={cn('w-5 h-5', result.id === food.id ? 'text-primary' : 'text-gray-300')} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetScan}
                    className="flex-1 py-3.5 rounded-xl border border-gray-200 bg-white text-dark font-bold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Ulang
                  </button>
                  <button
                    type="button"
                    onClick={handleAccept}
                    className="flex-1 py-3.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Simpan
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop shutter button - below camera */}
      <div className="hidden lg:flex mt-6 justify-center">
        <button
          type="button"
          onClick={capture}
          disabled={processing || !!result}
          className={cn(
            'w-16 h-16 rounded-full border-4 border-primary/30 flex items-center justify-center transition-transform active:scale-95',
            processing || result ? 'bg-gray-300' : 'bg-primary'
          )}
        >
          <Camera className="w-7 h-7 text-white" />
        </button>
      </div>
    </div>
  );
}
