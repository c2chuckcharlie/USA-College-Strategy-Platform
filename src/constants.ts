import { School, DisciplineConfig, CareerData } from './types';

export const SCHOOL_DB: School[] = [
  { name: 'Harvard University', nameZh: '哈佛大學', accept: 4, avgGPA: 3.95, avgSAT: 1520, tuition: 57261, region: 'East', type: 'Private', tier: 'Top', aacsb: false, r1: true, twPop: true, natRank: 1, discRanks: { Business: 2, Psychology: 1, Economics: 1, 'Political Science': 1, Sociology: 3, Anthropology: 2, Geography: 5 }, startSal: 85000, gradRate: 85, global: true, employers: ['McKinsey', 'Goldman Sachs', 'BCG', 'NIH'] },
  { name: 'Stanford University', nameZh: '史丹佛大學', accept: 4, avgGPA: 3.95, avgSAT: 1510, tuition: 56169, region: 'West', type: 'Private', tier: 'Top', aacsb: true, r1: true, twPop: true, natRank: 3, discRanks: { Business: 1, Psychology: 2, Economics: 2, 'Political Science': 4, Sociology: 7, Anthropology: 5, Geography: 4 }, startSal: 82000, gradRate: 82, global: true, employers: ['Google', 'McKinsey', 'BCG', 'JP Morgan'] },
  { name: 'MIT', nameZh: '麻省理工學院', accept: 4, avgGPA: 3.96, avgSAT: 1545, tuition: 57986, region: 'East', type: 'Private', tier: 'Top', aacsb: true, r1: true, twPop: true, natRank: 2, discRanks: { Business: 3, Economics: 3, Psychology: 8, 'Political Science': 10, Sociology: 12, Anthropology: 15, Geography: 8 }, startSal: 88000, gradRate: 80, global: true, employers: ['Google', 'Goldman Sachs', 'Deloitte', 'McKinsey'] },
  { name: 'UC Berkeley', nameZh: '加州大學柏克萊分校', accept: 17, avgGPA: 3.89, avgSAT: 1420, tuition: 44066, region: 'West', type: 'Public', tier: 'Top', aacsb: true, r1: true, twPop: true, natRank: 20, discRanks: { Business: 4, Psychology: 5, Economics: 4, 'Political Science': 5, Sociology: 4, Anthropology: 3, Geography: 2 }, startSal: 78000, gradRate: 74, global: true, employers: ['Google', 'Apple', 'McKinsey', 'Deloitte'] },
  { name: 'Columbia University', nameZh: '哥倫比亞大學', accept: 4, avgGPA: 3.91, avgSAT: 1505, tuition: 63530, region: 'East', type: 'Private', tier: 'Top', aacsb: false, r1: true, twPop: true, natRank: 12, discRanks: { Business: 5, Psychology: 4, 'Political Science': 3, Sociology: 2, Economics: 6, Anthropology: 6, Geography: 7 }, startSal: 80000, gradRate: 78, global: true, employers: ['Goldman Sachs', 'McKinsey', 'JP Morgan', 'UN'] },
  { name: 'University of Michigan', nameZh: '密西根大學', accept: 20, avgGPA: 3.88, avgSAT: 1460, tuition: 53232, region: 'Midwest', type: 'Public', tier: 'Top', aacsb: true, r1: true, twPop: true, natRank: 25, discRanks: { Business: 2, Psychology: 9, 'Political Science': 8, Sociology: 10, Economics: 10, Anthropology: 11, Geography: 6 }, startSal: 74000, gradRate: 72, global: false, employers: ['Deloitte', 'McKinsey', 'Ford', 'EY'] },
  { name: 'NYU', nameZh: '紐約大學', accept: 13, avgGPA: 3.84, avgSAT: 1450, tuition: 60500, region: 'East', type: 'Private', tier: 'Top', aacsb: true, r1: true, twPop: true, natRank: 35, discRanks: { Business: 3, Psychology: 6, 'Political Science': 9, Sociology: 5, Economics: 7, Anthropology: 8, Geography: 12 }, startSal: 74000, gradRate: 70, global: true, employers: ['Goldman Sachs', 'Deloitte', 'JP Morgan', 'UN'] },
  { name: 'UCLA', nameZh: '加州大學洛杉磯分校', accept: 12, avgGPA: 3.90, avgSAT: 1405, tuition: 43473, region: 'West', type: 'Public', tier: 'Top', aacsb: true, r1: true, twPop: true, natRank: 20, discRanks: { Business: 5, Psychology: 3, 'Political Science': 7, Sociology: 6, Economics: 8, Anthropology: 4, Geography: 3 }, startSal: 72000, gradRate: 73, global: true, employers: ['Deloitte', 'Amazon', 'Google', 'RAND Corp'] },
  { name: 'University of Chicago', nameZh: '芝加哥大學', accept: 7, avgGPA: 3.92, avgSAT: 1520, tuition: 62241, region: 'Midwest', type: 'Private', tier: 'Top', aacsb: false, r1: true, twPop: true, natRank: 12, discRanks: { Business: 6, Economics: 2, 'Political Science': 6, Sociology: 1, Anthropology: 7, Psychology: 10, Geography: 14 }, startSal: 78000, gradRate: 85, global: false, employers: ['McKinsey', 'Goldman Sachs', 'Fed Reserve', 'NBER'] },
  { name: 'Yale University', nameZh: '耶魯大學', accept: 5, avgGPA: 3.95, avgSAT: 1515, tuition: 59950, region: 'East', type: 'Private', tier: 'Top', aacsb: false, r1: true, twPop: true, natRank: 5, discRanks: { Business: 8, Psychology: 3, 'Political Science': 2, Sociology: 4, Economics: 5, Anthropology: 1, Geography: 10 }, startSal: 79000, gradRate: 84, global: true, employers: ['McKinsey', 'Goldman Sachs', 'State Dept', 'Human Rights Watch'] },
  { name: 'UPenn (Wharton)', nameZh: '賓大沃頓商學院', accept: 7, avgGPA: 3.93, avgSAT: 1510, tuition: 63954, region: 'East', type: 'Private', tier: 'Top', aacsb: true, r1: true, twPop: true, natRank: 8, discRanks: { Business: 1, Economics: 4, 'Political Science': 12, Sociology: 8, Psychology: 7, Anthropology: 14, Geography: 18 }, startSal: 87000, gradRate: 78, global: false, employers: ['Goldman Sachs', 'McKinsey', 'JP Morgan', 'Deloitte'] },
  { name: 'Cornell University', nameZh: '康乃爾大學', accept: 11, avgGPA: 3.87, avgSAT: 1480, tuition: 63200, region: 'East', type: 'Private', tier: 'Top', aacsb: true, r1: true, twPop: true, natRank: 17, discRanks: { Business: 4, Psychology: 8, 'Political Science': 10, Sociology: 9, Economics: 9, Anthropology: 10, Geography: 9 }, startSal: 75000, gradRate: 74, global: false, employers: ['Deloitte', 'EY', 'McKinsey', 'Goldman Sachs'] },
  { name: 'Georgetown University', nameZh: '喬治城大學', accept: 17, avgGPA: 3.87, avgSAT: 1475, tuition: 59000, region: 'East', type: 'Private', tier: 'Top', aacsb: false, r1: true, twPop: true, natRank: 22, discRanks: { Business: 8, 'Political Science': 1, Sociology: 11, Economics: 11, Psychology: 11, Anthropology: 12, Geography: 15 }, startSal: 70000, gradRate: 76, global: true, employers: ['State Dept', 'World Bank', 'McKinsey', 'Brookings'] },
  { name: 'USC', nameZh: '南加州大學', accept: 16, avgGPA: 3.82, avgSAT: 1410, tuition: 63468, region: 'West', type: 'Private', tier: 'Top', aacsb: true, r1: true, twPop: true, natRank: 27, discRanks: { Business: 5, Psychology: 12, 'Political Science': 14, Sociology: 13, Economics: 14, Anthropology: 16, Geography: 11 }, startSal: 71000, gradRate: 70, global: false, employers: ['Deloitte', 'PwC', 'Amazon', 'Google'] },
  { name: 'UT Austin', nameZh: '德州大學奧斯汀分校', accept: 38, avgGPA: 3.78, avgSAT: 1310, tuition: 40996, region: 'South', type: 'Public', tier: 'Mid', aacsb: true, r1: true, twPop: false, natRank: 38, discRanks: { Business: 6, 'Political Science': 11, Sociology: 14, Economics: 13, Psychology: 14, Anthropology: 13, Geography: 8 }, startSal: 66000, gradRate: 62, global: false, employers: ['Dell', 'EY', 'Deloitte', 'Texas Gov'] },
  { name: 'University of Washington', nameZh: '華盛頓大學', accept: 52, avgGPA: 3.80, avgSAT: 1320, tuition: 38166, region: 'West', type: 'Public', tier: 'Mid', aacsb: true, r1: true, twPop: true, natRank: 55, discRanks: { Business: 7, Psychology: 6, 'Political Science': 13, Sociology: 12, Economics: 12, Anthropology: 9, Geography: 1 }, startSal: 68000, gradRate: 65, global: false, employers: ['Amazon', 'Boeing', 'Microsoft', 'Deloitte'] },
  { name: 'UIUC', nameZh: '伊利諾大學香檳分校', accept: 61, avgGPA: 3.81, avgSAT: 1360, tuition: 32054, region: 'Midwest', type: 'Public', tier: 'Mid', aacsb: true, r1: true, twPop: true, natRank: 47, discRanks: { Business: 8, Psychology: 15, Economics: 15, 'Political Science': 15, Sociology: 15, Anthropology: 18, Geography: 13 }, startSal: 65000, gradRate: 60, global: false, employers: ['PwC', 'Boeing', 'Caterpillar', 'Deloitte'] },
  { name: 'Ohio State University', nameZh: '俄亥俄州立大學', accept: 53, avgGPA: 3.73, avgSAT: 1310, tuition: 32061, region: 'Midwest', type: 'Public', tier: 'Mid', aacsb: true, r1: true, twPop: false, natRank: 49, discRanks: { Business: 9, Psychology: 13, Sociology: 16, Economics: 16, 'Political Science': 16, Anthropology: 17, Geography: 5 }, startSal: 60000, gradRate: 58, global: false, employers: ['EY', 'Nationwide', 'PwC', 'KPMG'] },
  { name: 'Northeastern University', nameZh: '東北大學', accept: 20, avgGPA: 3.82, avgSAT: 1460, tuition: 59140, region: 'East', type: 'Private', tier: 'Mid', aacsb: true, r1: true, twPop: true, natRank: 49, discRanks: { Business: 7, Psychology: 14, 'Political Science': 17, Sociology: 17, Economics: 17, Anthropology: 19, Geography: 16 }, startSal: 69000, gradRate: 68, global: false, employers: ['PwC', 'EY', 'Amazon', 'State Street'] },
  { name: 'Boston University', nameZh: '波士頓大學', accept: 19, avgGPA: 3.80, avgSAT: 1400, tuition: 58560, region: 'East', type: 'Private', tier: 'Mid', aacsb: true, r1: true, twPop: true, natRank: 42, discRanks: { Business: 9, Psychology: 10, 'Political Science': 11, Sociology: 11, Economics: 11, Anthropology: 13, Geography: 17 }, startSal: 66000, gradRate: 66, global: true, employers: ['PwC', 'EY', 'Fidelity', 'State Street'] },
  { name: 'Tufts University', nameZh: '塔夫茨大學', accept: 14, avgGPA: 3.88, avgSAT: 1490, tuition: 63804, region: 'East', type: 'Private', tier: 'Mid', aacsb: false, r1: false, twPop: false, natRank: 30, discRanks: { 'Political Science': 5, Sociology: 7, Anthropology: 8, Economics: 8, Psychology: 9, Geography: 13, Business: 15 }, startSal: 65000, gradRate: 79, global: true, employers: ['State Dept', 'World Bank', 'Brookings', 'RAND'] },
  { name: 'UC San Diego', nameZh: '加州大學聖地亞哥分校', accept: 26, avgGPA: 3.86, avgSAT: 1380, tuition: 43956, region: 'West', type: 'Public', tier: 'Mid', aacsb: true, r1: true, twPop: true, natRank: 34, discRanks: { Business: 10, Psychology: 7, Economics: 9, 'Political Science': 12, Sociology: 10, Anthropology: 11, Geography: 7 }, startSal: 67000, gradRate: 65, global: false, employers: ['Qualcomm', 'Deloitte', 'Google', 'KPMG'] },
  { name: 'University of Minnesota', nameZh: '明尼蘇達大學', accept: 58, avgGPA: 3.75, avgSAT: 1310, tuition: 32000, region: 'Midwest', type: 'Public', tier: 'Mid', aacsb: true, r1: true, twPop: false, natRank: 68, discRanks: { Sociology: 8, Anthropology: 10, Geography: 6, Psychology: 12, Economics: 13, 'Political Science': 18, Business: 11 }, startSal: 59000, gradRate: 60, global: false, employers: ['Target', '3M', 'Deloitte', 'United Health'] },
  { name: 'Rutgers University', nameZh: '羅格斯大學', accept: 62, avgGPA: 3.72, avgSAT: 1295, tuition: 32000, region: 'East', type: 'Public', tier: 'Emerging', aacsb: true, r1: true, twPop: false, natRank: 63, discRanks: { Sociology: 9, Business: 12, 'Political Science': 19, Economics: 14, Psychology: 16, Anthropology: 20, Geography: 18 }, startSal: 62000, gradRate: 58, global: false, employers: ['JP Morgan', 'Deloitte', 'Johnson & Johnson', 'EY'] },
  { name: 'UC Davis', nameZh: '加州大學戴維斯分校', accept: 39, avgGPA: 3.80, avgSAT: 1310, tuition: 44066, region: 'West', type: 'Public', tier: 'Mid', aacsb: false, r1: true, twPop: true, natRank: 38, discRanks: { Anthropology: 7, Geography: 4, Sociology: 13, Psychology: 11, 'Political Science': 20, Economics: 15, Business: 14 }, startSal: 62000, gradRate: 64, global: false, employers: ['Deloitte', 'KPMG', 'State of CA', 'Kaiser'] },
  { name: 'American University', nameZh: '美國大學', accept: 60, avgGPA: 3.65, avgSAT: 1275, tuition: 50000, region: 'East', type: 'Private', tier: 'Emerging', aacsb: true, r1: false, twPop: true, natRank: 80, discRanks: { 'Political Science': 3, Sociology: 6, Economics: 12, Anthropology: 9, Psychology: 13, Geography: 16, Business: 10 }, startSal: 60000, gradRate: 68, global: true, employers: ['State Dept', 'World Bank', 'IMF', 'NGOs'] },
  { name: 'University of Oregon', nameZh: '奧勒岡大學', accept: 82, avgGPA: 3.62, avgSAT: 1230, tuition: 36000, region: 'West', type: 'Public', tier: 'Emerging', aacsb: true, r1: true, twPop: false, natRank: 102, discRanks: { Sociology: 11, Anthropology: 12, Geography: 9, Psychology: 15, 'Political Science': 22, Economics: 18, Business: 13 }, startSal: 54000, gradRate: 54, global: false, employers: ['Nike', 'Intel', 'State of OR', 'KPMG'] },
  { name: 'Arizona State Univ.', nameZh: '亞利桑那州立大學', accept: 73, avgGPA: 3.64, avgSAT: 1255, tuition: 31000, region: 'West', type: 'Public', tier: 'Emerging', aacsb: true, r1: true, twPop: false, natRank: 117, discRanks: { Geography: 10, Sociology: 14, Anthropology: 13, Psychology: 17, Economics: 17, 'Political Science': 21, Business: 11 }, startSal: 55000, gradRate: 52, global: false, employers: ['Intel', 'Amazon', 'EY', 'State of AZ'] },
  { name: 'George Washington Univ.', nameZh: '喬治華盛頓大學', accept: 44, avgGPA: 3.75, avgSAT: 1360, tuition: 60000, region: 'East', type: 'Private', tier: 'Mid', aacsb: true, r1: false, twPop: true, natRank: 62, discRanks: { 'Political Science': 2, Sociology: 5, Economics: 10, Anthropology: 6, Psychology: 14, Geography: 19, Business: 9 }, startSal: 64000, gradRate: 71, global: true, employers: ['World Bank', 'State Dept', 'Deloitte', 'Brookings'] },
  { name: 'Michigan State Univ.', nameZh: '密西根州立大學', accept: 66, avgGPA: 3.70, avgSAT: 1280, tuition: 29450, region: 'Midwest', type: 'Public', tier: 'Emerging', aacsb: true, r1: true, twPop: false, natRank: 73, discRanks: { Anthropology: 14, Geography: 11, Sociology: 12, 'Political Science': 17, Psychology: 18, Economics: 16, Business: 12 }, startSal: 58000, gradRate: 55, global: false, employers: ['EY', 'Kellogg', 'PwC', 'State of MI'] }
];

