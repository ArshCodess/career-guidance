'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { 
  Activity, ArrowRight, BrainCircuit, BookHeart, CheckCircle2, 
  ChevronRight, Compass, Sparkles, Milestone, GraduationCap, 
  Target, Rocket, Lightbulb, Star, TrendingUp, Briefcase, Zap, RotateCcw
} from 'lucide-react';
import psychometricJson from '@/psychometric.json';

const SPEC_MAP = {
  btech_cse: { specialization_id: 'btech_cse', specialization_name: 'Computer Science (CSE)', course_id: 'btech', course_name: 'B.Tech / B.E.', stream: 'science', psychometric_traits: ['logical', 'analytical', 'problem_solver', 'tech_curious', 'detail_oriented'], career_paths: ['Software Engineer', 'Backend Developer', 'System Architect', 'Cybersecurity Analyst'], demand: 'Exponential', salary: '₹8L - ₹24L+', brief: 'You possess a hyper-logical cognitive framework. You excel at breaking down massive, complex problems into scalable digital logic.' },
  btech_it: { specialization_id: 'btech_it', specialization_name: 'Information Tech (IT)', course_id: 'btech', course_name: 'B.Tech / B.E.', stream: 'science', psychometric_traits: ['tech_curious', 'systems_thinker', 'organized', 'practical', 'collaborative'], career_paths: ['IT Consultant', 'Network Engineer', 'Cloud Architect', 'DevOps Analyst'], demand: 'Very High', salary: '₹6L - ₹18L+', brief: 'You are an exceptional systems thinker. You thrive on integrating sprawling technological infrastructure into reliable, human-accessible tools.' },
  btech_aiml: { specialization_id: 'btech_aiml', specialization_name: 'AI/ML Engineering', course_id: 'btech', course_name: 'B.Tech / B.E.', stream: 'science', psychometric_traits: ['curious', 'mathematical', 'research_oriented', 'innovative', 'data_driven'], career_paths: ['ML Engineer', 'Data Scientist', 'AI Researcher', 'Vision Engineer'], demand: 'Critical Deficit', salary: '₹12L - ₹30L+', brief: 'You are mathematically driven and deeply curious. This path allows you to train neural networks and process unstructured data at scale.' },
  btech_ds: { specialization_id: 'btech_ds', specialization_name: 'Data Science', course_id: 'btech', course_name: 'B.Tech / B.E.', stream: 'science', psychometric_traits: ['analytical', 'mathematical', 'data_driven', 'curious', 'statistical_thinking'], career_paths: ['Data Analyst', 'Data Engineer', 'BI Analyst', 'Quant Analyst'], demand: 'Exponential', salary: '₹9L - ₹22L+', brief: 'You view the world through statistical truths. Your profile is heavily skewed towards uncovering hidden market patterns from raw noise.' },
  btech_mech: { specialization_id: 'btech_mech', specialization_name: 'Mechanical Engineering', course_id: 'btech', course_name: 'B.Tech / B.E.', stream: 'science', psychometric_traits: ['hands_on', 'mechanical_aptitude', 'design_thinking', 'practical', 'problem_solver'], career_paths: ['Mech Engineer', 'Design Engineer', 'Aerospace Specialist', 'Robotics'], demand: 'Steady High', salary: '₹6L - ₹16L+', brief: 'You are deeply practical and mechanically aware. You intuitively grasp physics, thermodynamics, and physical kinetic systems.' },
  btech_civil: { specialization_id: 'btech_civil', specialization_name: 'Civil Engineering', course_id: 'btech', course_name: 'B.Tech / B.E.', stream: 'science', psychometric_traits: ['structured_thinker', 'spatial_reasoning', 'patient', 'detail_oriented', 'outdoor_oriented'], career_paths: ['Civil Engineer', 'Structural Lead', 'Urban Planner', 'City Infrastructure'], demand: 'Stable', salary: '₹5L - ₹14L+', brief: 'You possess massive spatial reasoning capacity and extreme patience, making you perfectly suited to architecting permanent global infrastructure.' },
  btech_ece: { specialization_id: 'btech_ece', specialization_name: 'Electronics (ECE)', course_id: 'btech', course_name: 'B.Tech / B.E.', stream: 'science', psychometric_traits: ['technical', 'electronics_curious', 'systematic', 'analytical', 'hardware_oriented'], career_paths: ['Embedded Engineer', 'VLSI Designer', 'Telecom Architect', 'IoT Dev'], demand: 'High', salary: '₹7L - ₹20L+', brief: 'Your brain thrives exactly at the intersection of logical programming and hard physical circuitry, ideal for micro-processor engineering.' },
  btech_electrical: { specialization_id: 'btech_electrical', specialization_name: 'Electrical Engineering', course_id: 'btech', course_name: 'B.Tech / B.E.', stream: 'science', psychometric_traits: ['systematic', 'technical', 'math_oriented', 'problem_solver', 'precision_focused'], career_paths: ['Power Systems', 'Renewable Energy', 'Control Systems', 'PSU Officer'], demand: 'High', salary: '₹6L - ₹18L+', brief: 'You respect high-stakes precision. Your profile matches perfectly with the individuals building the smart-grids and massive energy networks of the future.' },
  bca_softdev: { specialization_id: 'bca_softdev', specialization_name: 'Software Dev (BCA)', course_id: 'bca', course_name: 'BCA', stream: 'science', psychometric_traits: ['logical', 'coding_enthusiast', 'problem_solver', 'creative', 'detail_oriented'], career_paths: ['Software Dev', 'Full Stack Dev', 'Backend Engineer', 'App Architect'], demand: 'Very High', salary: '₹5L - ₹15L+', brief: 'A fast-track logical thinker. You want to immediately dive into coding infrastructures, skipping heavy physics for pure digital engineering.' },
  bca_webdev: { specialization_id: 'bca_webdev', specialization_name: 'Web Dev (BCA)', course_id: 'bca', course_name: 'BCA', stream: 'science', psychometric_traits: ['creative', 'visual_thinker', 'tech_savvy', 'user_empathy', 'fast_learner'], career_paths: ['Frontend Dev', 'UI Engineer', 'Interactive Designer', 'Web Producer'], demand: 'High', salary: '₹4L - ₹12L+', brief: 'You possess deep user-empathy combined with technical capability. You dictate how people emotionally interact with digital interfaces.' },
  bca_aiml: { specialization_id: 'bca_aiml', specialization_name: 'AI & Data (BCA)', course_id: 'bca', course_name: 'BCA', stream: 'science', psychometric_traits: ['data_driven', 'mathematical', 'curious', 'innovative', 'research_oriented'], career_paths: ['Junior ML Dev', 'Data Analyst', 'Prompt Engineer', 'AI Associate'], demand: 'Rapidly Rising', salary: '₹6L - ₹14L+', brief: 'You are deeply fascinated by automation and algorithmic evolution, preferring applied mathematics to leverage existing AI models.' },
  bba_marketing: { specialization_id: 'bba_marketing', specialization_name: 'Marketing (BBA)', course_id: 'bba', course_name: 'BBA', stream: 'commerce', psychometric_traits: ['extroverted', 'persuasive', 'creative', 'social', 'trend_aware'], career_paths: ['Marketing Manager', 'Brand Director', 'Growth Hacker', 'Sales Lead'], demand: 'Very High', salary: '₹6L - ₹18L+', brief: 'You are wildly persuasive and socially attuned. You intuitively understand market psychology, making you highly dangerous in viral acquisition.' },
  bba_finance: { specialization_id: 'bba_finance', specialization_name: 'Finance (BBA)', course_id: 'bba', course_name: 'BBA', stream: 'commerce', psychometric_traits: ['analytical', 'numerical', 'risk_aware', 'disciplined', 'strategic_thinker'], career_paths: ['Finance Analyst', 'Investment Banker', 'Equity Research', 'Hedge Fund Assoc'], demand: 'High', salary: '₹7L - ₹20L+', brief: 'You are disciplined, ruthless with numbers, and highly risk-aware. You are built to command Excel models and allocate immense corporate capital.' },
  llb_corporate: { specialization_id: 'llb_corporate', specialization_name: 'Corporate Law', course_id: 'llb', course_name: 'LLB / BA LLB', stream: 'independent', psychometric_traits: ['analytical', 'persuasive', 'detail_oriented', 'business_minded', 'strategic'], career_paths: ['Corporate Lawyer', 'In-house Counsel', 'M&A Negotiator', 'Compliance'], demand: 'Steady', salary: '₹8L - ₹25L+', brief: 'You thrive in structurally complex, high-pressure environments, wielding language and precedent to enforce multi-million dollar business contracts.' },
  bcom_accounting_finance: { specialization_id: 'bcom_accounting_finance', specialization_name: 'Accounting & Finance', course_id: 'bcom', course_name: 'B.Com', stream: 'commerce', psychometric_traits: ['numerical', 'precise', 'rule_follower', 'disciplined', 'detail_oriented'], career_paths: ['Chartered Accountant', 'Auditor', 'Forensic Audit', 'Tax Consultant'], demand: 'Consistent', salary: '₹7L - ₹18L+', brief: 'You are the quantitative backbone of industry. Your brain demands absolute precision, allowing you to maintain audited truths of global business.' },
  bsc_cs: { specialization_id: 'bsc_cs', specialization_name: 'Computer Science (BSc)', course_id: 'bsc', course_name: 'B.Sc', stream: 'science', psychometric_traits: ['logical', 'tech_curious', 'mathematical', 'problem_solver', 'systematic'], career_paths: ['Software Dev', 'Systems Programmer', 'IT Consultant', 'MCA Candidate'], demand: 'High', salary: '₹4L - ₹12L+', brief: 'You are fundamentally systematic and heavily mathematical, opting for deep theoretical mastery of computing alongside practical coding.' },
  bdes_uiux: { specialization_id: 'bdes_uiux', specialization_name: 'UI/UX Interactive Design', course_id: 'bdes', course_name: 'B.Des', stream: 'independent', psychometric_traits: ['empathetic', 'visual_thinker', 'creative', 'user_centric', 'tech_comfortable'], career_paths: ['UX Researcher', 'Product Designer', 'Interaction Lead', 'Design System Mgr'], demand: 'Very High', salary: '₹7L - ₹20L+', brief: 'You bridge human psychology with technology. You have an extremely high visual-spatial IQ and dictate the mental models of users globally.' },
  bjmc_journalism: { specialization_id: 'bjmc_journalism', specialization_name: 'Journalism / Media', course_id: 'bjmc', course_name: 'BJMC', stream: 'independent', psychometric_traits: ['curious', 'communicative', 'investigative', 'socially_aware', 'storyteller'], career_paths: ['Investigator', 'News Anchor', 'Editor-in-Chief', 'Digital Media Producer'], demand: 'Evolving', salary: '₹4L - ₹12L+', brief: 'You are endlessly curious and fiercely socially aware. You excel at extracting the signal from the noise and broadcasting absolute truth to the world.' },
  mbbs_general: { specialization_id: 'mbbs_general', specialization_name: 'Medicine (MBBS)', course_id: 'mbbs', course_name: 'MBBS', stream: 'science', psychometric_traits: ['empathetic', 'scientific', 'patient', 'decisive_under_pressure', 'service_oriented'], career_paths: ['General Physician', 'Specialist Surgeon', 'Neurologist', 'Medical Researcher'], demand: 'Critical Never-Ending', salary: '₹12L - ₹35L+', brief: 'You have immense academic resilience and a deeply service-oriented soul. You operate flawlessly under extreme biological pressure.' }
};

