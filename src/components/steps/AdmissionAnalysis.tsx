import React, { useMemo } from 'react';
import { AppState, School } from '@/src/types';
import { Card, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SCHOOL_DB, DISC_CONFIG } from '@/src/constants';
import { BarChart3, GraduationCap, Trophy, TrendingUp } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface StepProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const AdmissionAnalysis: React.FC<StepProps> = ({ state, updateState, onNext, onPrev }) => {
  const { lang, filters, selectedDiscs } = state;

  const calcProb = (uni: School, p: any, disc: string) => {
    const base = uni.accept / 100;
    const satDiff = (p.sat - uni.avgSAT) / 150;
    const gpaDiff = (p.gpa - uni.avgGPA) / 0.3;
    const acadAdj = (satDiff + gpaDiff) / 2;

    let actBonus = 0;
    const safeDisc = disc || selectedDiscs[0] || 'Business';
    
    // Simplified bonus logic for React version
    if (['Business', 'Accounting', 'Finance'].includes(safeDisc))
      actBonus = Math.min(p.internships * 0.04 + p.competitions * 0.025 + (p.startupExp || 0) * 0.03, 0.15);
    else if (['Psychology', 'Anthropology', 'Sociology', 'Biology'].includes(safeDisc))
      actBonus = Math.min(p.resExp * 0.025 + p.publications * 0.04 + (p.communityExp || 0) * 0.015, 0.15);
    else if (['Political Science', 'International Relations', 'History'].includes(safeDisc))
      actBonus = Math.min(p.debateExp * 0.03 + p.civicActs * 0.025 + p.publications * 0.02, 0.14);
    else
      actBonus = Math.min(p.activities.length * 0.01 + p.lead / 10 * 0.03, 0.12);

    const essayBonus = (p.essay - 5) * 0.012;
    const leadBonus = Math.min(p.leadership * 0.01, 0.06);
    const profileStrength = 0.5 + Math.max(0, Math.min(acadAdj, 1)) * 0.5;

    let rawProb;
    if (base > 0.45) rawProb = base * profileStrength * 1.8 + actBonus + essayBonus + leadBonus;
    else if (base > 0.15) rawProb = base * profileStrength * 2.2 + actBonus + essayBonus + leadBonus;
    else rawProb = base * profileStrength * 3.5 + actBonus * 0.7 + essayBonus + leadBonus;

    let floor, ceiling;
    if (base > 0.45) { floor = 55; ceiling = 92; }
    else if (base > 0.15) { floor = 20; ceiling = 75; }
    else { floor = 3; ceiling = 38; }

    return Math.max(floor, Math.min(ceiling, Math.round(rawProb * 100)));
  };

  const profile = useMemo(() => {
    const p = {
      sat: state.satScore,
      satMath: state.satMath,
      gpa: state.gpaU, // Simplified
      essay: state.softSkills.essay,
      lead: state.softSkills.lead,
      leadership: state.activities.filter(a => a.cat === 'Leadership').length,
      internships: state.activities.filter(a => a.cat === 'Internship').length,
      competitions: state.activities.filter(a => a.cat === 'Competition').length,
      resExp: state.activities.filter(a => a.cat === 'Research').length,
      publications: state.activities.filter(a => a.cat === 'Publication').length,
      debateExp: state.activities.filter(a => a.cat === 'Civic').length,
      civicActs: state.activities.filter(a => a.cat === 'Community').length,
      activities: state.activities,
    };
    return p;
  }, [state]);

  const analysisResults = useMemo(() => {
    const primaryDisc = selectedDiscs[0] || 'Business';
    
    const filtered = SCHOOL_DB.filter(u => {
      if (filters.region.length > 0 && !filters.region.includes(u.region)) return false;
      if (filters.type.length > 0 && !filters.type.includes(u.type)) return false;
      if (u.tuition > filters.maxTuition) return false;
      if (filters.aacsbOnly && !u.aacsb) return false;
      if (filters.r1Only && !u.r1) return false;
      return true;
    }).map(u => {
      const prob = calcProb(u, profile, primaryDisc);
      return {
        ...u,
        prob,
        cat: prob < 28 ? 'reach' : prob < 58 ? 'match' : 'safety' as any,
        discRank: u.discRanks[primaryDisc] || 99,
      };
    });

    const customMapped = state.customSchools.map(cs => {
      const prob = calcProb(cs, profile, primaryDisc);
      return {
        ...cs,
        prob,
        cat: prob < 28 ? 'reach' : prob < 58 ? 'match' : 'safety' as any,
        discRank: 50,
      };
    });

    const all = [...filtered, ...customMapped];
    return all.sort((a, b) => (a.discRank - b.discRank) || (b.prob - a.prob));
  }, [state, profile]);

  const stats = useMemo(() => {
    const reach = analysisResults.filter(r => r.cat === 'reach').length;
    const match = analysisResults.filter(r => r.cat === 'match').length;
    const safety = analysisResults.filter(r => r.cat === 'safety').length;
    const avg = analysisResults.length ? Math.round(analysisResults.reduce((a, b) => a + b.prob!, 0) / analysisResults.length) : 0;
    return { reach, match, safety, avg };
  }, [analysisResults]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
          {lang === 'zh' ? '多學科錄取分析儀表板' : 'Multi-Discipline Admission Dashboard'}
        </h2>
        <p className="text-sm text-slate-400">
          {lang === 'zh' ? '根據您選擇的學科方向，分析各校在該領域的錄取機率與學科排名。' : 'Admission probability and discipline-specific rankings tailored to your selected fields.'}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-red-500">{stats.reach}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase">{lang === 'zh' ? '挑戰校' : 'Reach'}</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-amber-500">{stats.match}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase">{lang === 'zh' ? '適配校' : 'Match'}</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-emerald-500">{stats.safety}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase">{lang === 'zh' ? '保底校' : 'Safety'}</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-blue-500">{stats.avg}%</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase">{lang === 'zh' ? '平均機率' : 'Avg Prob'}</p>
        </div>
      </div>

      <Card>
        <CardTitle className="justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            {lang === 'zh' ? '推薦大學名單' : 'Recommended Universities'}
          </div>
          <div className="hidden md:flex gap-2">
            <Badge variant="reach">Reach</Badge>
            <Badge variant="match">Match</Badge>
            <Badge variant="safety">Safety</Badge>
          </div>
        </CardTitle>

        <div className="space-y-3">
          {analysisResults.map((u, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl border border-blue-500/10 bg-white/5 p-4 transition-all hover:border-blue-500/30">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold flex items-center gap-2">
                    {lang === 'zh' ? u.nameZh : u.name}
                    {u.aacsb && <Badge variant="aacsb" className="text-[8px] py-0">AACSB</Badge>}
                    {u.r1 && <Badge variant="r1" className="text-[8px] py-0">R1</Badge>}
                    {u.twPop && <span title="Popular with Taiwanese">🇹🇼</span>}
                  </h4>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500">
                    <span>{u.region} • {u.type}</span>
                    <span>${Math.round(u.tuition/1000)}K/yr</span>
                    <span>Accept: {u.accept}%</span>
                    <span className="text-blue-400 font-bold">Natl #{u.natRank}</span>
                    {selectedDiscs.map(d => u.discRanks[d] && (
                      <span key={d} className="text-purple-400 font-bold">{DISC_CONFIG[d]?.icon} {d}: #{u.discRanks[d]}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-6 shrink-0">
                  <div className="text-right">
                    <p className={cn(
                      "text-2xl font-black",
                      u.cat === 'reach' ? "text-red-500" : u.cat === 'match' ? "text-amber-500" : "text-emerald-500"
                    )}>
                      {u.prob}%
                    </p>
                    <Badge variant={u.cat} className="mt-1 uppercase text-[8px]">
                      {u.cat === 'reach' ? (lang === 'zh' ? '挑戰' : 'Reach') : u.cat === 'match' ? (lang === 'zh' ? '適配' : 'Match') : (lang === 'zh' ? '保底' : 'Safety')}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 bg-blue-500/10 w-full">
                <div 
                  className={cn(
                    "h-full transition-all duration-1000",
                    u.cat === 'reach' ? "bg-red-500" : u.cat === 'match' ? "bg-amber-500" : "bg-emerald-500"
                  )}
                  style={{ width: `${u.prob}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="secondary" size="lg" onClick={onPrev}>
          ← {lang === 'zh' ? '上一步' : 'Back'}
        </Button>
        <Button variant="nav" size="lg" onClick={onNext}>
          {lang === 'zh' ? '差距分析' : 'Gap Analysis'} →
        </Button>
      </div>
    </div>
  );
};
