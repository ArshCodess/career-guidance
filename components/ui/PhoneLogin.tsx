"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from "react";

type Step = "phone" | "otp" | "success";

const COUNTRY_CODES = [
  { flag: "🇮🇳", code: "+91", maxLen: 10 },
  { flag: "🇺🇸", code: "+1",  maxLen: 10 },
  { flag: "🇬🇧", code: "+44", maxLen: 10 },
  { flag: "🇦🇺", code: "+61", maxLen: 9  },
  { flag: "🇦🇪", code: "+971",maxLen: 9  },
  { flag: "🇸🇬", code: "+65", maxLen: 8  },
];

export default function PhoneLogin() {
  const [step, setStep]         = useState<Step>("phone");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone]       = useState("");
  const [otp, setOtp]           = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [timer, setTimer]       = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [toast, setToast]       = useState("");

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const maxLen = COUNTRY_CODES.find((c) => c.code === countryCode)?.maxLen ?? 10;

  // ── toast helper ──────────────────────────────────────────────────────────
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  // ── countdown ─────────────────────────────────────────────────────────────
  const startCountdown = () => {
    setTimer(30);
    setCanResend(false);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setCanResend(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };
 const router = useRouter();
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);
  useEffect(() => {
    if (step === "success") {
      const timer = setTimeout(() => {
        router.push("/dashboard"); // 2. Use the instance here
      }, 2000);
      return () => clearTimeout(timer); // 3. Proper cleanup
    }
  }, [step,router]);


  // ── Step 1: send OTP ──────────────────────────────────────────────────────
  const handleSendOTP = async () => {
    setError("");
    if (phone.length < 7) { setError("Please enter a valid phone number."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: `${countryCode}${phone}` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send OTP.");
      setStep("otp");
      startCountdown();
      setTimeout(() => otpRefs.current[0]?.focus(), 120);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: verify OTP ────────────────────────────────────────────────────
  const handleVerifyOTP = async () => {
    const code = otp.join("");
    if (code.length < 6) { setError("Enter all 6 digits."); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: `${countryCode}${phone}`, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Invalid OTP.");
      if (timerRef.current) clearInterval(timerRef.current);
      setStep("success");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Verification failed.");
      setOtp(Array(6).fill(""));
      setTimeout(() => otpRefs.current[0]?.focus(), 80);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setOtp(Array(6).fill(""));
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: `${countryCode}${phone}` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to resend OTP.");
      showToast("OTP resent successfully");
      startCountdown();
      setTimeout(() => otpRefs.current[0]?.focus(), 120);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not resend.");
    } finally {
      setLoading(false);
    }
  };

  // ── OTP box handlers ──────────────────────────────────────────────────────
  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) { e.preventDefault(); otpRefs.current[index - 1]?.focus(); }
    if (e.key === "ArrowRight" && index < 5) { e.preventDefault(); otpRefs.current[index + 1]?.focus(); }
    if (e.key === "Enter") handleVerifyOTP();
  };

  const handleOtpPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = Array(6).fill("");
    pasted.split("").forEach((ch, i) => (next[i] = ch));
    setOtp(next);
    const focusIdx = Math.min(pasted.length, 5);
    otpRefs.current[focusIdx]?.focus();
  };

  const otpFilled = otp.every((d) => d !== "");

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f0f2f8] flex items-center justify-center p-4">

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[#3B5FCC] text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg animate-fade-in">
          {toast}
        </div>
      )}

      <div className="w-full max-w-[420px] bg-white rounded-3xl overflow-hidden shadow-xl">

        {/* ── Banner ── */}
        <div
          className="relative min-h-[130px] flex items-center overflow-hidden px-6 py-5"
          style={{ background: "linear-gradient(135deg, #3B5FCC 0%, #5B7FDB 40%, #7B9AE8 70%, #A78BFA 100%)" }}
        >
          {/* Orbs */}
          <div className="absolute -top-5 -left-5 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-4 right-14 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl pointer-events-none" />
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}
          />
          {/* Content */}
          <div className="relative z-10 flex-1">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/25 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-[11px] font-semibold text-white/90 tracking-wide">Career Advisor Active</span>
            </div>
            <h1 className="text-xl font-extrabold text-white leading-tight">Sign in to continue</h1>
            <p className="text-[12px] text-white/60 mt-0.5">Class 10th &amp; 12th career guidance</p>
          </div>
          {/* Deco SVG */}
          <svg className="relative z-10 w-24 h-24 flex-shrink-0" viewBox="0 0 100 100">
            <ellipse cx="72" cy="52" rx="16" ry="4" fill="white" opacity="0.2"/>
            <polygon points="72,22 56,52 88,52" fill="white" opacity="0.2"/>
            <rect x="70" y="22" width="3" height="3" rx="1" fill="white" opacity="0.5"/>
            <line x1="88" y1="52" x2="92" y2="60" stroke="white" strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
            <circle cx="92" cy="62" r="2.5" fill="#FCD34D" opacity="0.9"/>
            <rect x="10" y="12" width="50" height="32" rx="6" fill="white" opacity="0.1"/>
            <rect x="10" y="12" width="50" height="32" rx="6" stroke="white" strokeWidth="0.6" fill="none" opacity="0.2"/>
            <circle cx="22" cy="24" r="5" fill="white" opacity="0.2"/>
            <path d="M19 24 L21.5 26.5 L26 21" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
            <rect x="30" y="21" width="24" height="3" rx="1.5" fill="white" opacity="0.35"/>
            <rect x="30" y="27" width="16" height="2.5" rx="1.2" fill="white" opacity="0.2"/>
            <polyline points="14,80 22,72 30,76 38,66 46,60 56,55" stroke="#FCD34D" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
            <circle cx="56" cy="55" r="2.5" fill="white" opacity="0.9"/>
            <circle cx="30" cy="10" r="3" fill="#FCD34D" opacity="0.75"/>
          </svg>
        </div>

        {/* ── Body ── */}
        <div className="px-6 pt-7 pb-6">

          {/* Step dots */}
          <div className="flex items-center justify-center gap-1.5 mb-6">
            {(["phone", "otp", "success"] as Step[]).map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === s ? "w-5 bg-[#5B7FDB]" :
                  (i < ["phone","otp","success"].indexOf(step)) ? "w-1.5 bg-[#5B7FDB]" :
                  "w-1.5 bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* ───── STEP 1: Phone ───── */}
          {step === "phone" && (
            <>
              <p className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase mb-1">Step 1 of 2</p>
              <h2 className="text-[18px] font-semibold text-gray-900 mb-1">Enter your phone number</h2>
              <p className="text-[13px] text-gray-500 mb-5 leading-relaxed">
                We'll send a one-time code via SMS to verify your identity.
              </p>

              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Mobile number</label>
              <div className="flex gap-2 mb-4">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-[90px] h-11 px-2 rounded-xl border border-gray-200 bg-gray-50 text-[13px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5B7FDB]/30 focus:border-[#5B7FDB]"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                  ))}
                </select>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={maxLen}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
                  placeholder="98765 43210"
                  className="flex-1 h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-[15px] text-gray-800 tracking-wider focus:outline-none focus:ring-2 focus:ring-[#5B7FDB]/30 focus:border-[#5B7FDB] placeholder:text-gray-300"
                />
              </div>

              {error && <p className="text-[12px] text-red-500 mb-3">{error}</p>}

              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full h-11 rounded-xl text-white text-[15px] font-semibold disabled:opacity-50 transition-all active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #3B5FCC, #7B9AE8)" }}
              >
                {loading ? "Sending…" : "Send OTP"}
              </button>

              <p className="text-[11px] text-gray-400 text-center mt-3 leading-relaxed">
                By continuing, you agree to our{" "}
                <a href="#" className="text-[#5B7FDB]">Terms of Service</a> &amp;{" "}
                <a href="#" className="text-[#5B7FDB]">Privacy Policy</a>
              </p>
            </>
          )}

          {/* ───── STEP 2: OTP ───── */}
          {step === "otp" && (
            <>
              <button
                onClick={() => { setStep("phone"); setOtp(Array(6).fill("")); setError(""); if (timerRef.current) clearInterval(timerRef.current); }}
                className="flex items-center gap-1 text-[13px] text-gray-400 hover:text-gray-600 mb-4 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back
              </button>

              <p className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase mb-1">Step 2 of 2</p>
              <h2 className="text-[18px] font-semibold text-gray-900 mb-1">Verify OTP</h2>
              <p className="text-[13px] text-gray-500 mb-5 leading-relaxed">
                Enter the 6-digit code sent to{" "}
                <span className="font-medium text-gray-700">{countryCode} {"•".repeat(phone.length - 4)}{phone.slice(-4)}</span>
              </p>

              {/* OTP boxes */}
              <div className="flex gap-2 justify-center mb-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    onPaste={handleOtpPaste}
                    className={`w-11 h-13 text-center text-[22px] font-semibold rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#5B7FDB]/30 ${
                      digit
                        ? "border-[#5B7FDB] bg-[#5B7FDB]/5 text-gray-900"
                        : "border-gray-200 bg-gray-50 text-gray-900"
                    }`}
                    style={{ height: "52px" }}
                  />
                ))}
              </div>

              {/* Resend */}
              <div className="text-center text-[12px] text-gray-400 mb-5">
                Didn't receive it?{" "}
                <button
                  onClick={handleResend}
                  disabled={!canResend || loading}
                  className="font-semibold text-[#5B7FDB] disabled:text-gray-400 disabled:cursor-default transition-colors"
                >
                  {canResend ? "Resend OTP" : `Resend in ${timer}s`}
                </button>
              </div>

              {error && <p className="text-[12px] text-red-500 mb-3 text-center">{error}</p>}

              <button
                onClick={handleVerifyOTP}
                disabled={!otpFilled || loading}
                className="w-full h-11 rounded-xl text-white text-[15px] font-semibold disabled:opacity-50 transition-all active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #3B5FCC, #7B9AE8)" }}
              >
                {loading ? "Verifying…" : "Verify & Sign In"}
              </button>
            </>
          )}

          {/* ───── STEP 3: Success ───── */}
          {step === "success" && (
            <div className="text-center py-2">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 animate-bounce">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M6 14l6 6L22 8" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-[18px] font-semibold text-gray-900 mb-1">You're verified!</h2>
              <p className="text-[13px] text-gray-500 mb-6 leading-relaxed">
                Welcome to your Career Advisor dashboard.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}