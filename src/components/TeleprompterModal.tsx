import React, { useState, useEffect, useRef } from 'react';
import { Script20Points } from '../types';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Mic,
  Video,
  Flame,
  CheckCircle2,
  Maximize2,
  Sliders,
  Smartphone
} from 'lucide-react';

interface TeleprompterModalProps {
  script: Script20Points | null;
  onClose: () => void;
}

export const TeleprompterModal: React.FC<TeleprompterModalProps> = ({
  script,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(2); // 1 - 5
  const [fontSize, setFontSize] = useState(24); // px
  const [activeShotIndex, setActiveShotIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && scrollRef.current) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop += scrollSpeed;
          if (
            scrollRef.current.scrollTop + scrollRef.current.clientHeight >=
            scrollRef.current.scrollHeight - 5
          ) {
            setIsPlaying(false);
          }
        }
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isPlaying, scrollSpeed]);

  if (!script) return null;

  const handleResetScroll = () => {
    setIsPlaying(false);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/95 backdrop-blur-lg overflow-y-auto">
      <div className="bg-slate-900 border border-amber-500/30 rounded-3xl w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        
        {/* Top Control Bar */}
        <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1">
              <Smartphone className="w-4 h-4" /> 1-Phone Shoot Studio Mode
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
              4K 60FPS • Clip-Mic ON
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetScroll}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Reset Scroll"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Content Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden bg-slate-950">
          
          {/* Main 9:16 Teleprompter Screen */}
          <div className="md:col-span-8 p-4 sm:p-6 flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
            
            {/* Smartphone Bezels Frame */}
            <div className="w-full max-w-md h-full bg-slate-900 border-4 border-slate-700 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden relative ring-1 ring-amber-500/30">
              
              {/* Phone Camera Notch & Recording Bar */}
              <div className="bg-slate-950 py-2.5 px-4 flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800">
                <div className="flex items-center gap-1.5 font-mono text-red-400">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  REC 00:24
                </div>
                <div className="w-16 h-3 bg-slate-800 rounded-full mx-auto"></div>
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Mic className="w-3.5 h-3.5" /> MIC OK
                </div>
              </div>

              {/* Hook Banner */}
              <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                  🔥 FIRST 3s VIRAL HOOK
                </span>
                <p className="text-xs font-bold text-amber-200 italic">
                  "{script.viralHook}"
                </p>
              </div>

              {/* Scrolling Teleprompter Text Container */}
              <div
                ref={scrollRef}
                className="flex-1 p-6 overflow-y-auto scroll-smooth text-center select-none"
                style={{ scrollBehavior: 'smooth' }}
              >
                <div className="min-h-[150px]"></div>
                
                <p
                  className="font-bold text-slate-100 leading-relaxed tracking-wide font-sans text-shadow transition-all"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {script.voiceOver || script.fullScript}
                </p>

                <div className="mt-8 pt-4 border-t border-slate-800 text-xs text-amber-400 font-bold">
                  👉 CTA: "{script.cta}"
                </div>
                <div className="min-h-[250px]"></div>
              </div>

              {/* Teleprompter In-Screen Floating Controls */}
              <div className="p-3 bg-slate-950/90 backdrop-blur border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex-1 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition shadow-lg ${
                    isPlaying
                      ? 'bg-amber-500 text-slate-950 shadow-amber-500/30'
                      : 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-slate-950" /> Pause Teleprompter
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-slate-950" /> Start Teleprompter
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

          {/* Right Control & Shot List Sidebar */}
          <div className="md:col-span-4 bg-slate-900 border-l border-slate-800 p-4 sm:p-5 flex flex-col justify-between overflow-y-auto gap-4">
            <div>
              <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4" /> Teleprompter Controls
              </h3>

              {/* Speed Slider */}
              <div className="mb-4 bg-slate-800/60 p-3 rounded-xl border border-slate-700">
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Scroll Speed:</span>
                  <span className="text-amber-400">{scrollSpeed}x</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={scrollSpeed}
                  onChange={(e) => setScrollSpeed(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Font Size Slider */}
              <div className="mb-6 bg-slate-800/60 p-3 rounded-xl border border-slate-700">
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Font Size:</span>
                  <span className="text-amber-400">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="36"
                  step="2"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Shot List Checklist */}
              <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-amber-400" />
                Shot List Checklist ({Array.isArray(script.shotList) ? script.shotList.length : 0} Shots)
              </h4>

              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {Array.isArray(script.shotList) && script.shotList.map((shot, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveShotIndex(idx)}
                    className={`p-2.5 rounded-xl border transition cursor-pointer text-xs flex items-start gap-2 ${
                      activeShotIndex === idx
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                        : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0 border border-slate-700">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{shot}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Tip */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400">
              💡 <strong>Islamabad Farm Tip:</strong> Hold phone at eye level. Position clip-on mic near your collar for crisp Roman Urdu voiceover!
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
