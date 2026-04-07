'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Activity, ArrowRight, BrainCircuit, BookHeart, CheckCircle2, ChevronRight, Compass, Sparkles } from 'lucide-react';
import psychometricJson from '@/psychometric.json';

const SPEC_MAP = {
  btech_cse: {
    specialization_id: 'btech_cse',
    specialization_name: 'Computer Science Engineering (CSE)',
    course_id: 'btech',
    course_name: 'B.Tech / B.E.',
    stream: 'science',
    psychometric_traits: ['logical', 'analytical', 'problem_solver', 'tech_curious', 'detail_oriented'],
    career_paths: ['Software Engineer', 'Backend Developer', 'System Architect', 'Researcher']
  },
  btech_it: {
    specialization_id: 'btech_it',
    specialization_name: 'Information Technology (IT)',
    course_id: 'btech',
    course_name: 'B.Tech / B.E.',
    stream: 'science',
    psychometric_traits: ['tech_curious', 'systems_thinker', 'organized', 'practical', 'collaborative'],
    career_paths: ['IT Consultant', 'Network Engineer', 'IT Manager', 'DevOps Engineer']
  },
  btech_aiml: {
    specialization_id: 'btech_aiml',
    specialization_name: 'Artificial Intelligence & Machine Learning (AI/ML)',
    course_id: 'btech',
    course_name: 'B.Tech / B.E.',
    stream: 'science',
    psychometric_traits: ['curious', 'mathematical', 'research_oriented', 'innovative', 'data_driven'],
    career_paths: ['ML Engineer', 'Data Scientist', 'AI Researcher', 'NLP Engineer', 'Computer Vision Engineer']
  },
  btech_ds: {
    specialization_id: 'btech_ds',
    specialization_name: 'Data Science',
    course_id: 'btech',
    course_name: 'B.Tech / B.E.',
    stream: 'science',
    psychometric_traits: ['analytical', 'mathematical', 'data_driven', 'curious', 'statistical_thinking'],
    career_paths: ['Data Analyst', 'Data Engineer', 'Business Intelligence Analyst', 'Quantitative Analyst']
  },
  btech_mech: {
    specialization_id: 'btech_mech',
    specialization_name: 'Mechanical Engineering',
    course_id: 'btech',
    course_name: 'B.Tech / B.E.',
    stream: 'science',
    psychometric_traits: ['hands_on', 'mechanical_aptitude', 'design_thinking', 'practical', 'problem_solver'],
    career_paths: ['Mechanical Engineer', 'Design Engineer', 'Manufacturing Engineer', 'Automotive Engineer', 'ISRO/DRDO']
  },
  btech_civil: {
    specialization_id: 'btech_civil',
    specialization_name: 'Civil Engineering',
    course_id: 'btech',
    course_name: 'B.Tech / B.E.',
    stream: 'science',
    psychometric_traits: ['structured_thinker', 'spatial_reasoning', 'patient', 'detail_oriented', 'outdoor_oriented'],
    career_paths: ['Civil Engineer', 'Structural Engineer', 'Urban Planner', 'Project Manager (Infra)', 'Govt PSU Engineer']
  },
  btech_ece: {
    specialization_id: 'btech_ece',
    specialization_name: 'Electronics & Communication Engineering (ECE)',
    course_id: 'btech',
    course_name: 'B.Tech / B.E.',
    stream: 'science',
    psychometric_traits: ['technical', 'electronics_curious', 'systematic', 'analytical', 'hardware_oriented'],
    career_paths: ['Embedded Systems Engineer', 'VLSI Designer', 'Telecom Engineer', 'IoT Developer', 'R&D Engineer']
  },
  btech_electrical: {
    specialization_id: 'btech_electrical',
    specialization_name: 'Electrical Engineering',
    course_id: 'btech',
    course_name: 'B.Tech / B.E.',
    stream: 'science',
    psychometric_traits: ['systematic', 'technical', 'math_oriented', 'problem_solver', 'precision_focused'],
    career_paths: ['Electrical Engineer', 'Power Systems Engineer', 'Control Systems Engineer', 'PSU (BHEL/NTPC/ONGC)']
  },
  bca_softdev: {
    specialization_id: 'bca_softdev',
    specialization_name: 'Software Development',
    course_id: 'bca',
    course_name: 'BCA',
    stream: 'science',
    psychometric_traits: ['logical', 'coding_enthusiast', 'problem_solver', 'creative', 'detail_oriented'],
    career_paths: ['Software Developer', 'Full Stack Developer', 'Backend Engineer', 'DevOps Engineer']
  },
  bca_webdev: {
    specialization_id: 'bca_webdev',
    specialization_name: 'Web Development',
    course_id: 'bca',
    course_name: 'BCA',
    stream: 'science',
    psychometric_traits: ['creative', 'visual_thinker', 'tech_savvy', 'user_empathy', 'fast_learner'],
    career_paths: ['Frontend Developer', 'Full Stack Developer', 'UI Engineer', 'Web Designer']
  },
  bca_aiml: {
    specialization_id: 'bca_aiml',
    specialization_name: 'AI & Machine Learning',
    course_id: 'bca',
    course_name: 'BCA',
    stream: 'science',
    psychometric_traits: ['data_driven', 'mathematical', 'curious', 'innovative', 'research_oriented'],
    career_paths: ['Junior ML Engineer', 'Data Analyst', 'AI Product Associate', 'Research Assistant']
  },
  bba_marketing: {
    specialization_id: 'bba_marketing',
    specialization_name: 'Marketing',
    course_id: 'bba',
    course_name: 'BBA',
    stream: 'commerce',
    psychometric_traits: ['extroverted', 'persuasive', 'creative', 'social', 'trend_aware'],
    career_paths: ['Marketing Manager', 'Brand Manager', 'Digital Marketer', 'Sales Manager', 'Product Manager']
  },
  bba_finance: {
    specialization_id: 'bba_finance',
    specialization_name: 'Finance',
    course_id: 'bba',
    course_name: 'BBA',
    stream: 'commerce',
    psychometric_traits: ['analytical', 'numerical', 'risk_aware', 'disciplined', 'strategic_thinker'],
    career_paths: ['Financial Analyst', 'Investment Banker', 'CA (after additional exams)', 'CFO Track', 'Equity Researcher']
  },
  llb_corporate: {
    specialization_id: 'llb_corporate',
    specialization_name: 'Corporate Law',
    course_id: 'llb',
    course_name: 'LLB / BA LLB',
    stream: 'independent',
    psychometric_traits: ['analytical', 'persuasive', 'detail_oriented', 'business_minded', 'strategic'],
    career_paths: ['Corporate Lawyer', 'In-house Counsel', 'Mergers & Acquisitions', 'Compliance Officer']
  },
  bcom_accounting_finance: {
    specialization_id: 'bcom_accounting_finance',
    specialization_name: 'Accounting & Finance',
    course_id: 'bcom',
    course_name: 'B.Com',
    stream: 'commerce',
    psychometric_traits: ['numerical', 'precise', 'rule_follower', 'disciplined', 'detail_oriented'],
    career_paths: ['Chartered Accountant (CA)', 'Financial Accountant', 'Auditor', 'Tax Consultant', 'CFO Track']
  },
  bsc_cs: {
    specialization_id: 'bsc_cs',
    specialization_name: 'Computer Science',
    course_id: 'bsc',
    course_name: 'B.Sc',
    stream: 'science',
    psychometric_traits: ['logical', 'tech_curious', 'mathematical', 'problem_solver', 'systematic'],
    career_paths: ['Software Developer', 'Data Analyst', 'Systems Programmer', 'MCA/MTech candidate']
  },
  bdes_uiux: {
    specialization_id: 'bdes_uiux',
    specialization_name: 'UI/UX Design',
    course_id: 'bdes',
    course_name: 'B.Des',
    stream: 'independent',
    psychometric_traits: ['empathetic', 'visual_thinker', 'creative', 'user_centric', 'tech_comfortable'],
    career_paths: ['UX Designer', 'Product Designer', 'UI Engineer', 'Interaction Designer']
  },
  bjmc_journalism: {
    specialization_id: 'bjmc_journalism',
    specialization_name: 'Journalism (Print/TV)',
    course_id: 'bjmc',
    course_name: 'BJMC',
    stream: 'independent',
    psychometric_traits: ['curious', 'communicative', 'investigative', 'socially_aware', 'storyteller'],
    career_paths: ['Print Journalist', 'TV Reporter', 'News Anchor', 'Investigative Reporter', 'Editor']
  },
  mbbs_general: {
    specialization_id: 'mbbs_general',
    specialization_name: 'General Medicine (MBBS)',
    course_id: 'mbbs',
    course_name: 'MBBS',
    stream: 'science',
    psychometric_traits: ['empathetic', 'scientific', 'patient', 'decisive_under_pressure', 'service_oriented'],
    career_paths: ['General Physician', 'Specialist (via MD/MS)', 'Surgeon', 'Researcher', 'Medical Officer']
  }
};

