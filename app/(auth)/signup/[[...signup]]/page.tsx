import { SignUp } from "@clerk/nextjs";
import { Sparkles, GraduationCap, MapPin, Building2 } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex bg-[#E8ECF5]">
      {/* LEFT SIDE - Visual/Brand Panel (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12" style={{ background: 'linear-gradient(135deg, #A78BFA 0%, #7B9AE8 40%, #5B7FDB 70%, #3B5FCC 100%)' }}>
        {/* Background Decorative Patterns */}
        <div className="absolute inset-0 opacity-10"
             style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="absolute -top-24 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white to-indigo-50 flex items-center justify-center shadow-xl">
            <Sparkles className="w-6 h-6 text-indigo-600" />
          </div>
          <span className="text-3xl font-extrabold text-white tracking-tight">Learnthru</span>
        </div>

        {/* Center Content */}
        <div className="relative z-10 max-w-lg mt-12 leading-relaxed">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-300 animate-bounce" />
            <span className="text-sm font-semibold text-white uppercase tracking-wide">Join Our Community</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Unlock Your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-emerald-400">
              True Potential
            </span>
          </h1>
          <p className="text-lg text-white/80 max-w-md">
            Create an account to track entrance exams, get customized scholarship alerts, and build a career profile tailored to you.
          </p>
        </div>

        {/* Bottom Testimonial / Story */}
        <div className="relative z-10 mt-12 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl max-w-md">
           <div className="flex items-center gap-4 mb-4">
             <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center text-white font-bold text-lg">S</div>
             <div>
                <p className="text-white font-bold text-sm">Stella Walton</p>
                <p className="text-white/60 text-xs">Class 12 Student</p>
             </div>
           </div>
           <p className="text-white/90 text-sm leading-relaxed italic">
            &quot;Thanks to Learnthru, I found government colleges and scholarships I didn&apos;t even know existed. It completely changed my career trajectory!&quot;
           </p>
        </div>
      </div>

      {/* RIGHT SIDE - Authentication Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Subtle mobile background */}
        <div className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.05) 0%, rgba(59,95,204,0.05) 100%)' }} />

        {/* Back to Home Button (Mobile only) */}
        <Link href="/" className="lg:hidden absolute top-6 left-6 flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </div>
          <span className="font-bold text-slate-800">Learnthru</span>
        </Link>
        
        <div className="w-full max-w-md relative z-10 flex flex-col items-center">
          <div className="mb-8 text-center lg:hidden">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Create Account</h2>
            <p className="text-slate-500 text-sm">Start your career journey today</p>
          </div>
          
          <SignUp 
            path="/signup" 
            routing="path" 
            signInUrl="/login" 
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
