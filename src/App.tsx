import React, { useState } from 'react';
import { Header } from './components/Header';
import { CustomGeneratorForm } from './components/CustomGeneratorForm';
import { DailyPackageView } from './components/DailyPackageView';
import { StoryAndCarouselView } from './components/StoryAndCarouselView';
import { BrandDashboard } from './components/BrandDashboard';
import { ScriptDetailModal } from './components/ScriptDetailModal';
import { TeleprompterModal } from './components/TeleprompterModal';
import { INITIAL_DAILY_PACKAGE } from './data/presetContent';
import { DailyContentPackage, Script20Points } from './types';
import { Sparkles, AlertCircle, Egg, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'daily-package' | 'stories-carousels' | 'farm-dashboard'>('daily-package');
  const [packageData, setPackageData] = useState<DailyContentPackage>(INITIAL_DAILY_PACKAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const [selectedScriptForDetail, setSelectedScriptForDetail] = useState<Script20Points | null>(null);
  const [selectedScriptForTeleprompter, setSelectedScriptForTeleprompter] = useState<Script20Points | null>(null);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleGenerateTodayContent = async (userPrompt: string = '', category: string = '') => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userPrompt, category }),
      });

      const data = await response.json();

      if (data.success && data.data) {
        setPackageData({
          ...data.data,
          generatedAt: new Date().toISOString().split('T')[0],
        });
        triggerNotification("🎉 Today's Roman Urdu Viral Package Generated!");
        setActiveTab('daily-package');
      } else if (data.success && data.rawText) {
        triggerNotification("Generated fresh content in Roman Urdu!");
      } else {
        throw new Error(data.error || "Failed to generate package");
      }
    } catch (err: any) {
      console.error("Error triggering today's content:", err);
      setErrorMessage(
        err.message || "Could not generate content. Loaded initial Pakistani farm preset."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Header Bar */}
      <Header
        onTriggerTodayContent={() => handleGenerateTodayContent()}
        isLoading={isLoading}
        activeTab={activeTab}
        setActiveTab={(tab: any) => setActiveTab(tab)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Toast Notification */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-slate-950 px-4 py-3 rounded-2xl font-black text-xs sm:text-sm shadow-2xl flex items-center gap-2 animate-bounce border border-amber-300">
            <CheckCircle2 className="w-5 h-5 fill-slate-950 text-amber-500" />
            <span>{notification}</span>
          </div>
        )}

        {/* Error Alert (If API key missing or network fails) */}
        {errorMessage && (
          <div className="mb-6 bg-rose-950/60 border border-rose-500/40 rounded-2xl p-4 text-rose-200 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Notice:</strong> {errorMessage}
              <p className="text-xs text-rose-300/80 mt-1">
                Showing pre-loaded 20-point Roman Urdu viral scripts for Henzo Farm Islamabad below.
              </p>
            </div>
          </div>
        )}

        {/* Custom Generator Input Bar */}
        <CustomGeneratorForm
          onGenerate={(prompt, category) => handleGenerateTodayContent(prompt, category)}
          isLoading={isLoading}
        />

        {/* Tab Content */}
        {activeTab === 'daily-package' && (
          <DailyPackageView
            packageData={packageData}
            onOpenDetail={(script) => setSelectedScriptForDetail(script)}
            onOpenTeleprompter={(script) => setSelectedScriptForTeleprompter(script)}
          />
        )}

        {activeTab === 'stories-carousels' && (
          <StoryAndCarouselView
            storyIdeas={packageData.storyIdeas || []}
            carouselPost={packageData.carouselPost}
            communityPost={packageData.communityPost}
          />
        )}

        {activeTab === 'farm-dashboard' && (
          <BrandDashboard />
        )}

      </main>

      {/* Modals */}
      <ScriptDetailModal
        script={selectedScriptForDetail}
        onClose={() => setSelectedScriptForDetail(null)}
        onOpenTeleprompter={(script) => {
          setSelectedScriptForDetail(null);
          setSelectedScriptForTeleprompter(script);
        }}
      />

      <TeleprompterModal
        script={selectedScriptForTeleprompter}
        onClose={() => setSelectedScriptForTeleprompter(null)}
      />

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400 font-semibold">
            <Egg className="w-4 h-4 text-amber-400" /> Henzo Farm • Pindorian Shareef, Islamabad
          </div>
          <p className="text-slate-400">
            Pasture-Raised Eggs • 2.5 Kanal Free Range • 500 Hens • Roman Urdu Viral Scripts
          </p>
        </div>
      </footer>

    </div>
  );
}
