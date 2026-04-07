import { SignIn } from "@clerk/nextjs";
import { Sparkles, GraduationCap, Laptop, Building2, Quote } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex bg-[#E8ECF5]">
      {/* LEFT SIDE - Visual/Brand Panel (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12" style={{ background: 'linear-gradient(135deg, #3B5FCC 0%, #5B7FDB 40%, #7B9AE8 70%, #A78BFA 100%)' }}>
        {/* Background Decorative Patterns */}
        <div className="absolute inset-0 opacity-10"
             style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="absolute -top-24 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-white flex items-center justify-center shadow-xl">
            <Sparkles className="w-6 h-6 text-indigo-600" />
          </div>
          <span className="text-3xl font-extrabold text-white tracking-tight">Learnthru</span>
        </div>

        {/* Center Content */}
        <div className="relative z-10 max-w-lg mt-12">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
            <span className="text-sm font-semibold text-white uppercase tracking-wide">Career Guidance Platform</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Discover Your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
              Perfect Career Path
            </span>
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-md">
            Join thousands of students exploring government colleges, exclusive scholarships, and personalized course recommendations based on psychometric testing.
          </p>
        </div>

        {/* Bottom Feature Grid */}
        <div className="relative z-10 grid grid-cols-2 gap-4 mt-12 mb-8">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
            <GraduationCap className="w-6 h-6 text-amber-300 mb-3" />
            <h3 className="text-white font-semibold mb-1">Top Colleges</h3>
            <p className="text-white/60 text-sm">Find the best fit for your future</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
            <Building2 className="w-6 h-6 text-emerald-300 mb-3" />
            <h3 className="text-white font-semibold mb-1">Govt. Exams</h3>
            <p className="text-white/60 text-sm">Prepare and track deadlines</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Authentication Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Subtle mobile background */}
        <div className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(135deg, rgba(59,95,204,0.05) 0%, rgba(167,139,250,0.05) 100%)' }} />

        {/* Back to Home Button (Mobile only) */}
        <Link href="/" className="lg:hidden absolute top-6 left-6 flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </div>
          <span className="font-bold text-slate-800">Learnthru</span>
        </Link>
        
        <div className="w-full max-w-md relative z-10 flex flex-col items-center">
          <div className="mb-8 text-center lg:hidden">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h2>
            <p className="text-slate-500 text-sm">Sign in to continue your journey</p>
          </div>
          
          <SignIn 
            path="/login" 
            routing="path" 
            signUpUrl="/signup" 
            fallbackRedirectUrl="/dashboard" 
            appearance={{
              elements: {
                rootBox: "w-full shadow-2xl rounded-2xl overflow-hidden border border-slate-100",
                card: "w-full bg-white text-slate-800 shadow-none sm:p-8 p-6",
                headerTitle: "text-2xl font-bold text-slate-900 tracking-tight",
                headerSubtitle: "text-slate-500 text-sm",
                socialButtonsBlockButton: "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm transition-all rounded-xl",
                socialButtonsBlockButtonText: "font-semibold text-sm",
                formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 text-sm font-bold rounded-xl transition-all",
                formFieldLabel: "text-slate-700 font-semibold text-xs",
                formFieldInput: "bg-slate-50 border-slate-200 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm transition-all",
                dividerLine: "bg-slate-200",
                dividerText: "text-slate-400 text-xs font-semibold uppercase",
                footerActionText: "text-slate-500",
                footerActionLink: "text-indigo-600 font-semibold hover:text-indigo-700",
                identityPreviewText: "text-slate-700",
                identityPreviewEditButtonIcon: "text-indigo-600",
              }
            }}
          />
          
          {/* Support/Footer Links */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <Link href="#" className="hover:text-indigo-600 transition-colors">Help Center</Link>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <Link href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <Link href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
