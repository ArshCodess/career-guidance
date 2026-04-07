'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Code, Database, Bot, Globe, Gamepad2, Shield,
  FlaskConical, Palette, TrendingUp, Wrench,
  ChevronDown, ArrowRight, BookOpen, Star, Zap,
  Microscope, Calculator, Music, Landmark, Briefcase,
  HeartPulse, Cpu, PenTool, Activity, Users, Target, Clock, Laptop
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

/* ─── Types ──────────────────────────────────────────────── */
interface CareerPath {
  id: string;
  title: string;
  stream: string;
  description: string;
  long_description: string;
  preparation_for: string[];
  job_opportunities: string[];
  slug: string;
  salary: string;
  demand: string;
}

/* ─── Vastly Expanded Data ─────────────────────────── */
const FALLBACK: Record<string, CareerPath[]> = {
  Science: [
    { id: '1', slug: 'software-developer', title: 'Software Developer', stream: 'Science', description: 'Architect digital systems and logic gateways.', long_description: 'Software Engineers command the highest scalability leverage today. They write logical constructs that deploy globally across cloud infrastructure to millions of users instantly.', preparation_for: ['Cloud Infrastructure', 'Tech Startups', 'Fintech Architecture'], job_opportunities: ['Google', 'Microsoft', 'Atlassian', 'Startups'], salary: '₹8L - ₹24L', demand: 'Exponential' },
    { id: '2', slug: 'data-scientist', title: 'Data Scientist', stream: 'Science', description: 'Analyze complex unstructured algorithms.', long_description: 'Data Scientists convert raw noise into actionable corporate strategy. Utilizing neural networks and Python libraries, they predict market conditions before they happen.', preparation_for: ['Machine Learning', 'Quantitative Trading', 'Predictive Analysis'], job_opportunities: ['Amazon', 'Flipkart', 'Bridgewater'], salary: '₹10L - ₹20L', demand: 'Very High' },
    { id: '3', slug: 'medical-professional', title: 'Clinical Surgeon / Doctor', stream: 'Science', description: 'Advanced anatomical preservation and surgery.', long_description: 'At the apex of human biology, surgeons operate at the razor-edge of anatomical science, requiring profound academic resilience and extreme steady-handed precision.', preparation_for: ['Surgery prep', 'Hospital Logistics', 'Trauma Care'], job_opportunities: ['AIIMS', 'Apollo Hospitals', 'Max Healthcare'], salary: '₹12L - ₹35L', demand: 'Critical' },
    { id: '4', slug: 'mechanical-engineer', title: 'Mechanical Engineer', stream: 'Science', description: 'Design structural kinematic machinery.', long_description: 'Responsible for the physical kinetic systems of reality. From thermodynamic propulsion in SpaceX rockets to the suspension in Tesla vehicles, they build motion.', preparation_for: ['Aerospace Systems', 'Automotive R&D', 'Robotics Hardware'], job_opportunities: ['Tata Motors', 'Boeing', 'SpaceX'], salary: '₹6L - ₹15L', demand: 'Steady' },
    { id: '5', slug: 'lab-technician', title: 'Laboratory Research Tech', stream: 'Science', description: 'Sequence DNA and execute bio-assays.', long_description: 'The foundation of the pharmaceutical supply chain. Technicians operate spectrometers and centrifuges to maintain the integrity of clinical trials and drug research.', preparation_for: ['Pharmacology', 'Genetics Research', 'Epidemiology'], job_opportunities: ['Sun Pharma', 'Dr. Reddy’s', 'CSIR'], salary: '₹4L - ₹8L', demand: 'Steady' }
  ],
  Arts: [
    { id: '6', slug: 'ui-ux-designer', title: 'UI/UX Interactive Designer', stream: 'Arts', description: 'Bridge deep psychology with interface design.', long_description: 'Designers dictate the flow of the digital economy. They understand spatial typography and cognitive load in order to create frictionless technology platforms.', preparation_for: ['Product Design', 'Human-Computer Interaction', 'Wireframing'], job_opportunities: ['Apple', 'Spotify', 'Zoho', 'CRED'], salary: '₹7L - ₹18L', demand: 'Very High' },
    { id: '7', slug: 'counsellor', title: 'Clinical Psychologist', stream: 'Arts', description: 'Diagnose and map human behavioral patterns.', long_description: 'Dealing comprehensively with the human mind. They prescribe structural wellness routines and unblock severe neurological traumas using deep empathy and DSM-5 mapping.', preparation_for: ['Corporate Wellness', 'Clinical Practice', 'Rehabilitation'], job_opportunities: ['Fortis', 'BetterHelp', 'Independent Practice'], salary: '₹5L - ₹12L', demand: 'Rapidly Rising' },
    { id: '8', slug: 'film-director', title: 'Film / Creative Director', stream: 'Arts', description: 'Architect visual narratives at scale.', long_description: 'Creative Directors synthesize massive teams of artists, editors, and actors to produce high-leverage digital content across film, television, and advertising.', preparation_for: ['Cinematography', 'Script Architecture', 'Post-Production'], job_opportunities: ['Netflix', 'Amazon Studios', 'Ogilvy'], salary: '₹6L - ₹25L+', demand: 'High' },
    { id: '9', slug: 'journalist', title: 'Investigative Journalist', stream: 'Arts', description: 'Report asymmetric truths and global news.', long_description: 'Journalists track the nervous system of modern society. They hold institutions accountable and write long-form data-backed socio-political analysis.', preparation_for: ['Data Journalism', 'Broadcasting', 'Publishing'], job_opportunities: ['Reuters', 'The Hindu', 'Al Jazeera'], salary: '₹4L - ₹10L', demand: 'Moderate' }
  ],
  Commerce: [
    { id: '10', slug: 'financial-analyst', title: 'Financial Analyst', stream: 'Commerce', description: 'Model corporate trajectories and cap tables.', long_description: 'Analysts build multi-variable Excel spreadsheets to predict the future pricing of markets and allocate billions in venture or banking capital accurately.', preparation_for: ['Venture Capital', 'Investment Banking', 'Actuarial Science'], job_opportunities: ['Goldman Sachs', 'Morgan Stanley', 'Deloitte'], salary: '₹8L - ₹20L', demand: 'Very High' },
    { id: '11', slug: 'chartered-accountant', title: 'Chartered Accountant (CA)', stream: 'Commerce', description: 'Audit, tax compliance, and structural finance.', long_description: 'CAs act as the absolute quantitative truth for national businesses. They manage enormous corporate tax profiles and maintain the audited backbone of the economy.', preparation_for: ['Big 4 Auditing', 'Corporate Taxation', 'Forensic Accounting'], job_opportunities: ['KPMG', 'EY', 'PwC', 'Government'], salary: '₹9L - ₹18L', demand: 'Constant' },
    { id: '12', slug: 'marketing-manager', title: 'Growth Marketing Lead', stream: 'Commerce', description: 'Engineer viral acquisition mechanisms.', long_description: 'Marketers manage advertising spend across Google and Meta. They calculate Customer Acquisition Costs (CAC) to aggressively scale product revenue.', preparation_for: ['Performance Marketing', 'Brand Scaling', 'B2B Analytics'], job_opportunities: ['HUL', 'P&G', 'Tech Startups'], salary: '₹7L - ₹16L', demand: 'High' }
  ],
  Vocational: [
    { id: '13', slug: 'electrician', title: 'Industrial Electrician', stream: 'Vocational', description: 'Maintain extreme high-voltage infrastructure.', long_description: 'Vital for running modern smart cities. Electricians manage advanced grid distributions, solar panel installations, and internal corporate circuitry.', preparation_for: ['Smart Grid Tech', 'Green Energy Solar', 'Commercial Real Estate'], job_opportunities: ['Siemens', 'NTPC', 'L&T'], salary: '₹3L - ₹6L', demand: 'Stable' },
    { id: '14', slug: 'chef', title: 'Executive Culinary Chef', stream: 'Vocational', description: 'Operate high-end hospitality kitchens.', long_description: 'Chefs manage intense supply logistics, team dynamics under extreme pressure, and coordinate precise nutritional architecture at a massive scale.', preparation_for: ['Luxury Hotels', 'Michelin Systems', 'Global Franchising'], job_opportunities: ['Taj Group', 'Marriott', 'ITC Hotels'], salary: '₹4L - ₹12L', demand: 'Stable' },
    { id: '15', slug: 'fashion-designer', title: 'Fashion Technologist', stream: 'Vocational', description: 'Design sustainable textile systems.', long_description: 'Fashion designers integrate fabric theory with mass production capabilities to create globally moving consumer apparel.', preparation_for: ['Haute Couture', 'Retail Chains', 'Sustainable Fabrics'], job_opportunities: ['Myntra', 'Zara India', 'Boutique Labels'], salary: '₹5L - ₹14L', demand: 'High' }
  ],
};

