'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
 
import {
    Code, Database, Bot, Globe, Gamepad2, Shield,
    FlaskConical, Palette, TrendingUp, Wrench,
    ChevronDown, ArrowRight, BookOpen, Star, Zap,
    Microscope, Calculator, Music, Landmark, Briefcase,
    HeartPulse, Cpu, PenTool, Search, Filter,
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

/* ─── Types ──────────────────────────────────────────────── */
interface CareerPath {
    id: string;
    title: string;
    stream: string;
    degree_required: string;
    description: string;
    preparation_for: string[];
    job_opportunities: string[];
}

/* ─── Static fallback data for all streams ───────────────── */
const ALL_CAREERS: CareerPath[] = [
    // Science Careers
    { id: '1', title: 'Software Developer', stream: 'science', degree_required: 'B.Sc. Computer Science', description: 'Build software applications and systems', preparation_for: ['GATE', 'Private IT Firms', 'Startups'], job_opportunities: ['Google', 'Infosys', 'TCS'] },
    { id: '2', title: 'Data Scientist', stream: 'science', degree_required: 'B.Sc. Computer Science', description: 'Analyse large datasets to derive insights', preparation_for: ['M.Sc.', 'Private Firms', 'Govt. Research'], job_opportunities: ['Amazon', 'Flipkart', 'ISRO'] },
    { id: '3', title: 'Artificial Intelligence Engineer', stream: 'science', degree_required: 'B.Sc. Computer Science', description: 'Design AI/ML systems and models', preparation_for: ['GATE', 'IIT-JAM', 'Tech Companies'], job_opportunities: ['Microsoft', 'OpenAI', 'DeepMind'] },
    { id: '4', title: 'Web Developer', stream: 'science', degree_required: 'B.Sc. Computer Science', description: 'Build responsive websites and web apps', preparation_for: ['GATE', 'IT Companies', 'Startups'], job_opportunities: ['Wipro', 'HCL', 'Freelance'] },
    { id: '5', title: 'Game Developer', stream: 'science', degree_required: 'B.Sc. Computer Science', description: 'Create video games for multiple platforms', preparation_for: ['GATE', 'Game Studios', 'Indie Dev'], job_opportunities: ['Ubisoft', 'EA', 'Rockstar'] },
    { id: '6', title: 'Cybersecurity Analyst', stream: 'science', degree_required: 'B.Sc. Computer Science', description: 'Protect systems from digital threats', preparation_for: ['GATE', 'DRDO', 'Tech Firms'], job_opportunities: ['ISRO', 'NIC', 'Cisco'] },

    // Arts Careers
    { id: '7', title: 'Graphic Designer', stream: 'arts', degree_required: 'B.F.A.', description: 'Create visual content for brands', preparation_for: ['Design Agencies', 'Ad Firms', 'Freelance'], job_opportunities: ['WPP', 'Ogilvy', 'Publicis'] },
    { id: '8', title: 'Content Writer', stream: 'arts', degree_required: 'B.A. English', description: 'Craft engaging written content', preparation_for: ['Media Houses', 'Publishing', 'Digital'], job_opportunities: ['HarperCollins', 'TOI', 'BuzzFeed'] },
    { id: '9', title: 'Film Director', stream: 'arts', degree_required: 'B.F.A.', description: 'Direct films and visual narratives', preparation_for: ['FTII', 'Film Studios', 'OTT'], job_opportunities: ['Bollywood', 'Netflix', 'Amazon Prime'] },
    { id: '10', title: 'UX Designer', stream: 'arts', degree_required: 'B.Des', description: 'Design user-centred digital experiences', preparation_for: ['Design Bootcamps', 'Tech Firms', 'Agencies'], job_opportunities: ['Google', 'Swiggy', 'Zomato'] },
    { id: '11', title: 'Journalist', stream: 'arts', degree_required: 'B.A. Journalism', description: 'Report and investigate news stories', preparation_for: ['IIMC', 'Media Houses', 'Freelance'], job_opportunities: ['NDTV', 'The Hindu', 'Reuters'] },
    { id: '12', title: 'Musician', stream: 'arts', degree_required: 'B.Music', description: 'Compose and perform music professionally', preparation_for: ['Music Labels', 'Film Industry', 'Teaching'], job_opportunities: ['T-Series', 'Sony Music', 'Spotify'] },

    // Commerce Careers
    { id: '13', title: 'Chartered Accountant', stream: 'commerce', degree_required: 'B.Com', description: 'Manage accounts, audits and taxation', preparation_for: ['CA Exams', 'Big 4 Firms', 'Govt'], job_opportunities: ['Deloitte', 'KPMG', 'EY'] },
    { id: '14', title: 'Investment Banker', stream: 'commerce', degree_required: 'BBA', description: 'Manage large financial transactions', preparation_for: ['MBA Finance', 'SEBI', 'Banks'], job_opportunities: ['Goldman Sachs', 'JP Morgan', 'HDFC'] },
    { id: '15', title: 'Marketing Manager', stream: 'commerce', degree_required: 'BBA', description: 'Drive brand growth and campaigns', preparation_for: ['MBA Marketing', 'Agencies', 'FMCG'], job_opportunities: ['HUL', 'P&G', 'Nestle'] },
    { id: '16', title: 'Entrepreneur', stream: 'commerce', degree_required: 'BBA', description: 'Build and scale your own business', preparation_for: ['Startup Incubators', 'VC Funding', 'IIM'], job_opportunities: ['Own Startup', 'Accelerators', 'CXO Roles'] },
    { id: '17', title: 'Financial Analyst', stream: 'commerce', degree_required: 'B.Com', description: 'Analyse financial data and investments', preparation_for: ['CFA', 'SEBI', 'Mutual Funds'], job_opportunities: ['Motilal Oswal', 'Zerodha', 'ICICI'] },
    { id: '18', title: 'HR Manager', stream: 'commerce', degree_required: 'BBA', description: 'Manage talent and organisational culture', preparation_for: ['MBA HR', 'Corporates', 'Consulting'], job_opportunities: ['Infosys', 'TCS', 'Accenture'] },
];

/* ─── Icon map ───────────────────────────────────────────── */
const ICON_MAP: Record<string, any> = {
    'Software Developer': Code,
    'Data Scientist': Database,
    'Artificial Intelligence Engineer': Bot,
    'Web Developer': Globe,
    'Game Developer': Gamepad2,
    'Cybersecurity Analyst': Shield,
    'Graphic Designer': PenTool,
    'Content Writer': BookOpen,
    'Film Director': Zap,
    'UX Designer': Cpu,
    'Journalist': Globe,
    'Musician': Music,
    'Chartered Accountant': Calculator,
    'Investment Banker': Landmark,
    'Marketing Manager': TrendingUp,
    'Entrepreneur': Briefcase,
    'Financial Analyst': TrendingUp,
    'HR Manager': Briefcase,
};

/* ─── Stream metadata ────────────────────────────────────── */
const STREAM_META: Record<string, any> = {
    science: {
        title: 'Science',
        gradient: 'linear-gradient(135deg,#667eea,#764ba2)',
        icon: FlaskConical,
        color: '#667eea',
        description: 'Discover careers in technology, research, and innovation',
        tagline: 'Explore & Innovate',
    },
    arts: {
        title: 'Arts',
        gradient: 'linear-gradient(135deg,#f093fb,#f5576c)',
        icon: Palette,
        color: '#f5576c',
        description: 'Unleash your creativity in design, media, and performing arts',
        tagline: 'Create & Express',
    },
    commerce: {
        title: 'Commerce',
        gradient: 'linear-gradient(135deg,#ff6b6b,#ffa726)',
        icon: TrendingUp,
        color: '#ff6b6b',
        description: 'Build your future in business, finance, and entrepreneurship',
        tagline: 'Lead & Grow',
    },
};

/* ─── Career Card ────────────────────────────────────────── */
function CareerCard({ career, onViewDetails }: { career: CareerPath; onViewDetails: () => void }) {
    const [shortlisted, setShortlisted] = useState(false);
    const Icon = ICON_MAP[career.title] || Code;
    const meta = STREAM_META[career.stream.toLowerCase()];

    return (
        <div
            className="rounded-3xl overflow-hidden flex flex-col hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
            style={{
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.7)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            }}
            onClick={onViewDetails}
        >
            {/* Gradient header */}
            <div className="relative h-32 flex items-center justify-center overflow-hidden" style={{ background: meta?.gradient }}>
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.5)' }} />
                <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full opacity-15" style={{ background: 'rgba(255,255,255,0.4)' }} />
                <div className="absolute inset-x-0 bottom-0 px-4 py-3 flex items-center gap-2" style={{ background: 'rgba(0,0,0,0.18)', backdropFilter: 'blur(4px)' }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.25)' }}>
                        <Icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-sm leading-tight">{career.title}</h3>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShortlisted(s => !s);
                        }}
                        className="ml-auto flex-shrink-0 transition-transform hover:scale-110 active:scale-95"
                    >
                        <Star
                            className="w-4 h-4 transition-colors"
                            fill={shortlisted ? '#fbbf24' : 'transparent'}
                            stroke={shortlisted ? '#fbbf24' : 'rgba(255,255,255,0.7)'}
                        />
                    </button>
                </div>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10" style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}>
                    <Icon className="w-9 h-9 text-white" />
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: meta?.color }}>
                        {meta?.title}
                    </span>
                </div>
                <p className="text-xs text-slate-500 mb-3 leading-relaxed line-clamp-2">{career.description}</p>

                <div className="mb-3">
                    <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> Degree Required
                    </p>
                    <p className="text-xs text-slate-600">{career.degree_required}</p>
                </div>

                <div className="mb-3">
                    <p className="text-xs font-bold text-slate-700 mb-2">Prepares for:</p>
                    <div className="space-y-1">
                        {career.preparation_for.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#64748b' }} />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {career.job_opportunities && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {career.job_opportunities.slice(0, 3).map((job, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-full text-xs font-medium text-slate-500" style={{ background: 'rgba(100,116,139,0.08)', border: '1px solid rgba(100,116,139,0.15)' }}>
                                {job}
                            </span>
                        ))}
                    </div>
                )}

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails();
                    }}
                    className="mt-auto w-full py-2.5 rounded-2xl text-white text-xs font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95"
                    style={{ background: meta?.gradient, boxShadow: `0 4px 14px rgba(0,0,0,0.15)` }}
                >
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function ViewCareerStreamPage() {
    const params = useParams();
    const stream = params.stream as string;
    const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
    const [filteredCareers, setFilteredCareers] = useState<CareerPath[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadCareerPaths();
    }, []);

    useEffect(() => {
        filterCareers();
    }, [careerPaths, searchQuery, stream]);

    const loadCareerPaths = useCallback(async () => {
    }, []);

    const filterCareers = useCallback(() => {
        let filtered = careerPaths.filter(c => c.stream.toLowerCase() === stream.toLowerCase());

        if (searchQuery) {
            filtered = filtered.filter(c =>
                c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.degree_required.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredCareers(filtered);
    }, [careerPaths, searchQuery, stream]);

    const meta = STREAM_META[stream.toLowerCase()];

    if (!meta) {
        return (
            <div className="text-center py-12">
                <h1 className="text-2xl font-bold text-slate-800 mb-4">Stream Not Found</h1>
                <p className="text-slate-600">The requested career stream does not exist.</p>
                <Link href="/view-career" className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    View All Careers
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {/* Hero header */}
            <div className="rounded-3xl p-7 relative overflow-hidden" style={{ background: meta.gradient, boxShadow: '0 20px 60px rgba(102,126,234,0.3)' }}>
                <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.5)' }} />
                <div className="absolute bottom-0 left-[30%] w-28 h-28 rounded-full opacity-10" style={{ background: 'rgba(255,255,255,0.6)' }} />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                            <meta.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <span className="text-white/80 text-sm font-semibold uppercase tracking-widest">Career Stream</span>
                            <h1 className="text-3xl font-black text-white leading-tight">{meta.title} Careers</h1>
                        </div>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed max-w-lg mb-4">
                        {meta.description}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-white/60 text-sm">Tagline:</span>
                        <span className="text-white font-semibold">{meta.tagline}</span>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="flex gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={`Search ${meta.title} careers...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-sm border-0 focus:ring-2 focus:ring-blue-500"
                            style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)' }}
                        />
                    </div>
                </div>
                <Link
                    href="/view-career"
                    className="px-6 py-2.5 rounded-2xl text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                    View All Streams
                </Link>
            </div>

            {/* Career Grid */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading careers...</p>
                </div>
            ) : filteredCareers.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-slate-600 mb-4">No careers found for this stream.</p>
                    <Link href="/view-career" className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        View All Careers
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCareers.map((career) => (
                        <CareerCard
                            key={career.id}
                            career={career}
                            onViewDetails={() => {
                                // For now, just log. In future, could navigate to detailed career page
                                console.log('View details for:', career.title);
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}