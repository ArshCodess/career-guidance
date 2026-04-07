'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  FlaskConical, Palette, TrendingUp, Sparkles, Scale,
  ChevronLeft, BookOpen, Target, Briefcase, GraduationCap,
  ShieldCheck, Zap, ExternalLink, Activity, Network, PenTool
} from 'lucide-react';

/* ─── Detailed Expanded Stream Data ───────────── */
const STREAM_DATA = {
  science: {
    title: 'Science & Medical',
    icon: FlaskConical,
    grad: 'linear-gradient(135deg, #1E1B4B 0%, #3730A3 35%, #4F46E5 70%, #8B5CF6 100%)',
    description: 'The science stream is the foundational backbone for students passionate about unraveling the mysteries of the universe, building groundbreaking technology, and diving deep into life-saving medical fields. It relies heavily on empirical observation, structured mathematical reasoning, and an insatiable curiosity about how things work. Whether dealing with quantum mechanics or human anatomy, science students learn to apply logic to extreme limits.',
    futureScope: 'Science graduates hold significant leverage in the upcoming Fourth Industrial Revolution. With the explosion of Artificial Intelligence, Biotechnology, and Space Technology, individuals trained in empirical logic will architect the next fifty years of human expansion.',
    keySkills: ['Analytical Thinking', 'Problem Solving', 'Data Interpretation', 'Mathematical Logic'],
    coreSubjects: ['Physics', 'Chemistry', 'Mathematics / Biology', 'Computer Science'],
    topExams: ['JEE Mains & Advanced', 'NEET UG', 'BITSAT', 'CUET (Science Series)', 'IISER Aptitude'],
    avgSalary: '₹6.5L - ₹9.0L base globally, with 30%+ YoY growth',
    careers: ['Doctor / Surgeon', 'Data Scientist', 'Research Analyst', 'AI Specialist'],
    courses: ['B.Sc. Computer Science', 'M.B.B.S.', 'B.Pharma', 'B.Sc. Mathematics'],
    importantLinks: [
      { name: 'NTA - JEE Official Portal', url: 'https://jeemain.nta.nic.in/' },
      { name: 'NMC - Medical Regulations', url: 'https://www.nmc.org.in/' },
      { name: 'IISc - Academic Information', url: 'https://iisc.ac.in/' }
    ]
  },
  arts: {
    title: 'Arts & Humanities',
    icon: Palette,
    grad: 'linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%)',
    description: 'The Arts stream empowers creative, linguistic, and analytical individuals to shape culture, law, visual design, and society. It offers a deep psychological, sociological, and historical understanding of the human condition. Unlike strictly quantitative fields, humanities build the structural framework for ethical governance, expressive media, and global diplomacy.',
    futureScope: 'As automation handles repetitive logic, the demand for human creativity, emotional intelligence, and complex philosophical strategy is skyrocketing. Arts students command powerful sectors like User Experience, Deep Journalism, Behavioral Psychology, and Corporate Ethics.',
    keySkills: ['Creative Expression', 'Communication', 'Deep Empathy', 'Critical Reading'],
    coreSubjects: ['History', 'Political Science', 'Sociology / Psychology', 'Economics', 'Literature'],
    topExams: ['CUET (Arts Subsets)', 'CLAT', 'NIFT/UID Entrance', 'IPMAT', 'TISSNET'],
    avgSalary: '₹4.0L - ₹8.0L (Extremely high variability based on portfolio)',
    careers: ['Journalist / Editor', 'UI/UX Designer', 'Psychologist', 'Corporate Lawyer'],
    courses: ['B.A. Psychology', 'B.A. LL.B', 'BFA (Fine Arts)', 'B.Des (Design)'],
    importantLinks: [
      { name: 'NLU Consortium - CLAT', url: 'https://consortiumofnlus.ac.in/' },
      { name: 'TISS - Social Sciences', url: 'https://tiss.edu/' },
      { name: 'NIFT - Designer Information', url: 'https://nift.ac.in/' }
    ]
  },
  commerce: {
    title: 'Commerce & Business',
    icon: TrendingUp,
    grad: 'linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)',
    description: 'Commerce prepares students for the dynamic, highly-structured world of global business, macroeconomics, high-stakes finance, and corporate leadership. It is designed for structured thinkers who possess an eye for trade operations, tax mitigation, structural auditing, and high-level corporate negotiations.',
    futureScope: 'The global marketplace relies entirely on capital allocation. The rise of Fintech, quantitative trading, and borderless transactions means commerce students are rapidly becoming the data-driven kings of the startup and corporate ecosystems.',
    keySkills: ['Financial Literacy', 'Strategic Planning', 'People Leadership', 'Advanced Accounting'],
    coreSubjects: ['Accountancy', 'Business Studies', 'Macro/Micro Economics', 'Applied Mathematics'],
    topExams: ['CA Foundation', 'CS Executive', 'CUET (Commerce)', 'NMIMS NPAT', 'IPMAT'],
    avgSalary: '₹5.5L - ₹10.5L (Significantly higher post-market certifications like CFA/CA)',
    careers: ['Chartered Accountant', 'Investment Banker', 'Financial Analyst', 'Marketing Director'],
    courses: ['B.Com (Hons.)', 'BBA (Management)', 'B.M.S', 'CA/CS Integrated'],
    importantLinks: [
      { name: 'ICAI - Chartered Accountants', url: 'https://www.icai.org/' },
      { name: 'CFA Institute Info', url: 'https://www.cfainstitute.org/' },
      { name: 'BSE India / Financial Literacy', url: 'https://www.bseindia.com/' }
    ]
  },
  engineering: {
    title: 'Engineering & Tech',
    icon: Zap,
    grad: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    description: 'Engineering applies deep mathematics and brutal scientific disciplines to literally build the physical and digital infrastructure of tomorrow. From quantum computers mapping cellular biology to massive civil structures preventing flooding, engineers build reality.',
    futureScope: 'We are living in an era where software handles hardware logistics. Engineers command the highest starting premiums on the planet directly due to their immediate utility in producing automated leverage (code, machines, robotics).',
    keySkills: ['Systems Architecture', 'Production Coding', 'Physics Application', 'Technical Logistics'],
    coreSubjects: ['Calculus', 'Thermodynamics', 'Data Structures', 'Algorithmic Optimization'],
    topExams: ['JEE Mains', 'JEE Advanced', 'VITEEE', 'MHT-CET', 'GATE (Post-grad)'],
    avgSalary: '₹7.0L - ₹15.0L (Extremely high ceiling, frequently hitting ₹30L+ quickly)',
    careers: ['Software Architect', 'Civil Engineer', 'Aerospace Engineer', 'Robotics Specialist'],
    courses: ['B.Tech Computer Science', 'B.E. Mechanical', 'B.Tech IT', 'B.Tech Electronics'],
    importantLinks: [
      { name: 'IIT JEE Advanced Portal', url: 'https://jeeadv.ac.in/' },
      { name: 'AICTE - Technical Education', url: 'https://www.aicte-india.org/' },
      { name: 'IEEE - Engineering Standards', url: 'https://www.ieee.org/' }
    ]
  },
  law: {
    title: 'Legal Studies & Law',
    icon: Scale,
    grad: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
    description: 'Legal studies teach algorithmic logic applied to human society. It involves deep argumentation, mastering historical precedent, and understanding society’s structural mechanics. It is ideal for students intensely focused on justice, corporate compliance, and reading comprehension.',
    futureScope: 'As international borders dissolve via the internet, cross-national corporate law, internet taxation law, and AI-compliance law are creating entirely new, massive economic niches for highly skilled lawyers.',
    keySkills: ['Advanced Argumentation', 'Deep Textual Analysis', 'High-stakes Negotiation', 'Public Speaking'],
    coreSubjects: ['Constitutional Law', 'Corporate Laws', 'Criminal Procedure', 'Jurisprudence'],
    topExams: ['CLAT', 'AILET', 'LSAT India', 'SLAT'],
    avgSalary: '₹6.0L - ₹15.0+ LPA at top tier firms (Partners earn exponential equity)',
    careers: ['Corporate Counsel', 'Litigation Lawyer', 'Judge / Magistrate', 'Legal Analyst'],
    courses: ['BA LL.B', 'BBA LL.B', 'B.Sc. LL.B'],
    importantLinks: [
      { name: 'Bar Council of India', url: 'http://www.barcouncilofindia.org/' },
      { name: 'Supreme Court Digest', url: 'https://main.sci.gov.in/' },
      { name: 'CLAT Consortium', url: 'https://consortiumofnlus.ac.in/' }
    ]
  }
};

