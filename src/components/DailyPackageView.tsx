import React, { useState } from 'react';
import { DailyContentPackage, Script20Points, CategoryFilter } from '../types';
import { ScriptCard } from './ScriptCard';
import {
  Instagram,
  Video,
  Youtube,
  Zap,
  Filter,
  Search,
  CheckCircle,
  Calendar
} from 'lucide-react';

interface DailyPackageViewProps {
  packageData: DailyContentPackage;
  onOpenDetail: (script: Script20Points) => void;
  onOpenTeleprompter: (script: Script20Points) => void;
}

const CATEGORIES: CategoryFilter[] = [
  'All',
  'Comedy',
  'Dark Humor',
  'Mini-Documentary',
  'Myth Busters',
  'Investigation',
  'Gym & Health',
  'Farm POV',
  'Luxury & B2B'
];

export const DailyPackageView: React.FC<DailyPackageViewProps> = ({
  packageData,
  onOpenDetail,
  onOpenTeleprompter,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePlatformFilter, setActivePlatformFilter] = useState<'all' | 'reels' | 'tiktoks' | 'shorts'>('all');

  const reels = packageData?.instagramReels || [];
  const tiktoks = packageData?.tikTokVideos || [];
  const shorts = packageData?.youtubeShort || [];

  const filterScript = (script: Script20Points) => {
    const matchesCategory =
      selectedCategory === 'All' || script.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.viralHook.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.caption.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  };

  const filteredReels = reels.filter(filterScript);
  const filteredTikToks = tiktoks.filter(filterScript);
  const filteredShorts = shorts.filter(filterScript);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Package Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {packageData.generatedAt || 'Today'}
            </span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> 20-Point Roman Urdu Compliant
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {packageData.themeName || "Daily Roman Urdu Viral Scripts"}
          </h2>
        </div>

        {/* Platform count summary */}
        <div className="flex items-center gap-2 text-xs font-bold">
          <button
            onClick={() => setActivePlatformFilter('all')}
            className={`px-3 py-1.5 rounded-xl border transition ${
              activePlatformFilter === 'all'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            All Videos ({reels.length + tiktoks.length + shorts.length})
          </button>
          <button
            onClick={() => setActivePlatformFilter('reels')}
            className={`px-3 py-1.5 rounded-xl border transition flex items-center gap-1 ${
              activePlatformFilter === 'reels'
                ? 'bg-pink-500 text-white border-pink-400 font-bold shadow-md'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <Instagram className="w-3.5 h-3.5" /> Reels ({reels.length})
          </button>
          <button
            onClick={() => setActivePlatformFilter('tiktoks')}
            className={`px-3 py-1.5 rounded-xl border transition flex items-center gap-1 ${
              activePlatformFilter === 'tiktoks'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" /> TikToks ({tiktoks.length})
          </button>
          <button
            onClick={() => setActivePlatformFilter('shorts')}
            className={`px-3 py-1.5 rounded-xl border transition flex items-center gap-1 ${
              activePlatformFilter === 'shorts'
                ? 'bg-red-500 text-white border-red-400 font-bold shadow-md'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <Youtube className="w-3.5 h-3.5" /> Shorts ({shorts.length})
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-amber-400 shrink-0 mr-1" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hooks or scripts..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500/50 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none"
          />
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="space-y-8">
        
        {/* 1. Instagram Reels */}
        {(activePlatformFilter === 'all' || activePlatformFilter === 'reels') && filteredReels.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
                <Instagram className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-black text-white">
                3 Instagram Reels (9:16 Vertical)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {filteredReels.map((reel) => (
                <ScriptCard
                  key={reel.id}
                  script={reel}
                  platform="instagram"
                  onOpenDetail={onOpenDetail}
                  onOpenTeleprompter={onOpenTeleprompter}
                />
              ))}
            </div>
          </div>
        )}

        {/* 2. TikTok Videos */}
        {(activePlatformFilter === 'all' || activePlatformFilter === 'tiktoks') && filteredTikToks.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Video className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-black text-white">
                3 TikTok Videos (High Retention Phone Filming)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {filteredTikToks.map((tiktok) => (
                <ScriptCard
                  key={tiktok.id}
                  script={tiktok}
                  platform="tiktok"
                  onOpenDetail={onOpenDetail}
                  onOpenTeleprompter={onOpenTeleprompter}
                />
              ))}
            </div>
          </div>
        )}

        {/* 3. YouTube Short */}
        {(activePlatformFilter === 'all' || activePlatformFilter === 'shorts') && filteredShorts.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
                <Youtube className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-black text-white">
                1 YouTube Short (Fast Visual Experiment)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {filteredShorts.map((short) => (
                <ScriptCard
                  key={short.id}
                  script={short}
                  platform="youtube"
                  onOpenDetail={onOpenDetail}
                  onOpenTeleprompter={onOpenTeleprompter}
                />
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
