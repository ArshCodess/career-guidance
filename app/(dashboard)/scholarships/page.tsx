'use client';

import { useEffect, useState } from 'react';
import {
  Search, MapPin, Star, ArrowRight, ChevronDown,
  GraduationCap, Sparkles, Trophy, BookOpen, Users,
  TrendingUp, Award, Zap, ChevronRight, Clock, IndianRupee,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Scholarship {
  id: string;
  name: string;
  amount: number;
  amount_type: string;
  description: string;
  scholarship_type: string;
  stream: string;
  degree: string;
  location: string;
  tags: string[];
  is_featured: boolean;
}

/* ─── Static sample data shown when DB is empty ─────────── */
const SAMPLE_SCHOLARSHIPS: Scholarship[] = [
  {
    id: '1', is_featured: true,
    name: 'Prime Merit Scholarship',
    amount: 100000, amount_type: 'year',
    description: 'For Top 10% Students',
    scholarship_type: 'Merit-Based', stream: 'Science', degree: 'B.Sc',
    location: 'Jaipur',
    tags: ['Merit-Based', 'Science', 'Jaipur'],
  },
  {
    id: '2', is_featured: false,
    name: 'National Talent Scholarship',
    amount: 50000, amount_type: 'per year',
    description: 'For High Scorers across all streams in India',
    scholarship_type: 'Merit-Based', stream: 'All Streams', degree: 'B.Sc',
    location: 'India',
    tags: ['Merit-Based', 'All Streams', 'India'],
  },
  {
    id: '3', is_featured: false,
    name: 'Need-Based Education Grant',
    amount: 75000, amount_type: '/ year',
    description: 'For Economically weak Students across Rajasthan',
    scholarship_type: 'Need-Based', stream: 'All Streams', degree: 'B.Sc',
    location: 'Jaipur',
    tags: ['Need-Based', 'B.Sc', 'Jaipur'],
  },
  {
    id: '4', is_featured: false,
    name: 'Future Innovators Award',
    amount: 100000, amount_type: 'Scholarship',
    description: 'For Science Students pursuing research-oriented careers',
    scholarship_type: 'Merit-Based', stream: 'Science', degree: 'B.Sc',
    location: 'Rajasthan',
    tags: ['Merit-Based', 'B.Sc', 'Rajasthan'],
  },
  {
    id: '5', is_featured: false,
    name: 'Woman Empowerment Scholarship',
    amount: 60000, amount_type: 'per year',
    description: 'Exclusively for Female Students in Rajasthan',
    scholarship_type: 'Need-Based', stream: 'All Streams', degree: 'B.Sc',
    location: 'Rajasthan',
    tags: ['Female Only', 'B.Sc', 'Rajasthan'],
  },
  {
    id: '6', is_featured: false,
    name: 'Future Innovators Award',
    amount: 100000, amount_type: 'Scholarship',
    description: 'For Science Students pursuing research and innovation',
    scholarship_type: 'Merit-Based', stream: 'Science', degree: 'B.Sc',
    location: 'Rajasthan',
    tags: ['Merit-Based', 'B.Sc', 'Rajasthan'],
  },
  {
    id: '7', is_featured: false,
    name: 'Woman Empowerment Scholarship',
    amount: 60000, amount_type: 'per year',
    description: 'Empowering female students with financial aid',
    scholarship_type: 'Need-Based', stream: 'All Streams', degree: 'BA',
    location: 'Rajasthan',
    tags: ['Female Only', 'B.Sc', 'Rajasthan'],
  },
];

/* ─── Tag styles ─────────────────────────────────────────── */
const TAG_MAP: Record<string, { bg: string; text: string }> = {
  'Merit-Based':  { bg: '#EFF6FF', text: '#2563EB' },
  'Need-Based':   { bg: '#ECFDF5', text: '#059669' },
  'Female Only':  { bg: '#FDF2F8', text: '#DB2777' },
  'Science':      { bg: '#F0F9FF', text: '#0284C7' },
  'B.Sc':         { bg: '#F5F3FF', text: '#7C3AED' },
  'All Streams':  { bg: '#F0FDFA', text: '#0D9488' },
  'Rajasthan':    { bg: '#FFFBEB', text: '#D97706' },
  'Jaipur':       { bg: '#FFF1F2', text: '#E11D48' },
  'India':        { bg: '#FFF7ED', text: '#EA580C' },
};

function Tag({ label }: { label: string }) {
  const s = TAG_MAP[label] ?? { bg: '#F1F5F9', text: '#64748B' };
  return (
    <span
      className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: s.bg, color: s.text }}
    >
      {label}
    </span>
  );
}

