'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, ChevronDown, Activity, GraduationCap, Briefcase, BrainCircuit, TrendingUp } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

type TrajectoryItem = {
  specialization_id: string;
  specialization_name: string;
  course_id: string;
  course_name: string;
  pct: number;
  brief: string;
  career_paths: string[];
  demand: string;
  salary: string;
};

export default function SecondaryTrajectoriesPage() {
  const searchParams = useSearchParams();
  const [trajectories, setTrajectories] = useState<TrajectoryItem[]>([]);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Retrieve trajectories from localStorage or query parameters
    const storedTrajectories = localStorage.getItem('secondaryTrajectories');
    if (storedTrajectories) {
      try {
        setTrajectories(JSON.parse(storedTrajectories));
      } catch (error) {
        console.error('Failed to parse trajectories:', error);
      }
    }
  }, []);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  if (!trajectories.length) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link
          href="/career-quiz"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-[14px] hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all active:scale-95 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </Link>
        <div className="text-center py-12">
          <p className="text-slate-600 text-lg">No secondary trajectories available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Back Button */}
      <Link
        href="/career-quiz"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-[14px] hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all active:scale-95 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Go Back
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Secondary Viable Trajectories</h1>
        <p className="text-slate-600 font-medium">Explore alternative career paths and find colleges offering these courses.</p>
      </div>

      {/* Trajectories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trajectories.map((trajectory) => {
          const isExpanded = expandedCards.has(trajectory.specialization_id);
          return (
            <div
              key={trajectory.specialization_id}
              className="bg-white rounded-2xl border border-slate-200 p-5 group hover:border-blue-300 hover:bg-blue-50/30 transition-colors shadow-sm"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                    <div className="absolute inset-0 bg-blue-100/50 scale-0 group-hover:scale-100 transition-transform origin-center rounded-full" />
                    <span className="text-sm font-black text-slate-800 relative z-10">{trajectory.pct}%</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-0.5">
                      {trajectory.specialization_name}
                    </h3>
                    <p className="text-[10px] font-semibold text-slate-500">{trajectory.course_name}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleExpand(trajectory.specialization_id)}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  {/* Description */}
                  <div>
                    <p className="text-xs text-slate-600 mb-3">{trajectory.brief}</p>
                  </div>

                  {/* Career Paths */}
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Career Paths</p>
                    <div className="flex flex-wrap gap-1.5">
                      {trajectory.career_paths.slice(0, 3).map((path) => (
                        <span key={path} className="text-[9px] bg-slate-100 text-slate-700 px-2 py-1 rounded">
                          {path}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Info Row */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-[11px]">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="font-semibold text-slate-600">Demand: <span className="text-slate-800">{trajectory.demand}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px]">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="font-semibold text-slate-600">Salary: <span className="text-slate-800">{trajectory.salary}</span></span>
                    </div>
                  </div>

                  {/* Explore Button */}
                  <Link
                    href={`/college-directory?course=${trajectory.course_id}&from=secondary-trajectories`}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-400 to-indigo-400 text-white font-bold text-xs px-3 py-2.5 rounded-lg hover:scale-[1.02] transition-transform active:scale-95 shadow-sm mt-2"
                  >
                    Explore Colleges <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
