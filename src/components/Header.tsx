import React from 'react';
import { Egg, Sparkles, MapPin, Zap, Clapperboard, Layers } from 'lucide-react';

interface HeaderProps {
  onTriggerTodayContent: () => void;
  isLoading: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onTriggerTodayContent,
  isLoading,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="bg-slate-900 border-b border-amber-500/20 text-slate-100 sticky top-0 z-40 backdrop-blur-md bg-opacity-95 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-3">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/30">
              <Egg className="w-6 h-6 fill-slate-950 stroke-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                  HENZO <span className="text-amber-400 font-extrabold">STUDIO</span>
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" /> Islamabad
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Pakistani Pasture-Raised Viral Roman Urdu Script Engine
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 overflow-x-auto">
            <button
              onClick={() => setActiveTab('daily-package')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'daily-package'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Daily Content
            </button>
            <button
              onClick={() => setActiveTab('stories-carousels')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'stories-carousels'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Stories & Carousels
            </button>
            <button
              onClick={() => setActiveTab('farm-dashboard')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'farm-dashboard'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Clapperboard className="w-3.5 h-3.5" />
              Farm Setup & Yolk Calculator
            </button>
          </div>

          {/* Trigger "Give me today's content" Button */}
          <div>
            <button
              onClick={onTriggerTodayContent}
              disabled={isLoading}
              className="w-full md:w-auto px-4 py-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all transform active:scale-95 flex items-center justify-center gap-2 border border-amber-300/40 disabled:opacity-60"
            >
              <Sparkles className={`w-4 h-4 text-slate-950 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Generating Roman Urdu Scripts...' : 'Give me today\'s content'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