/* ─── Stats bar ──────────────────────────────────────────── */
function StatsBar({ total }: { total: number }) {
  const stats = [
    { icon: Award,      label: 'Total Scholarships', value: total || '7+',   color: '#4F6FD8' },
    { icon: IndianRupee,label: 'Max Award',           value: '₹1,00,000',     color: '#7C3AED' },
    { icon: Users,      label: 'Students Benefited',  value: '2,400+',        color: '#059669' },
    { icon: TrendingUp, label: 'Success Rate',         value: '94%',           color: '#F97316' },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className="relative rounded-2xl px-4 py-3 flex items-center gap-3 overflow-hidden"
          style={{
            background: 'white',
            border: '1px solid #EEF1FA',
            boxShadow: '0 2px 12px rgba(79,111,216,0.07)',
            animationDelay: `${i * 80}ms`,
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${s.color}15` }}
          >
            <s.icon size={16} style={{ color: s.color }} />
          </div>
          <div>
            <p className="text-lg font-extrabold text-slate-800 leading-none">{s.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
          </div>
          {/* Subtle corner accent */}
          <div
            className="absolute -right-3 -bottom-3 w-10 h-10 rounded-full opacity-10"
            style={{ background: s.color }}
          />
        </div>
      ))}
    </div>
  );
}

/* ─── Featured banner ────────────────────────────────────── */
function FeaturedCard({ s }: { s: Scholarship }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden mb-6"
      style={{
        background: 'linear-gradient(125deg,#2D4FC2 0%,#4F6FD8 40%,#7B96E8 75%,#A5B8F5 100%)',
        boxShadow: '0 12px 40px rgba(45,79,194,0.32)',
      }}
    >
      {/* Layered decorative shapes */}
      <div className="absolute -right-10 -top-10 w-52 h-52 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
      <div className="absolute right-20 -bottom-8 w-36 h-36 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
      <div className="absolute left-1/2 top-0 w-72 h-8 rotate-12 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
      <div className="absolute right-0 top-0 w-1/3 h-full" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.04))' }} />

      {/* Floating pin icon */}
      <MapPin size={100} strokeWidth={0.6} className="absolute right-4 top-0 text-white" style={{ opacity: 0.10 }} />

      {/* Floating badge */}
      <div
        className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
        style={{ background: 'rgba(255,255,255,0.18)', color: 'white', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}
      >
        <Zap size={11} />
        Hot Pick
      </div>

      <div className="relative px-5 py-5 sm:px-7 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="min-w-0">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white mb-3"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <Sparkles size={11} />
            Featured Scholarship
          </div>
          <h3 className="text-2xl font-extrabold text-white mb-1">{s.name}</h3>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-extrabold text-white">Up to ₹{s.amount.toLocaleString()}</span>
            <span className="text-sm text-white/70">/ {s.amount_type}</span>
          </div>
          <p className="text-sm text-white/80 mb-4">{s.description}</p>
          <div className="flex flex-wrap gap-2">
            {s.tags.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)' }}
              >
                {t}
              </span>
            ))}
            {s.location && (
              <span
                className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)' }}
              >
                <MapPin size={10} /> {s.location}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 shrink-0">
          <button
            className="px-8 py-3 rounded-xl text-sm font-extrabold text-white whitespace-nowrap hover:scale-105 active:scale-95 transition-all"
            style={{
              background: 'linear-gradient(135deg,#F97316,#DC2626)',
              boxShadow: '0 6px 20px rgba(249,115,22,0.50)',
            }}
          >
            Apply Now →
          </button>
          <div className="flex items-center gap-1 text-white/60 text-xs">
            <Clock size={11} />
            <span>Deadline: 30 Apr 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Scholarship card ───────────────────────────────────── */
const CARD_ACCENTS = [
  { bar: 'linear-gradient(135deg,#4F6FD8,#7B96E8)', glow: 'rgba(79,111,216,0.15)' },
  { bar: 'linear-gradient(135deg,#7C3AED,#A78BFA)', glow: 'rgba(124,58,237,0.15)' },
  { bar: 'linear-gradient(135deg,#059669,#34D399)', glow: 'rgba(5,150,105,0.15)'  },
  { bar: 'linear-gradient(135deg,#DB2777,#F472B6)', glow: 'rgba(219,39,119,0.15)' },
  { bar: 'linear-gradient(135deg,#D97706,#FCD34D)', glow: 'rgba(217,119,6,0.15)'  },
  { bar: 'linear-gradient(135deg,#0284C7,#38BDF8)', glow: 'rgba(2,132,199,0.15)'  },
];

function ScholarCard({ s, idx }: { s: Scholarship; idx: number }) {
  const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length];
  return (
    <div
      className="group flex flex-col rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1"
      style={{
        border: '1px solid #EEF1FA',
        boxShadow: '0 2px 12px rgba(79,111,216,0.07)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 32px ${accent.glow}, 0 2px 8px rgba(0,0,0,0.06)`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(79,111,216,0.07)';
      }}
    >
      {/* Top accent bar */}
      <div className="h-1.5 w-full" style={{ background: accent.bar }} />

      <div className="flex flex-col flex-1 p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${accent.glow}` }}
          >
            <GraduationCap size={18} style={{ color: accent.bar.includes('4F6FD8') ? '#4F6FD8' : accent.bar.includes('7C3AED') ? '#7C3AED' : accent.bar.includes('059669') ? '#059669' : accent.bar.includes('DB2777') ? '#DB2777' : accent.bar.includes('D97706') ? '#D97706' : '#0284C7' }} />
          </div>
          {s.location && (
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <MapPin size={10} /> {s.location}
            </span>
          )}
        </div>

        <h3 className="text-sm font-extrabold text-slate-800 mb-2 leading-snug group-hover:text-[#4F6FD8] transition-colors">
          {s.name}
        </h3>

        {/* Amount */}
        <div className="flex items-baseline gap-1.5 mb-1">
          <span
            className="text-2xl font-extrabold"
            style={{ background: accent.bar, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            ₹{s.amount.toLocaleString()}
          </span>
          <span className="text-xs text-slate-400 font-medium">{s.amount_type}</span>
        </div>

        <p className="text-xs text-slate-500 mb-4 leading-relaxed flex-1">{s.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {s.tags.slice(0, 3).map((t, i) => <Tag key={i} label={t} />)}
        </div>

        {/* CTA */}
        <button
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white transition-all group-hover:gap-3"
          style={{ background: accent.bar, boxShadow: `0 4px 12px ${accent.glow}` }}
        >
          View Details <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

/* ─── Category quick filters ─────────────────────────────── */
const CATEGORIES = [
  { label: 'All',          icon: Sparkles,      color: '#4F6FD8' },
  { label: 'Merit-Based',  icon: Trophy,        color: '#2563EB' },
  { label: 'Need-Based',   icon: Users,         color: '#059669' },
  { label: 'Female Only',  icon: Star,          color: '#DB2777' },
  { label: 'Science',      icon: BookOpen,      color: '#0284C7' },
];

/* ─── Page ───────────────────────────────────────────────── */
export default function ScholarshipsPage() {
  const [dbScholarships, setDbScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [degree, setDegree] = useState('');
  const [type, setType] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // useEffect(() => { loadScholarships(); }, []);

  // async function loadScholarships() {
  //   try {
  //     const { data } = await supabase
  //       .from('scholarships')
  //       .select('*')
  //       .order('is_featured', { ascending: false });
  //     if (data && data.length > 0) setDbScholarships(data);
  //   } catch (_) {}
  //   setLoading(false);
  // }

  // Use DB data if available, otherwise show samples
  const allData = dbScholarships.length > 0 ? dbScholarships : SAMPLE_SCHOLARSHIPS;
  const featured = allData.find(s => s.is_featured) || null;
  const rest = allData.filter(s => !s.is_featured);

  const filtered = rest.filter(s => {
    if (activeCategory !== 'All' && !s.tags.includes(activeCategory)) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.description?.toLowerCase().includes(search.toLowerCase())) return false;
    if (degree && s.degree && s.degree !== degree) return false;
    if (type && s.scholarship_type && s.scholarship_type !== type) return false;
    return true;
  });

  return (
    <div
      className="min-h-screen p-4 sm:p-6"
      style={{ background: 'linear-gradient(150deg,#EEF1FB 0%,#F0ECFF 45%,#E8F0FB 100%)' }}
    >
      {/* ── Page heading ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#4F6FD8,#7B96E8)' }}
            >
              <GraduationCap size={16} className="text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800">Scholarships</h1>
          </div>
          <p className="text-sm text-slate-500 ml-10">Discover funding opportunities tailored for you</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-[#4F6FD8]"
          style={{ background: 'white', border: '1px solid #DDE5F8', boxShadow: '0 2px 8px rgba(79,111,216,0.10)' }}
        >
          <Star size={14} className="text-amber-400 fill-amber-400" />
          My Shortlist
          <ChevronRight size={14} />
        </button>
      </div>

      {/* ── Stats ── */}
      <StatsBar total={allData.length} />

      {/* ── Search & Filters ── */}
      <div
        className="rounded-2xl p-4 mb-6 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3"
        style={{
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.9)',
          boxShadow: '0 4px 20px rgba(79,111,216,0.08)',
        }}
      >
        {/* Degree */}
        <div className="relative">
          <select
            value={degree}
            onChange={e => setDegree(e.target.value)}
            className="appearance-none pl-4 pr-8 py-2.5 rounded-xl text-sm text-slate-700 font-semibold focus:outline-none cursor-pointer"
            style={{ background: '#F8F9FE', border: '1.5px solid #E2E8F7' }}
          >
            <option value="">Select Degree</option>
            <option>B.Sc</option><option>BA</option><option>B.Com</option>
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Stream */}
        <div className="relative">
          <select
            className="appearance-none pl-4 pr-8 py-2.5 rounded-xl text-sm text-slate-700 font-semibold focus:outline-none cursor-pointer"
            style={{ background: '#F8F9FE', border: '1.5px solid #E2E8F7' }}
          >
            <option>B.Sc</option><option>BA</option><option>B.Com</option>
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Type */}
        <div className="relative">
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="appearance-none pl-4 pr-8 py-2.5 rounded-xl text-sm text-slate-700 font-semibold focus:outline-none cursor-pointer"
            style={{ background: '#F8F9FE', border: '1.5px solid #E2E8F7' }}
          >
            <option value="">General</option>
            <option>Merit-Based</option><option>Need-Based</option>
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search scholarships by name or description..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-slate-700 focus:outline-none"
            style={{ background: '#F8F9FE', border: '1.5px solid #E2E8F7' }}
          />
        </div>

        <button
          className="px-7 py-2.5 rounded-xl text-sm font-extrabold text-white active:scale-95 transition-transform flex items-center gap-2"
          style={{
            background: 'linear-gradient(135deg,#4F6FD8,#7B96E8)',
            boxShadow: '0 4px 14px rgba(79,111,216,0.35)',
          }}
        >
          <Search size={14} />
          Search
        </button>
      </div>

      {/* ── Featured ── */}
      {featured && <FeaturedCard s={featured} />}

      {/* ── Category pills ── */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat.label}
            onClick={() => setActiveCategory(cat.label)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all"
            style={
              activeCategory === cat.label
                ? {
                    background: `linear-gradient(135deg,${cat.color}22,${cat.color}33)`,
                    color: cat.color,
                    border: `1.5px solid ${cat.color}55`,
                    boxShadow: `0 2px 8px ${cat.color}22`,
                  }
                : {
                    background: 'white',
                    color: '#64748B',
                    border: '1.5px solid #E8EDF5',
                  }
            }
          >
            <cat.icon size={12} />
            {cat.label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-slate-400">Showing</span>
          <span
            className="text-xs font-extrabold px-2.5 py-1 rounded-full"
            style={{ background: '#EEF2FF', color: '#4F6FD8' }}
          >
            {filtered.length} scholarships
          </span>
        </div>
      </div>

      {/* ── Grid ── */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl bg-white h-56 animate-pulse" style={{ border: '1px solid #EEF1FA' }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
            style={{ background: 'linear-gradient(135deg,#EEF2FF,#E0E7FF)' }}
          >
            <GraduationCap size={36} className="text-indigo-300" />
          </div>
          <p className="text-base font-bold text-slate-500">No scholarships found</p>
          <p className="text-xs text-slate-400 mt-1">Try changing your filters or search term</p>
          <button
            onClick={() => { setSearch(''); setDegree(''); setType(''); setActiveCategory('All'); }}
            className="mt-4 px-5 py-2 rounded-xl text-sm font-semibold text-[#4F6FD8]"
            style={{ background: '#EEF2FF', border: '1px solid #C7D2F0' }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s, i) => <ScholarCard key={s.id} s={s} idx={i} />)}
        </div>
      )}

      {/* ── Bottom CTA banner ── */}
      {filtered.length > 0 && (
        <div
          className="mt-8 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            background: 'linear-gradient(135deg,#4F6FD8 0%,#7B96E8 50%,#A5B8F5 100%)',
            boxShadow: '0 8px 24px rgba(79,111,216,0.25)',
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles size={22} className="text-white" />
            </div>
            <div>
              <p className="text-white font-extrabold text-base">Can't find the right scholarship?</p>
              <p className="text-white/75 text-xs mt-0.5">Let us match you with scholarships based on your profile</p>
            </div>
          </div>
          <button
            className="px-6 py-2.5 rounded-xl text-sm font-extrabold text-[#4F6FD8] bg-white hover:scale-105 transition-transform whitespace-nowrap"
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }}
          >
            Get Matched →
          </button>
        </div>
      )}
    </div>
  );
}