import React, { useState } from 'react';
import { AppState, School } from '@/src/types';
import { Card, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Slider } from '../ui/Slider';
import { SCHOOL_DB } from '@/src/constants';
import { MapPin, Landmark, Target, DollarSign, Plus, Trash2, Search } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface StepProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const SchoolFilter: React.FC<StepProps> = ({ state, updateState, onNext, onPrev }) => {
  const { lang, filters } = state;

  const toggleFilter = (group: keyof AppState['filters'], val: any) => {
    const current = filters[group] as any[];
    const next = current.includes(val)
      ? current.filter(v => v !== val)
      : [...current, val];
    updateState({ filters: { ...filters, [group]: next } });
  };

  const [schoolSearch, setSchoolSearch] = useState('');
  const [previewSchool, setPreviewSchool] = useState<School | null>(null);

  const handleSearch = (val: string) => {
    setSchoolSearch(val);
    const found = SCHOOL_DB.find(s => s.name.toLowerCase().includes(val.toLowerCase()) || s.nameZh.includes(val));
    setPreviewSchool(found || null);
  };

  const addCustomSchool = () => {
    if (previewSchool) {
      if (state.customSchools.some(s => s.name === previewSchool.name)) return;
      updateState({ customSchools: [...state.customSchools, { ...previewSchool, isCustom: true }] });
      setSchoolSearch('');
      setPreviewSchool(null);
    } else if (schoolSearch) {
      // Add as basic custom school if not in DB
      const newSchool: School = {
        name: schoolSearch,
        nameZh: schoolSearch,
        accept: 20,
        avgGPA: 3.7,
        avgSAT: 1350,
        tuition: 55000,
        region: 'N/A',
        type: 'Private',
        tier: 'Mid',
        aacsb: false,
        r1: false,
        twPop: false,
        natRank: 99,
        discRanks: {},
        startSal: 60000,
        gradRate: 65,
        global: false,
        employers: [],
        isCustom: true
      };
      updateState({ customSchools: [...state.customSchools, newSchool] });
      setSchoolSearch('');
    }
  };

  const removeCustomSchool = (name: string) => {
    updateState({ customSchools: state.customSchools.filter(s => s.name !== name) });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
          {lang === 'zh' ? '學校偏好篩選' : 'College Preference Filter'}
        </h2>
        <p className="text-sm text-slate-400">
          {lang === 'zh' ? '根據您的學科方向與偏好，設定理想大學的篩選條件。' : 'Set your ideal college criteria based on your discipline and preferences.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardTitle><MapPin className="w-4 h-4" /> {lang === 'zh' ? '地區' : 'Region'}</CardTitle>
          <div className="flex flex-wrap gap-2">
            {['West', 'East', 'Midwest', 'South'].map(r => (
              <button
                key={r}
                onClick={() => toggleFilter('region', r)}
                className={cn(
                  "px-3 py-1.5 rounded-full border text-xs font-bold transition-all",
                  filters.region.includes(r) ? "bg-blue-600 border-blue-600 text-white" : "border-blue-500/20 text-slate-400"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle><Landmark className="w-4 h-4" /> {lang === 'zh' ? '學校類型' : 'School Type'}</CardTitle>
          <div className="flex flex-wrap gap-2">
            {['Private', 'Public'].map(t => (
              <button
                key={t}
                onClick={() => toggleFilter('type', t)}
                className={cn(
                  "px-3 py-1.5 rounded-full border text-xs font-bold transition-all",
                  filters.type.includes(t) ? "bg-blue-600 border-blue-600 text-white" : "border-blue-500/20 text-slate-400"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardTitle><Target className="w-4 h-4" /> {lang === 'zh' ? '學科強度偏好' : 'Discipline Strength Preference'}</CardTitle>
        <div className="flex flex-wrap gap-2">
          {['Business', 'Sociology', 'Psychology', 'Political Science', 'Economics', 'Anthropology', 'Geography'].map(d => (
            <button
              key={d}
              onClick={() => toggleFilter('discStr', d)}
              className={cn(
                "px-3 py-1.5 rounded-full border text-xs font-bold transition-all",
                filters.discStr.includes(d) ? "bg-amber-500/20 border-amber-500 text-amber-500" : "border-blue-500/20 text-slate-400"
              )}
            >
              Top {d}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="flex flex-col justify-center">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={filters.r1Only} 
              onChange={e => updateState({ filters: { ...filters, r1Only: e.target.checked } })}
              className="w-5 h-5 rounded border-blue-500/20 bg-white/5 accent-blue-600"
            />
            <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
              {lang === 'zh' ? '優先顯示頂尖研究型大學 (R1)' : 'Prioritize R1 Research Universities'}
            </span>
          </label>
        </Card>
        <Card className="flex flex-col justify-center">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={filters.twPopular} 
              onChange={e => updateState({ filters: { ...filters, twPopular: e.target.checked } })}
              className="w-5 h-5 rounded border-blue-500/20 bg-white/5 accent-blue-600"
            />
            <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
              {lang === 'zh' ? '優先顯示台灣學生熱門學校' : 'Prioritize schools popular with Taiwanese'}
            </span>
          </label>
        </Card>
      </div>

      <Card>
        <CardTitle><DollarSign className="w-4 h-4" /> {lang === 'zh' ? '年學費上限' : 'Max Annual Tuition'}</CardTitle>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400">
              $0 – ${filters.maxTuition.toLocaleString()} {lang === 'zh' ? '每年' : 'per year'}
            </span>
            <Input 
              type="number" 
              className="w-24 h-8 text-xs" 
              value={filters.maxTuition} 
              onChange={e => updateState({ filters: { ...filters, maxTuition: parseInt(e.target.value) || 0 } })}
            />
          </div>
          <Slider 
            min={0} 
            max={100000} 
            step={1000} 
            value={filters.maxTuition} 
            onChange={e => updateState({ filters: { ...filters, maxTuition: parseInt(e.target.value) } })}
          />
        </div>
      </Card>

      <Card className="border-emerald-500/30">
        <CardTitle className="text-emerald-500"><Target className="w-4 h-4" /> {lang === 'zh' ? '加入目標學校' : 'Add Target Schools'}</CardTitle>
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input 
              className="pl-10" 
              placeholder="e.g. Dartmouth, Duke, Rice..." 
              value={schoolSearch}
              onChange={e => handleSearch(e.target.value)}
            />
          </div>
          <Button variant="green" onClick={addCustomSchool}>
            <Plus className="w-4 h-4" /> {lang === 'zh' ? '加入' : 'Add'}
          </Button>
        </div>

        {previewSchool && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div>
              <p className="text-sm font-bold text-emerald-500">✅ {previewSchool.name}</p>
              <p className="text-[10px] text-slate-400">
                {lang === 'zh' ? '錄取率' : 'Accept'}: {previewSchool.accept}% • Rank: #{previewSchool.natRank} • {previewSchool.region}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {state.customSchools.map((s, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-emerald-500/20">
              <div>
                <p className="text-sm font-bold">{s.name} <span className="text-[10px] text-emerald-500 font-normal ml-2">[{lang === 'zh' ? '目標校' : 'Target'}]</span></p>
                <p className="text-[10px] text-slate-500">Accept: {s.accept}% • ${Math.round(s.tuition/1000)}K/yr • Natl #{s.natRank}</p>
              </div>
              <Button variant="danger" size="sm" onClick={() => removeCustomSchool(s.name)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="secondary" size="lg" onClick={onPrev}>
          ← {lang === 'zh' ? '上一步' : 'Back'}
        </Button>
        <Button variant="nav" size="lg" onClick={onNext}>
          {lang === 'zh' ? '分析錄取機會' : 'Analyze Admissions'} →
        </Button>
      </div>
    </div>
  );
};
