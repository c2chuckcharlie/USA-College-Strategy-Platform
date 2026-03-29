import React from 'react';
import { Language } from '@/src/types';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  setLang: (lang: Language) => void;
  currentStep: number;
  steps: { zh: string; en: string }[];
  onStepClick: (step: number) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  lang,
  setLang,
  currentStep,
  steps,
  onStepClick,
}) => {
  return (
    <div className="min-h-screen bg-[#070e1c] text-[#e1eaf5] font-sans selection:bg-blue-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_70%_50%_at_10%_5%,rgba(59,130,246,0.07)_0%,transparent_60%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_50%_40%_at_90%_85%,rgba(240,180,41,0.05)_0%,transparent_55%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_40%_30%_at_60%_40%,rgba(139,92,246,0.04)_0%,transparent_50%)]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#070e1c]/95 backdrop-blur-xl border-b border-blue-500/20 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-blue-500/20">
            🎓
          </div>
          <div>
            <h1 className="text-sm md:text-base font-bold leading-tight">
              {lang === 'zh' ? 'AI 多學科美國大學申請策略平台' : 'AI Multi-Discipline U.S. College Strategy'}
            </h1>
            <p className="text-[10px] md:text-xs text-slate-400">
              {lang === 'zh' ? '商學院 · 社會科學 · 職涯 ROI' : 'Business · Social Sciences · Career ROI'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-blue-500/20">
          <button
            onClick={() => setLang('zh')}
            className={cn(
              "px-3 py-1 rounded-md text-xs font-bold transition-all",
              lang === 'zh' ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
            )}
          >
            🇹🇼 中文
          </button>
          <button
            onClick={() => setLang('en')}
            className={cn(
              "px-3 py-1 rounded-md text-xs font-bold transition-all",
              lang === 'en' ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
            )}
          >
            🇺🇸 EN
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-[#0b1829] border-b border-blue-500/20 px-4 py-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center min-w-max mx-auto max-w-6xl">
          {steps.map((step, index) => {
            const stepNum = index + 1;
            const isActive = stepNum === currentStep;
            const isDone = stepNum < currentStep;

            return (
              <React.Fragment key={index}>
                <div
                  onClick={() => onStepClick(stepNum)}
                  className="flex items-center cursor-pointer group"
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all",
                      isActive ? "bg-blue-600 border-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]" :
                      isDone ? "bg-emerald-600 border-emerald-600 text-white" :
                      "bg-[#070e1c] border-blue-500/20 text-slate-500 group-hover:border-blue-500/40"
                    )}
                  >
                    {isDone ? '✓' : stepNum}
                  </div>
                  <div className={cn(
                    "mx-2 text-[10px] whitespace-nowrap transition-colors",
                    isActive ? "text-blue-500 font-bold" :
                    isDone ? "text-emerald-500" :
                    "text-slate-500"
                  )}>
                    {lang === 'zh' ? step.zh : step.en}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-4 h-[2px] shrink-0 mx-1",
                    isDone ? "bg-emerald-600" : "bg-blue-500/20"
                  )} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  );
};
