'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronLeft, Briefcase, TrendingUp, Award, Clock,
  TerminalSquare, Laptop, Lightbulb, MapPin, ExternalLink, PlayCircle, Network,
  Zap, FlaskConical, Activity, Target, Compass
} from 'lucide-react';

/* ─── Detailed Expanded Career Data ───────────── */
const CAREER_DATA = {
  'software-developer': {
    title: 'Software Developer',
    icon: TerminalSquare,
    grad: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    description: 'Software Engineers build the digital architecture that runs the modern world. You will design, develop, test, and maintain applications or systems. From mapping the logistics of rideshare apps to deploying AI models on cloud endpoints.',
    timeline: '4 Years (B.Tech / B.Sc in Computer Science)',
    startingSalary: '₹6.0L - ₹15.0L Base',
    growth: 'Exponential (Driven by Cloud & AI)',
    dayInLife: 'Participating in daily agile standups, writing complex logic in modern frameworks, reviewing pull requests, deploying features natively via CI/CD, and pushing digital infrastructure to millions of active users instantaneously.',
    expectedDuties: ['Write scalable code', 'Database architecture', 'API integration', 'System debugging'],
    roadmap: [
      { year: 'Year 1-2', title: 'Core Programming Logic', desc: 'Mastering algorithms, data structures (DSA), and object-oriented programming in C++, Java, or Python.' },
      { year: 'Year 3', title: 'Fullstack & Cloud Basics', desc: 'Building complex web applications, learning React/Node, and deploying basic AWS/Vercel pipelines.' },
      { year: 'Year 4', title: 'Internships & Open Source', desc: 'Cracking technical interviews, contributing to major OS repositories, and securing an entry-level SDE role.' },
      { year: 'Year 5+', title: 'System Architecture', desc: 'Transitioning to Senior Dev, designing microservices, and leading entire engineering squads.' }
    ],
    keyTools: ['VS Code', 'GitHub', 'AWS / Azure', 'Docker', 'Figma (Basic)'],
    topCompanies: ['Google', 'Microsoft', 'Atlassian', 'TCS', 'Stripe'],
    importantLinks: [
      { name: 'GitHub Student Developer', url: 'https://education.github.com/pack' },
      { name: 'LeetCode Platform', url: 'https://leetcode.com/' },
      { name: 'Stack Overflow', url: 'https://stackoverflow.com/' }
    ]
  },
  'financial-analyst': {
    title: 'Financial Analyst',
    icon: TrendingUp,
    grad: 'linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)',
    description: 'Financial Analysts study market trends, demographics, and microeconomic factors to help companies make smart investment decisions. You evaluate capital structures and analyze historical financial performance.',
    timeline: '3-5 Years (B.Com / CA / MBA)',
    startingSalary: '₹5.5L - ₹9.0L Base',
    growth: 'High (Driven by Fintech expansion)',
    dayInLife: 'Building aggressive multi-variable Excel models, projecting company revenue trajectories, parsing through global economic data releases, and building investment thesis decks for executive partner review.',
    expectedDuties: ['Financial modeling', 'Risk assessment', 'Market research', 'Pitch deck creation'],
    roadmap: [
      { year: 'Phase 1', title: 'Accounting & Math Foundation', desc: 'Understanding balance sheets, cash flow statements, and core macroeconomic theories.' },
      { year: 'Phase 2', title: 'Advanced Modeling', desc: 'Mastering heavy Excel shortcuts, VBA macros, and Discounted Cash Flow (DCF) models.' },
      { year: 'Phase 3', title: 'CFA & Certifications', desc: 'Clearing CFA Level 1 & 2 while interning at a Tier 1 or Tier 2 banking/fintech institution.' },
      { year: 'Phase 4', title: 'Portfolio Management', desc: 'Leading investment portfolios, advising institutional clients, and handling M&A deals.' }
    ],
    keyTools: ['Microsoft Excel (Advanced)', 'Bloomberg Terminal', 'Tableau', 'PowerBI'],
    topCompanies: ['Goldman Sachs', 'J.P. Morgan', 'Deloitte', 'KPMG', 'Morgan Stanley'],
    importantLinks: [
      { name: 'Investopedia Education', url: 'https://www.investopedia.com/' },
      { name: 'CFA Institute Hub', url: 'https://www.cfainstitute.org/' },
      { name: 'Bloomberg Terminals', url: 'https://www.bloomberg.com/professional/' }
    ]
  },
  'counsellor': {
    title: 'Professional Counsellor',
    icon: Lightbulb,
    grad: 'linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%)',
    description: 'Counsellors assess, diagnose, and treat mental and emotional disorders. They listen deeply, prescribe structures for mental wellbeing, and help individuals navigate personal, social, and psychological traumas.',
    timeline: '3-5 Years (B.A. Psych + MA Specialization)',
    startingSalary: '₹3.5L - ₹6.0L Base',
    growth: 'Rapid (Increasing focus on mental health)',
    dayInLife: 'Sitting with clients, diagnosing behavioral patterns based on DSM-5, writing detailed clinical notes, formulating specialized recovery trajectories, and conducting group therapy or corporate wellness sessions.',
    expectedDuties: ['Patient assessment', 'Therapy formulation', 'Clinical documentation', 'Crisis intervention'],
    roadmap: [
      { year: 'Academics', title: 'Psychology Core', desc: 'Understanding cognitive science, neurobiology, and human development theories.' },
      { year: 'Clinical Prep', title: 'DSM-5 & Methodology', desc: 'Learning clinical diagnosis frameworks and cognitive behavioral therapy (CBT) basics.' },
      { year: 'Residency', title: 'Supervised Practice', desc: 'Clocking hundreds of hours under a licensed senior psychologist in a hospital or clinic.' },
      { year: 'Execution', title: 'Private / Corporate Practice', desc: 'Opening an independent practice or joining an MNC to manage corporate wellness.' }
    ],
    keyTools: ['Clinical assessment books', 'DSM-5', 'EHR Software', 'Digital therapy platforms'],
    topCompanies: ['Apollo Hospitals', 'Fortis', 'BetterHelp', 'Corporate HR Divisions'],
    importantLinks: [
      { name: 'American Psychological Association', url: 'https://www.apa.org/' },
      { name: 'National Institute of Mental Health', url: 'https://www.nimh.nih.gov/' }
    ]
  },
  'mechanical-engineer': {
    title: 'Mechanical Engineer',
    icon: Zap,
    grad: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    description: 'The oldest branch of engineering. You deal with kinematics, thermodynamics, and the structural integrity of machines and engines. Mechanical engineers design almost everything that moves.',
    timeline: '4 Years (B.Tech / B.E. Mechanical)',
    startingSalary: '₹4.5L - ₹8.0L Base',
    growth: 'Steady (Automotive EV boom & Automation)',
    dayInLife: 'Using CAD software to prototype components, running structural stress-tests using finite element analysis, calculating thermodynamic efficiencies, and visiting production floors to supervise manufacturing logistics.',
    expectedDuties: ['CAD/CAM modeling', 'Thermodynamic analysis', 'Material testing', 'Manufacturing oversight'],
    roadmap: [
      { year: 'Year 1-2', title: 'Physics & Calc Basics', desc: 'Engaging with heavy vector calculus, thermodynamics, and fluid mechanics theory.' },
      { year: 'Year 3', title: 'Drafting & Auto-CAD', desc: 'Mastering digital design tools to simulate physical models and executing university lab projects.' },
      { year: 'Year 4', title: 'Industry Integration', desc: 'Interning at production plants, learning Six Sigma, and understanding supply chains.' },
      { year: 'Year 5+', title: 'Lead Engineering', desc: 'Managing massive manufacturing lines, aerospace R&D, or robotics design.' }
    ],
    keyTools: ['AutoCAD', 'SolidWorks', 'MATLAB', 'ANSYS'],
    topCompanies: ['Tata Motors', 'L&T', 'Mahindra', 'SpaceX', 'Boeing'],
    importantLinks: [
      { name: 'ASME official', url: 'https://www.asme.org/' },
      { name: 'Institution of Mechanical Engineers', url: 'https://www.imeche.org/' }
    ]
  },
  'medical-professional': {
    title: 'Medical Professional',
    icon: Briefcase,
    grad: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    description: 'Doctors, nurses, and clinical specialists who diagnose illnesses, prescribe medication, and save lives directly. It is one of the most demanding, respected, and biologically intensive careers serving as the firewall against human mortality.',
    timeline: '5-7+ Years (MBBS / Nursing / MD)',
    startingSalary: '₹8.0L - ₹15.0L Base',
    growth: 'Always High (Healthcare necessity)',
    dayInLife: 'Executing patient ward rounds, performing clinical procedures/surgeries, prescribing complex treatments, analyzing radiological data, and participating in continuous medical education to stay updated on drug efficacy.',
    expectedDuties: ['Diagnosis', 'Surgical procedures', 'Patient care', 'Medical research'],
    roadmap: [
      { year: 'Year 1-3', title: 'Pre-Med & Anatomy', desc: 'Intense memorization and theoretical understanding of human anatomy, biochemistry, and physiology.' },
      { year: 'Year 4-5', title: 'Clinical Rotations', desc: 'Shadowing doctors across pediatrics, surgery, and emergency wards.' },
      { year: 'Year 6-7', title: 'Residency (Sleep Deprivation)', desc: 'Managing actual patients full-time under extreme stress and long hour shifts.' },
      { year: 'Year 8+', title: 'Specialization & Surgery', desc: 'Becoming an attending physician, conducting complex independent surgeries, or opening a clinic.' }
    ],
    keyTools: ['Diagnostic imaging', 'Surgical instruments', 'EMR Systems', 'Pharmacopoeia'],
    topCompanies: ['AIIMS', 'Apollo', 'Max Healthcare', 'Government Hubs'],
    importantLinks: [
      { name: 'National Medical Commission', url: 'https://www.nmc.org.in/' },
      { name: 'WHO Data Hub', url: 'https://www.who.int/' }
    ]
  },
  'ui-ux-designer': {
    title: 'UI/UX Designer',
    icon: Laptop,
    grad: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    description: 'Designers bridge human psychology with digital interfaces. You make applications intuitive, beautiful, accessible, and highly performant. A great UX designer understands spatial layouts and human intent.',
    timeline: '3-4 Years (B.Des / BFA / Bootcamp)',
    startingSalary: '₹5.5L - ₹12.0L Base',
    growth: 'Very High (Digital transformation)',
    dayInLife: 'Wireframing initial concepts in Figma, conducting generative user interviews, selecting typography scales, crafting high-fidelity interactive prototypes, and handing off CSS logic to frontend developers.',
    expectedDuties: ['Wireframing', 'User research', 'Prototyping', 'Design system creation'],
    roadmap: [
      { year: 'Phase 1', title: 'Color Theory & Typography', desc: 'Learning the absolute fundamentals of grid layouts, visual hierarchy, and contrasting hues.' },
      { year: 'Phase 2', title: 'Figma Mastery', desc: 'Transforming theory into digital reality using auto-layout, variables, and component systems.' },
      { year: 'Phase 3', title: 'User Psychology (UX)', desc: 'Conducting A/B tests, reading heatmaps, and building frictionless user flows.' },
      { year: 'Phase 4', title: 'Product Design', desc: 'Owning end-to-end product experiences natively, collaborating tightly with engineering.' }
    ],
    keyTools: ['Figma', 'Adobe Creative Cloud', 'Framer', 'Miro'],
    topCompanies: ['Apple', 'Spotify', 'Zoho', 'CRED', 'Airbnb'],
    importantLinks: [
      { name: 'Nielsen Norman Group', url: 'https://www.nngroup.com/' },
      { name: 'Figma Community', url: 'https://www.figma.com/community/' }
    ]
  },
  'lab-technician': {
    title: 'Research Scientist / Lab Tech',
    icon: FlaskConical,
    grad: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    description: 'The crucial backbone of the scientific community. Technicians operate complex machinery to conduct assays, sequence DNA, test materials, or verify the safety of public products against dangerous pathogens.',
    timeline: '3-4 Years (B.Sc / specialized Diplomas)',
    startingSalary: '₹3.5L - ₹6.0L Base',
    growth: 'Steady (Biotech and Pharma expansion)',
    dayInLife: 'Preparing biological sample slides, operating high-speed centrifuges and mass spectrometers, logging sterile data into LIMS software, and meticulously ensuring protocols follow international compliance.',
    expectedDuties: ['Sample analysis', 'Equipment calibration', 'Protocol enforcement', 'Data logging'],
    roadmap: [
      { year: 'Phase 1', title: 'Core Biology & Chemistry', desc: 'Studying cellular biology, organic chemistry, and fundamental molecular properties.' },
      { year: 'Phase 2', title: 'Machine Operations', desc: 'Learning to operate sensitive equipment like electron microscopes and centrifuges.' },
      { year: 'Phase 3', title: 'Lab Internships', desc: 'Working under strict compliance regimes (GLP) handling real-world pathological samples.' },
      { year: 'Phase 4', title: 'Senior Lab Coordination', desc: 'Managing entire laboratory logistics, QA validations, and cutting-edge biotech assays.' }
    ],
    keyTools: ['Microscopes', 'Spectrometers', 'LIMS Software', 'Centrifuges'],
    topCompanies: ['Sun Pharma', 'Dr. Reddy’s', 'Dr Lal PathLabs', 'CSIR'],
    importantLinks: [
      { name: 'CSIR India', url: 'https://www.csir.res.in/' },
      { name: 'Nature Research Journals', url: 'https://www.nature.com/' }
    ]
  }
};

