import React, { useState, useMemo } from 'react';
import { AppState, School } from '@/src/types';
import { Card, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Slider } from '../ui/Slider';
import { SCHOOL_DB } from '@/src/constants';
import { Settings2, TrendingUp, Info } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface StepProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ScenarioSimulator: React.FC<StepProps> = ({ state, updateState, onNext, onPrev }) => {
  const { lang, selectedDiscs } = state;

  const [simParams, setSimParams] = useState({
    sat: state.satScore,
    gpa: state.gpaU,
    intern: state.activities.filter(a => a.cat === 'Internship').length,
    comp: state.activities.filter(a => a.cat === 'Competition').length,
    res: state.activities.filter(a => a.cat === 'Research').length,
    essay: state.softSkills.essay
  });

  const calcProb = (uni: School, p: any, disc: string) => {
    const base = uni.accept / 100;
    const satDiff = (p.sat - uni.avgSAT) / 150;
    const gpaDiff = (p.gpa - uni.avgGPA) / 0.3;
    const acadAdj = (satDiff + gpaDiff) / 2;

    let actBonus = p.intern * 0.04 + p.comp * 0.025 + p.res * 0.03;
    const essayBonus = (p.essay - 5) * 0.012;
    const profileStrength = 0.5 + Math.max(0, Math.min(acadAdj, 1)) * 0.5;

    let rawProb;
    if (base > 0.45) rawProb = base * profileStrength * 1.8 + actBonus + essayBonus;
    else if (base > 0.15) rawProb = base * profileStrength * 2.2 + actBonus + essayBonus;
    else rawProb = base * profileStrength * 3.5 + actBonus * 0.7 + essayBonus;

    return Math.max(3, Math.min(95, Math.round(rawProb * 100)));
  };

  const simSchools = [
    'Harvard University', 'Stanford University', 'UC Berkeley', 'UCLA', 'NYU', 'Georgetown University'
  ].map(name => SCHOOL_DB.find(u => u.name === name)).filter(Boolean) as School[];

  const results = useMemo(() => {
    const primaryDisc = selectedDiscs[0] || 'Business';
    return simSchools.map(u => ({
      ...u,
      prob: calcProb(u, simParams, primaryDisc)
    }));
  }, [simParams, selectedDiscs]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
          {lang === 'zh' ? '多學科情境模擬器' : 'Multi-Discipline Scenario Simulator'}
        </h2>
        <p className="text-sm text-slate-400">
          {lang === 'zh' ? '動態調整各項指標，即時看到錄取機率的變化。' : 'Dynamically adjust parameters to see real-time admission changes across disciplines.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardTitle><Settings2 className="w-4 h-4" /> {lang === 'zh' ? '模擬參數' : 'Parameters'}</CardTitle>
          <div className="space-y-6">
            <Slider label="SAT" min={800} max={1600} step={10} value={simParams.sat} valueDisplay={simParams.sat} onChange={e => setSimParams({ ...simParams, sat: parseInt(e.target.value) })} />
            <Slider label="GPA" min={2.0} max={4.0} step={0.1} value={simParams.gpa} valueDisplay={simParams.gpa.toFixed(1)} onChange={e => setSimParams({ ...simParams, gpa: parseFloat(e.target.value) })} />
            
            <div className="pt-4 border-t border-white/5 space-y-6">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{lang === 'zh' ? '加分項' : 'Boosters'}</p>
              <Slider label={lang === 'zh' ? '實習次數' : 'Internships'} min={0} max={5} value={simParams.intern} valueDisplay={simParams.intern} onChange={e => setSimParams({ ...simParams, intern: parseInt(e.target.value) })} />
              <Slider label={lang === 'zh' ? '競賽獎項' : 'Competitions'} min={0} max={5} value={simParams.comp} valueDisplay={simParams.comp} onChange={e => setSimParams({ ...simParams, comp: parseInt(e.target.value) })} />
              <Slider label={lang === 'zh' ? '研究經歷' : 'Research'} min={0} max={5} value={simParams.res} valueDisplay={simParams.res} onChange={e => setSimParams({ ...simParams, res: parseInt(e.target.value) })} />
              <Slider label={lang === 'zh' ? '文書強度' : 'Essay Strength'} min={1} max={10} value={simParams.essay} valueDisplay={simParams.essay} onChange={e => setSimParams({ ...simParams, essay: parseInt(e.target.value) })} />
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle><TrendingUp className="w-4 h-4" /> {lang === 'zh' ? '即時錄取機率' : 'Real-time Probabilities'}</CardTitle>
          <div className="space-y-5">
            {results.map(u => (
              <div key={u.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">{lang === 'zh' ? u.nameZh : u.name}</span>
                  <span className={cn(
                    u.prob < 25 ? "text-red-500" : u.prob < 55 ? "text-amber-500" : "text-emerald-500"
                  )}>
                    {u.prob}%
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className={cn(
                      "h-full transition-all duration-500",
                      u.prob < 25 ? "bg-red-500" : u.prob < 55 ? "bg-amber-500" : "bg-emerald-500"
                    )}
                    style={{ width: `${u.prob}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex gap-3">
            <Info className="w-5 h-5 text-amber-500 shrink-0" />
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {lang === 'zh' 
                ? '提示：增加實習與競賽對商學院錄取有顯著提升；而研究經歷對社會科學與 STEM 科系更具影響力。' 
                : 'Tip: Increasing internships and competitions significantly boosts business school odds, while research experience has more impact for Social Science and STEM majors.'}
            </p>
          </div>
        </Card>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="secondary" size="lg" onClick={onPrev}>
          ← {lang === 'zh' ? '上一步' : 'Back'}
        </Button>
        <Button variant="nav" size="lg" onClick={onNext}>
          {lang === 'zh' ? '家庭決策' : 'Family'} →
        </Button>
      </div>
    </div>
  );
};
