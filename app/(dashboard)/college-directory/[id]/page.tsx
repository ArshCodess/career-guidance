'use client';

import { useEffect, useState } from 'react';
import { MapPin, ExternalLink, GraduationCap, Star, SlidersHorizontal, X, Wifi, BookOpen, Home, Monitor, FlaskConical, ChevronDown, Search } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

/* ─── Types ──────────────────────────────────────────────── */
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

/* ─── Fallback data ───────────────────────────────────────── */
const FALLBACK_COLLEGES: College[] = [
  { id: '1', name: 'Maharaja College', location: 'Station Rd, Jaipur', city: 'Jaipur', state: 'Rajasthan', distance_km: 2.5, college_type: 'Government', facilities: ['Hostel', 'Lab', 'Library'], image_url: '' },
  { id: '2', name: 'Government Commerce College', location: 'MI Road, Jaipur', city: 'Jaipur', state: 'Rajasthan', distance_km: 1.0, college_type: 'Government', facilities: ['Library', 'Internet', 'Cafeteria'], image_url: '' },
  { id: '3', name: 'Government Maharani College', location: 'Chaura Rasta, Jaipur', city: 'Jaipur', state: 'Rajasthan', distance_km: 2.5, college_type: 'Government', facilities: ['Hostel', 'Lab', 'Sports'], image_url: '' },
  { id: '4', name: 'Shri K.B. Commerce College', location: 'Tonk Road, Jaipur', city: 'Jaipur', state: 'Rajasthan', distance_km: 2.6, college_type: 'Government', facilities: ['Library', 'Lab', 'Canteen'], image_url: '' },
  { id: '5', name: 'Rajasthan University', location: 'JLN Marg, Jaipur', city: 'Jaipur', state: 'Rajasthan', distance_km: 3.1, college_type: 'Government', facilities: ['Hostel', 'Research', 'Sports'], image_url: '' },
  { id: '6', name: 'Shri K4. Commerce College', location: 'Vaishali Nagar, Jaipur', city: 'Jaipur', state: 'Rajasthan', distance_km: 2.6, college_type: 'Government', facilities: ['Library', 'Lab', 'Internet'], image_url: '' },
];

const FALLBACK_COURSES: Record<string, Course[]> = {
  '1': [{ degree_name: 'BA', stream: 'Science', cutoff_percentage: 72 }, { degree_name: 'B.Sc.', stream: 'Science', cutoff_percentage: 78 }],
  '2': [{ degree_name: 'B.Com', stream: 'Commerce', cutoff_percentage: 70 }, { degree_name: 'BBA', stream: 'Commerce', cutoff_percentage: 79 }],
  '3': [{ degree_name: 'BA', stream: 'Arts', cutoff_percentage: 80 }, { degree_name: 'B.Sc.', stream: 'Science', cutoff_percentage: 82 }, { degree_name: 'B.Com', stream: 'Commerce', cutoff_percentage: 75 }],
  '4': [{ degree_name: 'B.Com', stream: 'Commerce', cutoff_percentage: 65 }, { degree_name: 'BBA', stream: 'Commerce', cutoff_percentage: 70 }],
  '5': [{ degree_name: 'B.Tech', stream: 'Science', cutoff_percentage: 85 }, { degree_name: 'MBA', stream: 'Commerce', cutoff_percentage: 80 }],
  '6': [{ degree_name: 'B.Com', stream: 'Commerce', cutoff_percentage: 68 }, { degree_name: 'BBA', stream: 'Commerce', cutoff_percentage: 72 }],
};

/* ─── Facility icon map ──────────────────────────────────── */
const FACILITY_ICONS: Record<string, React.ElementType> = {
  Hostel: Home,
  Library: BookOpen,
  Internet: Wifi,
  Lab: FlaskConical,
  Canteen: Monitor,
  default: Monitor,
};