const COURSE_COLORS: Record<string, string> = {
  btech: 'bg-indigo-100 text-indigo-800',
  bca: 'bg-sky-100 text-sky-800',
  bba: 'bg-amber-100 text-amber-800',
  llb: 'bg-rose-100 text-rose-800',
  bcom: 'bg-violet-100 text-violet-800',
  bsc: 'bg-emerald-100 text-emerald-800',
  bdes: 'bg-pink-100 text-pink-800',
  bjmc: 'bg-stone-100 text-stone-800',
  mbbs: 'bg-red-100 text-red-800'
};

const SECTION_COLORS: Record<string, string> = {
  interest: 'from-indigo-500 to-purple-500',
  aptitude: 'from-sky-500 to-cyan-500',
  personality: 'from-violet-500 to-fuchsia-500',
  values: 'from-amber-500 to-orange-500'
};

type TraitWeight = { trait: string; weight: number };
type PsychometricOption = { option_id: string; text: string; traits: TraitWeight[] };
type PsychometricQuestion = {
  question_id: string;
  question: string;
  type: string;
  options: PsychometricOption[];
  section_id?: string;
  section_name?: string;
  section_icon?: string;
};
type PsychometricSection = { section_id: string; section_name: string; description: string; icon: string; questions: Omit<PsychometricQuestion, 'section_id' | 'section_name' | 'section_icon'>[] };
type PsychometricPayload = { metadata: Record<string, unknown>; sections: PsychometricSection[] };

