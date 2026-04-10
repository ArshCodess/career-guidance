'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CircleCheck as CheckCircle2,
  Circle,
  FlaskConical,
  Palette,
  TrendingUp,
  RefreshCw,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Star,
  Zap,
  BookOpen,
  Scale,
  Briefcase,
  Laptop,
  Lightbulb,
  HeartPulse,
  TerminalSquare,
  Microscope,
  Stethoscope
} from 'lucide-react';

/* ─── Design tokens ─────────────────────────────────────── */
const GRAD = {
  science: 'linear-gradient(135deg, #1E1B4B 0%, #3730A3 35%, #4F46E5 70%, #8B5CF6 100%)',
  arts: 'linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%)',
  commerce: 'linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)',
  engineering: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
  law: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
  page: 'linear-gradient(135deg, #ff6b9d 0%, #ff8c42 40%, #ff6b6b 70%, #c95cf4 100%)',
  quiz: 'linear-gradient(135deg, #667eea 0%, #764ba2 60%, #f5576c 100%)',
};

/* ─── Data ─────────────────────────────────────────────── */
const QUESTIONS = [
  {
    question: 'Which subjects do you enjoy the most?',
    options: ['Science & Mathematics', 'Languages & Literature', 'Business & Economics', 'Arts & Design']
  },
  {
    question: 'What type of career appeals to you?',
    options: ['Technology & Innovation', 'Creative & Artistic', 'Business & Management', 'Research & Analysis']
  },
  {
    question: 'How do you prefer to work?',
    options: ['Independently', 'In teams', 'Mix of both', 'Leading others']
  },
  {
    question: 'What motivates you the most?',
    options: ['Solving problems', 'Helping others', 'Creating new things', 'Achieving goals']
  },
];
const STREAMS = [
  {
    id: 'science', label: 'Science', icon: FlaskConical,
    gradient: GRAD.science, students: '12.4k',
    courses: [
      { name: 'B.Sc.', sub: 'Computer Science' },
      { name: 'B.Pharma', sub: 'Pharmacy' },
      { name: 'BCA', sub: 'Computer Applications' },
      { name: 'B.Nursing', sub: 'Nursing Science' },
    ],
  },
  {
    id: 'arts', label: 'Arts', icon: Palette,
    gradient: GRAD.arts, students: '8.7k',
    courses: [
      { name: 'B.A.', sub: 'Bachelor of Arts' },
      { name: 'BFA', sub: 'Bachelor of Fine Arts' },
      { name: 'BHM', sub: 'Bachelor of Hotel Management' },
      { name: 'B.Des', sub: 'Bachelor of Design' },
    ],
  },
  {
    id: 'commerce', label: 'Commerce', icon: TrendingUp,
    gradient: GRAD.commerce, students: '10.2k',
    courses: [
      { name: 'B.Com', sub: 'Bachelor of Commerce' },
      { name: 'BBA', sub: 'Business Administration' },
      { name: 'CA/CS', sub: 'Chartered Accountant' },
      { name: 'BMS', sub: 'Management Studies' },
    ],
  }
];

const EXTRA_STREAMS = [
  {
    id: 'engineering', label: 'Engineering', icon: Sparkles,
    gradient: GRAD.engineering, students: '42.1k',
    courses: [
      { name: 'B.Tech', sub: 'Computer Science' },
      { name: 'B.E.', sub: 'Civil' },
    ],
  },
  {
    id: 'law', label: 'Law', icon: Scale,
    gradient: GRAD.law, students: '5.2k',
    courses: [
      { name: 'BA LLB', sub: 'Integrated Law' },
      { name: 'BBA LLB', sub: 'Corporate Law' },
    ],
  }
];

const RESULT_COURSES = [
  { name: 'B.Sc. Computer Science', match: Math.floor(Math.random() * 16) + 80, description: 'Perfect for problem solvers passionate about technology and logic.', careers: ['Software Developer', 'Data Scientist', 'AI Engineer'], color: '#4F46E5', slug: 'software-developer' },
  { name: 'B.Tech Information Technology', match: Math.floor(Math.random() * 16) + 80, description: 'Ideal for those who love building software systems and networks.', careers: ['Web Developer', 'System Analyst', 'Network Engineer'], color: '#0f2027', slug: 'network-engineer' },
  { name: 'B.Sc. Mathematics', match: Math.floor(Math.random() * 16) + 80, description: 'Great for analytical thinkers who thrive with numbers and logic.', careers: ['Data Analyst', 'Statistician', 'Actuarial Scientist'], color: '#ff6b9d', slug: 'data-scientist' },
];

