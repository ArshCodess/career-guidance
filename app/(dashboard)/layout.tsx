'use client';

import { GraduationCap, Briefcase, Building2, Gift, Search, Bell, ChevronRight, BookOpen, ClipboardList, LayoutDashboard, Sparkles, FileText, Headphones, User, TrendingUp, MapPin } from 'lucide-react';
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
    <div className="min-h-screen flex bg-[#E8ECF5]">

      {/* LEFT SIDEBAR - fixed */}
      <aside className="hidden lg:flex w-64 bg-white/60 backdrop-blur-sm p-6 flex-col gap-6 fixed top-0 left-0 h-screen overflow-y-auto z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-800">Learnthru</span>
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

        {/* TOP HEADER — single search bar, no duplicate */}
        <header className="bg-white/50 backdrop-blur-md px-8 py-3.5 flex items-center justify-between sticky top-0 z-10 border-b border-white/60">
          {/* Search */}
          <div className="relative w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, colleges..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/80 border border-slate-200/80 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/40 placeholder:text-slate-400 text-slate-700"
            />
          </div>

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

          {/* RIGHT SIDEBAR - hidden on mobile, shown on lg screens */}
          <aside className="hidden lg:block w-72 flex-shrink-0 space-y-4">

            {/* ── Profile Card ── */}
            <div className="relative rounded-3xl overflow-hidden group border border-white/60 bg-white/40 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500">
              {/* Gradient top band */}
              <div className="h-24 w-full relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #3B82F6 50%, #8B5CF6 100%)' }}>
                <div className="absolute top-2 right-2 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute top-0 left-4 w-12 h-12 bg-white/20 rounded-full blur-xl group-hover:translate-x-4 transition-transform duration-700" />
              </div>
              <div className="bg-white/70 backdrop-blur-md px-5 pb-6 pt-0 relative z-10">
                {/* Avatar — overlapping the band */}
                <div className="flex justify-center -mt-12 mb-4 relative z-20">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
                    <div className="w-24 h-24 bg-slate-100 flex items-center justify-center relative rounded-full overflow-hidden ring-4 ring-white shadow-xl transform group-hover:scale-105 transition-transform duration-500">
                      <User className="w-10 h-10 text-slate-400" />
                    </div>
                  </div>
                </div>

                <h3 className="text-center font-bold text-slate-800 text-lg group-hover:text-indigo-700 transition-colors">Stella Walton</h3>
                <p className="text-center text-xs text-slate-500 mb-4 font-medium uppercase tracking-wider">Class 12 Student</p>

                {/* Progress */}
                <div className="bg-slate-50/80 rounded-2xl p-3 mb-5 border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                      <span className="text-[11px] text-slate-600 font-semibold">Profile Strength</span>
                    </div>
                    <span className="text-[11px] text-indigo-600 font-bold">70%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full w-[70%] bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full relative overflow-hidden">
                      <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[shimmer_2s_linear_infinite]"></div>
                    </div>
                  </div>
                </div>

                <Link href="/edit-profile" className="block w-full text-center bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl py-3 text-sm font-bold transition-all duration-300 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 transform hover:-translate-y-0.5 relative overflow-hidden group/btn">
                  <span className="relative z-10">Edit Profile</span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                </Link>
              </div>
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