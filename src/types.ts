export type Language = 'zh' | 'en';

export interface Activity {
  name: string;
  cat: string;
  role: string;
  dur: string;
}

export interface Award {
  name: string;
  level: string;
}

export interface School {
  name: string;
  nameZh: string;
  accept: number;
  avgGPA: number;
  avgSAT: number;
  tuition: number;
  region: string;
  type: string;
  tier: string;
  aacsb: boolean;
  r1: boolean;
  twPop: boolean;
  natRank: number;
  discRanks: Record<string, number>;
  startSal: number;
  gradRate: number;
  global: boolean;
  employers: string[];
  isCustom?: boolean;
  prob?: number;
  cat?: 'reach' | 'match' | 'safety';
}

export interface DisciplineConfig {
  icon: string;
  color: string;
  tag: string;
  radarLabels: { zh: string[]; en: string[] };
  requirements: { zh: string; en: string };
  gapAdvice: { zh: string[]; en: string[] };
}

export interface CareerData {
  startSal: number;
  midSal: number;
  gradRate: number;
  paths: string[];
  grad: string[];
  employers: string[];
}

export interface AppState {
  lang: Language;
  currentStep: number;
  selectedDiscs: string[];
  otherDiscName: string;
  gpaScale: string;
  gpaU: number;
  gpaW: number;
  mathLevel: number;
  writingLevel: number;
  engScore: string;
  testType: 'SAT' | 'ACT' | 'Both' | 'None';
  satScore: number;
  satMath: number;
  actScore: number;
  activities: Activity[];
  awards: Award;
  softSkills: {
    lead: number;
    write: number;
    comm: number;
    res: number;
    civ: number;
    essay: number;
  };
  discSpecific: Record<string, any>;
  filters: {
    region: string[];
    type: string[];
    discStr: string[];
    r1Only: boolean;
    globalFocus: boolean;
    aacsbOnly: boolean;
    twPopular: boolean;
    maxTuition: number;
  };
  customSchools: School[];
  aiStrategy: string;
  chatHistory: { role: 'user' | 'ai'; content: string }[];
  familyPriorities: {
    student: {
      interest: number;
      campus: number;
      cost: number;
      research: number;
      career: number;
    };
    parent: {
      roi: number;
      rank: number;
      budget: number;
      employment: number;
      gradRate: number;
    };
  };
}
