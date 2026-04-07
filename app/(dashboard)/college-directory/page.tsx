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

/* ─── Types (mapped from MongoDB schema) ────────────────── */
interface Placement {
  highest_lpa?: number;
  median_lpa?: number;
  average_lpa?: number;
}

interface Specialization {
  course_id: string;
  course_name: string;
  stream: string;
  specialization_id: string;
  specialization_name: string;
  rank_in_specialization?: number;
  total_fee_inr?: number;
  annual_fee_inr?: number;
  fee_category?: string;
  entrance_exams?: string[];
  eligibility?: string;
  career_paths?: string[];
  college_id?: string;
}

interface College {
  _id: string;
  name: string;
  location: string;           // city string e.g. "Ghaziabad"
  location_tag: string;
  type: string;               // "Private Affiliated" | "Government" | etc.
  affiliation?: string;
  accreditation?: string;
  hostel_available?: boolean;
  hostel_fee_inr?: number;
  facilities: string[];
  placement_tier?: string;
  placements?: Placement;
  top_recruiters?: string[];
  website?: string;
  specializations_offered: Specialization[];
}

/* ─── Derived "Course" shape used by the card ───────────── */
interface Course {
  degree_name: string;
  stream: string;
  cutoff_percentage: number;    // mapped from rank_in_specialization (placeholder)
  annual_fee_inr?: number;
}

/* ─── Map MongoDB college → UI-friendly shape ────────────── */
function mapCollegeToUI(c: College): { college: UICollege; courses: Course[] } {
  const college: UICollege = {
    id: c._id,
    name: c.name,
    location: `${c.location}${c.affiliation ? ` · ${c.affiliation}` : ''}`,
    city: c.location_tag,
    state: '',
    distance_km: 0,             // not in schema; will show accreditation instead
    college_type: c.type,
    facilities: c.facilities ?? [],
    image_url: '',
    accreditation: c.accreditation,
    hostel_available: c.hostel_available,
    hostel_fee_inr: c.hostel_fee_inr,
    placement_tier: c.placement_tier,
    placements: c.placements,
    website: c.website,
    top_recruiters: c.top_recruiters,
  };

  const courses: Course[] = (c.specializations_offered ?? []).map(s => ({
    degree_name: s.course_name ?? s.course_id,
    stream: s.stream,
    cutoff_percentage: s.rank_in_specialization ?? 0,
    annual_fee_inr: s.annual_fee_inr,
  }));

  return { college, courses };
}

interface UICollege {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  distance_km: number;
  college_type: string;
  facilities: string[];
  image_url: string;
  accreditation?: string;
  hostel_available?: boolean;
  hostel_fee_inr?: number;
  placement_tier?: string;
  placements?: Placement;
  website?: string;
  top_recruiters?: string[];
}

