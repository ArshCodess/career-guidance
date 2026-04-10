'use client';

import { GraduationCap, Briefcase, Building2, Gift, Search, Bell, ChevronRight, BookOpen, ClipboardList, LayoutDashboard, Sparkles, FileText, Headphones, User, TrendingUp, MapPin, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const formatCurrentDate = () => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Career Quiz', href: '/career-quiz', icon: ClipboardList },
  { name: 'Course Suggestions', href: '/course-suggestions', icon: GraduationCap },
  { name: 'Career Paths', href: '/career-paths', icon: Briefcase },
  { name: 'College Directory', href: '/college-directory', icon: Building2 },
];

const importantDates = [
  { day: '23', month: 'Apr', title: 'Scholarship Application Deadline', date: '25 Apr, 2022, Friday', color: 'bg-rose-500' },
  { day: '25', month: 'Apr', title: 'Entrance Exam Registration Opens', date: '26 Apr, 2022, Friday', color: 'bg-amber-500' },
  { day: '26', month: 'Apr', title: 'Career Counseling Session', date: '26 Apr, 2022, Friday', color: 'bg-emerald-500' },
];

const govExams = [
  { title: 'NCERT Scholarship Test', date: '30 Apr, 2022, Friday', bg: 'bg-blue-50', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { title: 'SSC CHSL Exam', date: '26 Apr, 2022, Friday', bg: 'bg-indigo-50', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
];

const resources = [
  { title: 'E-book for Class 12 Physics', tag: 'Free', tagColor: 'bg-emerald-100 text-emerald-700' },
  { title: 'Interview Tips Guide', tag: 'Popular', tagColor: 'bg-amber-100 text-amber-700' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(formatCurrentDate());
  }, []);

  return (
    <div className="min-h-screen flex bg-transparent">

      {/* LEFT SIDEBAR - fixed */}
      <aside className="hidden lg:flex w-64 bg-white/60 backdrop-blur-sm p-6 flex-col gap-6 fixed top-0 left-0 h-screen overflow-y-auto z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-800">EduGuide</span>
        </div>

        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                  isActive
                    ? 'bg-[#7B92DB]/20 text-[#4A68C8] border-l-4 border-[#4A68C8]'
                    : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Minimal Help card */}
        <div className="relative rounded-2xl p-4 overflow-hidden group bg-gradient-to-br from-indigo-50/50 to-blue-50/50 border border-white/60 hover:shadow-sm transition-all duration-300">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-100/50 rounded-full blur-xl group-hover:bg-blue-200/50 transition-colors" />

          <div className="flex items-center gap-3 mb-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-600 group-hover:scale-105 group-hover:text-blue-600 transition-all">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Need help?</h3>
              <p className="text-[11px] text-slate-500 font-medium">We&apos;re here for you</p>
            </div>
          </div>

          <button className="w-full relative z-10 bg-white hover:bg-slate-50 text-indigo-600 border border-indigo-100 rounded-xl py-2 text-xs font-bold transition-all shadow-sm hover:shadow group/btn overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-1.5">
              Contact Support
            </span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col lg:ml-64 min-h-screen pb-20 lg:pb-0 w-full lg:w-auto">

        {/* TOP HEADER */}
        <header className="bg-white/50 backdrop-blur-md px-8 py-3.5 flex items-center justify-end sticky top-0 z-10 border-b border-white/60">

          {/* Right side flex */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-sm text-slate-500 font-medium mr-1">{currentDate || 'Loading...'}</span>

            <button className="relative w-9 h-9 rounded-full bg-white/70 border border-slate-200/60 flex items-center justify-center hover:bg-white transition-colors shadow-sm">
              <Bell className="w-4 h-4 text-slate-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-1 ring-white" />
            </button>

            {/* Mobile Profile Avatar Button */}
            <Link href="/edit-profile" className="lg:hidden w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shadow-sm ring-2 ring-white hover:bg-slate-200 transition-colors">
              <User className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="flex-1 flex flex-col lg:flex-row gap-5 p-4 lg:p-6 w-full max-w-[100vw] overflow-x-hidden">
          <div className="flex-1 min-w-0">{children}</div>

          {/* RIGHT SIDEBAR - hidden on mobile, shown on lg screens, hidden on college directory, career quiz, career paths, & course suggestions */}
          {pathname === '/dashboard' && (
            <aside className="hidden lg:block w-72 flex-shrink-0 space-y-4">

              {/* ── Cold Cyan Profile Card ── */}
              <div className="relative rounded-[2rem] bg-gradient-to-br from-white via-[#f0f6ff] to-[#e0e7ff] border border-white shadow-xl shadow-blue-900/5 transition-all duration-300 p-6 flex flex-col items-center text-center overflow-hidden">

                {/* Cold background blur element */}
                <div className="absolute top-[-20%] left-[-20%] w-48 h-48 bg-cyan-400/10 rounded-full blur-[40px] pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-20%] w-48 h-48 bg-blue-500/10 rounded-full blur-[40px] pointer-events-none" />

                {/* Elegant Avatar */}
                <div className="w-20 h-20 bg-white flex items-center justify-center rounded-[1.25rem] border border-blue-100 shadow-sm mb-4 mt-2 group relative z-10 transition-transform hover:-translate-y-1 hover:shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.25rem]" />
                  <User className="w-8 h-8 text-blue-400 relative z-10 group-hover:text-cyan-500 transition-colors" />
                </div>

                <h3 className="font-extrabold text-slate-800 text-lg mb-1 tracking-tight relative z-10">Arman</h3>
                <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-6 relative z-10">Class 12 Student</p>

                {/* Custom Info Block (Cold Theme) */}
                <div className="w-full bg-white/60 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white flex flex-col gap-3 relative z-10 shadow-sm shadow-blue-900/5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-cyan-500" /> Top Match</span>
                    <span className="text-[11px] font-black text-slate-800">Software Eng.</span>
                  </div>
                  <div className="w-full h-px bg-blue-100/50" />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-blue-500" /> Trajectory</span>
                    <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wider">Locked In</span>
                  </div>
                </div>

                {/* Elegant Cold Button */}
                <Link href="/edit-profile" className="relative z-10 w-full text-center bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl py-3.5 text-[11px] font-black tracking-widest uppercase transition-all shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/30 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                  View Portfolio <ChevronRight className="w-3.5 h-3.5 text-white/70" />
                </Link>
              </div>

              {/* ── Important Dates ── */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-white/80">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 text-sm">Important Dates</h3>
                  <button className="flex items-center gap-1 text-xs text-[#5B7FDB] font-medium hover:text-[#4A6ECA]">
                    View all <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {importantDates.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50/80 transition-colors group">
                      {/* Date badge */}
                      <div className={`w-10 h-10 ${item.color} rounded-xl flex flex-col items-center justify-center flex-shrink-0 shadow-sm`}>
                        <span className="text-sm font-extrabold text-white leading-none">{item.day}</span>
                        <span className="text-[9px] text-white/80 font-medium uppercase">{item.month}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-700 leading-snug truncate">{item.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{item.date}</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Government Exams & Scholarships ── */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-white/80">
                <h3 className="font-bold text-slate-800 text-sm mb-4">Government Exams &amp; Scholarships</h3>
                <div className="space-y-2.5">
                  {govExams.map((item, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${item.bg} hover:shadow-sm transition-all group cursor-pointer`}>
                      <div className={`w-9 h-9 ${item.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <GraduationCap className={`w-4 h-4 ${item.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-700 truncate">{item.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{item.date}</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Top Free Resources ── */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-white/80">
                <h3 className="font-bold text-slate-800 text-sm mb-4">Top Free Resources</h3>
                <div className="space-y-2.5">
                  {resources.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/70 hover:bg-white hover:shadow-sm transition-all group cursor-pointer border border-transparent hover:border-slate-100">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        {i === 0
                          ? <FileText className="w-4 h-4 text-blue-600" />
                          : <BookOpen className="w-4 h-4 text-indigo-600" />
                        }
                      </div>
                      <p className="text-xs font-semibold text-slate-700 flex-1 leading-snug">{item.title}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.tagColor} flex-shrink-0`}>
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </aside>
          )}
        </div>
      </main>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200/50 z-50 flex lg:hidden items-center justify-around py-2 px-1 shadow-[0_-10px_40px_rgba(0,0,0,0.06)] pb-safe-bottom">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1.5 p-2 rounded-2xl transition-all flex-1',
                isActive ? 'text-[#4A68C8]' : 'text-slate-400 hover:text-slate-600'
              )}
            >
              <div className={cn('relative p-1.5 rounded-xl transition-all', isActive && 'bg-[#e7ecfa]')}>
                <Icon className={cn('w-5 h-5 transition-transform duration-300', isActive && 'scale-110 text-[#4A68C8] drop-shadow-sm')} />
              </div>
              <span className={cn("text-[9px] font-semibold leading-none text-center", isActive && "text-[#4A68C8]")}>{item.name.replace('Suggestions', 'Sugg.')}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}