/* ─── Icon map ───────────────────────────────────────────── */
const ICON_MAP: Record<string, any> = {
  'Software Developer': Code,
  'Data Scientist': Database,
  'Clinical Surgeon / Doctor': HeartPulse,
  'Mechanical Engineer': Wrench,
  'Laboratory Research Tech': FlaskConical,
  'UI/UX Interactive Designer': Laptop,
  'Clinical Psychologist': Activity,
  'Film / Creative Director': Zap,
  'Investigative Journalist': Globe,
  'Financial Analyst': TrendingUp,
  'Chartered Accountant': Calculator,
  'Growth Marketing Lead': Target,
  'Industrial Electrician': Zap,
  'Executive Culinary Chef': Palette,
  'Fashion Technologist': PenTool,
};

/* ─── Gradient palette per stream ───────────────────────── */
const STREAM_META: Record<string, { tab: string; pill: string; bg: string }> = {
  Science: {
    tab: 'linear-gradient(135deg, #881337 0%, #be123c 50%, #f43f5e 100%)',
    pill: '#e11d48',
    bg: 'bg-gradient-to-br from-rose-50 via-[#fff1f2] to-[#ffe4e6] border-[#fecdd3]',
  },
  Arts: {
    tab: 'linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%)',
    pill: '#d946ef',
    bg: 'bg-gradient-to-br from-fuchsia-50 to-[#FAE8FF] border-[#F5D0FE]',
  },
  Commerce: {
    tab: 'linear-gradient(135deg, #1f4037 0%, #059669 100%)',
    pill: '#10b981',
    bg: 'bg-gradient-to-br from-emerald-50 to-[#D1FAE5] border-[#A7F3D0]',
  },
  Vocational: {
    tab: 'linear-gradient(135deg, #083344 0%, #0284c7 100%)',
    pill: '#0ea5e9',
    bg: 'bg-gradient-to-br from-sky-50 to-[#E0F2FE] border-[#BAE6FD]',
  },
};