/* ─── Fallback data (matches new schema shape) ───────────── */
const FALLBACK_RAW: College[] = [
  {
    _id: '1', name: 'ABES Engineering College', location: 'Ghaziabad', location_tag: 'ghaziabad',
    type: 'Private Affiliated', affiliation: 'AKTU', accreditation: 'NAAC A',
    hostel_available: true, hostel_fee_inr: 65000,
    facilities: ['Sports', 'Library', 'Placement Cell', 'Labs'],
    placement_tier: 'tier2',
    placements: { highest_lpa: 28, median_lpa: 5, average_lpa: 5.5 },
    top_recruiters: ['TCS', 'Wipro', 'Infosys'],
    website: 'https://www.abes.ac.in',
    specializations_offered: [
      { course_id: 'btech', course_name: 'B.Tech / B.E.', stream: 'science', specialization_id: 'btech_it', specialization_name: 'Information Technology', rank_in_specialization: 6, total_fee_inr: 500000, annual_fee_inr: 125000, fee_category: 'mid', entrance_exams: ['JEE Main', 'UPTAC'], eligibility: '10+2 PCM, 45%+', career_paths: ['IT Consultant', 'Network Engineer'], college_id: 'abes_engineering_college' },
    ],
  },
  {
    _id: '2', name: 'AKGEC (Ajay Kumar Garg Engineering College)', location: 'Ghaziabad', location_tag: 'ghaziabad',
    type: 'Private Affiliated', affiliation: 'AKTU', accreditation: 'NAAC A, NBA',
    hostel_available: true, hostel_fee_inr: 70000,
    facilities: ['Sports', 'Library', 'Placement Cell', 'Labs', 'Internet', 'Cafeteria'],
    placement_tier: 'tier2',
    placements: { highest_lpa: 32, median_lpa: 6, average_lpa: 6.2 },
    top_recruiters: ['TCS', 'Wipro', 'Infosys', 'Mphasis', 'Capgemini'],
    website: 'https://www.akgec.ac.in',
    specializations_offered: [
      { course_id: 'btech', course_name: 'B.Tech / B.E.', stream: 'science', specialization_id: 'btech_civil', specialization_name: 'Civil Engineering', rank_in_specialization: 6, total_fee_inr: 520000, annual_fee_inr: 130000, fee_category: 'mid', entrance_exams: ['JEE Main', 'UPTAC'], eligibility: '10+2 PCM, 45%+', career_paths: ['Civil Engineer', 'Urban Planner'], college_id: 'akgec' },
      { course_id: 'btech', course_name: 'B.Tech / B.E.', stream: 'science', specialization_id: 'btech_cs', specialization_name: 'Computer Science', rank_in_specialization: 4, total_fee_inr: 520000, annual_fee_inr: 130000, fee_category: 'mid', entrance_exams: ['JEE Main', 'UPTAC'], eligibility: '10+2 PCM, 45%+', career_paths: ['Software Engineer', 'Product Manager'], college_id: 'akgec' },
    ],
  },
];

/* ─── Config ─────────────────────────────────────────────── */
const FACILITY_ICONS: Record<string, React.ElementType> = {
  Hostel: Home, Library: BookOpen, Internet: Wifi,
  Lab: FlaskConical, Labs: FlaskConical, Canteen: Coffee,
  Sports: Dumbbell, Research: Monitor, Cafeteria: Coffee,
  'Placement Cell': Users, default: Monitor,
};

const STREAM_CFG: Record<string, { gradient: string; light: string; text: string; label: string }> = {
  science: { gradient: 'linear-gradient(135deg,#3B82F6,#6366F1)', light: '#EEF2FF', text: '#4F46E5', label: 'Science' },
  Science: { gradient: 'linear-gradient(135deg,#3B82F6,#6366F1)', light: '#EEF2FF', text: '#4F46E5', label: 'Science' },
  commerce: { gradient: 'linear-gradient(135deg,#F97316,#EF4444)', light: '#FFF7ED', text: '#C2410C', label: 'Commerce' },
  Commerce: { gradient: 'linear-gradient(135deg,#F97316,#EF4444)', light: '#FFF7ED', text: '#C2410C', label: 'Commerce' },
  arts: { gradient: 'linear-gradient(135deg,#8B5CF6,#EC4899)', light: '#FDF4FF', text: '#7C3AED', label: 'Arts' },
  Arts: { gradient: 'linear-gradient(135deg,#8B5CF6,#EC4899)', light: '#FDF4FF', text: '#7C3AED', label: 'Arts' },
  Vocational: { gradient: 'linear-gradient(135deg,#10B981,#059669)', light: '#ECFDF5', text: '#065F46', label: 'Vocational' },
};