export const DISC_CONFIG: Record<string, DisciplineConfig> = {
  Business: {
    icon: '💼', color: 'var(--biz)', tag: 'tag-gold',
    requirements: { zh: 'AACSB認證、實習管道、量化能力', en: 'AACSB accreditation, internship pipeline, quant skills' },
    gapAdvice: {
      zh: ['爭取暑期實習機會', '參加 DECA/FBLA 競賽', '提升 SAT 數學至 750+', '加入投資或創業社團'],
      en: ['Secure summer internship', 'Join DECA/FBLA competitions', 'Boost SAT Math to 750+', 'Join investment or entrepreneurship club']
    }
  },
  Psychology: {
    icon: '🧠', color: 'var(--psy)', tag: 'tag-purple',
    requirements: { zh: '研究助理經歷、寫作力、心理學相關課程', en: 'Research assistant experience, writing strength, psych-related coursework' },
    gapAdvice: {
      zh: ['申請心理學實驗室研究助理', '閱讀並摘要心理學論文', '參與心理健康志工服務', '選修 AP Psychology 或 Statistics'],
      en: ['Apply to psychology research labs', 'Read and summarize psych papers', 'Volunteer in mental health services', 'Take AP Psychology or Statistics']
    }
  },
  'Political Science': {
    icon: '⚖️', color: 'var(--pol)', tag: 'tag-teal',
    requirements: { zh: '公民參與、辯論能力、政治議題寫作', en: 'Civic engagement, debate skills, political issue writing' },
    gapAdvice: {
      zh: ['加入辯論隊或 Model UN', '參與地方政府政策實習', '撰寫政治評論投稿校刊', '閱讀 Foreign Affairs、政治學期刊'],
      en: ['Join debate team or Model UN', 'Pursue local government/policy internship', 'Write political commentary for school paper', 'Read Foreign Affairs and political journals']
    }
  },
  Economics: {
    icon: '📊', color: 'var(--eco)', tag: 'tag-green',
    requirements: { zh: '強數學背景、統計分析、經濟研究', en: 'Strong math background, statistics, economic research' },
    gapAdvice: {
      zh: ['修習 AP Calculus BC 和 AP Statistics', '參加經濟學研究項目或論文比賽', '學習 Python/R 數據分析', '閱讀經濟學人、Freakonomics'],
      en: ['Take AP Calculus BC and AP Statistics', 'Join economics research or essay competitions', 'Learn Python/R for data analysis', 'Read The Economist, Freakonomics']
    }
  },
  Sociology: {
    icon: '🌐', color: 'var(--soc)', tag: 'tag-pink',
    requirements: { zh: '社區參與、批判性寫作、社會研究', en: 'Community engagement, critical writing, social research' },
    gapAdvice: {
      zh: ['主導社區服務 or 公益項目', '撰寫社會議題分析文章', '參加社會學研究助理項目', '關注不平等、多元文化相關議題'],
      en: ['Lead community service or social justice projects', 'Write social issue analysis pieces', 'Join sociology research assistant programs', 'Engage with inequality and diversity topics']
    }
  },
  Anthropology: {
    icon: '🏺', color: 'var(--ant)', tag: 'tag-gold',
    requirements: { zh: '田野研究、多語言能力、文化理解', en: 'Fieldwork experience, multilingual ability, cultural understanding' },
    gapAdvice: {
      zh: ['參加文化交流或海外服務項目', '學習 second 或第三外語', '參與考古或民族誌研究', '閱讀人類學田野報告'],
      en: ['Join cultural exchange or overseas service programs', 'Learn a second language', 'Participate in archaeological or ethnographic research', 'Read anthropological fieldwork reports']
    }
  },
  Geography: {
    icon: '🌍', color: 'var(--geo)', tag: '',
    requirements: { zh: '地理信息系統(GIS)、環境研究、全球視野', en: 'GIS skills, environmental research, global perspective' },
    gapAdvice: {
      zh: ['學習 GIS（ArcGIS/QGIS）技術', '參與環境 or 氣候變遷研究', '加入地理學社或環保組織', '了解城市規劃和永續發展議題'],
      en: ['Learn GIS (ArcGIS/QGIS) tools', 'Join environmental or climate research projects', 'Join geography or environmental clubs', 'Explore urban planning and sustainability topics']
    }
  },
  'Computer Science': {
    icon: '💻', color: 'var(--cs)', tag: 'tag-teal',
    requirements: { zh: '強數學背景、程式作品集、競賽成績', en: 'Strong math, coding portfolio, competitive programming' },
    gapAdvice: {
      zh: ['建立 GitHub 程式作品集', '參加 USACO、Hackathon 等競賽', '修習 AP Computer Science A/Principles', '貢獻開源項目或自主開發 App'],
      en: ['Build a GitHub coding portfolio', 'Compete in USACO, Hackathons', 'Take AP Computer Science A/Principles', 'Contribute to open source or build own apps']
    }
  },
  Engineering: {
    icon: '⚙️', color: 'var(--eng)', tag: 'tag-gold',
    requirements: { zh: 'AP Physics/Calculus、工程競賽、動手實作', en: 'AP Physics/Calculus, engineering competitions, hands-on projects' },
    gapAdvice: {
      zh: ['參加 Science Olympiad、FIRST Robotics 等工程競賽', '修習 AP Physics C 和 AP Calculus BC', '建立工程設計作品集', '尋求大學工程實驗室或 Research 機會'],
      en: ['Join Science Olympiad, FIRST Robotics, or similar', 'Take AP Physics C and AP Calculus BC', 'Build an engineering design portfolio', 'Seek university lab or research opportunities']
    }
  },
  'Data Science': {
    icon: '📈', color: 'var(--data)', tag: 'tag-green',
    requirements: { zh: '統計學、Python/R 能力、資料分析專案', en: 'Statistics, Python/R skills, data analysis projects' },
    gapAdvice: {
      zh: ['學習 Python + Pandas + Matplotlib 資料分析', '修習 AP Statistics 並深化統計知識', '完成 Kaggle 或 UCI 資料集分析專案', '建立資料視覺化作品集'],
      en: ['Learn Python, Pandas, and Matplotlib for data analysis', 'Take AP Statistics and deepen statistical knowledge', 'Complete Kaggle or UCI dataset projects', 'Build a data visualization portfolio']
    }
  },
  Biology: {
    icon: '🧬', color: 'var(--bio)', tag: 'tag-green',
    requirements: { zh: 'AP Biology/Chemistry、實驗室研究、科學競賽', en: 'AP Biology/Chemistry, lab research, science competitions' },
    gapAdvice: {
      zh: ['申請大學或醫院生物實驗室研究職位', '參加 Intel ISEF、Regeneron 等科學競賽', '修習 AP Biology 和 AP Chemistry', '尋求醫療院所志工或 Shadow 機會'],
      en: ['Apply for university or hospital biology research positions', 'Compete in Intel ISEF, Regeneron STS', 'Take AP Biology and AP Chemistry', 'Seek hospital volunteer or shadowing experience']
    }
  },
  Accounting: {
    icon: '📒', color: 'var(--acc)', tag: 'tag-purple',
    requirements: { zh: '數學能力、AP 統計、商業競賽(DECA/FBLA)', en: 'Math skills, AP Statistics, business competitions' },
    gapAdvice: {
      zh: ['參加 DECA Accounting 競賽', '修習 AP Statistics', '尋找稅務或財務相關暑期實習', '了解 CPA 考試路徑'],
      en: ['Compete in DECA Accounting events', 'Take AP Statistics', 'Find tax or finance-related summer internships', 'Learn about CPA exam pathways']
    }
  },
  Finance: {
    icon: '💰', color: 'var(--fin)', tag: 'tag-gold',
    requirements: { zh: '量化能力、投資相關知識、金融實習', en: 'Quantitative skills, investment knowledge, finance internship' },
    gapAdvice: {
      zh: ['加入學校投資俱樂部', '模擬股票投資組合管理', '尋找金融機構暑期實習', '學習 Bloomberg/Excel 金融建模'],
      en: ['Join your school investment club', 'Manage a simulated investment portfolio', 'Find financial firm summer internship', 'Learn Bloomberg/Excel financial modeling']
    }
  },
  'International Relations': {
    icon: '🌏', color: 'var(--ir)', tag: 'tag-teal',
    requirements: { zh: '辯論/MUN、外語能力、政策議題研究', en: 'Debate/MUN, foreign language skills, policy research' },
    gapAdvice: {
      zh: ['深耕 Model UN 並爭取最佳代表獎', '學習 second 或第三外語', '撰寫國際政策分析文章', '尋找外交部或 NGO 相關實習'],
      en: ['Excel in Model UN and win Best Delegate', 'Learn a second or third language', 'Write international policy analysis pieces', 'Seek State Dept or NGO internship']
    }
  },
  History: {
    icon: '📜', color: 'var(--hist)', tag: '',
    requirements: { zh: 'AP History、批判性寫作、歷史研究能力', en: 'AP History, critical writing, historical research' },
    gapAdvice: {
      zh: ['修習 AP US History、AP World History', '撰寫歷史議題分析文章並投稿', '閱讀歷史學術著作和一手文獻', '參加歷史知識競賽或寫作競賽'],
      en: ['Take AP US History and AP World History', 'Write and submit historical analysis pieces', 'Read academic historiography and primary sources', 'Enter history knowledge bowls or essay contests']
    }
  },
  Literature: {
    icon: '📖', color: 'var(--lit)', tag: 'tag-purple',
    requirements: { zh: 'AP English、創意寫作、廣泛閱讀', en: 'AP English, creative writing, broad reading' },
    gapAdvice: {
      zh: ['修習 AP English Literature', '參加創意寫作工作坊', '向學校刊物或校外文學誌投稿', '廣泛閱讀當代及古典文學作品'],
      en: ['Take AP English Literature', 'Join creative writing workshops', 'Submit to school literary magazine or external publications', 'Read widely across contemporary and classical literature']
    }
  },
  Philosophy: {
    icon: '🤔', color: 'var(--phil)', tag: '',
    requirements: { zh: '邏輯能力、辯論、批判性寫作', en: 'Logical reasoning, debate, critical writing' },
    gapAdvice: {
      zh: ['修習邏輯學或哲學選修課', '加入辯論隊強化論點構建能力', '閱讀哲學原典（蘇格拉底、康德、維根斯坦）', '撰寫哲學議題評論並尋求發表機會'],
      en: ['Take logic or philosophy elective courses', 'Join debate team to strengthen argumentation', 'Read primary philosophical texts (Socrates, Kant, Wittgenstein)', 'Write philosophy commentary and seek publication']
    }
  },
  Design: {
    icon: '🎨', color: 'var(--des)', tag: 'tag-pink',
    requirements: { zh: '設計作品集、創意思維、數位工具能力', en: 'Design portfolio, creative thinking, digital tools' },
    gapAdvice: {
      zh: ['建立專業設計作品集（Behance/個人網站）', '學習 Figma、Adobe Suite、Procreate', '參加設計競賽或 UX Hackathon', '研究設計思維（Design Thinking）方法論'],
      en: ['Build a professional design portfolio on Behance or personal site', 'Learn Figma, Adobe Suite, Procreate', 'Enter design competitions or UX Hackathons', 'Study Design Thinking methodology']
    }
  },
  Music: {
    icon: '🎵', color: 'var(--mus)', tag: 'tag-purple',
    requirements: { zh: '演奏技術、音樂理論、表演/比賽經驗', en: 'Performance skills, music theory, competition/performance experience' },
    gapAdvice: {
      zh: ['準備高水準的演奏作品集（audition tape）', '參加全州/全國音樂競賽或青年交響樂團', '學習音樂理論：和聲、對位法', '嘗試作曲並錄製作品'],
      en: ['Prepare a high-quality performance audition tape', 'Compete in all-state or national music competitions', 'Study music theory: harmony, counterpoint', 'Compose original works and record them']
    }
  },
  'Film & Media': {
    icon: '🎬', color: 'var(--film)', tag: '',
    requirements: { zh: '影片/媒體作品集、敘事能力、技術工具', en: 'Film/media portfolio, storytelling, technical tools' },
    gapAdvice: {
      zh: ['建立短片/媒體作品集', '學習 Final Cut Pro、Premiere、After Effects', '參加本地電影節 or 青少年媒體競賽', '撰寫劇本並組隊拍攝短片'],
      en: ['Build a short film or media portfolio', 'Learn Final Cut Pro, Premiere, After Effects', 'Enter local film festivals or youth media competitions', 'Write scripts and film short projects with peers']
    }
  },
  Other: {
    icon: '✏️', color: '#94a3b8', tag: '',
    requirements: { zh: '一般通用評估模型', en: 'General evaluation model' },
    gapAdvice: {
      zh: ['深入探索您所選科系的核心課程與研究', '尋找相關實習或社區項目累積實際經驗', '與該領域導師建立聯繫，獲得推薦信', '在文書中清楚說明您選擇此科系的動機與未來目標'],
      en: ['Explore core coursework and research in your chosen field', 'Find related internships or community projects for real experience', 'Connect with a mentor in the field for a strong recommendation', 'Clearly articulate your motivation and goals in your essay']
    }
  }
};

