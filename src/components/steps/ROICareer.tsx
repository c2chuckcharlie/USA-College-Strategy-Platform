import React from 'react';
import { AppState } from '@/src/types';
import { Card, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { CAREER_DATA, DISC_CONFIG } from '@/src/constants';
import { DollarSign, Briefcase, GraduationCap, TrendingUp } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface StepProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ROICareer: React.FC<StepProps> = ({ state, updateState, onNext, onPrev }) => {
  const { lang, selectedDiscs } = state;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
          {lang === 'zh' ? '職涯 ROI 與就業前景分析' : 'Career ROI & Employment Outlook'}
        </h2>
        <p className="text-sm text-slate-400">
          {lang === 'zh' ? '比較各學科的薪資、職涯路徑、研究所升學機會與頂尖雇主，做出最有價值的決策。' : 'Compare salaries, career paths, graduate school prospects, and top employers across disciplines.'}
        </p>
      </div>

      <Card>
        <CardTitle><DollarSign className="w-4 h-4" /> {lang === 'zh' ? '學科薪資比較' : 'Salary by Discipline'}</CardTitle>
        <div className="space-y-4">
          {selectedDiscs.map(d => {
            const data = CAREER_DATA[d] || CAREER_DATA.Other;
            const pct = Math.round(data.startSal / 120000 * 100);
            return (
              <div key={d} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">{DISC_CONFIG[d]?.icon} {d}</span>
                  <span className="text-blue-400">${data.startSal.toLocaleString()} → ${data.midSal.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-blue-500/10">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedDiscs.map(d => {
          const data = CAREER_DATA[d] || CAREER_DATA.Other;
          return (
            <Card key={d} className="border-blue-500/10">
              <CardTitle className="text-blue-400">{DISC_CONFIG[d]?.icon} {d}</CardTitle>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {data.paths.map(p => <Badge key={p} variant="default" className="bg-blue-500/5 text-blue-300 border-blue-500/20">{p}</Badge>)}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">{lang === 'zh' ? '起薪' : 'Start Salary'}</p>
                    <p className="text-lg font-black text-blue-400">${Math.round(data.startSal/1000)}K</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">{lang === 'zh' ? '10年薪資' : '10yr Salary'}</p>
                    <p className="text-lg font-black text-emerald-400">${Math.round(data.midSal/1000)}K</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-2">
                    <GraduationCap className="w-3 h-3" /> {lang === 'zh' ? '升學路徑' : 'Grad Paths'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {data.grad.map(g => <Badge key={g} variant="research" className="text-[10px]">{g}</Badge>)}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-2">
                    <Briefcase className="w-3 h-3" /> {lang === 'zh' ? '主要雇主' : 'Key Employers'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {data.employers.map(e => <Badge key={e} variant="safety" className="text-[10px]">{e}</Badge>)}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="secondary" size="lg" onClick={onPrev}>
          ← {lang === 'zh' ? '上一步' : 'Back'}
        </Button>
        <Button variant="nav" size="lg" onClick={onNext}>
          {lang === 'zh' ? 'AI 申請策略' : 'AI Strategy'} →
        </Button>
      </div>
    </div>
  );
};