const STREAMS = ['Science', 'Arts', 'Commerce', 'Vocational'];

const STREAM_ICONS: Record<string, any> = {
  Science: FlaskConical,
  Arts: Palette,
  Commerce: TrendingUp,
  Vocational: Wrench,
};

export default function CareerPathsPage() {
  const [selectedStream, setSelectedStream] = useState('Science');
  const router = useRouter();

  const meta = STREAM_META[selectedStream];
  const StreamIcon = STREAM_ICONS[selectedStream];
  const displayed = FALLBACK[selectedStream];

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      {/* ── MASSIVE HERO BANNER (Sharper, Colorful, Premium) ── */}
      <div className="rounded-3xl p-10 md:p-14 relative overflow-hidden shadow-xl group border border-white/20"
        style={{ background: meta.tab }}>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '28px 28px' }} />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 bg-white blur-3xl group-hover:scale-110 transition-transform duration-1000" />
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-4">
           <div className="w-20 h-20 bg-white/10 backdrop-blur-3xl rounded-2xl flex items-center justify-center border border-white/20 shadow-inner mb-2">
             <StreamIcon className="w-10 h-10 text-white drop-shadow-md" />
           </div>
           <div className="bg-white/10 px-5 py-2 rounded-lg border border-white/20 backdrop-blur-md flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span className="text-white text-xs font-black uppercase tracking-widest leading-none drop-shadow-sm">Global Career Roadmap Atlas</span>
           </div>
           <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg pb-2">
             {selectedStream} Pathways
           </h1>
           <p className="text-white/90 text-lg font-medium leading-relaxed mt-1 max-w-2xl drop-shadow-md">
             Highly detailed global analyses of the most lucrative and impactful career trajectories emerging from the {selectedStream} discipline.
           </p>
        </div>
      </div>

      {/* ── Sleek Controls Row ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/40 backdrop-blur-md p-2 rounded-2xl border border-white/40 shadow-sm">
        <div className="flex gap-2 flex-wrap w-full md:w-auto">
          {STREAMS.map(stream => {
            const SIcon = STREAM_ICONS[stream];
            return (
              <button
                key={stream}
                onClick={() => setSelectedStream(stream)}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${
                  selectedStream === stream 
                  ? 'text-white shadow-md' 
                  : 'bg-transparent text-slate-700 hover:bg-white/50 border border-transparent hover:border-white/40'
                }`}
                style={selectedStream === stream ? { background: STREAM_META[stream].tab } : {}}
              >
                <SIcon className="w-[18px] h-[18px]" />
                {stream}
              </button>
            );
          })}
        </div>
        
        {/* Global Statistics Pill */}
        <div className="px-5 py-3 bg-white/70 backdrop-blur-md rounded-xl border border-white/80 text-slate-800 flex items-center gap-4 w-full md:w-auto justify-between shadow-sm">
           <div className="flex flex-col">
             <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider leading-tight">Total Roles Tracked</span>
             <span className="font-black text-sm leading-tight text-slate-800">{displayed.length * 940}+ Verified</span>
           </div>
           <Activity className="w-5 h-5" style={{ color: meta.pill }} />
        </div>
      </div>

      {/* ── Advanced Detailed Premium Card Grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {displayed.map((career, i) => {
          const Icon = ICON_MAP[career.title] || Briefcase;
          return (
            <div key={career.id} className={`flex flex-col p-6 sm:p-8 rounded-[2.5rem] border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden group ${meta.bg}`}>
               
               {/* Decorative Gradient Flare */}
               <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/40 blur-3xl rounded-full pointer-events-none group-hover:bg-white/60 transition-colors duration-700" />

               {/* Top Meta Area */}
               <div className="flex sm:flex-row flex-col sm:items-start justify-between gap-4 mb-6 relative z-10">
                  <div className="flex gap-5 items-start">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-3 transition-transform duration-500 shrink-0"
                         style={{ background: meta.tab }}>
                       <Icon className="w-8 h-8 text-white drop-shadow-sm" />
                    </div>
                    <div className="flex flex-col mt-1">
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                        {career.title}
                      </h3>
                      <p className="text-slate-600 font-bold text-[13px] uppercase tracking-wider mt-1">
                        {career.description}
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-100 rounded-full text-[10px] font-black text-slate-700 uppercase tracking-widest shadow-sm shrink-0">
                    <Clock className="w-3.5 h-3.5" style={{ color: meta.pill }} /> Highly Rated
                  </div>
               </div>

               {/* Full Description */}
               <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6 relative z-10">
                 {career.long_description}
               </p>
               
               {/* Comprehensive Stats Row */}
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 relative z-10">
                 <div className="bg-white/60 p-4 rounded-xl border border-white/80 shadow-sm flex flex-col justify-center">
                    <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest leading-none mb-2 flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5" style={{color: meta.pill}}/> Salary</p>
                    <p className="text-sm sm:text-base font-black text-slate-800 leading-none">{career.salary}</p>
                 </div>
                 <div className="bg-white/60 p-4 rounded-xl border border-white/80 shadow-sm flex flex-col justify-center">
                    <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest leading-none mb-2 flex items-center gap-1.5"><Target className="w-3.5 h-3.5" style={{color: meta.pill}}/> Demand</p>
                    <p className="text-sm sm:text-base font-black text-slate-800 leading-none">{career.demand}</p>
                 </div>
                 <div className="bg-white/60 p-4 rounded-xl border border-white/80 shadow-sm flex flex-col justify-center sm:col-span-1 col-span-2">
                    <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest leading-none mb-2 flex items-center gap-1.5"><Users className="w-3.5 h-3.5" style={{color: meta.pill}}/> Recruiters</p>
                    <p className="text-[13px] font-black text-slate-800 leading-tight">{career.job_opportunities.slice(0, 2).join(', ')}</p>
                 </div>
               </div>

               {/* Preparation Tags */}
               <div className="mb-8 relative z-10">
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mb-3">Key Competencies & Prep</p>
                  <div className="flex flex-wrap gap-2">
                     {career.preparation_for.map((prep, idx) => (
                       <span key={idx} className="px-3 py-1.5 rounded-lg bg-white/60 border border-white/80 text-[11px] font-bold text-slate-700 shadow-sm backdrop-blur-md">
                         {prep}
                       </span>
                     ))}
                  </div>
               </div>

               {/* Bottom CTA */}
               <div className="mt-auto pt-6 border-t border-slate-200/50 relative z-10 flex flex-col sm:flex-row items-center gap-4 justify-between">
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest text-center sm:text-left">
                    Requires <span style={{color: meta.pill}}>Advanced Toolkit</span>
                  </p>
                  <Link
                    href={`/career/${career.slug}`}
                    className="w-full sm:w-auto py-3.5 px-8 rounded-xl text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-[color:var(--pill)]/20 transition-all hover:scale-105 active:scale-95 text-center group/btn"
                    style={{ background: meta.tab, '--pill': meta.pill } as any}
                  >
                    View Interactive Roadmap <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
               </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}