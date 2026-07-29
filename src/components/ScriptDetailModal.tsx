import React, { useState } from 'react';
import { Script20Points } from '../types';
import {
  X,
  Flame,
  Camera,
  Music,
  Sliders,
  Sparkles,
  MessageSquare,
  Share2,
  Clock,
  Gauge,
  Copy,
  Check,
  Smartphone,
  Tag,
  Film,
  Type,
  Volume2,
  HelpCircle
} from 'lucide-react';

interface ScriptDetailModalProps {
  script: Script20Points | null;
  onClose: () => void;
  onOpenTeleprompter: (script: Script20Points) => void;
}

export const ScriptDetailModal: React.FC<ScriptDetailModalProps> = ({
  script,
  onClose,
  onOpenTeleprompter,
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!script) return null;

  const copyToClipboard = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const formattedHashtags = Array.isArray(script.hashtags)
    ? script.hashtags.join(' ')
    : script.hashtags;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-850 border-b border-slate-800 flex items-start justify-between gap-4 sticky top-0 z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                {script.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" />
                {script.estWatchTime}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                <Gauge className="w-3 h-3 text-amber-400" />
                Difficulty: {script.difficulty}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {script.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenTeleprompter(script)}
              className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-amber-500/20 hover:scale-105 transition"
            >
              <Smartphone className="w-4 h-4" />
              Shoot Mode
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: 20 Breakdown Items */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-slate-200 text-sm">

          {/* Point 1: Viral Hook */}
          <div className="bg-amber-950/40 border-2 border-amber-500/40 rounded-2xl p-4 sm:p-5 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
                <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
                1. Viral Hook (First 3 Seconds - Roman Urdu)
              </span>
              <button
                onClick={() => copyToClipboard(script.viralHook, 'hook')}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 flex items-center gap-1 transition"
              >
                {copiedSection === 'hook' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Hook
              </button>
            </div>
            <p className="text-base sm:text-lg font-bold text-amber-100 italic leading-snug">
              "{script.viralHook}"
            </p>
          </div>

          {/* Grid section for Script & Voiceover */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Point 2: Full Script */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Film className="w-4 h-4" />
                  2. Full Script (Roman Urdu)
                </span>
                <button
                  onClick={() => copyToClipboard(script.fullScript, 'fullScript')}
                  className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1"
                >
                  {copiedSection === 'fullScript' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  Copy
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {script.fullScript}
              </p>
            </div>

            {/* Point 6: Voice-Over */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4" />
                  6. Voice-Over (Roman Urdu)
                </span>
                <button
                  onClick={() => copyToClipboard(script.voiceOver, 'voiceOver')}
                  className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1"
                >
                  {copiedSection === 'voiceOver' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  Copy VO
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                "{script.voiceOver}"
              </p>
            </div>
          </div>

          {/* Camera Angles & Shot List & B-Roll */}
          <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 space-y-4">
            <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Camera className="w-4 h-4" />
              Production Reality (1-Phone Smartphone Setup)
            </h3>

            {/* Point 3: Camera Angles */}
            <div>
              <span className="text-xs font-bold text-slate-300 block mb-1">
                3. Camera Angles (Phone-only):
              </span>
              <p className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                {script.cameraAngles}
              </p>
            </div>

            {/* Point 4: Shot List */}
            <div>
              <span className="text-xs font-bold text-slate-300 block mb-1">
                4. Shot List:
              </span>
              <ul className="space-y-1.5 text-xs">
                {Array.isArray(script.shotList) ? (
                  script.shotList.map((shot, idx) => (
                    <li key={idx} className="bg-slate-900/90 p-2 rounded border border-slate-800 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-slate-200">{shot}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-xs text-slate-300">{script.shotList}</p>
                )}
              </ul>
            </div>

            {/* Point 5: B-Roll Ideas */}
            <div>
              <span className="text-xs font-bold text-slate-300 block mb-1">
                5. B-Roll Ideas:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {Array.isArray(script.bRollIdeas) ? (
                  script.bRollIdeas.map((broll, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-amber-200">
                      🎬 {broll}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-slate-300">{script.bRollIdeas}</p>
                )}
              </div>
            </div>
          </div>

          {/* Editing, Music, SFX & Color Grading */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Point 7: On-Screen Text */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
              <span className="text-xs font-bold text-amber-400 block mb-1 flex items-center gap-1">
                <Type className="w-3.5 h-3.5" />
                7. On-Screen Text
              </span>
              <ul className="text-xs text-slate-300 space-y-1">
                {Array.isArray(script.onScreenText) ? (
                  script.onScreenText.map((t, idx) => (
                    <li key={idx} className="bg-slate-900 px-2 py-1 rounded border border-slate-800 font-mono text-[11px] text-amber-200">
                      "{t}"
                    </li>
                  ))
                ) : (
                  <li>{script.onScreenText}</li>
                )}
              </ul>
            </div>

            {/* Point 8: Music */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
              <span className="text-xs font-bold text-amber-400 block mb-1 flex items-center gap-1">
                <Music className="w-3.5 h-3.5" />
                8. Background Music
              </span>
              <p className="text-xs text-slate-300">{script.bgMusicStyle}</p>
            </div>

            {/* Point 10: Sound Effects */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
              <span className="text-xs font-bold text-amber-400 block mb-1 flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5" />
                10. Sound Effects
              </span>
              <div className="flex flex-wrap gap-1">
                {Array.isArray(script.soundEffects) ? (
                  script.soundEffects.map((sfx, idx) => (
                    <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-slate-900 rounded border border-slate-700 text-slate-300">
                      🔊 {sfx}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-slate-300">{script.soundEffects}</p>
                )}
              </div>
            </div>

            {/* Point 11: Color Grading */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
              <span className="text-xs font-bold text-amber-400 block mb-1 flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5" />
                11. Color Grading
              </span>
              <p className="text-xs text-slate-300">{script.colorGrading}</p>
            </div>
          </div>

          {/* Point 9: Editing Instructions */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4">
            <span className="text-xs font-bold text-amber-400 block mb-1">
              9. Editing Instructions:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              {script.editingInstructions}
            </p>
          </div>

          {/* Point 12: Thumbnail Idea */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4">
            <span className="text-xs font-bold text-amber-400 block mb-1">
              12. Thumbnail Idea:
            </span>
            <p className="text-xs text-slate-200 bg-amber-950/20 p-2.5 rounded-lg border border-amber-500/20 font-semibold">
              🖼️ {script.thumbnailIdea}
            </p>
          </div>

          {/* Caption, Hashtags & CTA */}
          <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                13. Caption (Roman Urdu) & 15. CTA
              </span>
              <button
                onClick={() => copyToClipboard(`${script.caption}\n\n${formattedHashtags}`, 'caption')}
                className="px-2.5 py-1 rounded text-xs font-semibold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 flex items-center gap-1 transition"
              >
                {copiedSection === 'caption' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Caption & Hashtags
              </button>
            </div>

            <p className="text-xs text-slate-200 bg-slate-900 p-3 rounded-lg border border-slate-800 leading-relaxed">
              {script.caption}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400">15. CTA:</span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                👉 {script.cta}
              </span>
            </div>

            {/* Point 14: Hashtags */}
            <div>
              <span className="text-xs font-bold text-slate-400 block mb-1 flex items-center gap-1">
                <Tag className="w-3 h-3" /> 14. Hashtags:
              </span>
              <p className="text-xs font-mono text-amber-300 bg-slate-900 p-2 rounded border border-slate-800">
                {formattedHashtags}
              </p>
            </div>
          </div>

          {/* Viral Psychology Triggers (16, 17, 18, 19, 20) */}
          <div className="bg-gradient-to-br from-amber-950/30 to-slate-900 border border-amber-500/30 rounded-2xl p-4 sm:p-5 space-y-3">
            <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-amber-500/20 pb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Psychology & Growth Analysis (Points 16 - 20)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-amber-400 block mb-1">16. Why Viral?</span>
                <p className="text-xs text-slate-300 leading-relaxed">{script.whyViral}</p>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-amber-400 block mb-1">17. Why People Will Comment?</span>
                <p className="text-xs text-slate-300 leading-relaxed">{script.whyComment}</p>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-amber-400 block mb-1">18. Why People Will Share?</span>
                <p className="text-xs text-slate-300 leading-relaxed">{script.whyShare}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
              <span className="text-slate-400">
                19. Est Watch Time: <strong className="text-white">{script.estWatchTime}</strong>
              </span>
              <span className="text-slate-400">
                20. Shoot Difficulty: <strong className="text-amber-400">{script.difficulty}</strong>
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-850 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition"
          >
            Close
          </button>

          <button
            onClick={() => onOpenTeleprompter(script)}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
          >
            <Smartphone className="w-4 h-4" />
            Launch Teleprompter Shoot Mode
          </button>
        </div>

      </div>
    </div>
  );
};
