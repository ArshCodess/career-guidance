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
  location: string;
  location_tag: string;
  type: string;
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

interface Course {
  degree_name: string;
  stream: string;
  cutoff_percentage: number;
  annual_fee_inr?: number;
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

/* ─── Image Helper ────────────────────────────────────────── */
// These are handpicked, stunning real-world campus photos
const CAMPUS_IMAGES = [
  'https://images.unsplash.com/photo-1541178735493-479c1a27ed24?q=80&w=800&auto=format&fit=crop', // Majestic archway
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop', // Book/Library path
  'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=800&auto=format&fit=crop', // Modern Tech Building
  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=800&auto=format&fit=crop', // Beautiful Library Interior
  'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=800&auto=format&fit=crop', // Classic College View
  'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=800&auto=format&fit=crop', // Stunning Campus Field
];

function getCollegeImage(name: string, id: string): string {
  // Use length of name and id combined to deterministically map an image
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % CAMPUS_IMAGES.length;
  return CAMPUS_IMAGES[index];
}

/* ─── Map MongoDB college → UI-friendly shape ────────────── */
function mapCollegeToUI(c: College): { college: UICollege; courses: Course[] } {
  const college: UICollege = {
    id: c._id,
    name: c.name,
    location: `${c.location}${c.affiliation ? ` · ${c.affiliation}` : ''}`,
    city: c.location_tag,
    state: '',
    distance_km: 0,
    college_type: c.type,
    facilities: c.facilities ?? [],
    image_url: getCollegeImage(c.name, c._id),
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

/* ─── Fallback data ──────────────────────────────────────── */
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
      { course_id: 'btech', course_name: 'B.Tech', stream: 'science', specialization_id: 'btech_it', specialization_name: 'IT', rank_in_specialization: 6, total_fee_inr: 500000, annual_fee_inr: 125000, fee_category: 'mid', entrance_exams: ['JEE Main', 'UPTAC'], eligibility: '10+2 PCM, 45%+', career_paths: ['IT Consultant', 'Network Engineer'], college_id: 'abes_engineering_college' },
    ],
  },
  {
    _id: '2', name: 'AKGEC', location: 'Ghaziabad', location_tag: 'ghaziabad',
    type: 'Private', affiliation: 'AKTU', accreditation: 'NAAC A, NBA',
    hostel_available: true, hostel_fee_inr: 70000,
    facilities: ['Sports', 'Library', 'Placement Cell', 'Labs', 'Cafeteria'],
    placement_tier: 'tier2',
    placements: { highest_lpa: 32, median_lpa: 6, average_lpa: 6.2 },
    top_recruiters: ['TCS', 'Wipro', 'Infosys', 'Capgemini'],
    website: 'https://www.akgec.ac.in',
    specializations_offered: [
      { course_id: 'btech', course_name: 'B.Tech', stream: 'science', specialization_id: 'btech_cs', specialization_name: 'CS', rank_in_specialization: 4, total_fee_inr: 520000, annual_fee_inr: 130000, fee_category: 'mid', entrance_exams: ['JEE Main', 'UPTAC'], eligibility: '10+2 PCM, 45%+', career_paths: ['Software Engineer', 'Product Manager'], college_id: 'akgec' },
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

const STREAM_CFG: Record<string, { bg: string; text: string; label: string }> = {
  science: { bg: 'bg-blue-100/80', text: 'text-blue-700', label: 'Science' },
  Science: { bg: 'bg-blue-100/80', text: 'text-blue-700', label: 'Science' },
  commerce: { bg: 'bg-amber-100/80', text: 'text-amber-700', label: 'Commerce' },
  Commerce: { bg: 'bg-amber-100/80', text: 'text-amber-700', label: 'Commerce' },
  arts: { bg: 'bg-purple-100/80', text: 'text-purple-700', label: 'Arts' },
  Arts: { bg: 'bg-purple-100/80', text: 'text-purple-700', label: 'Arts' },
  Vocational: { bg: 'bg-emerald-100/80', text: 'text-emerald-700', label: 'Vocational' },
};

/* ─── College Card ───────────────────────────────────────── */
function CollegeCard({
  college, collegeCourses, shortlisted, onToggleShortlist,
}: {
  college: UICollege; collegeCourses: Course[];
  shortlisted: boolean; onToggleShortlist: () => void;
}) {
  const degrees = Array.from(new Set(collegeCourses.map(c => c.degree_name)));
  const minFee = collegeCourses.length
    ? Math.min(...collegeCourses.filter(c => c.annual_fee_inr).map(c => c.annual_fee_inr!))
    : null;
  const streams = Array.from(new Set(collegeCourses.map(c => c.stream)));

  return (
    <div className="group rounded-[1.5rem] flex flex-col bg-white shadow-sm border border-slate-200/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#7B92DB]/30 overflow-hidden">
      {/* Premium Image Header */}
      <div className="relative h-[200px] w-full overflow-hidden bg-slate-100">
        <img 
          src={college.image_url} 
          alt={college.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Soft, beautiful gradient overlay matching app colors */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap z-10">
          {streams.slice(0, 2).map(s => {
            const cfg = STREAM_CFG[s] ?? STREAM_CFG.Science;
            return (
              <span key={s} className={`text-[10px] uppercase tracking-wider font-extrabold px-3 py-1.5 rounded-full backdrop-blur-md ${cfg.bg} ${cfg.text} shadow-sm`}>
                {cfg.label}
              </span>
            );
          })}
        </div>
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={(e) => { e.preventDefault(); onToggleShortlist(); }}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 backdrop-blur-md bg-white/80 shadow-sm border border-white"
          >
            <Star className="w-4 h-4" fill={shortlisted ? '#F59E0B' : 'transparent'} stroke={shortlisted ? '#F59E0B' : '#4A68C8'} strokeWidth={2.5} />
          </button>
        </div>

        {/* Bottom Content within Image */}
        <div className="absolute bottom-4 left-5 right-5 z-10">
           <h3 className="text-[19px] font-black leading-tight text-white drop-shadow-md mb-1 pb-0 line-clamp-2">
            {college.name}
          </h3>
          <div className="flex items-center gap-1.5 text-blue-50 drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 opacity-90" />
            <span className="text-[13px] font-medium opacity-90 tracking-wide">{college.location}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex flex-wrap flex-row items-center gap-2 mb-4">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200/50">
            {college.college_type}
          </span>
          {college.accreditation && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#E8ECF5] text-[#4A68C8] border border-[#7B92DB]/20">
              {college.accreditation}
            </span>
          )}
           {college.placement_tier && (
            <span className="ml-auto px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100">
              {college.placement_tier.replace('tier', 'Tier ')}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-lg bg-[#E8ECF5] flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-4 h-4 text-[#4A68C8]" />
          </div>
          <p className="text-[13px] font-bold text-slate-700 leading-snug truncate">
            {degrees.length > 0 ? degrees.join(', ') : 'Examine our course catalog'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-auto grid grid-cols-2 gap-3 mb-5">
          <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-100 hover:bg-slate-50 transition-colors">
             <span className="text-[11px] font-semibold text-slate-400 block mb-0.5 uppercase tracking-wide">Avg/Max Salary</span>
             <span className="text-[15px] font-black text-slate-800">
               {college.placements?.highest_lpa ? `₹${college.placements.highest_lpa}L` : 'N/A'}
             </span>
          </div>
          <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-100 hover:bg-slate-50 transition-colors">
             <span className="text-[11px] font-semibold text-slate-400 block mb-0.5 uppercase tracking-wide">Starting From</span>
             <span className="text-[15px] font-black text-slate-800">
               {minFee ? `₹${(minFee / 1000).toFixed(0)}K` : 'Var.'}
               <span className="text-[10px] text-slate-400 font-medium lowercase">/yr</span>
             </span>
          </div>
        </div>

        {/* Footer */}
        <Link
          href={`/college-directory/${college.id}`}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-bold text-white transition-all hover:bg-[#3D5BBA] active:scale-[0.98] shadow-sm shadow-[#4A68C8]/20"
          style={{ background: '#4A68C8' }}
        >
          Explore Campus <ArrowRight className="w-4 h-4 ml-1" />
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
        
        const res = await fetch('/api/colleges');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw: College[] = await res.json();

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
        setError('Displaying sample data. API connection unavailable.');
        
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

  const cities = Array.from(new Set(colleges.map(c => c.city))).filter(Boolean);
  const locationLabel = cities.length === 1
    ? `${cities[0].charAt(0).toUpperCase()}${cities[0].slice(1)}`
    : cities.length > 1
      ? `${cities.length} Cities`
      : 'All Locations';

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">

      {/* ── Error banner ── */}
      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-[13px] font-semibold bg-rose-50 border border-rose-200 text-rose-600 shadow-sm">
          <Award className="w-4 h-4 flex-shrink-0" /> {error}
        </div>
      )}

      {/* ── Astonishing Redesigned Hero ── */}
      <div className="relative rounded-3xl overflow-hidden min-h-[300px] flex items-center shadow-xl border border-white/40 group"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #3730A3 35%, #4F46E5 70%, #8B5CF6 100%)' }}>
        
        {/* Layered decorative orbs */}
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-indigo-300/20 rounded-full blur-2xl pointer-events-none group-hover:translate-x-12 transition-transform duration-1000" />
        <div className="absolute -bottom-12 right-1/4 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-8 right-12 w-40 h-40 bg-blue-200/20 rounded-full blur-2xl pointer-events-none group-hover:-translate-y-8 transition-transform duration-1000" />

        {/* Dot grid pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}
        />
        
        <div className="relative z-10 px-8 py-10 md:py-12 md:px-14 flex flex-col md:flex-row items-center gap-10 justify-between w-full">
            <div className="max-w-xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white font-bold text-[10px] uppercase tracking-widest mb-4 border border-white/20 backdrop-blur-md shadow-sm">
                <SparklesIcon className="w-3.5 h-3.5 text-amber-300" /> Premium Directory
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight drop-shadow-sm">
                Discover Your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200">Dream Campus</span>
              </h1>
              <p className="text-[15px] text-white/80 leading-relaxed font-medium">
                Explore thousands of verified top-tier colleges. Filter by specializations, investigate amazing campus facilities, and compare top placement records instantly.
              </p>
            </div>

            <div className="relative z-10 w-full md:w-auto mt-6 md:mt-0 flex gap-6 items-center">
               
               {/* Decorative SVG Objects inline matching dashboard */}
               <div className="hidden lg:block w-48 h-40 pointer-events-none select-none relative -mr-8">
                  <svg viewBox="0 0 280 190" className="w-full h-full drop-shadow-2xl opacity-90 animate-[bounce_4s_ease-in-out_infinite]">
                    <circle cx="200" cy="95" r="70" fill="white" opacity="0.06" />
                    {/* Graduation Cap */}
                    <ellipse cx="200" cy="56" rx="36" ry="10" fill="white" opacity="0.3" />
                    <polygon points="200,22 164,56 236,56" fill="white" opacity="0.25" />
                    <rect x="198" y="22" width="4" height="4" rx="1" fill="white" opacity="0.5" />
                    <line x1="236" y1="56" x2="242" y2="78" stroke="white" strokeWidth="2.5" opacity="0.6" strokeLinecap="round" />
                    <circle cx="242" cy="82" r="5" fill="#FCD34D" opacity="0.9" />
                    {/* Little floating stars */}
                    <circle cx="130" cy="40" r="4" fill="#FCD34D" opacity="0.8" />
                    <circle cx="260" cy="110" r="4.5" fill="#C4B5FD" opacity="0.8" />
                    <circle cx="160" cy="140" r="3" fill="white" opacity="0.6" />
                  </svg>
               </div>

               {/* Location Widget */}
               <div className="bg-white/10 backdrop-blur-xl rounded-[1.5rem] p-5 shadow-[0_10px_40px_rgba(30,27,75,0.4)] border border-white/20 min-w-[220px] flex items-center gap-4 group hover:-translate-y-1 hover:bg-white/15 transition-all">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#4A68C8] to-[#3B82F6] text-white shrink-0 shadow-inner">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-indigo-200 uppercase tracking-widest mb-0.5">Focus Region</p>
                    <p className="text-[18px] font-black text-white drop-shadow-sm">{loading ? 'Loading...' : locationLabel}</p>
                  </div>
               </div>
            </div>
        </div>
      </div>

      {/* ── Filter Bar (Matches App Aesthetic) ── */}
      <div className="sticky top-20 z-40 p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hidden md:flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
           {streams.map(s => {
            const active = activeStream?.toLowerCase() === s.toLowerCase();
            return (
              <button
                key={s}
                onClick={() => setActiveStream(active ? null : s)}
                className={`px-5 py-2.5 rounded-xl text-[14px] font-bold transition-all ${active ? 'bg-[#4A68C8] text-white shadow-md shadow-[#4A68C8]/20' : 'bg-[#E8ECF5] text-slate-600 hover:bg-[#dce3f5]'}`}
              >
                {s}
              </button>
            );
          })}
        </div>
        
        <div className="flex items-center gap-3 flex-1 justify-end">
           <div className="relative max-w-[320px] w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search campuses, locations..."
              className="w-full pl-12 pr-4 py-3 text-[14px] font-medium rounded-xl outline-none bg-white border border-slate-200 text-slate-800 transition-all focus:border-[#4A68C8] focus:ring-[3px] focus:ring-[#7B92DB]/20 shadow-sm"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-md p-1">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter */}
      <div className="md:hidden space-y-3">
         <div className="relative w-full shadow-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search campuses..."
              className="w-full pl-11 pr-4 py-3.5 text-[14px] font-medium rounded-xl outline-none bg-white border border-slate-200 text-slate-800"
            />
          </div>
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {streams.map(s => {
              const active = activeStream?.toLowerCase() === s.toLowerCase();
              return (
                <button
                  key={s}
                  onClick={() => setActiveStream(active ? null : s)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all ${active ? 'bg-[#4A68C8] text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
      </div>


      {/* ── Main Layout (No sidebar, full width cards grid) ── */}
      <div className="w-full">
         <div className="flex items-center justify-between mb-6 px-1">
           <h2 className="text-[22px] font-black text-slate-800 flex items-center gap-2">
             {loading ? 'Finding Campuses...' : `${filtered.length} Universities Available`}
           </h2>
           <button className="hidden sm:flex items-center gap-1.5 text-[14px] font-bold text-[#4A68C8] hover:text-[#3a529e] transition-colors">
              <SlidersHorizontal className="w-4 h-4" /> Advanced Filters
           </button>
         </div>

        {loading ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="rounded-[1.5rem] bg-white h-[420px] animate-pulse border border-slate-200/60 shadow-sm" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-24 rounded-[2rem] bg-white border border-slate-200 mt-4 shadow-sm">
            <div className="w-20 h-20 rounded-[1.5rem] bg-[#E8ECF5] flex items-center justify-center mb-5">
              <Search className="w-10 h-10 text-[#4A68C8]" />
            </div>
            <h3 className="text-[22px] font-black text-slate-800 mb-2">No matches found</h3>
            <p className="text-[15px] text-slate-500 font-medium">Try removing some filters or searching a different term.</p>
            <button 
              onClick={() => { setSearch(''); setActiveStream(null); }}
              className="mt-6 px-8 py-3 rounded-xl bg-[#4A68C8] text-white font-bold text-[14px] hover:bg-[#3d5bba] transition shadow-md shadow-[#4A68C8]/20">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {filtered.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
                collegeCourses={courses[college.id] ?? []}
                shortlisted={shortlisted.has(college.id)}
                onToggleShortlist={() => toggleShortlist(college.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    </svg>
  );
}