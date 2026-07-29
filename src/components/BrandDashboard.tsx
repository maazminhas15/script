import React, { useState } from 'react';
import { HENZO_FARM_DATA } from '../data/brandInfo';
import {
  Egg,
  MapPin,
  CheckCircle2,
  Sliders,
  Award,
  Users,
  Feather,
  Sparkles,
  Zap,
  Info
} from 'lucide-react';

export const BrandDashboard: React.FC = () => {
  const [azollaPercentage, setAzollaPercentage] = useState(30);
  const [flaxseedPercentage, setFlaxseedPercentage] = useState(20);
  const [pastureHours, setPastureHours] = useState(12);

  // Yolk color calculation (1 - 15 Roche Yolk Fan scale)
  const calculateYolkScore = () => {
    const base = 4;
    const azollaBoost = (azollaPercentage / 100) * 4.5;
    const flaxBoost = (flaxseedPercentage / 100) * 2.5;
    const pastureBoost = (pastureHours / 24) * 4;
    return Math.min(15, Math.round(base + azollaBoost + flaxBoost + pastureBoost));
  };

  const yolkScore = calculateYolkScore();

  const getYolkShadeColor = (score: number) => {
    if (score < 6) return 'bg-yellow-300 text-slate-950';
    if (score < 9) return 'bg-amber-400 text-slate-950';
    if (score < 12) return 'bg-amber-500 text-slate-950';
    return 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner: Henzo Farm Profile */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {HENZO_FARM_DATA.location}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                2.5 Kanal Free-Range Pasture
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              HENZO FARM <span className="text-amber-400">ISLAMABAD</span>
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              500 free-range hens roaming 24/7 in Pindorian Shareef. Premium pasture-raised eggs fed green fodder, flaxseed, and Azolla duckweed.
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex items-center gap-4 shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-500/40 text-amber-400">
              <Egg className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block">Positioning:</span>
              <span className="text-base font-black text-amber-300">{HENZO_FARM_DATA.priceRange}</span>
              <span className="text-[11px] text-emerald-400 block font-semibold">Premium Islamabad Home Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Feed & Yolk Simulator + Target Customer Personas */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Yolk Color Simulator */}
        <div className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Azolla & Pasture Yolk Shade Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Simulate how natural feed ratios affect yolk color on the Roche Yolk Scale
              </p>
            </div>

            <span className={`px-3 py-1.5 rounded-xl font-black text-xs shadow-md ${getYolkShadeColor(yolkScore)}`}>
              Score: {yolkScore} / 15 (Deep Orange)
            </span>
          </div>

          <div className="space-y-4">
            {/* Azolla slider */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>Azolla Duckweed Feed Ratio:</span>
                <span className="text-amber-400">{azollaPercentage}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={azollaPercentage}
                onChange={(e) => setAzollaPercentage(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Flaxseed slider */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>Flaxseed (Omega-3 Boost):</span>
                <span className="text-amber-400">{flaxseedPercentage}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={flaxseedPercentage}
                onChange={(e) => setFlaxseedPercentage(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Pasture Hours slider */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>Free-Range Roaming Hours (Daily):</span>
                <span className="text-amber-400">{pastureHours} Hours</span>
              </div>
              <input
                type="range"
                min="2"
                max="24"
                value={pastureHours}
                onChange={(e) => setPastureHours(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Why Yolk Color Matters in Roman Urdu Content:</strong>
              <p className="mt-0.5 text-slate-400">
                Pakistanis instantly judge egg quality by yolk zardi color. By showing live video of hens eating Azolla and flaxseed in Pindorian Shareef, viewers see 100% proof that the deep orange color is natural, not synthetic.
              </p>
            </div>
          </div>
        </div>

        {/* Target Islamabad Customer Personas */}
        <div className="md:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Users className="w-5 h-5 text-amber-400" />
            Target Islamabad Buyers
          </h2>

          <div className="space-y-3 text-xs">
            {HENZO_FARM_DATA.targetAudience.map((audience, idx) => (
              <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                  {idx + 1}
                </span>
                <span className="font-semibold text-slate-200">{audience}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 text-xs">
            <strong className="text-amber-400 block mb-1">Roman Urdu Tone Checklist:</strong>
            <ul className="space-y-1 text-slate-400 font-mono">
              <li>• Short & punchy sentences</li>
              <li>• Conversational ("Yeh dekho", "Log nahi samajhte")</li>
              <li>• Zero formal textbook Urdu</li>
              <li>• 1-Smartphone filmable on farm</li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
};
