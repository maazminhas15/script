import React from 'react';
import { Script20Points } from '../types';
import {
  Instagram,
  Video,
  Youtube,
  Clock,
  Gauge,
  Eye,
  Smartphone,
  Copy,
  Check,
  Flame,
  MessageCircle,
  Share2
} from 'lucide-react';

interface ScriptCardProps {
  script: Script20Points;
  platform: 'instagram' | 'tiktok' | 'youtube';
  onOpenDetail: (script: Script20Points) => void;
  onOpenTeleprompter: (script: Script20Points) => void;
}

export const ScriptCard: React.FC<ScriptCardProps> = ({
  script,
  platform,
  onOpenDetail,
  onOpenTeleprompter
}) => {
  const [copiedHook, setCopiedHook] = React.useState(false);

  const handleCopyHook = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(script.viralHook);
    setCopiedHook(true);
    setTimeout(() => setCopiedHook(false), 2000);
  };

  const getPlatformIcon = () => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'tiktok':
        return <Video className="w-4 h-4 text-cyan-400" />;
      case 'youtube':
        return <Youtube className="w-4 h-4 text-red-500" />;
    }
  };

  const getPlatformLabel = () => {
    switch (platform) {
      case 'instagram':
        return 'Instagram Reel';
      case 'tiktok':
        return 'TikTok Video';
      case 'youtube':
        return 'YouTube Short';
    }
  };

  const getDifficultyBadge = () => {
    switch (script.difficulty) {
      case 'Easy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Hard':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-lg transition-all hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between group">
      <div>
        {/* Header badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
              {getPlatformIcon()}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              {getPlatformLabel()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              {script.category}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1 ${getDifficultyBadge()}`}>
              <Gauge className="w-3 h-3" />
              {script.difficulty}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-2.5 line-clamp-2">
          {script.title}
        </h3>

        {/* Viral Hook (First 3 seconds in Roman Urdu) */}
        <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-3 mb-4 relative">
          <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-1">
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              VIRAL HOOK (First 3s - Roman Urdu)
            </span>
            <button
              onClick={handleCopyHook}
              className="p-1 rounded text-amber-400 hover:text-white hover:bg-amber-500/20 transition"
              title="Copy Hook"
            >
              {copiedHook ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className="text-sm font-semibold text-amber-100 italic leading-relaxed">
            "{script.viralHook}"
          </p>
        </div>

        {/* Short Script snippet */}
        <div className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed bg-slate-850/50 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-400 font-medium mr-1">Voiceover Preview:</span>
          {script.voiceOver}
        </div>

        {/* Virality highlights (Why Viral, Est Watch Time) */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 mb-4 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Time: <strong className="text-slate-200">{script.estWatchTime}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>1-Phone Shoot</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
        <button
          onClick={() => onOpenDetail(script)}
          className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 border border-slate-700"
        >
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          Full 20 Points
        </button>

        <button
          onClick={() => onOpenTeleprompter(script)}
          className="py-2 px-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-black rounded-xl transition flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
          title="Open Teleprompter Shoot Mode"
        >
          <Smartphone className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
          Teleprompter
        </button>
      </div>
    </div>
  );
};
