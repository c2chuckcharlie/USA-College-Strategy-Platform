import React, { useState } from 'react';
import { AppState } from '@/src/types';
import { Card, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { generateAIContent } from '@/src/services/gemini';
import { Sparkles, Loader2, Save, RefreshCw } from 'lucide-react';

interface StepProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const AISterategy: React.FC<StepProps> = ({ state, updateState, onNext, onPrev }) => {
  const { lang, selectedDiscs, aiStrategy } = state;
  const [loading, setLoading] = useState(false);
  const [editableStrategy, setEditableStrategy] = useState(aiStrategy);

  const generateStrategy = async () => {
    setLoading(true);
    const discs = selectedDiscs.join(', ');
    const profile = `SAT=${state.satScore}, GPA=${state.gpaU}, Disciplines=${discs}, Activities=${state.activities.length}`;
    
    const prompt = lang === 'zh' 
      ? `你是頂尖美國大學申請顧問，用繁體中文生成約400字的個人化跨學科申請策略計畫。學生資料：${profile}。請包含學術提升、學科建議、文書方向與12個月行動計畫。`
      : `You are a top U.S. college admissions consultant. Generate a 400-word personalized cross-discipline strategy plan. Profile: ${profile}. Include academic improvement, discipline-specific advice, essay direction, and a 12-month action plan.`;

    try {
      const result = await generateAIContent(prompt);
      if (result) {
        setEditableStrategy(result);
        updateState({ aiStrategy: result });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    updateState({ aiStrategy: editableStrategy });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
          {lang === 'zh' ? 'AI 學科申請策略規劃' : 'AI Discipline Strategy Planner'}
        </h2>
        <p className="text-sm text-slate-400">
          {lang === 'zh' ? '讓 AI 根據您選擇的學科，量身訂製個人化的申請提升計畫。' : 'Let AI craft a personalized strategy plan tailored to your chosen disciplines.'}
        </p>
      </div>

      <div className="flex justify-center">
        <Button 
          variant="purple" 
          size="lg" 
          onClick={generateStrategy} 
          disabled={loading}
          className="px-10 py-6 text-lg shadow-xl shadow-purple-500/20"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
          {lang === 'zh' ? '生成 AI 申請策略計畫' : 'Generate AI Strategy Plan'}
        </Button>
      </div>

      <Card className="min-h-[400px] flex flex-col">
        <CardTitle className="justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            {lang === 'zh' ? 'AI 策略建議 (可編輯)' : 'AI Strategy Advice (Editable)'}
          </div>
          {editableStrategy && (
            <Button variant="ghost" size="sm" onClick={handleSave} className="h-7 text-[10px]">
              <Save className="w-3 h-3" /> {lang === 'zh' ? '儲存修改' : 'Save Edits'}
            </Button>
          )}
        </CardTitle>

        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
            <p className="text-sm font-bold animate-pulse">{lang === 'zh' ? 'AI 正在分析您的背景並生成策略...' : 'AI is analyzing your profile and crafting strategy...'}</p>
          </div>
        ) : editableStrategy ? (
          <Textarea 
            className="flex-1 min-h-[400px] bg-transparent border-none focus-visible:ring-0 text-slate-300 leading-relaxed text-sm"
            value={editableStrategy}
            onChange={(e) => setEditableStrategy(e.target.value)}
            placeholder={lang === 'zh' ? 'AI 生成的內容將顯示在此，您可以直接編輯...' : 'AI generated content will appear here, you can edit it directly...'}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-white/5 rounded-xl">
            <Sparkles className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm">{lang === 'zh' ? '點擊上方按鈕開始生成' : 'Click the button above to start'}</p>
          </div>
        )}
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="secondary" size="lg" onClick={onPrev}>
          ← {lang === 'zh' ? '上一步' : 'Back'}
        </Button>
        <Button variant="nav" size="lg" onClick={onNext}>
          {lang === 'zh' ? '情境模擬' : 'Scenario'} →
        </Button>
      </div>
    </div>
  );
};
