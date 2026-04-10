"use client";
import { Sparkles, GraduationCap, Building2, MapPin, TrendingUp, ArrowRight } from "lucide-react";
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen border-none overflow-hidden flex flex-col relative w-full">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-12 backdrop-blur-sm border-b border-white/20 bg-white/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold text-slate-800 tracking-tight">Learnthru</span>
        </div>
        <div className="flex items-center gap-4">
            <button className="text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors">
              Login
            </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center relative z-10 px-6 py-12 lg:px-12">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-full px-4 py-2 border border-white mb-8 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
              The #1 Career Guidance Platform
            </span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
            Discover Your True<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Potential &amp; Purpose
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Take psychometric tests, discover top government colleges, track vital scholarship deadlines, and build a career path mapped perfectly to your unique skills.
          </p>
          
          {/* THE BIG "GET STARTED" BUTTON OPENING CLERK */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-2"
            onClick={()=>{
              router.push('/dashboard')
            }}
          >
              <button className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg px-10 py-5 rounded-full overflow-hidden shadow-xl hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-300">
                <span className="relative z-10">GET STARTED</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
          </div>
          <p className="text-sm text-slate-500 mb-12">Click to open sign up directly on this page</p>

          {/* Stats Grid */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mx-auto">
            {[
              { label: 'Colleges', value: '10k+', icon: Building2 },
              { label: 'Scholarships', value: '5k+', icon: GraduationCap },
              { label: 'Exams', value: '500+', icon: TrendingUp },
              { label: 'Paths', value: '300+', icon: MapPin },
            ].map((stat, i) => (
              <div key={i} className="bg-white/50 backdrop-blur-md border border-white rounded-3xl p-5 flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md transition-all cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 mb-3 shadow-inner">
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-slate-800">{stat.value}</span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