/* ─── College illustration SVG ──────────────────────────── */
function CollegeIllustration({ name }: { name: string }) {
  const hue = (name.charCodeAt(0) * 17) % 360;
  return (
    <div
      className="w-full h-24 rounded-2xl overflow-hidden relative flex items-end justify-center"
      style={{ background: `linear-gradient(135deg, hsl(${hue},60%,92%) 0%, hsl(${(hue + 40) % 360},55%,88%) 100%)` }}
    >
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 px-2 pb-1">
        <svg viewBox="0 0 160 60" className="w-full opacity-50" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="20" width="30" height="40" rx="2" fill={`hsl(${hue},50%,65%)`} />
          <rect x="18" y="10" width="14" height="12" rx="1" fill={`hsl(${hue},55%,60%)`} />
          <rect x="14" y="28" width="7" height="9" rx="1" fill="white" opacity="0.5" />
          <rect x="29" y="28" width="7" height="9" rx="1" fill="white" opacity="0.5" />
          <rect x="55" y="30" width="50" height="30" rx="2" fill={`hsl(${(hue + 20) % 360},48%,68%)`} />
          <rect x="65" y="18" width="30" height="14" rx="1" fill={`hsl(${(hue + 20) % 360},52%,62%)`} />
          <rect x="74" y="10" width="12" height="10" rx="1" fill={`hsl(${(hue + 20) % 360},55%,58%)`} />
          <rect x="60" y="38" width="10" height="12" rx="1" fill="white" opacity="0.4" />
          <rect x="75" y="38" width="10" height="12" rx="1" fill="white" opacity="0.4" />
          <rect x="90" y="38" width="10" height="12" rx="1" fill="white" opacity="0.4" />
          <rect x="120" y="25" width="30" height="35" rx="2" fill={`hsl(${(hue + 40) % 360},46%,70%)`} />
          <rect x="127" y="36" width="7" height="9" rx="1" fill="white" opacity="0.4" />
          <rect x="136" y="36" width="7" height="9" rx="1" fill="white" opacity="0.4" />
          <ellipse cx="50" cy="48" rx="7" ry="9" fill="hsl(140,45%,62%)" opacity="0.7" />
          <rect x="48" y="54" width="4" height="6" fill="hsl(30,40%,55%)" opacity="0.5" />
          <ellipse cx="115" cy="50" rx="6" ry="8" fill="hsl(140,45%,62%)" opacity="0.7" />
          <rect x="113" y="55" width="4" height="5" fill="hsl(30,40%,55%)" opacity="0.5" />
        </svg>
      </div>
    </div>
  );
}