export const CAREER_DATA: Record<string, CareerData> = {
  Business: { startSal: 72000, midSal: 120000, gradRate: 22, paths: ['Investment Banker', 'Consultant', 'Marketing Manager', 'CFO track'], grad: ['MBA', 'MSF', 'MS Analytics'], employers: ['Goldman Sachs', 'McKinsey', 'Deloitte', 'Amazon'] },
  Psychology: { startSal: 42000, midSal: 75000, gradRate: 75, paths: ['Clinical Psychologist', 'Research Scientist', 'UX Researcher', 'HR Specialist'], grad: ['PhD Psychology', 'PsyD', 'MSW', 'MBA'], employers: ['Hospital Systems', 'Google UX', 'Government', 'NGOs'] },
  'Political Science': { startSal: 50000, midSal: 88000, gradRate: 60, paths: ['Policy Analyst', 'Diplomat', 'Lawyer', 'Campaign Manager'], grad: ['JD', 'MPA', 'MPP', 'PhD PoliSci'], employers: ['State Dept', 'Think Tanks', 'Law Firms', 'Congress'] },
  Economics: { startSal: 68000, midSal: 115000, gradRate: 55, paths: ['Economic Analyst', 'Financial Consultant', 'Data Scientist', 'Policy Economist'], grad: ['PhD Economics', 'MA Econ', 'MBA', 'MS Finance'], employers: ['Federal Reserve', 'McKinsey', 'JP Morgan', 'World Bank'] },
  Sociology: { startSal: 40000, midSal: 65000, gradRate: 68, paths: ['Social Researcher', 'HR Specialist', 'NGO Director', 'Social Worker'], grad: ['MSW', 'PhD Sociology', 'MPA', 'MBA'], employers: ['Non-profits', 'Government', 'Healthcare', 'Tech (DEI)'] },
  Anthropology: { startSal: 38000, midSal: 62000, gradRate: 72, paths: ['Cultural Analyst', 'UX Researcher', 'Museum Curator', 'Development Worker'], grad: ['PhD Anthropology', 'MA Anthropology', 'MBA', 'MSW'], employers: ['Museums', 'NGOs', 'Tech UX teams', 'Government'] },
  Geography: { startSal: 48000, midSal: 80000, gradRate: 58, paths: ['GIS Analyst', 'Urban Planner', 'Environmental Consultant', 'Climate Researcher'], grad: ['MS Geography', 'MUP', 'MS Environmental', 'PhD Geography'], employers: ['ESRI', 'City Governments', 'EPA', 'Consulting firms'] },
  'Computer Science': { startSal: 95000, midSal: 155000, gradRate: 20, paths: ['Software Engineer', 'ML Engineer', 'Product Manager', 'Tech Lead'], grad: ['MS CS', 'MBA', 'PhD CS'], employers: ['Google', 'Apple', 'Meta', 'Amazon', 'Microsoft'] },
  Engineering: { startSal: 78000, midSal: 125000, gradRate: 30, paths: ['Mechanical Engineer', 'Electrical Engineer', 'Civil Engineer', 'Systems Engineer'], grad: ['MS Engineering', 'MBA', 'PE License'], employers: ['Boeing', 'SpaceX', 'Tesla', 'General Electric', 'Lockheed'] },
  'Data Science': { startSal: 90000, midSal: 140000, gradRate: 35, paths: ['Data Scientist', 'ML Engineer', 'Analytics Manager', 'Research Scientist'], grad: ['MS Data Science', 'MS Statistics', 'PhD', 'MBA'], employers: ['Google', 'Airbnb', 'Netflix', 'Palantir', 'Stripe'] },
  Biology: { startSal: 45000, midSal: 85000, gradRate: 80, paths: ['Research Scientist', 'Pre-Med (MD)', 'Biotech Analyst', 'Pharma Researcher'], grad: ['PhD Biology', 'MD', 'PharmD', 'MS Biotech'], employers: ['NIH', 'Genentech', 'Pfizer', 'Hospital Systems'] },
  Accounting: { startSal: 62000, midSal: 95000, gradRate: 15, paths: ['Big 4 Auditor', 'Tax Specialist', 'Controller', 'CFO track'], grad: ['CPA', 'MBA', 'MS Accounting'], employers: ['Deloitte', 'PwC', 'EY', 'KPMG', 'Fortune 500'] },
  Finance: { startSal: 78000, midSal: 135000, gradRate: 25, paths: ['Investment Banking Analyst', 'Private Equity', 'Portfolio Manager', 'Risk Analyst'], grad: ['MBA', 'MSF', 'CFA', 'MS Finance'], employers: ['Goldman Sachs', 'JP Morgan', 'Blackstone', 'Citadel', 'Morgan Stanley'] },
  'International Relations': { startSal: 48000, midSal: 82000, gradRate: 65, paths: ['Diplomat', 'Policy Analyst', 'International Journalist', 'NGO Director'], grad: ['MA International Relations', 'MPA', 'JD', 'PhD'], employers: ['State Dept', 'UN', 'World Bank', 'Brookings', 'Foreign Policy'] },
  History: { startSal: 38000, midSal: 60000, gradRate: 70, paths: ['Historian', 'Archivist', 'Policy Researcher', 'Museum Curator'], grad: ['PhD History', 'MA History', 'JD', 'MLS'], employers: ['Universities', 'Archives', 'Think Tanks', 'Museums', 'Publishing'] },
  Literature: { startSal: 36000, midSal: 58000, gradRate: 68, paths: ['Author/Editor', 'Professor', 'Literary Agent', 'Content Strategist'], grad: ['MFA', 'PhD Lit', 'MA English', 'MBA'], employers: ['Publishing Houses', 'Universities', 'Media Companies', 'Non-profits'] },
  Philosophy: { startSal: 38000, midSal: 65000, gradRate: 70, paths: ['Ethicist', 'Professor', 'Lawyer', 'Policy Analyst'], grad: ['PhD Philosophy', 'JD', 'MA Philosophy', 'MBA'], employers: ['Universities', 'Law Firms', 'Think Tanks', 'Tech Ethics Teams'] },
  Design: { startSal: 58000, midSal: 95000, gradRate: 20, paths: ['UX Designer', 'Product Designer', 'Brand Designer', 'Creative Director'], grad: ['MFA Design', 'MS HCI', 'MBA'], employers: ['Apple', 'Google', 'IDEO', 'Pentagram', 'Frog Design'] },
  Music: { startSal: 35000, midSal: 65000, gradRate: 40, paths: ['Performer', 'Music Teacher', 'Music Producer', 'Music Therapist'], grad: ['MM', 'DMA', 'MM Therapy', 'MBA'], employers: ['Orchestras', 'Recording Studios', 'Schools', 'Streaming Platforms'] },
  'Film & Media': { startSal: 42000, midSal: 78000, gradRate: 30, paths: ['Director', 'Screenwriter', 'Producer', 'Media Journalist'], grad: ['MFA Film', 'MA Media Studies', 'MBA'], employers: ['Netflix', 'Disney', 'Viacom', 'HBO', 'Indie Studios'] },
  Other: { startSal: 55000, midSal: 90000, gradRate: 45, paths: ['Analyst', 'Consultant', 'Specialist', 'Manager'], grad: ['MA/MS in field', 'MBA', 'JD', 'PhD'], employers: ['Varies by field'] }
};