const TIER_LABEL: Record<string, string> = {
  tier1: 'Tier 1', tier2: 'Tier 2', tier3: 'Tier 3',
};

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
      {[0, 1].map(r => [0, 1].map(c => (
        <rect key={`lw${r}${c}`} x={13 + c * 16} y={55 + r * 18} width="10" height="12" rx="1" fill={p.win} opacity="0.9" />
      )))}
      {/* main building */}
      <rect x="72" y="28" width="136" height="72" rx="3" fill={p.wall} />
      <polygon points="64,28 216,28 140,4" fill={p.roof} />
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={`col${i}`} x={80 + i * 23} y={28} width="5" height="72" rx="1" fill="white" opacity="0.22" />
      ))}
      {[0, 1].map(r => [0, 1, 2, 3].map(c => (
        <rect key={`mw${r}${c}`} x={80 + c * 26} y={38 + r * 26} width="16" height="18" rx="1.5" fill={p.win} opacity="0.85" />
      )))}
      <rect x="122" y="72" width="36" height="28" rx="2" fill={p.door} opacity="0.7" />
      <rect x="130" y="78" width="8" height="14" rx="1" fill={p.win} opacity="0.8" />
      <rect x="142" y="78" width="8" height="14" rx="1" fill={p.win} opacity="0.8" />
      {/* right wing */}
      <rect x="236" y="52" width="36" height="48" rx="2" fill={p.wall} />
      <polygon points="236,52 272,52 254,36" fill={p.roof} />
      {[0, 1].map(r => [0, 1].map(c => (
        <rect key={`rw${r}${c}`} x={241 + c * 16} y={58 + r * 18} width="10" height="12" rx="1" fill={p.win} opacity="0.9" />
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
  college: UICollege; collegeCourses: Course[];
  shortlisted: boolean; onToggleShortlist: () => void; index: number;
}) {
  const degrees = Array.from(new Set(collegeCourses.map(c => c.degree_name)));
  const minFee = collegeCourses.length
    ? Math.min(...collegeCourses.filter(c => c.annual_fee_inr).map(c => c.annual_fee_inr!))
    : null;
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
          {college.accreditation && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.92)', color: '#6366F1' }}>
              {college.accreditation}
            </span>
          )}
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
          {college.placement_tier && (
            <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#F0FDF4', color: '#16A34A' }}>
              {TIER_LABEL[college.placement_tier] ?? college.placement_tier}
            </span>
          )}
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

        {/* Stats row — fee + courses (replaces old cutoff row) */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl mb-3.5" style={{ background: '#F8F9FF', border: '1px solid #EEF0FD' }}>
          <div>
            <span className="text-[10px] font-medium block" style={{ color: '#94A3B8' }}>Annual Fee</span>
            <span className="text-[15px] font-black" style={{ color: '#0F172A' }}>
              {minFee ? `₹${(minFee / 1000).toFixed(0)}K` : '—'}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-medium block" style={{ color: '#94A3B8' }}>Specializations</span>
            <span className="text-[15px] font-black" style={{ color: '#0F172A' }}>{collegeCourses.length}</span>
          </div>
          {college.placements?.highest_lpa && (
            <div className="text-right">
              <span className="text-[10px] font-medium block" style={{ color: '#94A3B8' }}>Highest LPA</span>
              <span className="text-[15px] font-black" style={{ color: '#0F172A' }}>₹{college.placements.highest_lpa}L</span>
            </div>
          )}
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6366F1,#8B5CF6)' }}>
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 flex items-center gap-2">
        {college.website ? (
          <a href={college.website} target="_blank" rel="noopener noreferrer" className="text-[12px] font-semibold transition-colors" style={{ color: '#94A3B8' }}>
            Website
          </a>
        ) : (
          <Link href={`/college-directory/${college.id}`} className="text-[12px] font-semibold transition-colors" style={{ color: '#94A3B8' }}>
            Details
          </Link>
        )}
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
  const [colleges, setColleges] = useState<UICollege[]>([]);
  const [courses, setCourses] = useState<Record<string, Course[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shortlisted, setShortlisted] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [activeStream, setActiveStream] = useState<string | null>(null);

  useEffect(() => {
    async function fetchColleges() {
      try {
        setLoading(true);
        setError(null);

        // ── Fetch from your API endpoint ──────────────────────
        // Replace '/api/colleges' with your actual endpoint.
        // The endpoint should return an array of College documents
        // from MongoDB as-is (matching the schema above).
        const res = await fetch('/api/colleges');

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const raw: College[] = await res.json();

        // ── Map MongoDB documents → UI shape ──────────────────
        const mappedColleges: UICollege[] = [];
        const mappedCourses: Record<string, Course[]> = {};

        for (const doc of raw) {
          const { college, courses: c } = mapCollegeToUI(doc);
          mappedColleges.push(college);
          mappedCourses[college.id] = c;
        }

        setColleges(mappedColleges);
        setCourses(mappedCourses);
      } catch (err) {
        console.error('Failed to fetch colleges, using fallback data:', err);
        setError('Could not load live data — showing sample colleges.');

        // ── Fall back to static data ───────────────────────────
        const mappedColleges: UICollege[] = [];
        const mappedCourses: Record<string, Course[]> = {};
        for (const doc of FALLBACK_RAW) {
          const { college, courses: c } = mapCollegeToUI(doc);
          mappedColleges.push(college);
          mappedCourses[college.id] = c;
        }
        setColleges(mappedColleges);
        setCourses(mappedCourses);
      } finally {
        setLoading(false);
      }
    }

    fetchColleges();
  }, []);

  const toggleShortlist = (id: string) =>
    setShortlisted(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const filtered = colleges.filter(c => {
    const q = search.toLowerCase();
    const matchSearch =
      c.name.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q);
    const matchStream =
      !activeStream ||
      (courses[c.id] ?? []).some(cr =>
        cr.stream.toLowerCase() === activeStream.toLowerCase()
      );
    return matchSearch && matchStream;
  });

  const shortlistedColleges = colleges.filter(c => shortlisted.has(c.id));
  const streams = ['Science', 'Arts', 'Commerce', 'Vocational'];

  // Derive unique cities from data
  const cities = Array.from(new Set(colleges.map(c => c.city))).filter(Boolean);
  const locationLabel = cities.length === 1
    ? `${cities[0].charAt(0).toUpperCase()}${cities[0].slice(1)}`
    : cities.length > 1
      ? `${cities.length} Cities`
      : 'All Locations';

  const totalSpecializations = Object.values(courses).flat().length;
  const privateCount = colleges.filter(c => c.college_type.toLowerCase().includes('private')).length;
  const govCount = colleges.filter(c => c.college_type.toLowerCase().includes('government')).length;

  const stats = [
    { icon: Building2, label: 'Colleges', value: colleges.length, color: '#6366F1', bg: '#EEF2FF' },
    { icon: GraduationCap, label: 'Specializations', value: totalSpecializations, color: '#8B5CF6', bg: '#F5F3FF' },
    { icon: Users, label: 'Private', value: privateCount, color: '#06B6D4', bg: '#ECFEFF' },
    { icon: Award, label: 'Government', value: govCount, color: '#F59E0B', bg: '#FFFBEB' },
  ];

  return (
    <div className="space-y-6">

      {/* ── Error banner ── */}
      {error && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-medium" style={{ background: '#FFFBEB', border: '1.5px solid #FEF3C7', color: '#B45309' }}>
          <Award className="w-3.5 h-3.5 flex-shrink-0" /> {error}
        </div>
      )}

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
              Discover colleges, compare specializations, check placement stats, and shortlist the ones that match your career goals.
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
              <p className="text-[10px] font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>Showing colleges in</p>
              <p className="text-[13px] font-bold text-white">{loading ? '…' : locationLabel}</p>
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
              <p className="text-[18px] font-black leading-none mb-0.5" style={{ color: '#0F172A' }}>
                {loading ? '…' : s.value}
              </p>
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
          <MapPin className="w-3.5 h-3.5" /> {locationLabel} <ChevronDown className="w-3 h-3 opacity-60" />
        </button>
        <button className="flex items-center gap-1.5 text-[12.5px] font-medium px-3.5 py-2 rounded-xl" style={{ background: '#FAFBFF', color: '#475569', border: '1.5px solid #EEF0FD' }}>
          <GraduationCap className="w-3.5 h-3.5" style={{ color: '#6366F1', opacity: 0.8 }} />
          Courses:&nbsp;<span className="font-bold" style={{ color: '#6366F1' }}>B.Tech, MBA…</span>
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
          const active = activeStream?.toLowerCase() === s.toLowerCase();
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
        {cities[0] && (
          <div className="flex items-center gap-1.5 ml-2 text-[12.5px] font-semibold" style={{ color: '#6366F1' }}>
            <MapPin className="w-3.5 h-3.5" /> {locationLabel}
          </div>
        )}
        <span className="ml-auto text-[13px] font-semibold" style={{ color: '#94A3B8' }}>
          {loading ? 'Loading…' : `${filtered.length} college${filtered.length !== 1 ? 's' : ''} found`}
        </span>
      </div>

      {/* ── Main layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

        {/* Cards */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="rounded-2xl overflow-hidden animate-pulse" style={{ background: '#F1F5F9', height: 340 }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
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

        {/* Sidebar */}
        <div className="space-y-4">

          {/* ── My Shortlist ── */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: '#FFFFFF', border: '1.5px solid #F1F3FB', boxShadow: '0 2px 12px rgba(99,102,241,0.06)' }}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ background: '#FAFBFF', borderBottom: '1.5px solid #F1F3FB' }}
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" fill="#FBBF24" stroke="#FBBF24" />
                <span className="text-[13px] font-extrabold" style={{ color: '#0F172A' }}>My Shortlist</span>
              </div>
              {shortlistedColleges.length > 0 && (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: '#FEF3C7', color: '#B45309' }}>
                  {shortlistedColleges.length} saved
                </span>
              )}
            </div>
            <div className="px-4 py-3">
              {shortlistedColleges.length === 0 ? (
                <div className="flex flex-col items-center py-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: '#FFFBEB' }}>
                    <Star className="w-6 h-6" style={{ color: '#FCD34D', opacity: 0.5 }} />
                  </div>
                  <p className="text-[12.5px] font-semibold mb-1" style={{ color: '#64748B' }}>No colleges shortlisted yet</p>
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
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-black" style={{ background: '#EEF2FF', color: '#6366F1' }}>
                        {idx + 1}
                      </div>
                      <span className="text-[12px] font-semibold flex-1 leading-snug" style={{ color: '#0F172A' }}>{c.name}</span>
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
                    style={{ background: 'linear-gradient(135deg,#6366F1,#8B5CF6)', color: '#fff', boxShadow: '0 4px 14px rgba(99,102,241,0.3)' }}
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
            <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#FAFBFF', borderBottom: '1.5px solid #F1F3FB' }}>
              <SlidersHorizontal className="w-3.5 h-3.5" style={{ color: '#6366F1' }} />
              <span className="text-[13px] font-extrabold" style={{ color: '#0F172A' }}>Active Filters</span>
            </div>
            <div className="px-4 py-3 flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 text-[11.5px] font-semibold px-3 py-1.5 rounded-full" style={{ background: '#EEF2FF', color: '#4F46E5' }}>
                <MapPin className="w-2.5 h-2.5" /> {locationLabel}
              </span>
              <span className="flex items-center gap-1.5 text-[11.5px] font-semibold px-3 py-1.5 rounded-full" style={{ background: '#EEF2FF', color: '#4F46E5' }}>
                <GraduationCap className="w-2.5 h-2.5" /> B.Tech, MBA…
              </span>
              {activeStream && (
                <button
                  onClick={() => setActiveStream(null)}
                  className="flex items-center gap-1.5 text-[11.5px] font-semibold px-3 py-1.5 rounded-full transition-colors"
                  style={{ background: '#F5F3FF', color: '#7C3AED', border: '1.5px solid #EDE9FE' }}
                >
                  {activeStream} <X className="w-2.5 h-2.5" />
                </button>
              )}
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="flex items-center gap-1.5 text-[11.5px] font-semibold px-3 py-1.5 rounded-full transition-colors"
                  style={{ background: '#FFF1F2', color: '#E11D48', border: '1.5px solid #FFE4E6' }}
                >
                  &quot;{search}&quot; <X className="w-2.5 h-2.5" />
                </button>
              )}
            </div>
          </div>

          {/* ── Quick Tip ── */}
          <div className="rounded-2xl p-5" style={{ background: '#1E1B4B', border: '1.5px solid #312E81' }}>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <Award className="w-4 h-4" style={{ color: '#A5B4FC' }} />
              </div>
              <p className="text-[13.5px] font-extrabold" style={{ color: '#E0E7FF' }}>Quick Tip</p>
            </div>
            <p className="text-[12px] leading-relaxed" style={{ color: '#A5B4FC' }}>
              Compare at least <span style={{ color: '#C7D2FE', fontWeight: 700 }}>3–4 colleges</span> before deciding. Always check placement stats and the specific specialization you want, not just the overall college ranking.
            </p>
            <div className="mt-3 pt-3 flex items-start gap-2" style={{ borderTop: '1px solid rgba(99,102,241,0.25)' }}>
              <div className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(99,102,241,0.3)' }}>
                <GraduationCap className="w-3 h-3" style={{ color: '#A5B4FC' }} />
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: '#818CF8' }}>
                NAAC-accredited colleges with a dedicated Placement Cell tend to have better median LPA outcomes for students.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}