const COURSE_COLORS: Record<string, string> = {
  btech: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  bca: 'bg-sky-50 text-sky-800 border-sky-200',
  bba: 'bg-amber-50 text-amber-800 border-amber-200',
  llb: 'bg-slate-100 text-slate-800 border-slate-300',
  bcom: 'bg-teal-50 text-teal-800 border-teal-200',
  bsc: 'bg-blue-50 text-blue-800 border-blue-200',
  bdes: 'bg-pink-50 text-pink-800 border-pink-200',
  bjmc: 'bg-orange-50 text-orange-800 border-orange-200',
  mbbs: 'bg-rose-50 text-rose-800 border-rose-200'
};

const SECTION_COLORS: Record<string, string> = {
  interest: 'from-blue-500 to-indigo-600',
  aptitude: 'from-emerald-500 to-teal-600',
  personality: 'from-fuchsia-500 to-rose-500',
  values: 'from-amber-500 to-orange-500'
};

type TraitWeight = { trait: string; weight: number };
type PsychometricOption = { option_id: string; text: string; traits: TraitWeight[] };
type PsychometricQuestion = { question_id: string; question: string; type: string; options: PsychometricOption[]; section_id?: string; section_name?: string; };
type PsychometricSection = { section_id: string; section_name: string; description: string; questions: Omit<PsychometricQuestion, 'section_id' | 'section_name'>[] };
type PsychometricPayload = { metadata: Record<string, unknown>; sections: PsychometricSection[] };

