import React, { useMemo } from 'react';
import { AppState } from '@/src/types';
import { Card, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Slider } from '../ui/Slider';
import { Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface StepProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const FamilyAlignment: React.FC<StepProps> = ({ state, updateState, onNext, onPrev }) => {
  const { lang, familyPriorities } = state;

  const updatePriority = (role: 'student' | 'parent', key: string, val: number) => {
    updateState({
      familyPriorities: {
        ...familyPriorities,
        [role]: {
          ...familyPriorities[role],
          [key]: val
        }
      }
    });
  };

  const alignmentData = useMemo(() => {
    const dims = [
      { label: lang === 'zh' ? '學術興趣 vs ROI' : 'Interest vs ROI', s: familyPriorities.student.interest, p: familyPriorities.parent.roi },
      { label: lang === 'zh' ? '校園生活 vs 排名' : 'Campus vs Rank', s: familyPriorities.student.campus, p: familyPriorities.parent.rank },
      { label: lang === 'zh' ? '學費負擔 vs 預算' : 'Cost vs Budget', s: familyPriorities.student.cost, p: familyPriorities.parent.budget },
      { label: lang === 'zh' ? '研究機會 vs 就業' : 'Research vs Employment', s: familyPriorities.student.research, p: familyPriorities.parent.employment },
      { label: lang === 'zh' ? '職涯發展 vs 升研' : 'Career vs Grad Rate', s: familyPriorities.student.career, p: familyPriorities.parent.gradRate },
    ];

    const avgDiff = dims.reduce((acc, d) => acc + Math.abs(d.s - d.p), 0) / dims.length;
    const score = Math.max(0, Math.round(100 - avgDiff * 12));
    
    return { dims, score };
  }, [familyPriorities, lang]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
          {lang === 'zh' ? '家庭決策對齊儀表板' : 'Family Decision Alignment'}
        </h2>
        <p className="text-sm text-slate-400">
          {lang === 'zh' ? '幫助學生與家長找出共識，選出最能同時滿足雙方的大學方案。' : 'Help students and parents align priorities and find the best college solution for both.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardTitle><Users className="w-4 h-4" /> {lang === 'zh' ? '學生優先考量' : 'Student Priorities'}</CardTitle>
          <div className="space-y-4">
            <Slider label={lang === 'zh' ? '興趣/學術吸引力' : 'Academic Interest'} min={1} max={10} value={familyPriorities.student.interest} valueDisplay={familyPriorities.student.interest} onChange={e => updatePriority('student', 'interest', parseInt(e.target.value))} />
            <Slider label={lang === 'zh' ? '校園生活/文化' : 'Campus Life'} min={1} max={10} value={familyPriorities.student.campus} valueDisplay={familyPriorities.student.campus} onChange={e => updatePriority('student', 'campus', parseInt(e.target.value))} />
            <Slider label={lang === 'zh' ? '學費負擔' : 'Tuition Burden'} min={1} max={10} value={familyPriorities.student.cost} valueDisplay={familyPriorities.student.cost} onChange={e => updatePriority('student', 'cost', parseInt(e.target.value))} />
            <Slider label={lang === 'zh' ? '研究機會' : 'Research Opportunities'} min={1} max={10} value={familyPriorities.student.research} valueDisplay={familyPriorities.student.research} onChange={e => updatePriority('student', 'research', parseInt(e.target.value))} />
            <Slider label={lang === 'zh' ? '職涯發展' : 'Career Prospects'} min={1} max={10} value={familyPriorities.student.career} valueDisplay={familyPriorities.student.career} onChange={e => updatePriority('student', 'career', parseInt(e.target.value))} />
          </div>
        </Card>

        <Card>
          <CardTitle><Users className="w-4 h-4" /> {lang === 'zh' ? '家長優先考量' : 'Parent Priorities'}</CardTitle>
          <div className="space-y-4">
            <Slider label={lang === 'zh' ? '學費 ROI / 薪資' : 'Tuition ROI / Salary'} min={1} max={10} value={familyPriorities.parent.roi} valueDisplay={familyPriorities.parent.roi} onChange={e => updatePriority('parent', 'roi', parseInt(e.target.value))} />
            <Slider label={lang === 'zh' ? '學校排名聲望' : 'School Ranking'} min={1} max={10} value={familyPriorities.parent.rank} valueDisplay={familyPriorities.parent.rank} onChange={e => updatePriority('parent', 'rank', parseInt(e.target.value))} />
            <Slider label={lang === 'zh' ? '學費預算' : 'Tuition Budget'} min={1} max={10} value={familyPriorities.parent.budget} valueDisplay={familyPriorities.parent.budget} onChange={e => updatePriority('parent', 'budget', parseInt(e.target.value))} />
            <Slider label={lang === 'zh' ? '就業率/職涯資源' : 'Employment Rate'} min={1} max={10} value={familyPriorities.parent.employment} valueDisplay={familyPriorities.parent.employment} onChange={e => updatePriority('parent', 'employment', parseInt(e.target.value))} />
            <Slider label={lang === 'zh' ? '研究所升學率' : 'Grad School Rate'} min={1} max={10} value={familyPriorities.parent.gradRate} valueDisplay={familyPriorities.parent.gradRate} onChange={e => updatePriority('parent', 'gradRate', parseInt(e.target.value))} />
          </div>
        </Card>
      </div>

      <Card>
        <CardTitle>{lang === 'zh' ? '對齊分析' : 'Alignment Analysis'}</CardTitle>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90">
              <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-white/5" />
              <circle 
                cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="8" 
                strokeDasharray={364.4} 
                strokeDashoffset={364.4 - (364.4 * alignmentData.score) / 100}
                strokeLinecap="round"
                className={cn(
                  "transition-all duration-1000",
                  alignmentData.score > 75 ? "text-emerald-500" : alignmentData.score > 50 ? "text-amber-500" : "text-red-500"
                )}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black">{alignmentData.score}</span>
              <span className="text-[8px] font-bold text-slate-500 uppercase">Score</span>
            </div>
          </div>

          <div className="flex-1 space-y-4 w-full">
            {alignmentData.dims.map((d, i) => {
              const diff = Math.abs(d.s - d.p);
              return (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-slate-400 uppercase tracking-wider">{d.label}</span>
                    <div className="flex gap-2">
                      <span className="text-blue-400">S: {d.s}</span>
                      <span className="text-amber-400">P: {d.p}</span>
                      {diff >= 3 ? <AlertCircle className="w-3 h-3 text-red-500" /> : <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden flex">
                    <div className="h-full bg-blue-500/40" style={{ width: `${d.s * 10}%` }} />
                    <div className="h-full bg-amber-500/40" style={{ width: `${d.p * 10}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={cn(
          "mt-8 p-4 rounded-xl border flex gap-3",
          alignmentData.score > 75 ? "bg-emerald-500/5 border-emerald-500/10" : alignmentData.score > 50 ? "bg-amber-500/5 border-amber-500/10" : "bg-red-500/5 border-red-500/10"
        )}>
          {alignmentData.score > 75 ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> : <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />}
          <div>
            <p className="text-xs font-bold mb-1">
              {alignmentData.score > 75 ? (lang === 'zh' ? '🎉 高度一致' : '🎉 Highly Aligned') : (lang === 'zh' ? '🔶 需要溝通' : '🔶 Needs Discussion')}
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {lang === 'zh' 
                ? `家庭對齊分數為 ${alignmentData.score}/100。建議針對分歧較大的項目進行深度討論，尋找平衡點。`
                : `Family alignment score is ${alignmentData.score}/100. We recommend deep discussion on high-gap dimensions to find a balanced solution.`}
            </p>
          </div>
        </div>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="secondary" size="lg" onClick={onPrev}>
          ← {lang === 'zh' ? '上一步' : 'Back'}
        </Button>
        <Button variant="nav" size="lg" onClick={onNext}>
          {lang === 'zh' ? 'AI 顧問' : 'AI Coach'} →
        </Button>
      </div>
    </div>
  );
};
