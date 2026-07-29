import React, { useState } from 'react';
import { StoryIdea, CarouselPost, CommunityPost } from '../types';
import {
  Layers,
  Sparkles,
  MessageSquare,
  HelpCircle,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  BarChart2,
  Smartphone,
  Tag
} from 'lucide-react';

interface StoryAndCarouselViewProps {
  storyIdeas: StoryIdea[];
  carouselPost: CarouselPost;
  communityPost: CommunityPost;
}

export const StoryAndCarouselView: React.FC<StoryAndCarouselViewProps> = ({
  storyIdeas,
  carouselPost,
  communityPost,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(key);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const slides = carouselPost?.slides || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Instagram Stories Section (5 Ideas) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-amber-400" />
              5 Instagram Story Concepts (With Interactive Stickers)
            </h2>
            <p className="text-xs text-slate-400">
              Designed for daily Islamabad follower engagement & poll participation
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            5 Stories Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {storyIdeas.map((story, idx) => (
            <div
              key={story.id || idx}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 flex flex-col justify-between shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-amber-400 font-bold mb-2">
                  <span>STORY #{idx + 1}</span>
                  <button
                    onClick={() => copyToClipboard(story.conceptRomanUrdu, `story-${idx}`)}
                    className="p-1 text-slate-400 hover:text-white"
                    title="Copy Story Concept"
                  >
                    {copiedSection === `story-${idx}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <h3 className="text-sm font-bold text-white mb-2 leading-tight">
                  {story.title}
                </h3>

                <p className="text-xs text-slate-300 mb-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800 italic">
                  "{story.conceptRomanUrdu}"
                </p>

                <div className="text-[11px] text-amber-300 bg-amber-950/30 p-2 rounded-lg border border-amber-500/20 mb-3">
                  <span className="font-bold text-amber-400 block mb-0.5">🎨 Visual:</span>
                  {story.visualGuide}
                </div>
              </div>

              {/* Interactive Sticker Highlight */}
              <div className="pt-2 border-t border-slate-800">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  💬 STICKER PROMPT:
                </span>
                <p className="text-xs font-mono text-emerald-200 bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/30">
                  {story.interactiveSticker}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Carousel Post Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-2 inline-block">
              Instagram & LinkedIn Carousel
            </span>
            <h2 className="text-xl font-black text-white">
              {carouselPost.title}
            </h2>
            <p className="text-xs text-amber-300 font-semibold italic mt-1">
              Hook: "{carouselPost.hookRomanUrdu}"
            </p>
          </div>

          <button
            onClick={() => copyToClipboard(`${carouselPost.caption}\n\n${carouselPost.hashtags?.join(' ')}`, 'carousel')}
            className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 hover:bg-amber-400 transition shadow-md shadow-amber-500/20 shrink-0"
          >
            {copiedSection === 'carousel' ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
            Copy Carousel Caption
          </button>
        </div>

        {/* Slides Viewer */}
        {slides.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Slide Display Box (Mock Instagram Frame) */}
            <div className="md:col-span-7 bg-slate-950 border-2 border-slate-700 rounded-2xl p-6 shadow-2xl relative min-h-[320px] flex flex-col justify-between">
              
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                <span className="font-mono text-amber-400 font-bold">
                  SLIDE {activeSlide + 1} OF {slides.length}
                </span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                  Swipe Left ➔
                </span>
              </div>

              <div className="space-y-4 my-auto">
                <h3 className="text-lg font-black text-white leading-tight">
                  {slides[activeSlide]?.title}
                </h3>
                <p className="text-sm font-semibold text-amber-100 bg-amber-950/40 p-3.5 rounded-xl border border-amber-500/30 leading-relaxed">
                  "{slides[activeSlide]?.textRomanUrdu}"
                </p>
                <div className="text-xs text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 font-bold block mb-1">Visual Direction:</span>
                  {slides[activeSlide]?.visualGuide}
                </div>
              </div>

              {/* Slide Navigation controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-850 mt-4">
                <button
                  onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))}
                  disabled={activeSlide === 0}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-slate-300 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <div className="flex gap-1.5">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        activeSlide === idx ? 'bg-amber-400 w-6' : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveSlide(Math.min(slides.length - 1, activeSlide + 1))}
                  disabled={activeSlide === slides.length - 1}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-slate-300 flex items-center gap-1"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Carousel Caption Details */}
            <div className="md:col-span-5 space-y-4">
              <div className="bg-slate-850 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Carousel Caption (Roman Urdu)
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {carouselPost.caption}
                </p>
              </div>

              <div className="bg-slate-850 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Target Hashtags
                </h4>
                <p className="text-xs font-mono text-amber-300">
                  {carouselPost.hashtags?.join(' ')}
                </p>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* 3. Community Engagement Post */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <MessageSquare className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-black text-white">
                Community Engagement & Poll Post
              </h2>
              <p className="text-xs text-slate-400">
                Designed to maximize comments, votes, and DM inquiries in Islamabad
              </p>
            </div>
          </div>

          <button
            onClick={() => copyToClipboard(`${communityPost.questionRomanUrdu}\n\n${communityPost.caption}`, 'community')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition"
          >
            {copiedSection === 'community' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            Copy Poll
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-amber-300">
              ❓ Question (Roman Urdu): "{communityPost.questionRomanUrdu}"
            </h3>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 block">Poll Options:</span>
              {communityPost.pollOptions?.map((opt, idx) => (
                <div key={idx} className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-200 font-semibold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  {opt}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              🚀 Comment & Conversion Strategy:
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
              {communityPost.engagementStrategy}
            </p>
            <div className="text-xs text-slate-400">
              <strong className="text-slate-200">Caption:</strong> {communityPost.caption}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