export default function CareerDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const safeId = typeof id === 'string' ? id.toLowerCase() : 'software-developer';
  
  const career = CAREER_DATA[safeId as keyof typeof CAREER_DATA] || CAREER_DATA['software-developer'];
  const Icon = career.icon;

  return (
    <div className="max-w-[1300px] mx-auto pb-20 space-y-8 animate-in fade-in duration-500">
       <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
         <Link href="/career-paths" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#4A68C8] font-black text-[13px] uppercase tracking-widest bg-white/40 backdrop-blur-md px-5 py-2.5 rounded-xl shadow-sm transition-all hover:bg-white/60 hover:-translate-x-1 border border-white/60 w-full sm:w-auto">
           <ChevronLeft className="w-4 h-4" /> Back to Paths
         </Link>
         <div className="bg-emerald-50/70 backdrop-blur-md text-emerald-600 px-4 py-2 rounded-xl border border-emerald-200/50 font-bold text-sm w-full sm:w-auto text-center flex justify-center items-center gap-2 shadow-sm">
           <Activity className="w-4 h-4" /> Actively Hiring Role
         </div>
       </div>

       {/* HERO BANNER - Dashboard Aesthetic Replacement (SVG Objects > Emojis) */}
       <div className="relative rounded-[2.5rem] overflow-hidden min-h-[440px] flex items-center p-8 md:p-14 shadow-2xl group border border-white/10"
         style={{ background: career.grad }}>
          
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '28px 28px' }} />
          <div className="absolute -top-10 -left-10 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-white/10 transition-colors duration-1000" />
          
          {/* Floating UI Elements matching dashboard */}
          <div className="absolute top-1/2 right-12 -translate-y-1/2 w-80 h-80 opacity-25 pointer-events-none select-none hidden lg:block">
            <svg viewBox="0 0 300 300" className="w-full h-full animate-[bounce_6s_ease-in-out_infinite] drop-shadow-2xl">
              <rect x="50" y="50" width="200" height="150" rx="16" fill="white" opacity="0.1" />
              <rect x="50" y="50" width="200" height="40" rx="16" fill="white" opacity="0.15" />
              <circle cx="70" cy="70" r="5" fill="#fca5a5" />
              <circle cx="90" cy="70" r="5" fill="#fcd34d" />
              <circle cx="110" cy="70" r="5" fill="#34d399" />
              <rect x="70" y="110" width="100" height="8" rx="4" fill="white" opacity="0.3" />
              <rect x="70" y="130" width="140" height="8" rx="4" fill="white" opacity="0.2" />
              <rect x="70" y="150" width="80" height="8" rx="4" fill="white" opacity="0.25" />
              <polygon points="220,110 240,130 220,150" fill="#93c5fd" opacity="0.6" className="animate-pulse" />
              <circle cx="280" cy="200" r="8" fill="white" opacity="0.7" />
              <circle cx="20" cy="180" r="5" fill="#fbcfe8" opacity="0.9" />
            </svg>
          </div>
          
          <div className="relative z-10 flex flex-col items-start w-full max-w-4xl gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-[1.5rem] bg-white/10 backdrop-blur-3xl flex items-center justify-center shrink-0 border border-white/20 shadow-inner hover:scale-105 transition-transform duration-500">
               <Icon className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
            </div>
            <div>
               <div className="bg-white/10 w-max px-4 py-2 rounded-full border border-white/20 backdrop-blur-md mb-4 flex items-center gap-2">
                 <Briefcase className="w-4 h-4 text-amber-300" />
                 <span className="text-white text-[10px] font-black uppercase tracking-widest drop-shadow-sm">Specific Career Profile</span>
               </div>
               <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-5 tracking-tight drop-shadow-sm">{career.title}</h1>
               <p className="text-white/80 text-lg md:text-xl font-medium max-w-3xl leading-relaxed">
                 {career.description}
               </p>
            </div>
          </div>
       </div>

       {/* CONTENT BLOCKS GRID */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Description & Duties */}
          <div className="md:col-span-2 space-y-6">
             {/* Glassmorphic Day In Life */}
             <div className="bg-slate-900/90 backdrop-blur-3xl rounded-3xl p-8 lg:p-12 border border-slate-700/50 shadow-xl text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800/80 rounded-bl-full -z-0 blur-md"></div>
               <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3 relative z-10">
                 <PlayCircle className="w-6 h-6 text-fuchsia-400" /> A Day in the Life
               </h3>
               <p className="text-slate-300 font-medium text-lg leading-relaxed relative z-10">
                 "{career.dayInLife}"
               </p>
             </div>

             {/* TIER 2: Expansive Roadmap Component */}
             <div className="bg-white/50 backdrop-blur-2xl rounded-3xl p-8 lg:p-10 border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all">
                <h3 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-3">
                  <Compass className="w-6 h-6 text-indigo-500" /> Career Roadmap Strategy
                </h3>
                <p className="text-slate-500 font-medium text-sm mb-8">The exact structural timeline you need to reach senior mastery in this specific field.</p>
                
                <div className="relative border-l-4 border-indigo-200/60 ml-4 space-y-8 pb-4">
                  {career.roadmap.map((step, i) => (
                     <div key={i} className="relative pl-8 group">
                        <span className="absolute -left-[14px] top-1 w-6 h-6 rounded-full bg-white border-4 border-indigo-400 group-hover:scale-125 group-hover:border-indigo-600 transition-all duration-300 shadow-sm" />
                        <div className="bg-white/60 backdrop-blur-md border border-white/80 p-5 rounded-2xl shadow-sm hover:-translate-y-1 transition-transform">
                           <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1 block">{step.year}</span>
                           <h4 className="text-lg font-black text-slate-800 leading-tight mb-2">{step.title}</h4>
                           <p className="text-slate-600 font-medium text-sm leading-relaxed">{step.desc}</p>
                        </div>
                     </div>
                  ))}
                </div>
             </div>

          </div>

          {/* Lateral Sidebar */}
          <div className="md:col-span-1 space-y-6">
             
             {/* Very Translucent Career Metrics Card */}
             <div className="bg-gradient-to-br from-indigo-100/50 to-blue-50/30 backdrop-blur-xl rounded-3xl p-8 border border-white/80 shadow-md">
               <h3 className="text-xl font-black text-indigo-950 mb-6 flex items-center gap-2">
                 <TrendingUp className="w-5 h-5 text-indigo-600" /> Growth Metrics
               </h3>
               <div className="space-y-6">
                 <div>
                   <p className="text-[10px] uppercase font-black text-indigo-500 mb-1 tracking-wider"><Clock className="inline w-3 h-3 mr-1"/> Average Training</p>
                   <p className="text-lg font-black text-slate-800">{career.timeline}</p>
                 </div>
                 <div className="w-full h-px bg-white/60" />
                 <div>
                   <p className="text-[10px] uppercase font-black text-indigo-500 mb-1 tracking-wider"><Award className="inline w-3 h-3 mr-1"/> Starting Compensation</p>
                   <p className="text-2xl font-black text-emerald-600">{career.startingSalary}</p>
                 </div>
                 <div className="w-full h-px bg-white/60" />
                 <div>
                   <p className="text-[10px] uppercase font-black text-indigo-500 mb-1 tracking-wider"><Network className="inline w-3 h-3 mr-1"/> Market Projection</p>
                   <p className="text-lg font-black text-slate-800">{career.growth}</p>
                 </div>
               </div>
             </div>

             {/* Top Employers Translucent */}
             <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-sm">
               <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                 <MapPin className="w-5 h-5 text-rose-500" /> Key Employers
               </h3>
               <div className="flex flex-wrap gap-2">
                 {career.topCompanies.map((comp, i) => (
                   <span key={i} className="px-3.5 py-1.5 bg-white/80 backdrop-blur-sm text-slate-700 rounded-xl text-sm font-bold border border-white shadow-sm hover:shadow-md transition-shadow cursor-default">
                     {comp}
                   </span>
                 ))}
               </div>
             </div>

             {/* Primary Responsibilities Mini Card */}
             <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-sm">
               <h3 className="text-xl font-black text-slate-800 mb-5 flex items-center gap-2">
                 <Target className="w-5 h-5 text-indigo-500" /> Base Routines
               </h3>
               <div className="space-y-3">
                 {career.expectedDuties.map((duty, i) => (
                   <div key={i} className="flex items-center gap-3">
                     <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                     <span className="font-bold text-slate-600 text-sm">{duty}</span>
                   </div>
                 ))}
               </div>
             </div>

          </div>

       </div>

       {/* Translucent Base Knowledge Container */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Key Tools Array */}
          <div className="rounded-3xl bg-white/40 backdrop-blur-2xl border border-white/60 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl transition-shadow">
             <h2 className="text-xl font-black text-slate-800 mb-2 flex items-center gap-3">
               <Laptop className="w-6 h-6 text-[#4A68C8]" /> Daily Core Tools
             </h2>
             <p className="text-slate-500 font-medium mb-6 text-sm">
               Professionals in this field consistently execute utilizing these software platforms or hardware.
             </p>
             <div className="flex flex-wrap gap-3">
                {career.keyTools.map((tool, i) => (
                  <span key={i} className="px-5 py-3 bg-white/60 backdrop-blur-md text-slate-800 shadow-sm border border-white/80 font-black text-[13px] rounded-xl hover:-translate-y-0.5 transition-transform cursor-default">
                     {tool}
                  </span>
                ))}
             </div>
          </div>

          {/* Important Links Array */}
          <div className="rounded-3xl bg-white/40 backdrop-blur-2xl border border-white/60 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl transition-shadow">
             <h2 className="text-xl font-black text-slate-800 mb-2 flex items-center gap-3">
               <ExternalLink className="w-6 h-6 text-[#4A68C8]" /> Institutional Links
             </h2>
             <p className="text-slate-500 font-medium mb-6 text-sm">
               Official portals or global communities that govern standards for this career path.
             </p>
             <div className="space-y-3">
               {career.importantLinks.map((lnk, i) => (
                 <a key={i} href={lnk.url} target="_blank" rel="noreferrer" className="flex items-center justify-between px-5 py-3.5 bg-white/50 backdrop-blur-md border border-white/80 rounded-xl font-bold text-[#4A68C8] hover:bg-indigo-600 hover:text-white hover:border-indigo-600 shadow-sm transition-all group">
                   {lnk.name}
                   <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform" />
                 </a>
               ))}
             </div>
          </div>
       </div>

    </div>
  );
}
