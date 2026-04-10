'use client';

import { Sparkles, GraduationCap, Building2, MapPin, TrendingUp, ArrowRight, Star, Hexagon, Triangle } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  // Staggered animation controller for the main content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15, 
        delayChildren: 0.2 
      }
    }
  };

  // Spring animation for each item appearing
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 80, damping: 12 }
    }
  };

  return (
    <>
      <style>{`
        @keyframes panPattern {
          0% { background-position: 0px 0px; }
          100% { background-position: 32px 32px; }
        }
        .animate-pattern {
          animation: panPattern 20s linear infinite;
        }
      `}</style>
      <div className="h-screen relative overflow-hidden bg-[#FAFBFF] flex flex-col w-full selection:bg-indigo-100">
        
        {/* Animated Background Orbs via Framer Motion - VIBRANT & HIGHLY VISIBLE */}
        <motion.div 
          animate={{ y: [-40, 40, -40], x: [-20, 20, -20], rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-[#3B5FCC]/35 rounded-full blur-[90px] pointer-events-none z-0 mix-blend-multiply" 
        />
        <motion.div 
          animate={{ y: [40, -40, 40], x: [20, -20, 20], rotate: [0, -10, 10, 0], scale: [0.9, 1.3, 0.9] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] bg-[#A78BFA]/45 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-multiply" 
        />
        <motion.div 
          animate={{ x: [-30, 30, -30], y: [-20, 20, -20] }} 
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[25%] right-[10%] w-[35%] h-[35%] bg-fuchsia-500/25 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-multiply" 
        />
        <motion.div 
          animate={{ x: [30, -30, 30], y: [20, -20, 20], scale: [1, 1.1, 1] }} 
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] bg-sky-400/35 rounded-full blur-[110px] pointer-events-none z-0 mix-blend-multiply" 
        />

        {/* Floating Geometric Particles for Extra Motion Magic - MORE VISIBLE AND COLOURFUL */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none h-full w-full">
          {/* Vibrant Indigo Ring */}
          <motion.div 
            animate={{ y: [0, -60, 0], x: [0, 20, 0], rotate: [0, 180, 360], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-[15%] left-[15%] w-12 h-12 rounded-full border-[5px] border-indigo-600/70 shadow-[0_0_20px_rgba(79,70,229,0.6)]"
          />
          {/* Vibrant Fuchsia Diamond */}
          <motion.div 
            animate={{ y: [0, 80, 0], rotate: [0, -180, -360], scale: [0.8, 1.3, 0.8], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute top-[28%] right-[18%] w-10 h-10 rounded-xl border-[5px] border-fuchsia-500/80 rotate-45 shadow-[0_0_20px_rgba(217,70,239,0.6)]"
          />
          {/* Solid Sky Blue Dot */}
          <motion.div 
            animate={{ x: [0, 80, 0], y: [0, -40, 0], opacity: [0.4, 0.9, 0.4], scale: [1, 1.5, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[35%] left-[22%] w-5 h-5 bg-sky-500 rounded-full blur-[1px] shadow-[0_0_20px_rgba(14,165,233,0.8)]"
          />
          {/* Solid Purple Dot */}
          <motion.div 
            animate={{ y: [0, -50, 0], x: [0, -30, 0], scale: [0.8, 1.5, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[60%] right-[25%] w-7 h-7 bg-purple-600 rounded-full blur-[1px] shadow-[0_0_20px_rgba(147,51,234,0.8)]"
          />

          {/* NEW ANIMATIONS */}
          {/* 1. Spinning Golden Star */}
          <motion.div
            animate={{ rotate: [0, 360], scale: [0.8, 1.4, 0.8], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute top-[12%] right-[32%] text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]"
          >
            <Star className="w-10 h-10" fill="currentColor" />
          </motion.div>
          {/* 2. Floating Emerald Hexagon */}
          <motion.div
            animate={{ y: [20, -30, 20], x: [-10, 10, -10], rotate: [-45, 45, -45], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] right-[15%] text-emerald-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.7)]"
          >
            <Hexagon className="w-12 h-12" strokeWidth={2.5} />
          </motion.div>
          {/* 3. Zig-Zag Rose Triangle */}
          <motion.div
            animate={{ x: [-30, 30, -30], y: [-40, 40, -40], rotate: [0, 120, 240, 360], opacity: [0.6, 1, 0.6], scale: [0.9, 1.2, 0.9] }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="absolute top-[42%] left-[8%] text-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.7)]"
          >
            <Triangle className="w-10 h-10" strokeWidth={3} />
          </motion.div>
        </div>
        
        {/* Moving Dot grid pattern overlay manually animated via CSS for best performance */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-0 animate-pattern"
            style={{
              backgroundImage: 'radial-gradient(circle, #3B5FCC 2px, transparent 2px)',
              backgroundSize: '32px 32px',
            }}
        />

        {/* Header - Fades down gently */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex items-center justify-between px-6 py-3 lg:px-12 backdrop-blur-md bg-white/70 border-b border-indigo-50/80"
        >
          <div className="flex items-center gap-3 group cursor-pointer">
            <motion.div 
               whileHover={{ scale: 1.05, rotate: 5 }}
               transition={{ type: "spring", stiffness: 400, damping: 10 }}
               className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3B5FCC] to-[#A78BFA] flex items-center justify-center shadow-lg shadow-indigo-200/50 group-hover:shadow-indigo-300/50"
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
            <span className="text-xl font-black text-slate-800 tracking-tight">Learnthru</span>
          </div>
          <div className="flex items-center gap-6">
              <Link href="/dashboard" className="text-xs font-bold text-slate-600 hover:text-[#5B7FDB] transition-colors">
                Login
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/dashboard" className="hidden sm:inline-flex text-xs font-bold bg-white text-[#3B5FCC] border-2 border-indigo-50 px-5 py-2 rounded-full hover:bg-indigo-50 hover:border-indigo-100 transition-all shadow-[0_2px_10px_-3px_rgba(59,95,204,0.1)] hover:shadow-[0_4px_14px_-4px_rgba(59,95,204,0.2)]">
                  Sign Up
                </Link>
              </motion.div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 py-4 lg:py-6 lg:px-12 h-full pointer-events-none">
          {/* Re-enable pointer events for interactive container */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto w-full flex flex-col items-center text-center pointer-events-auto"
          >
            
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md shadow-md border border-indigo-200/60 rounded-full px-4 py-1.5 mb-5 hover:shadow-lg transition-shadow cursor-default group/pill">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-100"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[12px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600 tracking-wider uppercase">
                The #1 Career Guidance Platform
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-[1.05] mb-4 relative drop-shadow-sm">
              Discover Your True<br />
              {/* Dynamic Animated Gradient Text - MORE COLORFUL */}
              <motion.span 
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                style={{ backgroundSize: "200% auto" }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-[#3B5FCC] to-sky-500 pb-1 inline-block drop-shadow-sm"
              >
                Potential &amp; Purpose
              </motion.span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto mb-6 leading-relaxed font-bold">
              Take psychometric tests, discover top government colleges, track vital scholarship deadlines, and build a career path mapped perfectly to your unique skills.
            </motion.p>
            
            {/* THE BIG "GET STARTED" BUTTON */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-2 w-full sm:w-auto relative group/btn">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10 w-full sm:w-auto">
                  <Link href="/dashboard" className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#3B5FCC] via-[#5B7FDB] to-fuchsia-600 text-white font-black text-lg px-10 py-4 rounded-full overflow-hidden shadow-[0_8px_30px_rgb(59,95,204,0.4)] hover:shadow-[0_8px_40px_rgb(217,70,239,0.5)] transition-all duration-300 border border-white/20">
                    <span className="relative z-10 tracking-wide">Get Started</span>
                    <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                    {/* Animated Shine Effect */}
                    <div className="absolute top-0 bottom-0 left-[-100%] w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:left-[150%] transition-all duration-700 ease-in-out -skew-x-12" />
                  </Link>
                </motion.div>
            </motion.div>
            <motion.p variants={itemVariants} className="text-[12px] text-slate-500 mb-8 font-bold mt-2">Click to navigate to your dashboard directly</motion.p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mx-auto mt-2">
              {[
                { label: 'Colleges', value: '10k+', icon: Building2, color: 'text-[#3B5FCC]', bg: 'bg-[#3B5FCC]/15', border: 'border-[#3B5FCC]/20' },
                { label: 'Scholarships', value: '5k+', icon: GraduationCap, color: 'text-fuchsia-600', bg: 'bg-fuchsia-500/15', border: 'border-fuchsia-500/20' },
                { label: 'Exams', value: '500+', icon: TrendingUp, color: 'text-[#A78BFA]', bg: 'bg-[#A78BFA]/15', border: 'border-[#A78BFA]/20' },
                { label: 'Paths', value: '300+', icon: MapPin, color: 'text-sky-500', bg: 'bg-sky-500/15', border: 'border-sky-500/20' },
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                  className={`group bg-white/70 backdrop-blur-xl border-2 ${stat.border} rounded-[1.5rem] p-4 sm:p-5 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl hover:shadow-[#3B5FCC]/20 cursor-default relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div 
                    whileHover={{ scale: 1.15, rotate: [0, -15, 15, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`relative z-10 w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} mb-3`}
                  >
                    <stat.icon className="w-6 h-6" strokeWidth={2.5} />
                  </motion.div>
                  <span className="relative z-10 text-2xl sm:text-3xl font-black text-slate-800 mb-0.5 tracking-tight">{stat.value}</span>
                  <span className="relative z-10 text-[11px] font-bold text-slate-600 uppercase tracking-widest">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
