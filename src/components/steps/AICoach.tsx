import React, { useState, useRef, useEffect } from 'react';
import { AppState } from '@/src/types';
import { Card, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { chatWithAI } from '@/src/services/gemini';
import { MessageSquare, Send, Loader2, User, Bot } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface StepProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const AICoach: React.FC<StepProps> = ({ state, updateState, onNext, onPrev }) => {
  const { lang, chatHistory } = state;
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    const newHistory = [...chatHistory, { role: 'user' as const, content: userMsg }];
    updateState({ chatHistory: newHistory });
    setLoading(true);

    const systemInstruction = lang === 'zh'
      ? `你是一位專業的美國大學申請顧問。學生背景：SAT=${state.satScore}, GPA=${state.gpaU}, 主修=${state.selectedDiscs.join(',')}, 活動=${state.activities.length}項。請針對學生的問題給出具體、專業且具備跨學科視角的建議。`
      : `You are a professional U.S. college admissions advisor. Student profile: SAT=${state.satScore}, GPA=${state.gpaU}, Majors=${state.selectedDiscs.join(',')}, Activities=${state.activities.length}. Provide specific, professional, and cross-disciplinary advice.`;

    try {
      const aiResponse = await chatWithAI(newHistory, userMsg, systemInstruction);
      if (aiResponse) {
        updateState({ chatHistory: [...newHistory, { role: 'ai' as const, content: aiResponse }] });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = lang === 'zh' 
    ? ['我能申請到 UCLA 嗎？', '如何提升我的競爭力？', '商業 vs 經濟哪個適合我？', '我的課外活動夠強嗎？']
    : ['Can I get into UCLA?', 'How to improve my profile?', 'Business vs Economics?', 'Are my ECs strong enough?'];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
          {lang === 'zh' ? 'AI 多學科申請顧問' : 'AI Multi-Discipline Coach'}
        </h2>
        <p className="text-sm text-slate-400">
          {lang === 'zh' ? '詢問任何關於商業、社會科學申請、職涯選擇與學科比較的問題。' : 'Ask anything about business or social science admissions, career choices, and discipline comparisons.'}
        </p>
      </div>

      <Card className="flex flex-col h-[500px]">
        <CardTitle><MessageSquare className="w-4 h-4" /> {lang === 'zh' ? '對話視窗' : 'Chat Window'}</CardTitle>
        
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin scrollbar-thumb-white/10">
          {chatHistory.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-slate-600">
              <Bot className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-sm">{lang === 'zh' ? '您好！我是您的 AI 顧問，請問有什麼我可以幫您的？' : 'Hello! I am your AI coach. How can I help you today?'}</p>
            </div>
          )}
          {chatHistory.map((msg, i) => (
            <div key={i} className={cn(
              "flex gap-3 max-w-[85%]",
              msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
            )}>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                msg.role === 'user' ? "bg-blue-600" : "bg-gradient-to-br from-purple-600 to-blue-600"
              )}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={cn(
                "p-3 rounded-2xl text-sm leading-relaxed",
                msg.role === 'user' ? "bg-blue-600 text-white rounded-tr-none" : "bg-white/5 border border-white/10 text-slate-300 rounded-tl-none"
              )}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none">
                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map(q => (
              <button
                key={q}
                onClick={() => { setInput(q); }}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-400 hover:bg-blue-600/20 hover:border-blue-600/40 hover:text-blue-400 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder={lang === 'zh' ? '輸入您的問題...' : 'Type your question...'}
              className="bg-slate-900"
            />
            <Button variant="primary" onClick={handleSend} disabled={loading}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="secondary" size="lg" onClick={onPrev}>
          ← {lang === 'zh' ? '上一步' : 'Back'}
        </Button>
        <Button variant="nav" size="lg" onClick={onNext}>
          {lang === 'zh' ? '完整報告' : 'Full Report'} →
        </Button>
      </div>
    </div>
  );
};