const ALL_PATHS = [
  { degree: 'B.Sc. Computer Science', slug: 'software-developer', roles: ['Software Developer', 'Data Scientist'], grad: GRAD.science, icon: TerminalSquare },
  { degree: 'B.Com Accounting', slug: 'financial-analyst', roles: ['Accountant', 'Financial Analyst'], grad: GRAD.commerce, icon: TrendingUp },
  { degree: 'B.A. Psychology', slug: 'counsellor', roles: ['Counsellor', 'HR Manager'], grad: GRAD.arts, icon: Lightbulb },
  { degree: 'B.Tech Mechanical', slug: 'mechanical-engineer', roles: ['Mechanical Engineer', 'Robotics Engineer'], grad: GRAD.engineering, icon: Zap },
  { degree: 'B.Sc. Nursing', slug: 'medical-professional', roles: ['Medical Professional', 'Clinical Specialist'], grad: GRAD.science, icon: Stethoscope },
  { degree: 'BFA Design', slug: 'ui-ux-designer', roles: ['UI/UX Designer', 'Art Director'], grad: GRAD.arts, icon: Laptop },
  { degree: 'B.Sc. Biology', slug: 'lab-technician', roles: ['Lab Technician', 'Research Scientist'], grad: GRAD.science, icon: Microscope },
];

const TABS = ['Suggested Streams', 'Compare Streams', 'All Streams'];

/* ─── Shared glass card style ─── */
const glassWhite: React.CSSProperties = {
  background: 'rgba(255,255,255,0.92)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.6)',
};