export default function StreamDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const safeId = typeof id === 'string' ? id.toLowerCase() : 'science';
  
  const stream = STREAM_DATA[safeId as keyof typeof STREAM_DATA] || STREAM_DATA.science;
  const Icon = stream.icon;

  return (
    <div className="max-w-[1300px] mx-auto pb-20 space-y-8 animate-in fade-in duration-500">
       <Link href="/course-suggestions" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#4A68C8] font-black text-[13px] uppercase tracking-widest bg-white/50 backdrop-blur-md px-5 py-2.5 rounded-xl shadow-sm transition-all hover:bg-white hover:-translate-x-1 border border-slate-200">
         <ChevronLeft className="w-4 h-4" /> Back to Suggestions
       </Link>

       {/* HERO BANNER - Using Dashboard Premium Aesthetics (Vector SVGs) */}
       <div className="relative rounded-[2.5rem] overflow-hidden min-h-[440px] flex items-center p-8 md:p-14 shadow-2xl group border border-white/10"
         style={{ background: stream.grad }}>
          
          {/* Layered decorative orbs */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-white/10 transition-colors duration-1000" />
          <div className="absolute -bottom-10 right-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:-translate-y-4 transition-transform duration-1000" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '28px 28px' }} />
          
          {/* Detailed Floating SVG Right Side - Replacing Emojis */}
          <div className="absolute top-12 right-12 w-64 h-64 opacity-20 pointer-events-none select-none hidden lg:block">
            <svg viewBox="0 0 280 190" className="w-full h-full animate-[bounce_5s_ease-in-out_infinite] drop-shadow-2xl">
              <ellipse cx="200" cy="95" rx="70" ry="20" fill="white" opacity="0.1" />
              <path d="M178 90 Q148 88 142 95 L142 145 Q148 140 178 142 Z" fill="white" opacity="0.4" />
              <path d="M182 90 Q212 88 218 95 L218 145 Q212 140 182 142 Z" fill="white" opacity="0.45" />
              <circle cx="218" cy="95" r="4" fill="#6ee7b7" />
              <circle cx="142" cy="70" r="3" fill="#fca5a5" />
              <circle cx="260" cy="110" r="5" fill="white" opacity="0.8" />
              <rect x="195" y="40" width="10" height="10" rx="2" fill="#93c5fd" opacity="0.9" className="animate-spin" style={{ transformOrigin: '200px 45px' }} />
            </svg>
          </div>
          
          <div className="relative z-10 flex flex-col items-start gap-8 w-full max-w-4xl">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-[1.5rem] bg-white/10 backdrop-blur-3xl flex items-center justify-center shrink-0 border border-white/20 shadow-inner">
               <Icon className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
            </div>
            <div>
               <div className="bg-white/10 w-max px-4 py-2 rounded-full border border-white/20 backdrop-blur-md mb-5 flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-emerald-400" />
                 <span className="text-white text-[10px] font-black uppercase tracking-widest drop-shadow-sm">Stream Masterclass Details</span>
               </div>
               <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-5 tracking-tight drop-shadow-sm">{stream.title}</h1>
               <p className="text-white/80 text-lg md:text-xl font-medium max-w-3xl leading-relaxed">
                 {stream.description}
               </p>
            </div>
          </div>
       </div>

       {/* DETAILS MASSIVE GRID */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Key Skills & Subjects Container (Span 2) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm shadow-slate-100 relative overflow-hidden flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6 relative z-10">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-500"/> Core Inherited Skills
              </h3>
              <ul className="space-y-4">
                {stream.keySkills.map((skill, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-slate-600">
                     <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-indigo-500 shrink-0">
                       <Activity className="w-4 h-4" />
                     </span>
                     {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-px bg-slate-100 hidden md:block" />
            <div className="flex-1 space-y-6 relative z-10">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <PenTool className="w-5 h-5 text-fuchsia-500"/> Primary Subjects
              </h3>
              <ul className="space-y-4">
                {stream.coreSubjects.map((sub, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-slate-600">
                     <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-fuchsia-500 shrink-0">
                       <BookOpen className="w-4 h-4" />
                     </span>
                     {sub}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Rapid Links & Outlook Container */}
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl text-white flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                <Network className="w-5 h-5 text-blue-400"/> Future Outlook
              </h3>
              <p className="text-slate-400 font-medium text-[15px] leading-relaxed mb-6">
                {stream.futureScope}
              </p>
            </div>
            <div className="p-5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
               <p className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 tracking-wider">Baseline Global Salary</p>
               <p className="text-2xl font-black text-emerald-400 line-clamp-2">{stream.avgSalary}</p>
            </div>
          </div>

          {/* Elite Courses Map */}
          <div className="lg:col-span-1 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-[#f093fb]/40 transition-colors">
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2 relative z-10">
               <BookOpen className="w-5 h-5 text-pink-500"/> Available Degrees
            </h3>
            <div className="flex flex-col gap-3 relative z-10">
              {stream.courses.map((c, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 font-bold text-slate-700 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* Direct Career Paths */}
          <div className="lg:col-span-2 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 lg:p-10 border border-indigo-100 shadow-inner group">
            <h3 className="text-xl font-black text-indigo-900 mb-6 flex items-center gap-2">
               <Briefcase className="w-5 h-5 text-indigo-600"/> Specific Career Horizons
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {stream.careers.map((c, i) => (
                 <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 group-hover:-translate-y-1 transition-transform">
                   <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                     <Briefcase className="w-4 h-4" />
                   </div>
                   <span className="font-bold text-slate-700 text-lg">{c}</span>
                 </div>
               ))}
            </div>
          </div>

       </div>

       {/* Gateway & External Integrations */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Exams */}
          <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
             <h2 className="text-xl font-black text-slate-800 mb-2 flex items-center gap-3">
               <GraduationCap className="w-6 h-6 text-[#4A68C8]" /> Gateway Examinations
             </h2>
             <p className="text-slate-500 font-medium mb-6 text-sm">
               High-tier institutions enforce rigorous entrance mandates. Focus on these portals:
             </p>
             <div className="flex flex-wrap gap-2.5">
                {stream.topExams.map((exam, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-50 text-slate-700 shadow-sm border border-slate-200 font-black text-sm rounded-lg">
                     {exam}
                  </span>
                ))}
             </div>
          </div>

          {/* Important Links */}
          <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
             <h2 className="text-xl font-black text-slate-800 mb-2 flex items-center gap-3">
               <ExternalLink className="w-6 h-6 text-[#4A68C8]" /> Important Resources
             </h2>
             <p className="text-slate-500 font-medium mb-6 text-sm">
               Official government, academic, and industrial portals crucial to this stream.
             </p>
             <div className="space-y-3">
               {stream.importantLinks.map((lnk, i) => (
                 <a key={i} href={lnk.url} target="_blank" rel="noreferrer" className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
                   {lnk.name}
                   <ChevronLeft className="w-4 h-4 rotate-180" />
                 </a>
               ))}
             </div>
          </div>
       </div>

    </div>
  );
}
