import React, { useState } from 'react';
import { POPULAR_PROMPTS } from '../data/brandInfo';
import { Sparkles, Send, Flame, Zap, HelpCircle } from 'lucide-react';

interface CustomGeneratorFormProps {
  onGenerate: (prompt: string, category: string) => void;
  isLoading: boolean;
}

export const CustomGeneratorForm: React.FC<CustomGeneratorFormProps> = ({
  onGenerate,
  isLoading,
}) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(customPrompt, selectedCategory);
  };

  const handleSelectPreset = (promptText: string, category: string) => {
    setCustomPrompt(promptText);
    setSelectedCategory(category);
    onGenerate(promptText, category);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            Generate Roman Urdu Content Package
          </h2>
          <p className="text-xs text-slate-400">
            Generates 3 Reels, 3 TikToks, 1 Short, 5 Stories, 1 Carousel & 1 Community Post in Roman Urdu
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Enter custom focus (e.g., 'F-7 Islamabad Cafe Yolk Test' or 'Dark Humor Chicken Crime')..."
            className="flex-1 bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 disabled:opacity-60 shrink-0"
          >
            <Send className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Generating Scripts...' : 'Generate Today\'s Package'}</span>
          </button>
        </div>
      </form>

      {/* Popular Pakistani Preset Prompt Chips */}
      <div className="mt-4 pt-4 border-t border-slate-800">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          Quick Pakistani Content Preset Concepts:
        </span>
        <div className="flex flex-wrap gap-2">
          {POPULAR_PROMPTS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(preset.prompt, preset.category)}
              disabled={isLoading}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-amber-300 text-xs font-semibold rounded-xl border border-slate-700 transition flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