/* ─── Stream Card ─────────────────────────────────────── */
function StreamCard({ stream }: { stream: typeof STREAMS[0] }) {
  const Icon = stream.icon;
  return (
    <div
      className="rounded-3xl overflow-hidden flex flex-col hover:scale-[1.02] transition-transform duration-300 relative group"
      style={{ background: stream.gradient, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
    >
      <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-inner" style={{ background: 'rgba(255,255,255,0.25)' }}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight drop-shadow-sm">{stream.label}</span>
        </div>
        <span className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-sm" style={{ background: 'rgba(255,255,255,0.25)', color: 'white' }}>
          {stream.students}
        </span>
      </div>
      <div className="mx-5 mb-3" style={{ height: '1px', background: 'rgba(255,255,255,0.2)' }} />
      <div className="flex-1 px-5 pb-2 space-y-3">
        {stream.courses.map((c, i) => (
          <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl border border-white/5 transition-all hover:bg-white/20" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0 opacity-80 shadow-[0_0_8px_white]" />
            <div>
              <p className="text-white font-bold text-[13px] leading-tight drop-shadow-sm">{c.name}</p>
              <p className="text-white/80 font-medium text-[11px] mt-0.5 tracking-wide">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-5 mt-auto">
        <Link
          href={`/stream/${stream.id.toLowerCase()}`}
          className="w-full py-3.5 rounded-2xl font-bold text-[14px] flex items-center justify-center gap-2 transition-all hover:bg-white/40 active:scale-95 shadow-lg group-hover:shadow-xl"
          style={{ background: 'rgba(255,255,255,0.25)', color: 'white', border: '1px solid rgba(255,255,255,0.4)' }}
        >
          View Detailed Page <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

/* ─── Result Card ─────────────────────────────────────── */
function ResultCard({ course, rank }: { course: typeof RESULT_COURSES[0]; rank: number }) {
  return (
    <div
      className="rounded-2xl p-5 hover:scale-[1.01] transition-all duration-300 relative overflow-hidden"
      style={{ ...glassWhite, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
    >
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10" style={{ background: course.color }} />
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 relative z-10 w-full">
        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {rank === 0 && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold text-white shadow-sm" style={{ background: 'linear-gradient(135deg,#ff6b9d,#ff8c42)' }}>
                <Star className="w-3 h-3" /> Top Pick
              </span>
            )}
            <h3 className="text-[17px] font-black text-slate-800">{course.name}</h3>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold text-white shadow-sm" style={{ background: course.color }}>
              {course.match}% Match
            </span>
          </div>
          <p className="text-sm text-slate-500 mb-3 font-medium">{course.description}</p>
          <div className="h-2.5 rounded-full bg-slate-100 mb-4 overflow-hidden border border-slate-200 shadow-inner">
            <div className="h-full rounded-full" style={{ width: `${course.match}%`, background: `linear-gradient(90deg, ${course.color}, ${course.color}aa)` }} />
          </div>
          <div className="flex flex-wrap gap-2">
            {course.careers.map((c, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-xs font-bold border" style={{ background: course.color + '10', color: course.color, borderColor: course.color + '30' }}>
                {c}
              </span>
            ))}
          </div>
        </div>
        <Link
          href={`/career/${course.slug}`}
          className="flex-shrink-0 w-full md:w-auto text-center px-6 py-3 rounded-xl text-white text-sm font-bold transition-all hover:scale-105 active:scale-95 mt-2 md:mt-0 shadow-lg"
          style={{ background: course.color, boxShadow: `0 8px 24px ${course.color}55` }}
        >
          Explore Career
        </Link>
      </div>
    </div>
  );
}

/* ─── Quiz View ─────────────────────────────────────────── */
function QuizView({ onClose, onComplete }: { onClose: () => void; onComplete: () => void }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (opt: string) => {
    const next = { ...answers, [current]: opt };
    setAnswers(next);
    if (current < QUESTIONS.length - 1) {
      setCurrent(q => q + 1);
    } else {
      onComplete();
    }
  };

  const progress = ((current + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-[500px] rounded-3xl overflow-hidden relative" style={{ background: GRAD.quiz, boxShadow: '0 30px 80px rgba(102,126,234,0.4)' }}>
      <div className="absolute top-[-60px] right-[-60px] w-48 h-48 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.4)' }} />
      <div className="absolute bottom-[-40px] left-[-40px] w-32 h-32 rounded-full opacity-10" style={{ background: 'rgba(255,255,255,0.6)' }} />
      <div className="relative z-10 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/70 text-sm font-medium">Question {current + 1} of {QUESTIONS.length}</p>
            <h2 className="text-white font-bold text-xl mt-1">{QUESTIONS[current].question}</h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.15)' }}>
            ✕
          </button>
        </div>
        <div className="h-1.5 rounded-full mb-8 overflow-hidden bg-black/10">
          <div className="h-full rounded-full bg-white transition-all duration-500 shadow-[0_0_10px_white]" style={{ width: `${progress}%` }} />
        </div>
        <div className="space-y-3">
          {QUESTIONS[current].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-200 group hover:scale-[1.01]"
              style={{ background: answers[current] === opt ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              {answers[current] === opt
                ? <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                : <Circle className="w-5 h-5 text-white/50 group-hover:text-white flex-shrink-0" />
              }
              <span className="text-white font-semibold">{opt}</span>
            </button>
          ))}
        </div>
        {current > 0 && (
          <button onClick={() => setCurrent(q => q - 1)} className="mt-6 px-5 py-2.5 rounded-xl text-white/80 text-sm font-bold hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.1)' }}>
            ← Previous
          </button>
        )}
      </div>
    </div>
  );
}

export default function CourseSuggestionsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [streamsData, setStreamsData] = useState(STREAMS);
  const [randomPaths, setRandomPaths] = useState(ALL_PATHS.slice(0,3));
  const [isMounted, setIsMounted] = useState(false);

  // Dynamic shuffling of career paths upon mount!
  useEffect(() => {
    setIsMounted(true);
    let shuffled = [...ALL_PATHS].sort(() => 0.5 - Math.random());
    setRandomPaths(shuffled.slice(0, 3));
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/course-suggestions');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const updatedStreams = STREAMS.map((stream) => ({
          ...stream,
          courses: data[stream.id]?.map((course: any) => ({
            name: course.id.toUpperCase(),
            sub: course.name
          })) || stream.courses
        }));
        setStreamsData(updatedStreams);
      } catch (error) {
        console.error("Error updating course UI:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);
  
  if (showQuiz) {
    return (
      <div className="space-y-5">
        <QuizView
          onClose={() => setShowQuiz(false)}
          onComplete={() => { setShowResults(true); setShowQuiz(false); }}
        />
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="space-y-5 animate-in fade-in zoom-in-95 duration-500">
        <div className="rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden" style={{ background: GRAD.page, boxShadow: '0 20px 60px rgba(255,107,157,0.35)' }}>
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3 bg-white/10 w-max px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="text-white text-[11px] font-black uppercase tracking-widest">Your Results</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-2 drop-shadow-md">Personalized<br />Recommendations</h1>
              <p className="text-white/90 text-[15px] font-medium">Matched algorithmically to your aptitude quiz responses.</p>
            </div>
            <button
              onClick={() => setShowResults(false)}
              className="flex items-center gap-1.5 px-6 py-3.5 rounded-2xl text-white text-sm font-bold flex-shrink-0 transition-all hover:scale-105 active:scale-95 shadow-xl"
              style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}
            >
              <RefreshCw className="w-4 h-4" /> Re-evaluate Aptitude
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {RESULT_COURSES.map((c, i) => <ResultCard key={i} course={c} rank={i} />)}
        </div>
        <Link
          href="/college-directory?from=course-suggestions"
          className="w-full py-5 rounded-[2rem] font-black text-white text-lg flex items-center justify-center gap-3 hover:scale-[1.01] transition-transform active:scale-95"
          style={{ background: GRAD.page, boxShadow: '0 10px 40px rgba(255,107,157,0.4)' }}
        >
          Find Colleges Offering These Courses <ArrowRight className="w-6 h-6" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Hero header */}
      <div className="rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-[0_20px_60px_rgba(255,107,157,0.3)]" style={{ background: GRAD.page }}>
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-20 blur-2xl" style={{ background: 'rgba(255,255,255,0.8)' }} />
        <div className="absolute bottom-0 left-[20%] w-40 h-40 rounded-full opacity-10 blur-xl" style={{ background: 'rgba(255,255,255,0.6)' }} />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4 bg-white/20 w-max px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
              <Zap className="w-4 h-4 text-amber-300" />
              <span className="text-white text-[11px] font-black uppercase tracking-widest drop-shadow-sm">AI-Powered System</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1] mb-4 tracking-tight drop-shadow-sm">Career Suggestions</h1>
            <p className="text-white/90 text-sm md:text-base leading-relaxed font-medium">
              Based on your aptitude quiz results, we suggest streams and degrees that heavily align with your interests and core strengths.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link
                href="/college-directory?from=course-suggestions"
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-[14px] transition-all hover:scale-105 active:scale-95 shadow-xl"
                style={{ background: 'white', color: '#ff6b9d' }}
              >
                <BookOpen className="w-4 h-4" /> View College Directory
              </Link>
              <div
                className="flex items-center gap-2 px-5 py-3 rounded-2xl backdrop-blur-md shadow-sm"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <Star className="w-4 h-4 text-yellow-300" />
                <span className="text-white text-sm font-bold">3.8k students matched today</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex w-48 h-48 opacity-90 items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-[bounce_4s_ease-in-out_infinite] drop-shadow-2xl">
              <circle cx="50" cy="50" r="40" fill="white" opacity="0.1" />
              <path d="M50 20 L80 40 L50 60 L20 40 Z" fill="white" opacity="0.3" />
              <path d="M20 55 L50 75 L80 55" stroke="white" strokeWidth="4" fill="none" opacity="0.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Tabs + filter */}
      <div className="flex flex-wrap items-center justify-center">
        <div className="flex gap-2 p-1.5 rounded-[1.25rem] justify-between shadow-sm bg-white border border-slate-200">
          {TABS.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className="px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-300"
              style={activeTab === i
                ? { background: GRAD.page, color: 'white', boxShadow: '0 8px 24px rgba(255,107,157,0.3)', transform: 'translateY(-2px)' }
                : { color: '#64748b' }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Tab Rendering area */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
        {/* TAB 0 - Suggested Streams (Existing View) */}
        {activeTab === 0 && (
          isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-3xl overflow-hidden shadow-sm" style={{ background: 'white' }}>
                  <div className="p-6 space-y-4">
                    <div className="h-8 w-1/2 rounded bg-slate-200 animate-pulse" />
                    <div className="space-y-3 pt-4">
                      {[1, 2, 3, 4].map(j => (
                        <div key={j} className="h-16 rounded-xl bg-slate-100 animate-pulse" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {streamsData.map(s => <StreamCard key={s.id} stream={s} />)}
            </div>
          )
        )}
        
        {/* TAB 1 - Compare Streams UI */}
        {activeTab === 1 && (
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
               <div className="text-center mb-8">
                 <h2 className="text-2xl font-black text-slate-800">Side-by-Side Comparison</h2>
                 <p className="text-slate-500 font-medium mt-1">Review average ROIs and opportunities across the main branches.</p>
               </div>
               <div className="overflow-x-auto pb-4">
                 <table className="w-full text-left border-collapse min-w-[600px]">
                   <thead>
                     <tr>
                       <th className="p-4 border-b-2 border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-xs">Metric</th>
                       <th className="p-4 border-b-2 border-slate-100 text-[#667eea] font-black text-lg">Science</th>
                       <th className="p-4 border-b-2 border-slate-100 text-[#f5576c] font-black text-lg">Arts</th>
                       <th className="p-4 border-b-2 border-slate-100 text-[#ffa726] font-black text-lg">Commerce</th>
                     </tr>
                   </thead>
                   <tbody className="text-sm font-medium text-slate-600">
                     <tr className="hover:bg-slate-50 transition-colors">
                       <td className="p-4 border-b border-slate-100 font-bold text-slate-800">Median Salary (LPA)</td>
                       <td className="p-4 border-b border-slate-100">₹6.5L - ₹9L</td>
                       <td className="p-4 border-b border-slate-100">₹4L - ₹6L</td>
                       <td className="p-4 border-b border-slate-100">₹5L - ₹7.5L</td>
                     </tr>
                     <tr className="hover:bg-slate-50 transition-colors">
                       <td className="p-4 border-b border-slate-100 font-bold text-slate-800">Top Employers</td>
                       <td className="p-4 border-b border-slate-100">TCS, Infosys, Amazon</td>
                       <td className="p-4 border-b border-slate-100">Ogilvy, Publishing Houses</td>
                       <td className="p-4 border-b border-slate-100">Deloitte, KPMG, Banks</td>
                     </tr>
                     <tr className="hover:bg-slate-50 transition-colors">
                       <td className="p-4 border-b border-slate-100 font-bold text-slate-800">Key Skills</td>
                       <td className="p-4 border-b border-slate-100">Logic, Coding, Research</td>
                       <td className="p-4 border-b border-slate-100">Creativity, Writing, Design</td>
                       <td className="p-4 border-b border-slate-100">Finance, Math, Leadership</td>
                     </tr>
                   </tbody>
                 </table>
               </div>
            </div>
        )}

        {/* TAB 2 - All Streams Overview */}
        {activeTab === 2 && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[...STREAMS, ...EXTRA_STREAMS].map(s => <StreamCard key={s.id} stream={s as any} />)}
             </div>
        )}

      </div>

      {/* Explore Career Paths */}
      <div className="rounded-[2.5rem] p-8 border border-white/60 bg-white shadow-xl shadow-slate-200/50 mt-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-indigo-100 p-1.5 rounded-lg"><Briefcase className="w-5 h-5 text-indigo-600"/></div>
              <h2 className="text-2xl font-black text-slate-800">Explore Specific Careers</h2>
            </div>
            <p className="text-sm font-medium text-slate-500">Deep dive into custom paths designed for you. Randomized each load.</p>
          </div>
          <Link href="/career-paths" className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-black text-sm flex items-center gap-2 hover:bg-slate-200 transition-colors shrink-0">
            View All Careers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(isMounted ? randomPaths : ALL_PATHS.slice(0,3)).map((path, i) => (
            <div
              key={i}
              className="rounded-3xl p-6 relative overflow-hidden group hover:scale-[1.03] transition-transform cursor-pointer shadow-lg hover:shadow-2xl"
              style={{ background: path.grad }}
            >
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-20 bg-white" />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5 backdrop-blur-md border border-white/20 shadow-inner group-hover:-translate-y-1 transition-transform">
                  <path.icon className="w-7 h-7 text-white drop-shadow-md" />
                </div>
                <p className="text-white font-black text-lg mb-4 leading-tight drop-shadow-sm">{path.roles[0]}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {path.roles.map((r, j) => (
                    <span key={j} className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md font-bold shadow-sm" style={{ background: 'rgba(255,255,255,0.25)', color: 'white' }}>
                      {r}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/career/${path.slug}`}
                  className="mt-auto px-4 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm flex justify-between items-center transition-colors border border-white/30 backdrop-blur-md"
                >
                  Explore Path Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}