type AnswerMap = Record<string, string>;

type ResultItem = {
  specialization_id: string; specialization_name: string; course_id: string; course_name: string;
  stream: string; psychometric_traits: string[]; career_paths: string[]; score: number; pct: number;
  demand: string; salary: string; brief: string;
};

const psychometricData = psychometricJson as PsychometricPayload;
function shuffle<T>(items: T[]) { return [...items].sort(() => Math.random() - 0.5); }

function createQuizQuestions() {
  return psychometricData.sections.flatMap(section =>
    shuffle(section.questions).slice(0, 5).map(q => ({ ...q, section_id: section.section_id, section_name: section.section_name }))
  );
}

const ALL_QUESTIONS = psychometricData.sections.flatMap(s => s.questions.map(q => ({ ...q, section_id: s.section_id, section_name: s.section_name })));

function computeResults(answers: AnswerMap) {
  const traitScores: Record<string, number> = {};
  Object.entries(answers).forEach(([qId, oId]) => {
    const q = ALL_QUESTIONS.find(x => x.question_id === qId);
    q?.options.find(o => o.option_id === oId)?.traits.forEach(({ trait, weight }) => { traitScores[trait] = (traitScores[trait] || 0) + weight; });
  });

  const scored: ResultItem[] = Object.values(SPEC_MAP).map(spec => ({ ...spec, score: spec.psychometric_traits.reduce((sum, trait) => sum + (traitScores[trait] || 0), 0), pct: 0 }));
  const maxScore = Math.max(...scored.map(i => i.score), 1);
  const scalingFactor = maxScore * 1.15; // Inflate max slightly to avoid 100% match
  
  return scored
    .map(item => ({ 
      ...item, 
      pct: Math.min(97, Math.max(10, Math.round((item.score / scalingFactor) * 100))) 
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

export default function CareerQuiz() {
  const [screen, setScreen] = useState<'welcome' | 'quiz' | 'results'>('welcome');
  const [quizQuestions, setQuizQuestions] = useState<PsychometricQuestion[]>(() => createQuizQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [results, setResults] = useState<ResultItem[] | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const TOTAL_QUESTIONS = quizQuestions.length;

  useEffect(() => { topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, [currentIndex, screen]);

  const currentQuestion = quizQuestions[currentIndex];
  const selectedAnswer = answers[currentQuestion?.question_id ?? ''];
  const progress = Math.round(((Object.keys(answers).length || 0) / TOTAL_QUESTIONS) * 100);

  const handleOptionSelect = (optionId: string) => {
    if (!currentQuestion) return;
    const nextAnswers = { ...answers, [currentQuestion.question_id]: optionId };
    setAnswers(nextAnswers);
    if (currentIndex < TOTAL_QUESTIONS - 1) setTimeout(() => setCurrentIndex(p => p + 1), 350); 
    else setTimeout(() => { setResults(computeResults(nextAnswers)); setScreen('results'); }, 400);
  };

  const handleNext = () => {
    if (!currentQuestion) return;
    if (currentIndex < TOTAL_QUESTIONS - 1) setCurrentIndex(p => p + 1);
    else { setResults(computeResults(answers)); setScreen('results'); }
  };
  const handleBack = () => { if (currentIndex > 0) setCurrentIndex(p => p - 1); };
  const restart = () => { setQuizQuestions(createQuizQuestions()); setAnswers({}); setCurrentIndex(0); setResults(null); setScreen('welcome'); };

  const WELCOME_BLOCKS = [
    { icon: Compass, colorBg: 'bg-gradient-to-br from-blue-50 to-indigo-100', colorBorder: 'border-indigo-200', iconColor: 'text-indigo-600', badge: 'bg-indigo-100 text-indigo-700' },
    { icon: Activity, colorBg: 'bg-gradient-to-br from-emerald-50 to-teal-100', colorBorder: 'border-teal-200', iconColor: 'text-teal-600', badge: 'bg-teal-100 text-teal-700' },
    { icon: BookHeart, colorBg: 'bg-gradient-to-br from-fuchsia-50 to-pink-100', colorBorder: 'border-pink-200', iconColor: 'text-pink-600', badge: 'bg-pink-100 text-pink-700' },
    { icon: Lightbulb, colorBg: 'bg-gradient-to-br from-amber-50 to-orange-100', colorBorder: 'border-orange-200', iconColor: 'text-orange-600', badge: 'bg-orange-100 text-orange-700' },
  ];

  if (screen === 'welcome') {
    return (
      <div className="w-full max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500" ref={topRef}>
        
        {/* COMPACT & AESTHETIC HERO - COLD LIGHT */}
        <div className="rounded-[2rem] bg-gradient-to-br from-white via-[#f0f6ff] to-[#e0e7ff] relative overflow-hidden shadow-xl shadow-blue-900/5 flex flex-col md:flex-row items-center justify-between p-6 md:p-10 gap-8 border border-white shadow-inner">
          
          {/* Abstract Objects Background */}
          {/* Subtle frosted glass rings */}
          <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] border-[2px] border-blue-400/10 rounded-full pointer-events-none" />
          <div className="absolute top-[-10%] right-[-5%] w-[250px] h-[250px] border-[6px] border-cyan-400/5 rounded-full pointer-events-none" />
          
          {/* Diffused cold light blobs */}
          <div className="absolute bottom-[-20%] right-[10%] w-72 h-72 bg-blue-400/10 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute top-0 right-[25%] w-48 h-48 bg-cyan-300/15 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute left-[-10%] bottom-[-10%] w-64 h-64 bg-indigo-300/15 rounded-full blur-[60px] pointer-events-none" />

          {/* Left: Content (Compact) */}
          <div className="relative z-10 flex-1 space-y-4 text-center md:text-left self-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] leading-none">Cognitive Mapping Model</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 leading-tight tracking-tight drop-shadow-sm pb-1">
               Discover Your True <br className="hidden md:block" />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500">Career Trajectory</span>
            </h1>
            
            <p className="text-slate-500 text-[13px] md:text-sm font-medium leading-relaxed max-w-md mx-auto md:mx-0">
               A high-precision 20-question psychometric engine to cleanly align your innate personality with the most lucrative and impactful career pathways.
            </p>

            <div className="pt-2">
               <button
                 onClick={() => setScreen('quiz')}
                 className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-black text-white shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] transition-all"
               >
                  Initiate Assessment <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>

          {/* Right: Study & Career Conceptual Art - Cold Theme */}
          <div className="relative z-10 hidden md:flex w-64 h-64 shrink-0 items-center justify-center">
             <div className="relative w-full h-full flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 blur-2xl rounded-full" />
                
                {/* Cold Light Orbit Rings */}
                <svg viewBox="0 0 200 200" className="absolute w-56 h-56 animate-[spin_40s_linear_infinite]">
                   <circle cx="100" cy="100" r="90" fill="none" stroke="url(#orbitGrad)" strokeWidth="1" strokeDasharray="6 6" />
                   <circle cx="100" cy="100" r="70" fill="none" stroke="url(#orbitGrad)" strokeWidth="2" opacity="0.3" />
                   <defs>
                     <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                       <stop offset="0%" stopColor="#3b82f6" />
                       <stop offset="100%" stopColor="#06b6d4" opacity="0" />
                     </linearGradient>
                   </defs>
                </svg>

                {/* Orbiting Study Elements */}
                <div className="absolute w-full h-full animate-[spin_20s_linear_infinite]">
                   <div className="absolute top-2 left-1/2 -translate-x-1/2 w-9 h-9 bg-white rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.2)] flex items-center justify-center border border-blue-50 animate-[spin_20s_linear_infinite_reverse]">
                      <BookHeart className="w-4 h-4 text-blue-500" />
                   </div>
                   <div className="absolute bottom-8 right-6 w-8 h-8 bg-white rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center border border-cyan-50 animate-[spin_20s_linear_infinite_reverse]">
                      <Lightbulb className="w-4 h-4 text-cyan-500" />
                   </div>
                   <div className="absolute top-16 left-2 w-7 h-7 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center justify-center border border-blue-400 animate-[spin_20s_linear_infinite_reverse]">
                      <Star className="w-3 h-3 text-white fill-white" />
                   </div>
                </div>

                {/* Center pristine Graduation Cap */}
                <div className="relative w-24 h-24 rounded-full border border-white bg-white/80 backdrop-blur-md flex items-center justify-center shadow-[0_0_35px_rgba(59,130,246,0.2)] group-hover:scale-110 transition-transform duration-700">
                   <GraduationCap className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
                </div>
             </div>
          </div>
        </div>

        {/* COMPACTED & MINIMAL METRICS ROW (Removes Scroll Need) */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
          {psychometricData.sections.map((section, idx) => {
            const blockStyle = WELCOME_BLOCKS[idx % WELCOME_BLOCKS.length];
            const Icon = blockStyle.icon;
            return (
              <div key={section.section_id} className="bg-white rounded-[1.25rem] border border-slate-100 p-4 shadow-sm hover:border-slate-200 hover:shadow-md transition-all flex items-center gap-4">
                <div className={`flex shrink-0 items-center justify-center w-12 h-12 rounded-xl ${blockStyle.colorBg} ${blockStyle.iconColor} shadow-inner`}>
                  <Icon strokeWidth={2.5} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800 leading-tight mb-1">{section.section_name}</h3>
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${blockStyle.badge}`}>
                    <Target className="w-2.5 h-2.5" /> 5 Qs
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    );
  }

  if (screen === 'quiz' && currentQuestion) {
    const isLast = currentIndex === TOTAL_QUESTIONS - 1;
    const SectionIcon = currentQuestion.section_id === 'interest' ? Compass :
                        currentQuestion.section_id === 'aptitude' ? Activity :
                        currentQuestion.section_id === 'personality' ? BookHeart : Lightbulb;                        

    return (
      <div className="w-full max-w-3xl mx-auto py-8 px-4 animate-in slide-in-from-right-8 duration-500" ref={topRef}>
        
        {/* Progress Header */}
        <div className="mb-8 px-4">
           <div className="flex items-center justify-between mb-3">
             <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-2xl bg-white shadow-md border border-slate-100 text-[#3B5FCC]`}>
                   <SectionIcon className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Section {Math.floor(currentIndex / 5) + 1} of 4</p>
                   <p className="text-sm font-extrabold text-slate-800">{currentQuestion.section_name}</p>
                </div>
             </div>
             <div className="text-right flex items-end gap-1">
                <p className="text-3xl font-black text-slate-800 tracking-tighter leading-none">{currentIndex + 1}</p>
                <p className="text-slate-400 font-bold mb-0.5">/ {TOTAL_QUESTIONS}</p>
             </div>
           </div>
           
           <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner p-1">
             <div className={`h-full rounded-full bg-gradient-to-r ${SECTION_COLORS[currentQuestion.section_id ?? 'interest']} transition-all duration-700 ease-out`} style={{ width: `${progress}%` }} />
           </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-slate-200 p-8 md:p-12 border border-slate-100">
           
           <div className="mb-10 text-center">
             <h1 className="text-2xl md:text-3xl font-extrabold leading-tight text-slate-900 tracking-tight">
               {currentQuestion.question}
             </h1>
           </div>

           <div className="space-y-4">
             {currentQuestion.options.map((option, idx) => {
               const selected = selectedAnswer === option.option_id;
               const prefixLabel = ['A', 'B', 'C', 'D', 'E', 'F'][idx];
               
               return (
                 <button
                   key={option.option_id}
                   onClick={() => handleOptionSelect(option.option_id)}
                   className={`w-full group text-left transition-all duration-300 outline-none ${selected ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
                 >
                   <div className={`p-5 rounded-2xl flex items-center gap-5 transition-all ${
                     selected 
                     ? 'bg-gradient-to-r from-[#3B5FCC] to-[#5B7FDB] shadow-xl shadow-indigo-200 text-white border-transparent' 
                     : 'bg-white border-2 border-slate-100 hover:border-[#5B7FDB] hover:bg-slate-50 hover:shadow-md'
                   }`}>
                     <div className={`flex shrink-0 h-10 w-10 items-center justify-center rounded-xl font-black text-sm transition-all shadow-sm ${
                       selected ? 'bg-white text-[#3B5FCC]' : 'bg-slate-100 text-slate-500 group-hover:bg-[#ebf0ff] group-hover:text-[#3B5FCC]'
                     }`}>
                       {selected ? <CheckCircle2 className="h-6 w-6" /> : prefixLabel}
                     </div>
                     <div className="flex-1">
                       <p className={`text-base md:text-lg font-bold leading-snug ${selected ? 'text-white' : 'text-slate-700 group-hover:text-slate-900'}`}>{option.text}</p>
                     </div>
                   </div>
                 </button>
               );
             })}
           </div>

           <div className="flex items-center justify-between mt-12 pt-6 border-t border-slate-100">
             <button
               onClick={handleBack}
               disabled={currentIndex === 0}
               className="inline-flex items-center justify-center px-6 py-3 rounded-2xl text-sm font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500"
             >
               <ChevronRight className="h-4 w-4 rotate-180 mr-2" /> Previous
             </button>
             <button
               onClick={handleNext}
               disabled={!selectedAnswer}
               className={`inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-black transition-all shadow-sm ${
                 !selectedAnswer ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-[#5B7FDB] to-[#3B5FCC] text-white hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-0.5'
               }`}
             >
               {isLast ? 'Discover Your Future' : 'Next Question'}
               {!isLast && <ChevronRight className="h-5 w-5" />}
             </button>
           </div>
           
        </div>
      </div>
    );
  }

  /* =========================================
     SCREEN 3: RESULTS (Cold Light, Compact, Points-based UI)
  ========================================= */
  if (screen === 'results' && results) {
    const topResult = results[0];
    return (
      <div className="w-full max-w-4xl mx-auto py-6 px-4 sm:px-6 animate-in slide-in-from-bottom-8 duration-700" ref={topRef}>
        
        {/* COMPACT TOP MATCH - COLD LIGHT STYLE */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-50 via-[#f0f6ff] to-cyan-50/60 border border-blue-100 shadow-xl overflow-hidden mb-6">
           {/* Abstract subtle cold-light accents */}
           <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-cyan-200/20 rounded-full blur-[80px] pointer-events-none" />
           <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-indigo-200/20 rounded-full blur-[60px] pointer-events-none" />

           <div className="relative z-10 flex flex-col md:flex-row items-center p-6 md:p-8 gap-8">
              
              {/* Left Score Ring */}
              <div className="shrink-0 flex flex-col items-center justify-center">
                 <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                    <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-md" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="90" fill="none" stroke="#e0e7ff" strokeWidth="12" />
                      <circle 
                         cx="100" cy="100" r="90" fill="none" stroke="url(#gradientRingCold)" 
                         strokeWidth="12" strokeLinecap="round" 
                         strokeDasharray="565.48" 
                         strokeDashoffset={565.48 - (565.48 * topResult.pct) / 100} 
                         className="transition-all duration-1500 ease-out" 
                      />
                      <defs>
                        <linearGradient id="gradientRingCold" x1="0%" y1="0%" x2="100%" y2="100%">
                           <stop offset="0%" stopColor="#0ea5e9" />
                           <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="text-center relative z-10 flex flex-col items-center">
                      <span className="text-4xl md:text-5xl font-black text-slate-800">{topResult.pct}<span className="text-2xl text-blue-500">%</span></span>
                    </div>
                 </div>
                 <div className="bg-white shadow-sm border border-slate-200 px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-blue-600 tracking-widest">
                   Top Match
                 </div>
              </div>

              {/* Right Content */}
              <div className="flex-1 w-full text-center md:text-left">
                 <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-2 tracking-tight">
                   {topResult.specialization_name}
                 </h2>
                 <p className="text-blue-600 font-bold mb-4 flex justify-center md:justify-start items-center gap-2">
                   <GraduationCap className="w-5 h-5" /> {topResult.course_name}
                 </p>
                 
                 <p className="mb-5 text-sm md:text-[15px] text-slate-600 font-medium leading-relaxed bg-white/40 p-3 rounded-xl border border-white/60">
                   {topResult.brief}
                 </p>

                 {/* Compact Point Information instead of huge cards */}
                 <ul className="space-y-2.5 text-left">
                   <li className="flex items-center gap-4 bg-white/70 p-3 rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0 border border-emerald-100">
                         <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="text-[9px] uppercase font-black tracking-widest text-slate-400">Market Demand</p>
                         <p className="text-sm font-extrabold text-slate-800">{topResult.demand}</p>
                      </div>
                   </li>
                   
                   <li className="flex items-center gap-4 bg-white/70 p-3 rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0 border border-indigo-100">
                         <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="text-[9px] uppercase font-black tracking-widest text-slate-400">Expected Salary Base</p>
                         <p className="text-sm font-extrabold text-slate-800">{topResult.salary}</p>
                      </div>
                   </li>

                   <li className="flex items-center gap-4 bg-white/70 p-3 rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-500 shrink-0 border border-cyan-100">
                         <BrainCircuit className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                         <p className="text-[9px] uppercase font-black tracking-widest text-slate-400 mb-0.5">Primary Alignment Traits</p>
                         <p className="text-xs font-bold text-slate-600 leading-tight flex flex-wrap gap-x-2 gap-y-1">
                           {topResult.psychometric_traits.slice(0, 4).map(t => (
                             <span key={t} className="bg-slate-100/50 text-slate-700 px-1.5 py-0.5 rounded uppercase text-[10px] border border-slate-200">
                               {t.replace(/_/g, ' ')}
                             </span>
                           ))}
                         </p>
                      </div>
                   </li>
                 </ul>
              </div>
           </div>
           
           {/* Direct Action Bottom Bar */}
           <div className="border-t border-blue-100 bg-white p-5 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4">
               <div className="text-center sm:text-left">
                  <p className="text-sm font-extrabold text-slate-800">Clear path generated.</p>
                  <p className="text-[11px] text-slate-500 font-medium">Explore top-tier courses perfectly aligned with this specialization.</p>
               </div>
               <Link
                 href="/course-suggestions"
                 className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] transition-all whitespace-nowrap"
               >
                 View Course Suggestions <ArrowRight className="w-4 h-4" />
               </Link>
           </div>
        </div>

        {/* ALTERNATIVES COMPACT LIST */}
        <div className="mb-6 px-1">
           <h3 className="text-xs font-extrabold text-slate-600 uppercase tracking-widest mb-3 flex items-center gap-2">
             <Activity className="w-4 h-4 text-slate-400" /> Secondary Viable Trajectories
           </h3>
           <div className="grid md:grid-cols-3 gap-3">
             {results.slice(1, 4).map((result, i) => (
                <div key={result.specialization_id} className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-4 group hover:border-blue-300 hover:bg-blue-50/30 transition-colors shadow-sm">
                   <div className="relative w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                      <div className="absolute inset-0 bg-blue-100/50 scale-0 group-hover:scale-100 transition-transform origin-center rounded-full" />
                      <span className="text-sm font-black text-slate-800 relative z-10">{result.pct}%</span>
                   </div>
                   <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-0.5">
                        {result.specialization_name}
                      </h4>
                      <p className="text-[10px] font-semibold text-slate-500">
                        {result.course_name}
                      </p>
                   </div>
                </div>
             ))}
           </div>
        </div>

        {/* BOTTOM UTILITY ROW */}
        <div className="flex justify-center mt-6">
           <button
             onClick={restart}
             className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-slate-200 text-slate-600 text-[11px] uppercase tracking-wider font-bold hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm transition-all"
           >
             <RotateCcw className="w-3.5 h-3.5 text-slate-400" /> Re-execute Assessment
           </button>
        </div>

      </div>
    );
  }

  return null;
}
