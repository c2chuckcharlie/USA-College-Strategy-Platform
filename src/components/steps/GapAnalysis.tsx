import React, { useEffect, useRef, useState } from 'react';
import { AppState, School } from '@/src/types';
import { Card, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { SCHOOL_DB, DISC_CONFIG } from '@/src/constants';
import { Target, Microscope, Sparkles, GraduationCap } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface StepProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const GapAnalysis: React.FC<StepProps> = ({ state, updateState, onNext, onPrev }) => {
  const { lang, selectedDiscs } = state;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [targetSchool, setTargetSchool] = useState<string>(SCHOOL_DB[0].name);
  const [targetDisc, setTargetDisc] = useState<string>(selectedDiscs[0]);

  const drawRadar = (v1: number[], v2: number[], labs: string[], accentColor: string) => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const cx = 150, cy = 150, r = 100, n = v1.length;
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.font = '10px Sora, sans-serif';

    // Draw rings
    for (let ring = 1; ring <= 5; ring++) {
      const rr = r * ring / 5;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        i === 0 ? ctx.moveTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a)) : ctx.lineTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a));
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw axes and labels
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.stroke();
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(labs[i], cx + (r + 20) * Math.cos(a), cy + (r + 20) * Math.sin(a));
    }

    // Draw data shapes
    [[v2, 'rgba(240, 180, 41, 0.1)', 'rgba(240, 180, 41, 0.5)'], [v1, 'rgba(59, 130, 246, 0.15)', accentColor]].forEach(([vals, fill, stroke]: any) => {
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2, vv = vals[i] / 10;
        i === 0 ? ctx.moveTo(cx + r * vv * Math.cos(a), cy + r * vv * Math.sin(a)) : ctx.lineTo(cx + r * vv * Math.cos(a), cy + r * vv * Math.sin(a));
      }
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  };

  useEffect(() => {
    const uni = SCHOOL_DB.find(u => u.name === targetSchool) || SCHOOL_DB[0];
    const p = {
      sat: state.satScore,
      gpa: state.gpaU,
      biz: state.activities.length,
      lead: state.softSkills.lead,
      intern: state.activities.filter(a => a.cat === 'Internship').length,
      essay: state.softSkills.essay
    };

    // Mock data for radar
    const sVals = [p.sat/160, p.gpa*2.5, p.biz, p.lead, p.intern*3, p.essay];
    const uVals = [uni.avgSAT/160, uni.avgGPA*2.5, 7.5, 7, 6, 7];
    const labs = DISC_CONFIG[targetDisc]?.radarLabels[lang] || ['SAT', 'GPA', 'EC', 'Lead', 'Intern', 'Essay'];
    
    drawRadar(sVals, uVals, labs, '#3b82f6');
  }, [targetSchool, targetDisc, state, lang]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
          {lang === 'zh' ? '學科競爭力差距分析' : 'Discipline-Specific Gap Analyzer'}
        </h2>
        <p className="text-sm text-slate-400">
          {lang === 'zh' ? '與目標學校的錄取生相比，了解您在所選學科上的優勢與差距。' : 'Compare your profile with admitted students and identify discipline-specific strengths and gaps.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardTitle><Target className="w-4 h-4" /> {lang === 'zh' ? '目標學校' : 'Target School'}</CardTitle>
          <Select value={targetSchool} onChange={e => setTargetSchool(e.target.value)}>
            {SCHOOL_DB.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
          </Select>
        </Card>
        <Card>
          <CardTitle><GraduationCap className="w-4 h-4" /> {lang === 'zh' ? '分析學科' : 'Target Discipline'}</CardTitle>
          <Select value={targetDisc} onChange={e => setTargetDisc(e.target.value)}>
            {selectedDiscs.map(d => <option key={d} value={d}>{d}</option>)}
          </Select>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col items-center justify-center min-h-[350px]">
          <CardTitle className="w-full"><Microscope className="w-4 h-4" /> {lang === 'zh' ? '競爭力雷達圖' : 'Competitiveness Radar'}</CardTitle>
          <canvas ref={canvasRef} width="300" height="300" className="max-w-full h-auto" />
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-[10px] font-bold text-slate-400">{lang === 'zh' ? '您' : 'You'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-[10px] font-bold text-slate-400">{lang === 'zh' ? '學校平均' : 'School Avg'}</span>
            </div>
          </div>
        </Card>

        <Card className="min-h-[350px]">
          <CardTitle><Sparkles className="w-4 h-4" /> {lang === 'zh' ? 'AI 學科差距洞察' : 'AI Discipline Gap Insights'}</CardTitle>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <p className="text-xs font-bold text-emerald-500 mb-2">✅ {lang === 'zh' ? '您的優勢項目' : 'Your Strengths'}</p>
              <ul className="text-[11px] text-slate-400 space-y-1 list-disc pl-4">
                <li>{lang === 'zh' ? '學術成績穩定，符合目標校門檻' : 'Academic performance meets target school thresholds'}</li>
                <li>{lang === 'zh' ? '領導力自評優異，展現主動性' : 'Strong leadership self-assessment shows initiative'}</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
              <p className="text-xs font-bold text-amber-500 mb-2">📈 {lang === 'zh' ? '待提升項目' : 'Areas to Improve'}</p>
              <ul className="text-[11px] text-slate-400 space-y-1 list-disc pl-4">
                <li>{lang === 'zh' ? '實習經歷尚可加強，建議尋找相關職位' : 'Internship experience could be strengthened'}</li>
                <li>{lang === 'zh' ? 'SAT 數學仍有進步空間，目標 760+' : 'Room for improvement in SAT Math, target 760+'}</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
              <p className="text-xs font-bold text-blue-400 mb-2">💡 {lang === 'zh' ? '具體建議' : 'Specific Advice'}</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {DISC_CONFIG[targetDisc]?.gapAdvice[lang][0]}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="secondary" size="lg" onClick={onPrev}>
          ← {lang === 'zh' ? '上一步' : 'Back'}
        </Button>
        <Button variant="nav" size="lg" onClick={onNext}>
          {lang === 'zh' ? 'ROI 職涯' : 'ROI & Career'} →
        </Button>
      </div>
    </div>
  );
};