/* ─── College Card ───────────────────────────────────────── */
function CollegeCard({
  college,
  collegeCourses,
  shortlisted,
  onToggleShortlist,
}: {
  college: College;
  collegeCourses: Course[];
  shortlisted: boolean;
  onToggleShortlist: () => void;
}) {
  const degrees = Array.from(new Set(collegeCourses.map((c) => c.degree_name)));
  const topStreams = collegeCourses.slice(0, 2);

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.7)',
        boxShadow: '0 4px 24px rgba(100,120,200,0.08)',
      }}
    >
      {/* Header row */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-bold text-slate-800 leading-tight flex-1">{college.name}</h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(100,120,220,0.08)', color: '#5B7FDB', border: '1px solid rgba(100,120,220,0.15)' }}
            >
              {college.distance_km} km
            </span>
            <button onClick={onToggleShortlist} className="transition-transform hover:scale-110 active:scale-95">
              <Star
                className="w-4 h-4 transition-all"
                fill={shortlisted ? '#fbbf24' : 'transparent'}
                stroke={shortlisted ? '#fbbf24' : '#cbd5e1'}
              />
            </button>
          </div>
        </div>

        {/* Degrees */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {degrees.slice(0, 4).map((deg, i) => (
            <span key={i} className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#5B7FDB' }}>
              <GraduationCap className="w-3 h-3" />
              {deg}
              {i < Math.min(degrees.length, 4) - 1 && <span className="text-slate-300 ml-0.5">,</span>}
            </span>
          ))}
        </div>

        {/* Facilities */}
        <div className="flex items-center gap-2 flex-wrap">
          {(college.facilities ?? []).slice(0, 3).map((f, i) => {
            const FIcon = FACILITY_ICONS[f] ?? FACILITY_ICONS.default;
            return (
              <span
                key={i}
                className="flex items-center gap-1 text-xs text-slate-500 px-2 py-0.5 rounded-lg"
                style={{ background: 'rgba(100,120,220,0.06)' }}
              >
                <FIcon className="w-3 h-3" style={{ color: '#7B92DB' }} />
                {f}
              </span>
            );
          })}
        </div>
      </div>

      {/* Illustration */}
      <div className="px-5">
        <CollegeIllustration name={college.name} />
      </div>

      {/* Cut-off section */}
      <div className="px-5 py-3 border-t border-slate-100/80 mt-3">
        {topStreams.length === 0 ? (
          <p className="text-xs text-slate-400">No cutoff data available</p>
        ) : (
          topStreams.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-600 font-medium">
                Cut-off: <span className="font-bold text-slate-800">{item.cutoff_percentage}%</span>
              </span>
              <span className="text-slate-400 mx-2">|</span>
              <span className="text-slate-500">{item.stream}</span>
              <span
                className="ml-auto px-2 py-0.5 rounded-full font-semibold text-white text-[10px]"
                style={{
                  background:
                    item.stream === 'Science'
                      ? '#667eea'
                      : item.stream === 'Commerce'
                      ? '#ff8c42'
                      : item.stream === 'Arts'
                      ? '#f5576c'
                      : '#11998e',
                }}
              >
                {item.cutoff_percentage}%
              </span>
            </div>
          ))
        )}
      </div>

      {/* Actions */}
      <div className="px-5 pb-5 flex items-center gap-3 mt-auto">
        <Link
          href={`/college-directory/${college.id}`}
          className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:underline"
          style={{ color: '#5B7FDB' }}
        >
          <ExternalLink className="w-3 h-3" />
          Get Details
        </Link>
        <Link
          href={`/college-directory/${college.id}`}
          className="flex-1 text-center py-2.5 rounded-2xl text-white text-xs font-bold transition-all hover:opacity-90 active:scale-95"
          style={{ background: 'linear-gradient(135deg,#667eea,#764ba2)', boxShadow: '0 4px 12px rgba(102,126,234,0.35)' }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function CollegeDirectoryPage() {
  const [colleges, setColleges] = useState<College[]>(FALLBACK_COLLEGES);
  const [courses, setCourses] = useState<Record<string, Course[]>>(FALLBACK_COURSES);
  const [shortlisted, setShortlisted] = useState<Set<string>>(new Set());
  const [loading] = useState(false); // never show skeleton — fallback data is always ready
  const [search, setSearch] = useState('');
  const [activeStream, setActiveStream] = useState<string | null>(null);

  useEffect(() => {
    // Try to load real Supabase data in background after render
    // (async () => {
    //   try {
    //     const { data: collegeData, error } = await supabase
    //       .from('colleges')
    //       .select('*')
    //       .order('distance_km');

    //     if (error || !collegeData || collegeData.length === 0) return;

    //     const results = await Promise.all(
    //       collegeData.map((c: College) =>
    //         supabase.from('courses').select('degree_name,stream,cutoff_percentage').eq('college_id', c.id)
    //       )
    //     );
    //     const map: Record<string, Course[]> = {};
    //     collegeData.forEach((c: College, i: number) => {
    //       map[c.id] = results[i].data ?? [];
    //     });
    //     setColleges(collegeData);
    //     setCourses(map);
    //   } catch {
    //     // Fallback already shown — do nothing
    //   }
    // })();
  }, []);

  const toggleShortlist = (id: string) => {
    setShortlisted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = colleges.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.city ?? '').toLowerCase().includes(search.toLowerCase());
    const collegeCourses = courses[c.id] ?? [];
    const matchStream = !activeStream || collegeCourses.some((cr) => cr.stream === activeStream);
    return matchSearch && matchStream;
  });

  const shortlistedColleges = colleges.filter((c) => shortlisted.has(c.id));
  const streams = ['Science', 'Arts', 'Commerce', 'Vocational'];

  return (
    <div className="space-y-5">

      {/* ── Hero ── */}
      <div
        className="rounded-3xl p-7 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg,#667eea 0%,#764ba2 50%,#f5576c 100%)',
          boxShadow: '0 20px 60px rgba(102,126,234,0.3)',
        }}
      >
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.5)' }} />
        <div className="absolute bottom-0 left-[40%] w-28 h-28 rounded-full opacity-10" style={{ background: 'rgba(255,255,255,0.6)' }} />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Learnthru</span>
            </div>
            <h1 className="text-3xl font-black text-white leading-tight mb-2">College Directory</h1>
            <p className="text-white/80 text-sm leading-relaxed max-w-lg">
              Find nearby government colleges offering the courses you&apos;re interested in.
            </p>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
          >
            <MapPin className="w-4 h-4 text-white/80" />
            <span className="text-white text-sm font-semibold">Jaipur, Rajasthan</span>
          </div>
        </div>
      </div>

      {/* ── Filters row ── */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search colleges..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-sm text-slate-700 outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.6)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
            }}
          />
        </div>

        {/* Location chip */}
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold text-slate-600 transition-all hover:shadow-md"
          style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.6)' }}
        >
          <MapPin className="w-4 h-4" style={{ color: '#5B7FDB' }} />
          Location <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {/* Degree filter */}
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold text-slate-600 transition-all hover:shadow-md"
          style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.6)' }}
        >
          <GraduationCap className="w-4 h-4" style={{ color: '#5B7FDB' }} />
          Degree Programs: BA, B.Sc., B.Com, B.Tech <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {/* Advanced filters */}
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all hover:shadow-md"
          style={{ background: 'rgba(102,126,234,0.1)', color: '#667eea', border: '1px solid rgba(102,126,234,0.2)' }}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Advanced Filters
        </button>

        {(search || activeStream) && (
          <button
            onClick={() => { setSearch(''); setActiveStream(null); }}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all"
            style={{ color: '#f5576c', background: 'rgba(245,87,108,0.08)', border: '1px solid rgba(245,87,108,0.15)' }}
          >
            <X className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </div>

      {/* ── Stream tabs ── */}
      <div className="flex items-center gap-2 flex-wrap">
        {streams.map((s) => (
          <button
            key={s}
            onClick={() => setActiveStream(activeStream === s ? null : s)}
            className="px-4 py-2 rounded-full text-sm font-bold transition-all"
            style={
              activeStream === s
                ? { background: 'linear-gradient(135deg,#667eea,#764ba2)', color: 'white', boxShadow: '0 4px 12px rgba(102,126,234,0.35)' }
                : { background: 'rgba(255,255,255,0.85)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.6)' }
            }
          >
            {s}
          </button>
        ))}
        <div className="flex items-center gap-1.5 ml-2 text-sm text-slate-500">
          <MapPin className="w-3.5 h-3.5" style={{ color: '#5B7FDB' }} />
          Jaipur, Rajasthan
        </div>
        <span className="ml-auto text-sm font-semibold text-slate-500">{filtered.length} colleges found</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        {/* ── Cards grid ── */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-72 rounded-2xl animate-pulse" style={{ background: 'rgba(255,255,255,0.6)' }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.6)', border: '1px dashed rgba(102,126,234,0.2)' }}>
              <GraduationCap className="w-10 h-10 mb-3 opacity-30" style={{ color: '#667eea' }} />
              <p className="text-slate-400 text-sm font-medium">No colleges found matching your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        {/* ── Shortlist sidebar ── */}
        <div className="space-y-4">
          <div
            className="rounded-2xl p-5"
            style={{
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.7)',
              boxShadow: '0 4px 24px rgba(100,120,200,0.08)',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-yellow-400" fill="#fbbf24" />
              <h3 className="font-black text-slate-800 text-base">Shortlist</h3>
            </div>
            {shortlistedColleges.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">Star a college to add it here</p>
            ) : (
              <div className="space-y-2">
                {shortlistedColleges.map((c) => (
                  <div key={c.id} className="flex items-center justify-between gap-2 py-2 border-b border-slate-100 last:border-0">
                    <span className="text-sm font-medium text-slate-700 flex-1 leading-tight">{c.name}</span>
                    <button onClick={() => toggleShortlist(c.id)}>
                      <Star className="w-4 h-4" fill="#fbbf24" stroke="#fbbf24" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {shortlistedColleges.length > 0 && (
              <button
                className="w-full mt-4 py-2.5 rounded-2xl text-sm font-bold transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#667eea,#764ba2)', color: 'white' }}
              >
                View Shortlist
              </button>
            )}
          </div>

          {/* Active filters display */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.7)',
              boxShadow: '0 4px 24px rgba(100,120,200,0.08)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <SlidersHorizontal className="w-4 h-4" style={{ color: '#667eea' }} />
              <h3 className="font-black text-slate-800 text-base">Active Filters</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(102,126,234,0.1)', color: '#667eea', border: '1px solid rgba(102,126,234,0.2)' }}
              >
                <MapPin className="w-3 h-3" /> Jaipur, Rajasthan
              </span>
              {activeStream && (
                <span
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(102,126,234,0.1)', color: '#667eea', border: '1px solid rgba(102,126,234,0.2)' }}
                >
                  {activeStream}
                  <button onClick={() => setActiveStream(null)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <span
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(245,87,108,0.08)', color: '#f5576c', border: '1px solid rgba(245,87,108,0.15)' }}
              >
                75% &amp; below
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}