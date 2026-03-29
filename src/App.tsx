import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { AppState, Language, Activity, School } from './types';
import { SCHOOL_DB, DISC_CONFIG } from './constants';
import { AnimatePresence, motion } from 'motion/react';

// Step Components (to be created)
import { StudentProfile } from './components/steps/StudentProfile';
import { SchoolFilter } from './components/steps/SchoolFilter';
import { AdmissionAnalysis } from './components/steps/AdmissionAnalysis';
import { GapAnalysis } from './components/steps/GapAnalysis';
import { ROICareer } from './components/steps/ROICareer';
import { AISterategy } from './components/steps/AISterategy';
import { ScenarioSimulator } from './components/steps/ScenarioSimulator';
import { FamilyAlignment } from './components/steps/FamilyAlignment';
import { AICoach } from './components/steps/AICoach';
import { FinalReport } from './components/steps/FinalReport';

const STEPS = [
  { zh: '學生資料', en: 'Profile' },
  { zh: '學校篩選', en: 'Filter' },
  { zh: '錄取分析', en: 'Analysis' },
  { zh: '差距分析', en: 'Gap' },
  { zh: 'ROI職涯', en: 'ROI' },
  { zh: 'AI策略', en: 'Strategy' },
  { zh: '情境模擬', en: 'Simulator' },
  { zh: '家庭決策', en: 'Family' },
  { zh: 'AI顧問', en: 'AI Coach' },
  { zh: '完整報告', en: 'Full Report' },
];

const INITIAL_STATE: AppState = {
  lang: 'zh',
  currentStep: 1,
  selectedDiscs: ['Business'],
  otherDiscName: '',
  gpaScale: '4.0',
  gpaU: 3.7,
  gpaW: 4.0,
  mathLevel: 4,
  writingLevel: 2,
  engScore: 'TOEFL 106',
  testType: 'SAT',
  satScore: 1360,
  satMath: 700,
  actScore: 0,
  activities: [
    { name: 'Investment Club', cat: 'Leadership', role: 'President', dur: '2 years' },
    { name: 'DECA Competition', cat: 'Competition', role: 'State Finalist', dur: '2 years' },
    { name: 'Psychology Research Lab', cat: 'Research', role: 'Research Assistant', dur: '1 semester' },
    { name: 'Varsity Soccer', cat: 'Sports', role: 'Captain', dur: '3 years' },
    { name: 'Part-time Barista', cat: 'Job', role: 'Shift Supervisor', dur: '1 year' }
  ],
  awards: { name: 'FBLA State Champion – Business Mgmt', level: 'National' },
  softSkills: {
    lead: 7,
    write: 6,
    comm: 7,
    res: 5,
    civ: 6,
    essay: 7,
  },
  discSpecific: {},
  filters: {
    region: ['West', 'East'],
    type: ['Private', 'Public'],
    discStr: ['Business'],
    r1Only: true,
    globalFocus: false,
    aacsbOnly: false,
    twPopular: true,
    maxTuition: 75000,
  },
  customSchools: [],
  aiStrategy: '',
  chatHistory: [],
  familyPriorities: {
    student: {
      interest: 8,
      campus: 8,
      cost: 5,
      research: 7,
      career: 8,
    },
    parent: {
      roi: 9,
      rank: 9,
      budget: 8,
      employment: 8,
      gradRate: 7,
    },
  },
};

export default function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  const setLang = (lang: Language) => setState(prev => ({ ...prev, lang }));
  const setStep = (step: number) => setState(prev => ({ ...prev, currentStep: step }));

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => setStep(Math.min(state.currentStep + 1, STEPS.length));
  const prevStep = () => setStep(Math.max(state.currentStep - 1, 1));

  return (
    <Layout
      lang={state.lang}
      setLang={setLang}
      currentStep={state.currentStep}
      steps={STEPS}
      onStepClick={setStep}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {state.currentStep === 1 && <StudentProfile state={state} updateState={updateState} onNext={nextStep} />}
          {state.currentStep === 2 && <SchoolFilter state={state} updateState={updateState} onNext={nextStep} onPrev={prevStep} />}
          {state.currentStep === 3 && <AdmissionAnalysis state={state} updateState={updateState} onNext={nextStep} onPrev={prevStep} />}
          {state.currentStep === 4 && <GapAnalysis state={state} updateState={updateState} onNext={nextStep} onPrev={prevStep} />}
          {state.currentStep === 5 && <ROICareer state={state} updateState={updateState} onNext={nextStep} onPrev={prevStep} />}
          {state.currentStep === 6 && <AISterategy state={state} updateState={updateState} onNext={nextStep} onPrev={prevStep} />}
          {state.currentStep === 7 && <ScenarioSimulator state={state} updateState={updateState} onNext={nextStep} onPrev={prevStep} />}
          {state.currentStep === 8 && <FamilyAlignment state={state} updateState={updateState} onNext={nextStep} onPrev={prevStep} />}
          {state.currentStep === 9 && <AICoach state={state} updateState={updateState} onNext={nextStep} onPrev={prevStep} />}
          {state.currentStep === 10 && <FinalReport state={state} updateState={updateState} onPrev={prevStep} onReset={() => setState(INITIAL_STATE)} />}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
