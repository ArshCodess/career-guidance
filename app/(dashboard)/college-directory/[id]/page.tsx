'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  MapPin, GraduationCap, Star, BookOpen, Building2,
  Users, TrendingUp, Award, CheckCircle2, ChevronLeft,
  ArrowRight, HeartHandshake, Briefcase, IndianRupee, Home, ExternalLink
} from 'lucide-react';
import Link from 'next/link';

// Models
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
      { course_id: 'btech', course_name: 'B.Tech', stream: 'science', specialization_id: 'btech_it', specialization_name: 'IT', rank_in_specialization: 6, total_fee_inr: 500000, annual_fee_inr: 125000, fee_category: 'mid', entrance_exams: ['JEE Main', 'UPTAC'], eligibility: '10+2 PCM, 45%+', career_paths: ['IT Consultant', 'Network Engineer'] },
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
      { course_id: 'btech', course_name: 'B.Tech', stream: 'science', specialization_id: 'btech_cs', specialization_name: 'Computer Science', rank_in_specialization: 4, total_fee_inr: 520000, annual_fee_inr: 130000, fee_category: 'mid', entrance_exams: ['JEE Main', 'UPTAC'], eligibility: '10+2 PCM, 45%+', career_paths: ['Software Engineer', 'Product Manager'] },
    ],
  },
];

const CAMPUS_IMAGES = [
  'https://images.unsplash.com/photo-1541178735493-479c1a27ed24?q=80&w=1200&auto=format&fit=crop', 
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1200&auto=format&fit=crop', 
  'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=1200&auto=format&fit=crop', 
  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1200&auto=format&fit=crop', 
  'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=1200&auto=format&fit=crop', 
  'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1200&auto=format&fit=crop', 
];

function getCollegeImage(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return CAMPUS_IMAGES[Math.abs(hash) % CAMPUS_IMAGES.length];
}

