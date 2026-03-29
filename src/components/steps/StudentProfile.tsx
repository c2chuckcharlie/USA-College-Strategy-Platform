import React, { useState } from 'react';
import { AppState, Activity, Award } from '@/src/types';
import { Card, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Slider } from '../ui/Slider';
import { DISC_CONFIG } from '@/src/constants';
import { Trash2, Plus, Info, GraduationCap, BarChart3, Trophy, Medal, Star, Microscope } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface StepProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNext: () => void;
}

export const StudentProfile: React.FC<StepProps> = ({ state, updateState, onNext }) => {
  const { lang } = state;

  const toggleDisc = (disc: string) => {
    const newDiscs = state.selectedDiscs.includes(disc)
      ? state.selectedDiscs.filter(d => d !== disc)
      : [...state.selectedDiscs, disc];
    
    if (newDiscs.length === 0) return;
    updateState({ selectedDiscs: newDiscs });
  };

  const addActivity = (activity: Activity) => {
    updateState({ activities: [...state.activities, activity] });
  };

  const removeActivity = (index: number) => {
    updateState({ activities: state.activities.filter((_, i) => i !== index) });
  };

  const [newActivity, setNewActivity] = useState<Activity>({ name: '', cat: 'Research', role: '', dur: '' });

  const handleAddActivity = () => {
    if (!newActivity.name) return;
    addActivity(newActivity);
    setNewActivity({ name: '', cat: 'Research', role: '', dur: '' });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
          {lang === 'zh' ? '學生背景輸入' : 'Student Profile Input'}
        </h2>
        <p className="text-sm text-slate-400">
          {lang === 'zh' ? '填寫您的學術成績、學科方向與相關經歷，系統將為您提供跨學科的精準申請分析。' : 'Enter your academic scores, discipline interests, and activities for cross-discipline admission analysis.'}
        </p>
      </div>

      {/* Discipline Selection */}
      <Card>
        <CardTitle>
          <GraduationCap className="w-4 h-4" />
          {lang === 'zh' ? '選擇申請學科方向（可多選）' : 'Select Intended Discipline(s)'}
        </CardTitle>

        <div className="space-y-4">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">💼 Business & Economics</p>
            <div className="flex flex-wrap gap-2">
              {['Business', 'Economics', 'Accounting', 'Finance'].map(d => (
                <button
                  key={d}
                  onClick={() => toggleDisc(d)}
                  className={cn(
                    "px-3 py-1.5 rounded-full border text-xs font-bold transition-all",
                    state.selectedDiscs.includes(d) 
                      ? "bg-amber-500/20 border-amber-500 text-amber-500" 
                      : "border-blue-500/20 text-slate-400 hover:border-blue-500/40"
                  )}
                >
                  {DISC_CONFIG[d]?.icon} {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">🔬 STEM</p>
            <div className="flex flex-wrap gap-2">
              {['Computer Science', 'Engineering', 'Data Science', 'Biology'].map(d => (
                <button
                  key={d}
                  onClick={() => toggleDisc(d)}
                  className={cn(
                    "px-3 py-1.5 rounded-full border text-xs font-bold transition-all",
                    state.selectedDiscs.includes(d) 
                      ? "bg-teal-500/20 border-teal-500 text-teal-500" 
                      : "border-blue-500/20 text-slate-400 hover:border-blue-500/40"
                  )}
                >
                  {DISC_CONFIG[d]?.icon} {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">🌐 Social Sciences</p>
            <div className="flex flex-wrap gap-2">
              {['Sociology', 'Psychology', 'Political Science', 'Anthropology', 'Geography', 'International Relations'].map(d => (
                <button
                  key={d}
                  onClick={() => toggleDisc(d)}
                  className={cn(
                    "px-3 py-1.5 rounded-full border text-xs font-bold transition-all",
                    state.selectedDiscs.includes(d) 
                      ? "bg-violet-500/20 border-violet-500 text-violet-500" 
                      : "border-blue-500/20 text-slate-400 hover:border-blue-500/40"
                  )}
                >
                  {DISC_CONFIG[d]?.icon} {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">📚 Humanities & Arts</p>
            <div className="flex flex-wrap gap-2">
              {['History', 'Literature', 'Philosophy', 'Design', 'Music', 'Film & Media'].map(d => (
                <button
                  key={d}
                  onClick={() => toggleDisc(d)}
                  className={cn(
                    "px-3 py-1.5 rounded-full border text-xs font-bold transition-all",
                    state.selectedDiscs.includes(d) 
                      ? "bg-pink-500/20 border-pink-500 text-pink-500" 
                      : "border-blue-500/20 text-slate-400 hover:border-blue-500/40"
                  )}
                >
                  {DISC_CONFIG[d]?.icon} {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Academics */}
      <Card>
        <CardTitle>
          <BarChart3 className="w-4 h-4" />
          {lang === 'zh' ? '學術成績' : 'Academic Scores'}
        </CardTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 bg-blue-500/5 p-4 rounded-xl border border-blue-500/10">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Info className="w-3 h-3" />
              {lang === 'zh' ? 'GPA 量尺設定' : 'GPA Scale'}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase font-bold">{lang === 'zh' ? 'GPA 量尺' : 'GPA Scale'}</label>
                <Select value={state.gpaScale} onChange={(e) => updateState({ gpaScale: e.target.value })}>
                  <option value="4.0">4.0 Standard</option>
                  <option value="5.0">5.0 Weighted</option>
                  <option value="100">100-Point</option>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase font-bold">{lang === 'zh' ? 'GPA (未加權)' : 'GPA (UW)'}</label>
                <Input type="number" step="0.01" value={state.gpaU} onChange={(e) => updateState({ gpaU: parseFloat(e.target.value) })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase font-bold">{lang === 'zh' ? '最高數學課程' : 'Highest Math'}</label>
                <Select value={state.mathLevel} onChange={(e) => updateState({ mathLevel: parseInt(e.target.value) })}>
                  <option value="5">AP Calculus BC</option>
                  <option value="4">AP Calculus AB</option>
                  <option value="3">AP Statistics</option>
                  <option value="2">Pre-Calculus</option>
                  <option value="1">Algebra II</option>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase font-bold">TOEFL / IELTS</label>
                <Input value={state.engScore} onChange={(e) => updateState({ engScore: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="space-y-4 bg-purple-500/5 p-4 rounded-xl border border-purple-500/10">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Medal className="w-3 h-3" />
              {lang === 'zh' ? '標準化測驗' : 'Standardized Tests'}
            </div>
            <div className="flex gap-2">
              {['SAT', 'ACT', 'Both', 'None'].map(t => (
                <button
                  key={t}
                  onClick={() => updateState({ testType: t as any })}
                  className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-bold border transition-all",
                    state.testType === t ? "bg-purple-600 border-purple-600 text-white" : "border-purple-500/20 text-slate-400"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            {(state.testType === 'SAT' || state.testType === 'Both') && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 uppercase font-bold">SAT Total</label>
                  <Input type="number" value={state.satScore} onChange={(e) => updateState({ satScore: parseInt(e.target.value) })} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 uppercase font-bold">SAT Math</label>
                  <Input type="number" value={state.satMath} onChange={(e) => updateState({ satMath: parseInt(e.target.value) })} />
                </div>
              </div>
            )}
            {(state.testType === 'ACT' || state.testType === 'Both') && (
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase font-bold">ACT Composite</label>
                <Input type="number" value={state.actScore} onChange={(e) => updateState({ actScore: parseInt(e.target.value) })} />
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Activities */}
      <Card>
        <CardTitle>
          <Trophy className="w-4 h-4" />
          {lang === 'zh' ? '活動與經歷' : 'Activities & Experience'}
        </CardTitle>

        <div className="space-y-3 mb-6">
          {state.activities.map((act, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-blue-500/10">
              <div>
                <p className="text-sm font-bold">{act.name}</p>
                <p className="text-[10px] text-slate-500">{act.cat} • {act.role} • {act.dur}</p>
              </div>
              <Button variant="danger" size="sm" onClick={() => removeActivity(i)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input placeholder={lang === 'zh' ? '名稱' : 'Name'} value={newActivity.name} onChange={e => setNewActivity({ ...newActivity, name: e.target.value })} />
          <Select value={newActivity.cat} onChange={e => setNewActivity({ ...newActivity, cat: e.target.value })}>
            <option value="Research">🔬 Research</option>
            <option value="Internship">💼 Internship</option>
            <option value="Competition">🏆 Competition</option>
            <option value="Leadership">👑 Leadership</option>
            <option value="Community">🤝 Community</option>
            <option value="Sports">🏅 Sports</option>
            <option value="Job">💵 Job</option>
          </Select>
          <Input placeholder={lang === 'zh' ? '角色' : 'Role'} value={newActivity.role} onChange={e => setNewActivity({ ...newActivity, role: e.target.value })} />
          <div className="flex gap-2">
            <Input placeholder={lang === 'zh' ? '時間' : 'Duration'} value={newActivity.dur} onChange={e => setNewActivity({ ...newActivity, dur: e.target.value })} />
            <Button variant="green" onClick={handleAddActivity} className="shrink-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Soft Skills */}
      <Card>
        <CardTitle>
          <Star className="w-4 h-4" />
          {lang === 'zh' ? '核心能力自評' : 'Core Competency Self-Assessment'}
        </CardTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Slider label={lang === 'zh' ? '領導力' : 'Leadership'} min={1} max={10} value={state.softSkills.lead} valueDisplay={state.softSkills.lead} onChange={e => updateState({ softSkills: { ...state.softSkills, lead: parseInt(e.target.value) } })} />
          <Slider label={lang === 'zh' ? '寫作/分析' : 'Writing/Analytical'} min={1} max={10} value={state.softSkills.write} valueDisplay={state.softSkills.write} onChange={e => updateState({ softSkills: { ...state.softSkills, write: parseInt(e.target.value) } })} />
          <Slider label={lang === 'zh' ? '溝通' : 'Communication'} min={1} max={10} value={state.softSkills.comm} valueDisplay={state.softSkills.comm} onChange={e => updateState({ softSkills: { ...state.softSkills, comm: parseInt(e.target.value) } })} />
          <Slider label={lang === 'zh' ? '研究' : 'Research'} min={1} max={10} value={state.softSkills.res} valueDisplay={state.softSkills.res} onChange={e => updateState({ softSkills: { ...state.softSkills, res: parseInt(e.target.value) } })} />
          <Slider label={lang === 'zh' ? '社會關懷' : 'Social Awareness'} min={1} max={10} value={state.softSkills.civ} valueDisplay={state.softSkills.civ} onChange={e => updateState({ softSkills: { ...state.softSkills, civ: parseInt(e.target.value) } })} />
          <Slider label={lang === 'zh' ? '文書強度' : 'Essay Strength'} min={1} max={10} value={state.softSkills.essay} valueDisplay={state.softSkills.essay} onChange={e => updateState({ softSkills: { ...state.softSkills, essay: parseInt(e.target.value) } })} />
        </div>
      </Card>

      <div className="flex justify-end pt-4">
        <Button variant="nav" size="lg" onClick={onNext} className="w-full md:w-auto">
          {lang === 'zh' ? '下一步：學校篩選' : 'Next: School Filter'} →
        </Button>
      </div>
    </div>
  );
};
