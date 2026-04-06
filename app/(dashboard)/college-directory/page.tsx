'use client';

import { useEffect, useState } from 'react';
import {
  MapPin, GraduationCap, Star, SlidersHorizontal,
  X, Wifi, BookOpen, Home, Monitor, FlaskConical,
  ChevronDown, Dumbbell, Coffee, Search, ArrowRight,
  Building2, Users, TrendingUp, Award,
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

/* ─── Types ─────────────────────────────────────────────── */
interface College {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  distance_km: number;
  college_type: string;
  facilities: string[];
  image_url: string;
}
interface Course {
  degree_name: string;
  stream: string;
  cutoff_percentage: number;
}

/* ─── Fallback data ──────────────────────────────────────── */
const FALLBACK_COLLEGES: College[] = [
  { id: '1', name: 'Maharaja College',            location: 'Station Rd, Jaipur',    city: 'Jaipur', state: 'Rajasthan', distance_km: 2.5, college_type: 'Government', facilities: ['Hostel', 'Lab', 'Library'],         image_url: '' },
  { id: '2', name: 'Government Commerce College', location: 'MI Road, Jaipur',        city: 'Jaipur', state: 'Rajasthan', distance_km: 1.0, college_type: 'Government', facilities: ['Library', 'Internet', 'Cafeteria'],  image_url: '' },
  { id: '3', name: 'Government Maharani College', location: 'Chaura Rasta, Jaipur',   city: 'Jaipur', state: 'Rajasthan', distance_km: 2.5, college_type: 'Government', facilities: ['Hostel', 'Lab', 'Sports'],           image_url: '' },
  { id: '4', name: 'Shri K.B. Commerce College',  location: 'Tonk Road, Jaipur',      city: 'Jaipur', state: 'Rajasthan', distance_km: 2.6, college_type: 'Government', facilities: ['Library', 'Lab', 'Canteen'],         image_url: '' },
  { id: '5', name: 'Rajasthan University',         location: 'JLN Marg, Jaipur',       city: 'Jaipur', state: 'Rajasthan', distance_km: 3.1, college_type: 'Government', facilities: ['Hostel', 'Research', 'Sports'],      image_url: '' },
  { id: '6', name: 'Shri K4. Commerce College',   location: 'Vaishali Nagar, Jaipur', city: 'Jaipur', state: 'Rajasthan', distance_km: 2.6, college_type: 'Government', facilities: ['Library', 'Lab', 'Internet'],        image_url: '' },
];

const FALLBACK_COURSES: Record<string, Course[]> = {
  '1': [{ degree_name: 'BA', stream: 'Arts', cutoff_percentage: 72 }, { degree_name: 'B.Sc.', stream: 'Science', cutoff_percentage: 78 }],
  '2': [{ degree_name: 'B.Com', stream: 'Commerce', cutoff_percentage: 70 }, { degree_name: 'BBA', stream: 'Commerce', cutoff_percentage: 79 }],
  '3': [{ degree_name: 'BA', stream: 'Arts', cutoff_percentage: 80 }, { degree_name: 'B.Sc.', stream: 'Science', cutoff_percentage: 82 }, { degree_name: 'B.Com', stream: 'Commerce', cutoff_percentage: 75 }],
  '4': [{ degree_name: 'B.Com', stream: 'Commerce', cutoff_percentage: 65 }, { degree_name: 'BBA', stream: 'Commerce', cutoff_percentage: 70 }],
  '5': [{ degree_name: 'B.Tech', stream: 'Science', cutoff_percentage: 85 }, { degree_name: 'MBA', stream: 'Commerce', cutoff_percentage: 80 }],
  '6': [{ degree_name: 'B.Com', stream: 'Commerce', cutoff_percentage: 68 }, { degree_name: 'BBA', stream: 'Commerce', cutoff_percentage: 72 }],
};

/* ─── Config ─────────────────────────────────────────────── */
const FACILITY_ICONS: Record<string, React.ElementType> = {
  Hostel: Home, Library: BookOpen, Internet: Wifi,
  Lab: FlaskConical, Canteen: Coffee, Sports: Dumbbell,
  Research: Monitor, Cafeteria: Coffee, default: Monitor,
};

const STREAM_CFG: Record<string, { gradient: string; light: string; text: string; label: string }> = {
  Science:    { gradient: 'linear-gradient(135deg,#3B82F6,#6366F1)', light: '#EEF2FF', text: '#4F46E5', label: 'Science' },
  Commerce:   { gradient: 'linear-gradient(135deg,#F97316,#EF4444)', light: '#FFF7ED', text: '#C2410C', label: 'Commerce' },
  Arts:       { gradient: 'linear-gradient(135deg,#8B5CF6,#EC4899)', light: '#FDF4FF', text: '#7C3AED', label: 'Arts' },
  Vocational: { gradient: 'linear-gradient(135deg,#10B981,#059669)', light: '#ECFDF5', text: '#065F46', label: 'Vocational' },
};

/* ─── Card colour palettes ───────────────────────────────── */
const PALETTES = [
  { bg: '#EEF2FF', roof: '#818CF8', wall: '#C7D2FE', win: '#E0E7FF', door: '#6366F1' },
  { bg: '#FFF7ED', roof: '#FB923C', wall: '#FED7AA', win: '#FEF3C7', door: '#F97316' },
  { bg: '#F0FDF4', roof: '#4ADE80', wall: '#BBF7D0', win: '#DCFCE7', door: '#16A34A' },
  { bg: '#FDF4FF', roof: '#C084FC', wall: '#E9D5FF', win: '#FAF5FF', door: '#9333EA' },
  { bg: '#EFF6FF', roof: '#60A5FA', wall: '#BFDBFE', win: '#DBEAFE', door: '#3B82F6' },
  { bg: '#FFF1F2', roof: '#FB7185', wall: '#FECDD3', win: '#FFE4E6', door: '#E11D48' },
];

function CollegeIllustration({ index }: { index: number }) {
  const p = PALETTES[index % PALETTES.length];
  return (
    <svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="100" fill={p.bg} />
      <ellipse cx="220" cy="16" rx="22" ry="8" fill="white" opacity="0.6" />
      <ellipse cx="208" cy="16" rx="14" ry="10" fill="white" opacity="0.6" />
      <ellipse cx="238" cy="16" rx="12" ry="7" fill="white" opacity="0.5" />
      <ellipse cx="50" cy="14" rx="16" ry="6" fill="white" opacity="0.5" />
      <ellipse cx="40" cy="14" rx="10" ry="8" fill="white" opacity="0.5" />
      {/* left wing */}
      <rect x="8" y="48" width="36" height="52" rx="2" fill={p.wall} />
      <polygon points="8,48 44,48 26,32" fill={p.roof} />
      {[0,1].map(r => [0,1].map(c => (
        <rect key={`lw${r}${c}`} x={13+c*16} y={55+r*18} width="10" height="12" rx="1" fill={p.win} opacity="0.9" />
      )))}
      {/* main building */}
      <rect x="72" y="28" width="136" height="72" rx="3" fill={p.wall} />
      <polygon points="64,28 216,28 140,4" fill={p.roof} />
      {[0,1,2,3,4].map(i => (
        <rect key={`col${i}`} x={80+i*23} y={28} width="5" height="72" rx="1" fill="white" opacity="0.22" />
      ))}
      {[0,1].map(r => [0,1,2,3].map(c => (
        <rect key={`mw${r}${c}`} x={80+c*26} y={38+r*26} width="16" height="18" rx="1.5" fill={p.win} opacity="0.85" />
      )))}
      <rect x="122" y="72" width="36" height="28" rx="2" fill={p.door} opacity="0.7" />
      <rect x="130" y="78" width="8" height="14" rx="1" fill={p.win} opacity="0.8" />
      <rect x="142" y="78" width="8" height="14" rx="1" fill={p.win} opacity="0.8" />
      {/* right wing */}
      <rect x="236" y="52" width="36" height="48" rx="2" fill={p.wall} />
      <polygon points="236,52 272,52 254,36" fill={p.roof} />
      {[0,1].map(r => [0,1].map(c => (
        <rect key={`rw${r}${c}`} x={241+c*16} y={58+r*18} width="10" height="12" rx="1" fill={p.win} opacity="0.9" />
      )))}
      {/* trees */}
      <ellipse cx="58" cy="82" rx="10" ry="14" fill="#4ADE80" opacity="0.55" />
      <rect x="56" y="90" width="4" height="10" fill="#92400E" opacity="0.4" />
      <ellipse cx="222" cy="84" rx="9" ry="12" fill="#4ADE80" opacity="0.55" />
      <rect x="220" y="91" width="4" height="9" fill="#92400E" opacity="0.4" />
      <rect x="0" y="98" width="280" height="2" rx="1" fill={p.roof} opacity="0.3" />
    </svg>
  );
}

/* ─── College Card ───────────────────────────────────────── */
function CollegeCard({
  college, collegeCourses, shortlisted, onToggleShortlist, index,
}: {
  college: College; collegeCourses: Course[];
  shortlisted: boolean; onToggleShortlist: () => void; index: number;
}) {
  const degrees = Array.from(new Set(collegeCourses.map(c => c.degree_name)));
  const topCourse = collegeCourses[0];
  const minCutoff = collegeCourses.length ? Math.min(...collegeCourses.map(c => c.cutoff_percentage)) : null;
  const streams = Array.from(new Set(collegeCourses.map(c => c.stream)));

  return (
    <div
      className="group rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
      style={{
        background: '#FFFFFF',
        border: '1.5px solid #F1F3FB',
        boxShadow: '0 2px 16px rgba(99,102,241,0.06)',
      }}
    >
      {/* Illustration */}
      <div className="relative overflow-hidden" style={{ height: 100 }}>
        <CollegeIllustration index={index} />
        <div className="absolute top-2.5 left-3 flex gap-1.5 flex-wrap">
          {streams.slice(0, 2).map(s => {
            const cfg = STREAM_CFG[s] ?? STREAM_CFG.Science;
            return (
              <span key={s} className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.92)', color: cfg.text }}>
                {cfg.label}
              </span>
            );
          })}
        </div>
        <div className="absolute top-2 right-2.5 flex items-center gap-1.5">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.92)', color: '#6366F1' }}>
            {college.distance_km} km
          </span>
          <button
            onClick={onToggleShortlist}
            className="w-6 h-6 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            style={{ background: 'rgba(255,255,255,0.92)' }}
          >
            <Star className="w-3 h-3" fill={shortlisted ? '#FBBF24' : 'none'} stroke={shortlisted ? '#FBBF24' : '#94A3B8'} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pt-3.5 pb-1 flex-1 flex flex-col">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Building2 className="w-3 h-3" style={{ color: '#94A3B8' }} />
          <span className="text-[10.5px] font-semibold uppercase tracking-wide" style={{ color: '#94A3B8' }}>
            {college.college_type}
          </span>
        </div>
        <h3 className="text-[14px] font-extrabold leading-snug mb-1" style={{ color: '#0F172A', letterSpacing: '-0.2px' }}>
          {college.name}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: '#CBD5E1' }} />
          <span className="text-[11.5px]" style={{ color: '#94A3B8' }}>{college.location}</span>
        </div>
        <div className="flex items-center gap-1 flex-wrap mb-3">
          <GraduationCap className="w-3 h-3 flex-shrink-0" style={{ color: '#6366F1' }} />
          {degrees.slice(0, 4).map((d, i) => (
            <span key={i} className="text-[11px] font-bold" style={{ color: '#6366F1' }}>
              {d}{i < Math.min(degrees.length, 4) - 1 ? ',' : ''}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 flex-wrap mb-3.5">
          {(college.facilities ?? []).slice(0, 4).map((f, i) => {
            const FIcon = FACILITY_ICONS[f] ?? FACILITY_ICONS.default;
            return (
              <span key={i} className="flex items-center gap-1 text-[11px] font-medium" style={{ color: '#94A3B8' }}>
                <FIcon className="w-3 h-3" /> {f}
              </span>
            );
          })}
        </div>
        {minCutoff !== null && (
          <div className="flex items-center justify-between px-3 py-2 rounded-xl mb-3.5" style={{ background: '#F8F9FF', border: '1px solid #EEF0FD' }}>
            <div>
              <span className="text-[10px] font-medium block" style={{ color: '#94A3B8' }}>Min. Cut-off</span>
              <span className="text-[15px] font-black" style={{ color: '#0F172A' }}>{minCutoff}%</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-medium block" style={{ color: '#94A3B8' }}>Courses</span>
              <span className="text-[15px] font-black" style={{ color: '#0F172A' }}>{collegeCourses.length}</span>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6366F1,#8B5CF6)' }}>
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 flex items-center gap-2">
        <Link href={`/college-directory/${college.id}`} className="text-[12px] font-semibold transition-colors" style={{ color: '#94A3B8' }}>
          Details
        </Link>
        <Link
          href={`/college-directory/${college.id}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-bold text-white transition-all hover:opacity-95 active:scale-98"
          style={{ background: 'linear-gradient(135deg,#6366F1 0%,#8B5CF6 100%)', boxShadow: '0 4px 14px rgba(99,102,241,0.3)' }}
        >
          View Details <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function CollegeDirectoryPage() {
  const [colleges, setColleges]         = useState<College[]>(FALLBACK_COLLEGES);
  const [courses, setCourses]           = useState<Record<string, Course[]>>(FALLBACK_COURSES);
  const [shortlisted, setShortlisted]   = useState<Set<string>>(new Set());
  const [search, setSearch]             = useState('');
  const [activeStream, setActiveStream] = useState<string | null>(null);

  useEffect(() => {
    // (async () => {
    //   try {
    //     const { data: cd, error } = await supabase.from('colleges').select('*').order('distance_km');
    //     if (error || !cd?.length) return;
    //     const results = await Promise.all(
    //       cd.map((c: College) => supabase.from('courses').select('degree_name,stream,cutoff_percentage').eq('college_id', c.id))
    //     );
    //     const map: Record<string, Course[]> = {};
    //     cd.forEach((c: College, i: number) => { map[c.id] = results[i].data ?? []; });
    //     setColleges(cd);
    //     setCourses(map);
    //   } catch { /* keep fallback */ }
    // })();
  }, []);

  const toggleShortlist = (id: string) =>
    setShortlisted(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const filtered = colleges.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = c.name.toLowerCase().includes(q) || (c.city ?? '').toLowerCase().includes(q);
    const matchStream = !activeStream || (courses[c.id] ?? []).some(cr => cr.stream === activeStream);
    return matchSearch && matchStream;
  });

  const shortlistedColleges = colleges.filter(c => shortlisted.has(c.id));
  const streams = ['Science', 'Arts', 'Commerce', 'Vocational'];

  const stats = [
    { icon: Building2, label: 'Colleges',     value: colleges.length, color: '#6366F1', bg: '#EEF2FF' },
    { icon: GraduationCap, label: 'Courses',  value: Object.values(courses).flat().length, color: '#8B5CF6', bg: '#F5F3FF' },
    { icon: Users, label: 'Students',         value: '12K+', color: '#06B6D4', bg: '#ECFEFF' },
    { icon: Award, label: 'Gov. Colleges',    value: colleges.filter(c => c.college_type === 'Government').length, color: '#F59E0B', bg: '#FFFBEB' },
  ];

  return (
    <div className="space-y-6">

      {/* ── Hero ── */}
      <div
        className="relative rounded-3xl overflow-hidden px-7 py-7"
        style={{
          background: 'linear-gradient(135deg, #1E1B4B 0%, #3730A3 45%, #6366F1 100%)',
          boxShadow: '0 20px 60px rgba(99,102,241,0.35)',
        }}
      >
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
        <div className="absolute top-4 right-32 w-20 h-20 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest" style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}>
                Learnthru · Career Guidance
              </span>
            </div>
            <h1 className="text-3xl font-black text-white mb-2 leading-tight" style={{ letterSpacing: '-0.5px' }}>
              College Directory
            </h1>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.72)', maxWidth: 420, lineHeight: '1.6' }}>
              Discover nearby government colleges, compare courses, check cut-offs, and shortlist the ones that match your career goals.
            </p>
          </div>
          <div
            className="flex items-center gap-2 px-5 py-3 rounded-2xl self-start sm:self-auto flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.18)' }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>Your location</p>
              <p className="text-[13px] font-bold text-white">Jaipur, Rajasthan</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div
            key={i}
            className="rounded-2xl px-4 py-3.5 flex items-center gap-3"
            style={{ background: '#FFFFFF', border: '1.5px solid #F1F3FB', boxShadow: '0 1px 8px rgba(99,102,241,0.05)' }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
              <s.icon className="w-4 h-4" style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-[18px] font-black leading-none mb-0.5" style={{ color: '#0F172A' }}>{s.value}</p>
              <p className="text-[11px] font-medium" style={{ color: '#94A3B8' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filter bar ── */}
      <div
        className="rounded-2xl px-4 py-3 flex flex-wrap items-center gap-2.5"
        style={{ background: '#FFFFFF', border: '1.5px solid #F1F3FB', boxShadow: '0 2px 12px rgba(99,102,241,0.06)' }}
      >
        <div className="relative" style={{ minWidth: 200, flex: '1 1 200px' }}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#CBD5E1' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by college or city…"
            className="w-full pl-9 pr-3 py-2 text-[13px] rounded-xl outline-none"
            style={{ background: '#F8FAFF', border: '1.5px solid #EEF0FD', color: '#0F172A' }}
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-3 h-3" style={{ color: '#CBD5E1' }} />
            </button>
          )}
        </div>
        <div className="hidden sm:block w-px h-6" style={{ background: '#EEF0FD' }} />
        <button className="flex items-center gap-1.5 text-[12.5px] font-semibold px-3.5 py-2 rounded-xl" style={{ background: '#EEF2FF', color: '#6366F1', border: '1.5px solid #E0E7FF' }}>
          <MapPin className="w-3.5 h-3.5" /> Location <ChevronDown className="w-3 h-3 opacity-60" />
        </button>
        <button className="flex items-center gap-1.5 text-[12.5px] font-medium px-3.5 py-2 rounded-xl" style={{ background: '#FAFBFF', color: '#475569', border: '1.5px solid #EEF0FD' }}>
          <GraduationCap className="w-3.5 h-3.5" style={{ color: '#6366F1', opacity: 0.8 }} />
          Degree Programs:&nbsp;<span className="font-bold" style={{ color: '#6366F1' }}>BA, B.Sc., B.Com, B.Tech</span>
          <ChevronDown className="w-3 h-3 opacity-50" />
        </button>
        <button className="flex items-center gap-1.5 text-[12.5px] font-medium px-3.5 py-2 rounded-xl" style={{ background: '#FAFBFF', color: '#475569', border: '1.5px solid #EEF0FD' }}>
          <SlidersHorizontal className="w-3.5 h-3.5 opacity-60" /> Advanced Filters
        </button>
        {(search || activeStream) && (
          <button
            onClick={() => { setSearch(''); setActiveStream(null); }}
            className="flex items-center gap-1 text-[12.5px] font-semibold px-3.5 py-2 rounded-xl"
            style={{ background: '#FFF1F2', color: '#E11D48', border: '1.5px solid #FFE4E6' }}
          >
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      {/* ── Stream tabs ── */}
      <div className="flex items-center gap-2 flex-wrap">
        {streams.map(s => {
          const cfg = STREAM_CFG[s] ?? STREAM_CFG.Science;
          const active = activeStream === s;
          return (
            <button
              key={s}
              onClick={() => setActiveStream(active ? null : s)}
              className="px-4 py-2 rounded-full text-[13px] font-bold transition-all"
              style={active
                ? { background: cfg.gradient, color: '#fff', boxShadow: '0 4px 14px rgba(99,102,241,0.3)' }
                : { background: '#F1F5F9', color: '#64748B' }
              }
            >
              {s}
            </button>
          );
        })}
        <div className="flex items-center gap-1.5 ml-2 text-[12.5px] font-semibold" style={{ color: '#6366F1' }}>
          <MapPin className="w-3.5 h-3.5" /> Jaipur, Rajasthan
        </div>
        <span className="ml-auto text-[13px] font-semibold" style={{ color: '#94A3B8' }}>
          {filtered.length} college{filtered.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {/* ── Main layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

        {/* Cards */}
        <div className="lg:col-span-2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 rounded-2xl" style={{ background: '#F8FAFF', border: '2px dashed #E0E7FF' }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3" style={{ background: '#EEF2FF' }}>
                <GraduationCap className="w-7 h-7" style={{ color: '#6366F1', opacity: 0.5 }} />
              </div>
              <p className="text-[14px] font-semibold mb-1" style={{ color: '#475569' }}>No colleges found</p>
              <p className="text-[12px]" style={{ color: '#94A3B8' }}>Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((college, i) => (
                <CollegeCard
                  key={college.id}
                  index={i}
                  college={college}
                  collegeCourses={courses[college.id] ?? []}
                  shortlisted={shortlisted.has(college.id)}
                  onToggleShortlist={() => toggleShortlist(college.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar — plain flow, no sticky */}
        <div className="space-y-4">

          {/* ── My Shortlist ── */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: '#FFFFFF', border: '1.5px solid #F1F3FB', boxShadow: '0 2px 12px rgba(99,102,241,0.06)' }}
          >
            {/* header bar */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ background: '#FAFBFF', borderBottom: '1.5px solid #F1F3FB' }}
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" fill="#FBBF24" stroke="#FBBF24" />
                <span className="text-[13px] font-extrabold" style={{ color: '#0F172A' }}>My Shortlist</span>
              </div>
              {shortlistedColleges.length > 0 && (
                <span
                  className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                  style={{ background: '#FEF3C7', color: '#B45309' }}
                >
                  {shortlistedColleges.length} saved
                </span>
              )}
            </div>

            {/* body */}
            <div className="px-4 py-3">
              {shortlistedColleges.length === 0 ? (
                <div className="flex flex-col items-center py-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                    style={{ background: '#FFFBEB' }}
                  >
                    <Star className="w-6 h-6" style={{ color: '#FCD34D', opacity: 0.5 }} />
                  </div>
                  <p className="text-[12.5px] font-semibold mb-1" style={{ color: '#64748B' }}>
                    No colleges shortlisted yet
                  </p>
                  <p className="text-[11px] text-center leading-relaxed" style={{ color: '#94A3B8' }}>
                    Tap the ☆ star icon on any college card to save it here for easy comparison.
                  </p>
                </div>
              ) : (
                <div>
                  {shortlistedColleges.map((c, idx) => (
                    <div
                      key={c.id}
                      className="flex items-center gap-2.5 py-2.5"
                      style={{ borderBottom: idx < shortlistedColleges.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                    >
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-black"
                        style={{ background: '#EEF2FF', color: '#6366F1' }}
                      >
                        {idx + 1}
                      </div>
                      <span className="text-[12px] font-semibold flex-1 leading-snug" style={{ color: '#0F172A' }}>
                        {c.name}
                      </span>
                      <button
                        onClick={() => toggleShortlist(c.id)}
                        title="Remove from shortlist"
                        className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors"
                        style={{ background: '#FFF1F2' }}
                      >
                        <X className="w-3 h-3" style={{ color: '#F43F5E' }} />
                      </button>
                    </div>
                  ))}
                  <button
                    className="w-full mt-4 py-2.5 rounded-xl text-[12px] font-extrabold flex items-center justify-center gap-1.5 transition-all hover:opacity-90 active:scale-98"
                    style={{
                      background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
                      color: '#fff',
                      boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
                    }}
                  >
                    Compare Shortlisted <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── Active Filters ── */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: '#FFFFFF', border: '1.5px solid #F1F3FB', boxShadow: '0 2px 12px rgba(99,102,241,0.06)' }}
          >
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ background: '#FAFBFF', borderBottom: '1.5px solid #F1F3FB' }}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" style={{ color: '#6366F1' }} />
              <span className="text-[13px] font-extrabold" style={{ color: '#0F172A' }}>Active Filters</span>
            </div>
            <div className="px-4 py-3 flex flex-wrap gap-2">
              {/* Location — always shown */}
              <span
                className="flex items-center gap-1.5 text-[11.5px] font-semibold px-3 py-1.5 rounded-full"
                style={{ background: '#EEF2FF', color: '#4F46E5' }}
              >
                <MapPin className="w-2.5 h-2.5" /> Jaipur, Rajasthan
              </span>
              {/* Degree — always shown */}
              <span
                className="flex items-center gap-1.5 text-[11.5px] font-semibold px-3 py-1.5 rounded-full"
                style={{ background: '#EEF2FF', color: '#4F46E5' }}
              >
                <GraduationCap className="w-2.5 h-2.5" /> BA, B.Sc., B.Com…
              </span>
              {/* Cutoff — always shown */}
              <span
                className="text-[11.5px] font-bold px-3 py-1.5 rounded-full"
                style={{ background: '#6366F1', color: '#fff' }}
              >
                75% &amp; below
              </span>
              {/* Active stream — shown only when selected */}
              {activeStream && (
                <button
                  onClick={() => setActiveStream(null)}
                  className="flex items-center gap-1.5 text-[11.5px] font-semibold px-3 py-1.5 rounded-full transition-colors"
                  style={{ background: '#F5F3FF', color: '#7C3AED', border: '1.5px solid #EDE9FE' }}
                >
                  {activeStream}
                  <X className="w-2.5 h-2.5" />
                </button>
              )}
              {/* Active search — shown only when typing */}
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="flex items-center gap-1.5 text-[11.5px] font-semibold px-3 py-1.5 rounded-full transition-colors"
                  style={{ background: '#FFF1F2', color: '#E11D48', border: '1.5px solid #FFE4E6' }}
                >
                  "{search}"
                  <X className="w-2.5 h-2.5" />
                </button>
              )}
            </div>
          </div>

          {/* ── Quick Tip ── */}
          <div
            className="rounded-2xl p-5"
            style={{ background: '#1E1B4B', border: '1.5px solid #312E81' }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                <Award className="w-4 h-4" style={{ color: '#A5B4FC' }} />
              </div>
              <p className="text-[13.5px] font-extrabold" style={{ color: '#E0E7FF' }}>Quick Tip</p>
            </div>
            <p className="text-[12px] leading-relaxed" style={{ color: '#A5B4FC' }}>
              Compare at least <span style={{ color: '#C7D2FE', fontWeight: 700 }}>3–4 colleges</span> before deciding. Always check the cut-off percentage for your specific stream, not just the general cut-off.
            </p>
            <div
              className="mt-3 pt-3 flex items-start gap-2"
              style={{ borderTop: '1px solid rgba(99,102,241,0.25)' }}
            >
              <div
                className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(99,102,241,0.3)' }}
              >
                <GraduationCap className="w-3 h-3" style={{ color: '#A5B4FC' }} />
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: '#818CF8' }}>
                Government colleges often have better faculty-to-student ratios and lower fees than private ones.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}