export default function CollegeDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollege() {
      try {
        setLoading(true);
        const res = await fetch('/api/colleges');
        if (!res.ok) throw new Error();
        const raw: College[] = await res.json();
        const found = raw.find(c => c._id === id);
        if (found) setCollege(found);
        else throw new Error("Not found");
      } catch (err) {
        // Fallback to sample data for preview if DB not ready
        setCollege(FALLBACK_RAW.find(c => c._id === id) || FALLBACK_RAW[0]);
      } finally {
        setLoading(false);
      }
    }
    fetchCollege();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
         <div className="w-12 h-12 border-4 border-[#4A68C8] border-t-transparent rounded-full animate-spin"></div>
         <p className="text-slate-500 font-medium">Brewing institution records...</p>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
         <h1 className="text-3xl font-black text-slate-800">Campus Not Found</h1>
         <Link href="/college-directory" className="mt-4 text-[#4A68C8] hover:underline font-bold flex items-center gap-2">
           <ChevronLeft className="w-4 h-4"/> Back to Directory
         </Link>
      </div>
    );
  }

  const imageUrl = getCollegeImage(college.name);

  return (
    <div className="max-w-[1400px] mx-auto pb-20 space-y-8 animate-in fade-in duration-500">
       
       <Link href="/college-directory" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#4A68C8] font-bold text-sm bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 shadow-sm transition-all hover:bg-white hover:-translate-x-1">
         <ChevronLeft className="w-4 h-4" /> Directory Search
       </Link>

       {/* HERO BANNER SECTION (Gradient & SVG Objects styled like Dashboard) */}
       <div className="relative rounded-[2.5rem] overflow-hidden min-h-[360px] flex items-end p-8 md:p-12 shadow-xl group border border-white/40"
         style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #3730A3 35%, #4F46E5 70%, #8B5CF6 100%)' }}>
          
          {/* Layered decorative orbs */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 w-40 h-40 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute -bottom-12 right-1/4 w-56 h-56 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Dot grid pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}
          />

          {/* Floating Decorative Book SVG inline */}
          <div className="absolute top-10 right-10 w-48 h-48 opacity-20 pointer-events-none select-none hidden md:block">
            <svg viewBox="0 0 280 190" className="w-full h-full animate-[bounce_5s_ease-in-out_infinite]">
              <path d="M178 90 Q148 88 142 95 L142 145 Q148 140 178 142 Z" fill="white" />
              <path d="M182 90 Q212 88 218 95 L218 145 Q212 140 182 142 Z" fill="white" />
              <circle cx="218" cy="95" r="4" fill="#FCD34D" />
              <circle cx="142" cy="70" r="3" fill="#C4B5FD" />
            </svg>
          </div>
          
          <div className="relative z-10 w-full flex flex-col justify-end">
            <div className="flex flex-wrap gap-2 mb-4">
               {college.accreditation && (
                 <span className="px-3 py-1 bg-white/10 text-amber-300 border border-white/20 rounded-full text-[11px] font-black uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                   <Award className="w-3.5 h-3.5" /> {college.accreditation}
                 </span>
               )}
               {college.placement_tier && (
                 <span className="px-3 py-1 bg-white/10 text-emerald-300 border border-white/20 rounded-full text-[11px] font-black uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                   <TrendingUp className="w-3.5 h-3.5" /> {college.placement_tier.replace('tier', 'Tier ')}
                 </span>
               )}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-sm">
              {college.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 font-medium">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm"><MapPin className="w-4 h-4 text-rose-300" /> {college.location}</div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm text-blue-200"><Building2 className="w-4 h-4" /> {college.type}</div>
              {college.affiliation && (
                <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm text-purple-200">Affiliated with {college.affiliation}</div>
              )}
            </div>
          </div>
       </div>

       {/* CONTENT GRID */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Overview & Courses */}
          <div className="lg:col-span-2 space-y-8">
             
             {/* General Info / About */}
             <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -z-0"></div>
                <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3 mb-4 relative z-10">
                  <HeartHandshake className="w-6 h-6 text-[#4A68C8]" /> About {college.name}
                </h2>
                <div className="relative z-10 text-[15px] leading-relaxed text-slate-600 space-y-4 font-medium">
                  <p>
                    Established as a premier institution in <span className="text-slate-800 font-bold">{college.location}</span>, {college.name} serves as a pivotal center for rigorous academic training. Classified as a <span className="text-slate-800 font-bold">{college.type}</span> institution{college.affiliation ? ` under ${college.affiliation}` : ''}, it has cemented its position as a powerhouse of education focusing on practical placements and holistic curriculum.
                  </p>
                  <p>
                    With its stellar placement tier categorization (<span className="text-indigo-600 font-bold uppercase">{college.placement_tier ?? 'Reputed'}</span>) and highly modern facilities, it currently educates thousands of motivated students. Prepare for a comprehensive campus life surrounded by peers focused on engineering, arts, and management pathways. 
                  </p>
                </div>
             </div>
             
             {/* Courses & Specializations */}
             <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                    <GraduationCap className="w-7 h-7 text-[#4A68C8]" /> Degrees &amp; Specializations
                  </h2>
                </div>
                
                {college.specializations_offered?.length > 0 ? (
                  <div className="space-y-4">
                    {college.specializations_offered.map((spec, i) => (
                      <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#7B92DB]/50 transition-colors group">
                         <div className="mb-4 md:mb-0">
                           <div className="flex items-center gap-2 mb-1">
                             <h4 className="text-[17px] font-bold text-slate-800">{spec.course_name} <span className="text-slate-400 font-medium">in {spec.specialization_name}</span></h4>
                           </div>
                           <p className="text-[13px] text-slate-500 font-medium flex items-center gap-4 mt-2">
                             {spec.eligibility && <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500"/> {spec.eligibility}</span>}
                             {spec.entrance_exams && <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-[#4A68C8]"/> {spec.entrance_exams.join(', ')}</span>}
                           </p>
                         </div>
                         <div className="md:text-right shrink-0">
                           <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Annual Fee</p>
                           <p className="text-xl font-black text-[#4A68C8]">
                             {spec.annual_fee_inr ? `₹${spec.annual_fee_inr.toLocaleString()}` : 'Contact for Info'}
                           </p>
                         </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                     <p className="text-slate-500 font-medium">Course details are currently being updated by the administration.</p>
                  </div>
                )}
             </div>

             {/* Facilities */}
             <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3 mb-6">
                  <Home className="w-7 h-7 text-[#4A68C8]" /> Campus Facilities
                </h2>
                <div className="flex flex-wrap gap-3">
                  {college.facilities?.map((f, i) => (
                    <div key={i} className="px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[14px]">
                      {f}
                    </div>
                  ))}
                  {(!college.facilities || college.facilities.length === 0) && (
                    <p className="text-slate-500">Standard campus amenities available.</p>
                  )}
                  {college.hostel_available && (
                    <div className="px-5 py-3 rounded-xl bg-indigo-50 border border-[#7B92DB]/30 text-indigo-700 font-bold text-[14px] flex items-center gap-2">
                      <Home className="w-4 h-4"/> On-Campus Hostel ({college.hostel_fee_inr ? `₹${college.hostel_fee_inr}/yr` : 'Available'})
                    </div>
                  )}
                </div>
             </div>

          </div>

          {/* RIGHT COLUMN: Sidebar Stats */}
          <div className="space-y-8 lg:sticky lg:top-24 h-max pb-10">
             
             {/* Placement Stats */}
             <div className="bg-gradient-to-br from-[#4A68C8] to-[#3B82F6] rounded-[2rem] p-8 text-white shadow-xl shadow-blue-500/20">
               <h3 className="text-lg font-black flex items-center gap-2 mb-6 text-white/90">
                 <Briefcase className="w-5 h-5"/> Placement Records
               </h3>
               
               <div className="space-y-6">
                 <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/20">
                   <p className="text-[11px] font-bold uppercase tracking-widest text-blue-200 mb-1">Highest Package</p>
                   <p className="text-4xl font-black">
                     {college.placements?.highest_lpa ? `₹${college.placements.highest_lpa} LPA` : 'Unspecified'}
                   </p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-1">Median</p>
                     <p className="text-xl font-bold">
                       {college.placements?.median_lpa ? `₹${college.placements.median_lpa}L` : '—'}
                     </p>
                   </div>
                   <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-1">Average</p>
                     <p className="text-xl font-bold">
                       {college.placements?.average_lpa ? `₹${college.placements.average_lpa}L` : '—'}
                     </p>
                   </div>
                 </div>
               </div>
             </div>

             {/* Top Recruiters */}
             {college.top_recruiters && college.top_recruiters.length > 0 && (
               <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-black flex items-center gap-2 mb-6 text-slate-800">
                    <Users className="w-5 h-5 text-[#4A68C8]"/> Past Top Recruiters
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {college.top_recruiters.map((r, i) => (
                      <span key={i} className="px-3.5 py-1.5 bg-slate-100 text-slate-600 font-bold text-[13px] rounded-lg">
                        {r}
                      </span>
                    ))}
                  </div>
               </div>
             )}

             {/* Outbound Link */}
             <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center">
                 <div className="w-12 h-12 bg-[#E8ECF5] text-[#4A68C8] rounded-full flex items-center justify-center mb-3">
                   <ExternalLink className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-slate-800 mb-1">Official Website</h3>
                 <p className="text-sm text-slate-500 mb-4 px-4">Visit the official college website for admission forms.</p>
                 {college.website ? (
                   <a href={college.website} target="_blank" rel="noopener noreferrer" className="w-full block py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors">
                     Open Website
                   </a>
                 ) : (
                   <button disabled className="w-full py-3 rounded-xl bg-slate-100 text-slate-400 font-bold cursor-not-allowed">
                     Link Not Available
                   </button>
                 )}
             </div>

          </div>
       </div>
    </div>
  );
}