type AnswerMap = Record<string, string>;

type ResultItem = {
  specialization_id: string;
  specialization_name: string;
  course_id: string;
  course_name: string;
  stream: string;
  psychometric_traits: string[];
  career_paths: string[];
  score: number;
  pct: number;
};

const psychometricData = psychometricJson as PsychometricPayload;

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function createQuizQuestions() {
  return psychometricData.sections.flatMap(section =>
    shuffle(section.questions)
      .slice(0, 5)
      .map(question => ({
        ...question,
        section_id: section.section_id,
        section_name: section.section_name,
        section_icon: section.icon
      }))
  );
}

const ALL_QUESTIONS = psychometricData.sections.flatMap(section =>
  section.questions.map(question => ({
    ...question,
    section_id: section.section_id,
    section_name: section.section_name,
    section_icon: section.icon
  }))
);

function computeResults(answers: AnswerMap) {
  const traitScores: Record<string, number> = {};

  Object.entries(answers).forEach(([questionId, optionId]) => {
    const question = ALL_QUESTIONS.find(q => q.question_id === questionId);
    const option = question?.options.find(opt => opt.option_id === optionId);
    option?.traits.forEach(({ trait, weight }) => {
      traitScores[trait] = (traitScores[trait] || 0) + weight;
    });
  });

  const scored: ResultItem[] = Object.values(SPEC_MAP).map(spec => {
    const score = spec.psychometric_traits.reduce((sum, trait) => sum + (traitScores[trait] || 0), 0);
    return { ...spec, score, pct: 0 };
  });

  const maxScore = Math.max(...scored.map(item => item.score), 1);
  return scored
    .map(item => ({ ...item, pct: Math.round((item.score / maxScore) * 100) }))
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

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentIndex, screen]);

  const currentQuestion = quizQuestions[currentIndex];
  const selectedAnswer = answers[currentQuestion?.question_id ?? ''];
  const progress = Math.round(((Object.keys(answers).length || 0) / TOTAL_QUESTIONS) * 100);

  const handleOptionSelect = (optionId: string) => {
    if (!currentQuestion) return;
    const nextAnswers = { ...answers, [currentQuestion.question_id]: optionId };
    setAnswers(nextAnswers);

    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setResults(computeResults(nextAnswers));
      setScreen('results');
    }
  };

  const handleNext = () => {
    if (!currentQuestion) return;
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setResults(computeResults(answers));
      setScreen('results');
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const restart = () => {
    setQuizQuestions(createQuizQuestions());
    setAnswers({});
    setCurrentIndex(0);
    setResults(null);
    setScreen('welcome');
  };

  if (screen === 'welcome') {
    return (
      <div className="w-full max-w-3xl mx-auto py-10 px-4" ref={topRef}>
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-slate-200 p-8 shadow-lg">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Career Psychometric Test</p>
              <h1 className="mt-4 text-3xl font-extrabold text-slate-900">Find the best career specializations for you</h1>
              <p className="mt-3 text-slate-600 max-w-2xl leading-7">
                Answer 20 thoughtful questions — five selected from each section — then get personalized specialization recommendations with career paths and streams that match your profile.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {psychometricData.sections.map(section => (
                <div key={section.section_id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-3 text-slate-900 font-semibold">
                    <span className="text-2xl">{section.icon}</span>
                    <span>{section.section_name}</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600 leading-6">{section.description}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">5 questions selected</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setScreen('quiz')}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-500 transition-all"
            >
              Start the test <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'results' && results) {
    const topResult = results[0];
    return (
      <div className="w-full max-w-4xl mx-auto py-10 px-4" ref={topRef}>
        <div className="space-y-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-xl shadow-slate-200/50">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Your strongest match</p>
                <h1 className="mt-3 text-3xl font-extrabold text-slate-900">{topResult.specialization_name}</h1>
                <p className="mt-3 text-slate-600">{topResult.course_name} — {topResult.stream.charAt(0).toUpperCase() + topResult.stream.slice(1)}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-center">
                <p className="text-sm text-slate-500">Confidence</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{topResult.pct}%</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-100 p-5">
                <p className="text-sm font-semibold text-slate-700">Recommended careers</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {topResult.career_paths.slice(0, 4).map(path => (
                    <li key={path}>• {path}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-slate-100 p-5">
                <p className="text-sm font-semibold text-slate-700">Matched traits</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {topResult.psychometric_traits.map(trait => (
                    <span key={trait} className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                      {trait.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {results.map(result => (
              <div key={result.specialization_id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{result.specialization_name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{result.course_name}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${COURSE_COLORS[result.course_id] || 'bg-slate-100 text-slate-800'}`}>
                    {result.pct}%
                  </span>
                </div>
                <p className="mt-4 text-sm text-slate-600">Top careers: {result.career_paths.slice(0, 3).join(', ')}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={restart}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              Retake test
            </button>
            <Link
              href="/college-directory"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200/30 hover:bg-indigo-500 transition"
            >
              Explore colleges <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto py-10 px-4" ref={topRef}>
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-slate-200 p-8 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-200/40">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Question {currentIndex + 1} / {TOTAL_QUESTIONS}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{currentQuestion.section_icon} {currentQuestion.section_name}</p>
                <h1 className="mt-2 text-2xl font-semibold text-slate-900">{currentQuestion.question}</h1>
              </div>
            </div>
            <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
              Progress: <span className="font-semibold">{progress}%</span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className={`h-full rounded-full bg-gradient-to-r ${SECTION_COLORS[currentQuestion.section_id ?? 'interest']}`} style={{ width: `${progress}%` }} />
            </div>

            <div className="space-y-4">
              {currentQuestion.options.map(option => {
                const selected = selectedAnswer === option.option_id;
                return (
                  <button
                    key={option.option_id}
                    onClick={() => handleOptionSelect(option.option_id)}
                    className={`w-full rounded-3xl border p-5 text-left transition-all ${selected ? 'border-indigo-300 bg-indigo-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 flex h-10 w-10 items-center justify-center rounded-2xl ${selected ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        {selected ? <CheckCircle2 className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{option.text}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200/30 transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              {currentIndex === TOTAL_QUESTIONS - 1 ? 'See results' : 'Next question'}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
