'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronLeft, Briefcase, TrendingUp, Award, Clock,
  TerminalSquare, Laptop, Lightbulb, MapPin, ExternalLink, PlayCircle, Network,
  Zap, FlaskConical, Activity, Target, Compass, Database, Globe, Calculator
} from 'lucide-react';

/* ─── Detailed Expanded Career Data ───────────── */
const CAREER_DATA = {
  'software-developer': {
    title: 'Software Developer',
    icon: TerminalSquare,
    grad: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
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
    grad: 'linear-gradient(135deg, #38bdf8 0%, #2dd4bf 100%)',
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
    grad: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)',
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
    grad: 'linear-gradient(135deg, #22d3ee 0%, #0284c7 100%)',
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
    grad: 'linear-gradient(135deg, #60a5fa 0%, #0284c7 100%)',
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
    grad: 'linear-gradient(135deg, #c084fc 0%, #f472b6 100%)',
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
    grad: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)',
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
  },
  'data-scientist': {
    title: 'Data Scientist',
    icon: Database,
    grad: 'linear-gradient(135deg, #60A5FA 0%, #34D399 100%)',
    description: 'Data Scientists convert raw noise into actionable corporate strategy. Utilizing neural networks and Python libraries, they predict market conditions before they happen.',
    timeline: '4 Years (B.Tech / B.Sc Stats)',
    startingSalary: '₹10.0L - ₹20.0L Base',
    growth: 'Very High (AI Boom)',
    dayInLife: 'Cleaning huge datasets, training AI models with scikit-learn or TensorFlow, configuring big data pipelines on AWS, and presenting predictive dashboards to stakeholders.',
    expectedDuties: ['Data modeling', 'Statistical analysis', 'Dashboard creation', 'Model deployment'],
    roadmap: [
      { year: 'Phase 1', title: 'Math & Coding', desc: 'Mastering linear algebra, statistics, and Python/R fundamentals.' },
      { year: 'Phase 2', title: 'Machine Learning', desc: 'Implementing regression models, random forests, and deep learning neural nets.' },
      { year: 'Phase 3', title: 'Big Data Tooling', desc: 'Learning PySpark, Hadoop, and SQL to query massive raw records.' },
      { year: 'Phase 4', title: 'AI Leadership', desc: 'Directing AI infrastructure architecture for predictive forecasting.' }
    ],
    keyTools: ['Python', 'TensorFlow', 'Jupyter', 'SQL'],
    topCompanies: ['Amazon', 'Flipkart', 'Bridgewater', 'Google'],
    importantLinks: [
      { name: 'Kaggle', url: 'https://www.kaggle.com/' },
      { name: 'Towards Data Science', url: 'https://towardsdatascience.com/' }
    ]
  },
  'film-director': {
    title: 'Film / Creative Director',
    icon: Lightbulb,
    grad: 'linear-gradient(135deg, #F472B6 0%, #FBBF24 100%)',
    description: 'Creative Directors synthesize massive teams of artists, editors, and actors to produce high-leverage digital content across film, television, and advertising.',
    timeline: '3-5 Years (BA Film / Experience)',
    startingSalary: '₹6L - ₹25L+',
    growth: 'High (OTT Boom)',
    dayInLife: 'Reviewing scripts, managing lighting logistics on set, commanding camera operators, and directing actors creatively down to the micro-expression.',
    expectedDuties: ['Storyboarding', 'Team leadership', 'Cinematography checking', 'Post-production'],
    roadmap: [
      { year: 'Year 1-2', title: 'Fundamentals', desc: 'Learning camera angles, script writing, and video editing basics.' },
      { year: 'Year 3', title: 'Short Films', desc: 'Producing independent short videos to build a directorial reel.' },
      { year: 'Year 4+', title: 'Assistant Directing', desc: 'Working on major commercial sets as an AD.' },
      { year: 'Year 6+', title: 'Lead Director', desc: 'Pitching direct to Netflix/Amazon and running large scale productions.' }
    ],
    keyTools: ['Final Cut Pro', 'Red/Arri Cameras', 'Storyboards', 'Lighting rigs'],
    topCompanies: ['Netflix', 'Amazon Studios', 'Ogilvy'],
    importantLinks: [
      { name: 'Sundance Institute', url: 'https://www.sundance.org/' }
    ]
  },
  'journalist': {
    title: 'Investigative Journalist',
    icon: Globe,
    grad: 'linear-gradient(135deg, #38BDF8 0%, #A78BFA 100%)',
    description: 'Journalists track the nervous system of modern society. They hold institutions accountable and write long-form data-backed socio-political analysis.',
    timeline: '3 Years (BA Journalism/Mass Media)',
    startingSalary: '₹4.0L - ₹10.0L Base',
    growth: 'Moderate',
    dayInLife: 'Contacting unlisted sources, sifting through public government records, verifying claims independently, and publishing high-impact news stories.',
    expectedDuties: ['Interviewing', 'Fact-checking', 'Writing/Reporting', 'Media Broadcasting'],
    roadmap: [
      { year: 'Phase 1', title: 'Media Studies', desc: 'Understanding media ethics, constitutional rights, and public reporting.' },
      { year: 'Phase 2', title: 'Local Reporting', desc: 'Writing for city desks and shadowing senior correspondents.' },
      { year: 'Phase 3', title: 'National Desk', desc: 'Handling breaking national news or deep investigative exposes.' },
      { year: 'Phase 4', title: 'Editor / Anchor', desc: 'Hosting public broadcasting panels or leading chief editorial operations.' }
    ],
    keyTools: ['Voice Recorders', 'Publishing CMS', 'Twitter/X', 'Public Data records'],
    topCompanies: ['Reuters', 'The Hindu', 'Al Jazeera'],
    importantLinks: [
      { name: 'Poynter Institute', url: 'https://www.poynter.org/' }
    ]
  },
  'chartered-accountant': {
    title: 'Chartered Accountant (CA)',
    icon: Calculator,
    grad: 'linear-gradient(135deg, #60A5FA 0%, #2DD4BF 100%)',
    description: 'CAs act as the absolute quantitative truth for national businesses. They manage enormous corporate tax profiles and maintain the audited backbone of the economy.',
    timeline: '4-5 Years (ICAI Exams + Articleship)',
    startingSalary: '₹9.0L - ₹18.0L Base',
    growth: 'Constant',
    dayInLife: 'Reviewing massive corporate ledgers, ensuring GST/litigation compliance, optimizing tax expenditure, and performing strict financial audits.',
    expectedDuties: ['Financial Auditing', 'Tax filing', 'Corporate advisory', 'Risk management'],
    roadmap: [
      { year: 'Step 1', title: 'CA Foundation', desc: 'Clearing the heavily competitive entry-level exams.' },
      { year: 'Step 2', title: 'CA Intermediate', desc: 'Studying advanced accounting standards and corporate laws.' },
      { year: 'Step 3', title: 'Articleship', desc: 'Grinding 3 years of practical rigorous training under a practicing CA.' },
      { year: 'Step 4', title: 'CA Final', desc: 'Passing the ultimate threshold to become legally certified.' }
    ],
    keyTools: ['Tally Prime', 'SAP ERP', 'Excel (God-level)', 'Tax portals'],
    topCompanies: ['KPMG', 'EY', 'PwC', 'Deloitte'],
    importantLinks: [
      { name: 'ICAI Official', url: 'https://www.icai.org/' }
    ]
  },
  'marketing-manager': {
    title: 'Growth Marketing Lead',
    icon: Target,
    grad: 'linear-gradient(135deg, #F472B6 0%, #818CF8 100%)',
    description: 'Marketers manage advertising spend across Google and Meta. They calculate Customer Acquisition Costs (CAC) to aggressively scale product revenue.',
    timeline: '3-5 Years (BBA / MBA / Bootcamp)',
    startingSalary: '₹7.0L - ₹16.0L Base',
    growth: 'High',
    dayInLife: 'A/B testing ad creatives, bidding dynamically on search keywords, parsing conversion funnels in Google Analytics, and driving massive sales metrics.',
    expectedDuties: ['Ad Campaign Management', 'SEO/SEM', 'Brand Strategy', 'Copywriting'],
    roadmap: [
      { year: 'Phase 1', title: 'Digital Fundamentals', desc: 'Learning SEO parameters, Content marketing, and basic social media algorithms.' },
      { year: 'Phase 2', title: 'Performance Ads', desc: 'Running live budgets on Meta/Google Ads and calculating ROAS.' },
      { year: 'Phase 3', title: 'Brand Scaling', desc: 'Managing million-dollar campaign budgets for D2C/Tech startups.' },
      { year: 'Phase 4', title: 'CMO', desc: 'Acting as Chief Marketing Officer dictating entire global brand identity.' }
    ],
    keyTools: ['Google Analytics', 'Meta Ads Manager', 'SEMrush', 'HubSpot'],
    topCompanies: ['HUL', 'P&G', 'Tech Startups', 'Ogilvy'],
    importantLinks: [
      { name: 'HubSpot Academy', url: 'https://academy.hubspot.com/' }
    ]
  },
  'electrician': {
    title: 'Industrial Electrician',
    icon: Zap,
    grad: 'linear-gradient(135deg, #38BDF8 0%, #C084FC 100%)',
    description: 'Vital for running modern smart cities. Electricians manage advanced grid distributions, solar panel installations, and internal corporate circuitry.',
    timeline: '2-3 Years (ITI / Diplomas)',
    startingSalary: '₹3.0L - ₹6.0L Base',
    growth: 'Stable',
    dayInLife: 'Wiring complex industrial breakers, reading architectural electrical schemas, testing high-voltage parameters safely, and repairing critical grid outages.',
    expectedDuties: ['Wiring frameworks', 'Safety compliance', 'Troubleshooting grids', 'Equipment repair'],
    roadmap: [
      { year: 'Certification', title: 'ITI Trade', desc: 'Basic vocational mastery of circuits, AC/DC theories, and tools.' },
      { year: 'Apprenticeship', title: 'Field Training', desc: 'Working under master electricians pulling wires in commercial sites.' },
      { year: 'Journeyman', title: 'Independent Tech', desc: 'Handling full residential or mid-tier commercial electrical setups.' },
      { year: 'Master Scale', title: 'Industrial Contracts', desc: 'Overseeing multi-million dollar solar farms or factory electrical grids.' }
    ],
    keyTools: ['Multimeters', 'Wire Strippers', 'Schematic Blueprints', 'Insulation gear'],
    topCompanies: ['Siemens', 'NTPC', 'L&T', 'Schneider Electric'],
    importantLinks: [
      { name: 'Electrical Engineering Portal', url: 'https://electrical-engineering-portal.com/' }
    ]
  },
  'chef': {
    title: 'Executive Culinary Chef',
    icon: Briefcase,
    grad: 'linear-gradient(135deg, #FBBF24 0%, #F87171 100%)',
    description: 'Chefs manage intense supply logistics, team dynamics under extreme pressure, and coordinate precise nutritional architecture at a massive scale.',
    timeline: '3-4 Years (BHM / Culinary School)',
    startingSalary: '₹4.0L - ₹12.0L Base',
    growth: 'Stable',
    dayInLife: 'Dictating kitchen stations in high-end hospitality, sourcing premium ingredients, architecting seasonal menus, and ensuring absolute hygiene compliance.',
    expectedDuties: ['Menu Architecture', 'Supplier negotiation', 'Quality Control', 'Staff Management'],
    roadmap: [
      { year: 'Phase 1', title: 'Culinary Basics', desc: 'Knife skills, basic heating mechanics, and sauce preparations.' },
      { year: 'Phase 2', title: 'Commis Chef', desc: 'Grinding at junior kitchen stations doing extreme repetitive prep under heat.' },
      { year: 'Phase 3', title: 'Sous Chef', desc: 'Assisting the executive, managing the line cooks, and overseeing service pacing.' },
      { year: 'Phase 4', title: 'Executive Head', desc: 'Running the entire restaurant logistics or expanding franchise models.' }
    ],
    keyTools: ['Premium Knives', 'Industrial Ovens', 'Inventory Software', 'Thermometers'],
    topCompanies: ['Taj Group', 'Marriott', 'ITC Hotels', 'Oberoi'],
    importantLinks: [
      { name: 'Culinary Institute of America', url: 'https://www.ciachef.edu/' }
    ]
  },
  'fashion-designer': {
    title: 'Fashion Technologist',
    icon: Laptop,
    grad: 'linear-gradient(135deg, #C084FC 0%, #F472B6 100%)',
    description: 'Fashion designers integrate fabric theory with mass production capabilities to create globally moving consumer apparel.',
    timeline: '3-4 Years (B.Des Fashion)',
    startingSalary: '₹5.0L - ₹14.0L Base',
    growth: 'High',
    dayInLife: 'Sketching apparel silhouettes digitally, sourcing exact thread textiles, predicting commercial trends, and coordinating factory prototyping loops.',
    expectedDuties: ['Digital Sketching', 'Textile Selection', 'Trend Forecasting', 'Garment Fitting'],
    roadmap: [
      { year: 'Phase 1', title: 'Theory & Textiles', desc: 'Learning about fabrics, weaving mechanisms, and basic draping.' },
      { year: 'Phase 2', title: 'Digital CAD', desc: 'Translating paper designs into digital scalable flats using Adobe Illustrator.' },
      { year: 'Phase 3', title: 'Brand Launch / Junior', desc: 'Working under a major retail label executing seasonal production runs.' },
      { year: 'Phase 4', title: 'Creative Director', desc: 'Showcasing independent collections globally or leading a major corporative apparel line.' }
    ],
    keyTools: ['Sewing Machines', 'Adobe Illustrator', 'Fabric Swatches', 'Mannequins'],
    topCompanies: ['Myntra', 'Zara India', 'Boutique Labels', 'Reliance Brands'],
    importantLinks: [
      { name: 'Business of Fashion', url: 'https://www.businessoffashion.com/' }
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
    <div className="max-w-[1200px] mx-auto pb-4 space-y-2 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <Link href="/career-paths" className="inline-flex items-center justify-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-[11px] uppercase tracking-widest bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm transition-all hover:bg-white/80 hover:-translate-x-1 border border-white w-full sm:w-auto">
          <ChevronLeft className="w-4 h-4" /> Back to Paths
        </Link>
        <div className="bg-sky-50/70 backdrop-blur-md text-cyan-600 px-3 py-1.5 rounded-lg border border-sky-200/50 font-bold text-[11px] uppercase tracking-widest w-full sm:w-auto text-center flex justify-center items-center gap-2 shadow-sm">
          <Activity className="w-3.5 h-3.5" /> Actively Hiring Role
        </div>
      </div>

      {/* HERO BANNER - Leaner Size & Good Colors */}
      <div className="relative rounded-[2rem] overflow-hidden min-h-[220px] flex items-center justify-center p-6 sm:p-8 shadow-xl group border border-white/10"
        style={{ background: career.grad }}>

        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
        <div className="absolute -top-10 -left-10 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-white/10 transition-colors duration-1000" />

        {/* Floating UI Elements matching dashboard */}
        <div className="absolute top-1/2 right-4 -translate-y-1/2 w-64 h-64 opacity-20 pointer-events-none select-none hidden lg:block">
          <svg viewBox="0 0 300 300" className="w-full h-full animate-[bounce_6s_ease-in-out_infinite] drop-shadow-lg">
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

        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-2xl mx-auto gap-3">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 backdrop-blur-2xl flex items-center justify-center shrink-0 border border-white/20 shadow-inner hover:scale-105 transition-transform duration-500">
            <Icon className="w-7 h-7 md:w-8 md:h-8 text-white drop-shadow-md" />
          </div>
          <div>
            <div className="bg-white/10 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md flex items-center gap-2 mx-auto mb-2 w-max">
              <Briefcase className="w-3 h-3 text-cyan-300" />
              <span className="text-white text-[9px] font-black uppercase tracking-widest drop-shadow-sm">Specific Career Profile</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-2 tracking-tight drop-shadow-md">{career.title}</h1>
            <p className="text-white text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed drop-shadow-sm">
              {career.description}
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT BLOCKS GRID */}
      <div className="w-full space-y-2">

        {/* Glassmorphic Day In Life */}
        <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-sky-100 backdrop-blur-3xl rounded-[2rem] p-5 md:p-6 border border-blue-200/50 shadow-xl text-slate-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-200/50 rounded-bl-full -z-0 blur-xl"></div>
          <h3 className="text-xl md:text-2xl font-black text-blue-900 mb-3 flex items-center justify-center sm:justify-start gap-2 relative z-10">
            <PlayCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-600" /> A Day in the Life
          </h3>
          <p className="text-slate-700 font-medium text-sm md:text-base leading-relaxed relative z-10 text-center sm:text-left">
            "{career.dayInLife}"
          </p>
        </div>

        {/* TIER 2: Expansive Roadmap Component */}
        <div className="bg-gradient-to-br from-blue-500 to-sky-400 backdrop-blur-xl rounded-[2rem] p-5 md:p-8 border border-blue-400 shadow-xl transition-all text-center sm:text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-bl-full blur-2xl"></div>
          <h3 className="text-xl md:text-3xl font-black text-white mb-2 flex items-center justify-center sm:justify-start gap-2 relative z-10 drop-shadow-md">
            <Compass className="w-6 h-6 md:w-8 md:h-8 text-white" /> Career Roadmap Strategy
          </h3>
          <p className="text-white/90 font-bold text-xs md:text-sm mb-4 text-center sm:text-left relative z-10">The exact structural timeline you need to reach senior mastery in this specific field.</p>

          <div className="relative border-l-[3px] border-white/40 sm:ml-4 ml-2 space-y-2 pb-1 text-left z-10">
            {career.roadmap.map((step, i) => (
              <div key={i} className="relative pl-6 sm:pl-8 group">
                <span className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-blue-600 border-[3px] border-white group-hover:scale-110 group-hover:border-white transition-all duration-300 shadow-md" />
                <div className="bg-white/10 backdrop-blur-md border border-white/30 p-4 rounded-xl shadow-sm hover:-translate-y-1 hover:bg-white/20 transition-all text-white">
                  <span className="text-[10px] font-black uppercase tracking-widest text-sky-100 mb-1 block">{step.year}</span>
                  <h4 className="text-base md:text-lg font-black text-white leading-tight mb-1 drop-shadow-sm">{step.title}</h4>
                  <p className="text-white/90 font-medium text-xs md:text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Translucent Base Knowledge Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-center sm:text-left mt-2">
        {/* Key Tools Array */}
        <div className="rounded-[2rem] bg-gradient-to-br from-indigo-50 to-white/60 border border-indigo-100 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-lg md:text-xl font-black text-indigo-950 mb-2 flex items-center justify-center sm:justify-start gap-2">
            <Laptop className="w-5 h-5 text-indigo-600" /> Daily Core Tools
          </h2>
          <p className="text-indigo-900/60 font-medium mb-4 text-xs md:text-sm">
            Professionals in this field consistently execute utilizing these software platforms or hardware.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            {career.keyTools.map((tool, i) => (
              <span key={i} className="px-3 py-1.5 bg-white text-indigo-900 shadow-sm border border-indigo-100/50 font-bold text-xs md:text-sm rounded-lg hover:-translate-y-0.5 transition-transform cursor-default">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Important Links Array */}
        <div className="rounded-[2rem] bg-gradient-to-br from-sky-50 to-white/60 border border-sky-100 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-lg md:text-xl font-black text-sky-950 mb-2 flex items-center justify-center sm:justify-start gap-2">
            <ExternalLink className="w-5 h-5 text-sky-600" /> Institutional Links
          </h2>
          <p className="text-sky-900/60 font-medium mb-4 text-xs md:text-sm">
            Official portals or global communities that govern standards for this career path.
          </p>
          <div className="space-y-2 text-left">
            {career.importantLinks.map((lnk, i) => (
              <a key={i} href={lnk.url} target="_blank" rel="noreferrer" className="flex items-center justify-between px-3 py-2.5 bg-white border border-sky-100/50 rounded-lg font-bold text-sky-700 hover:bg-sky-600 hover:text-white hover:border-sky-600 shadow-sm transition-all group text-xs md:text-sm">
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
