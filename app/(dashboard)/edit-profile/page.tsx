'use client';

import { useState, useEffect } from 'react';
import {
  Camera, User, Mail, BookOpen, Target, Sparkles,
  Building2, ChevronLeft, Calendar, Save, CheckCircle,
  AlertCircle, Loader2, Plus, X,
} from 'lucide-react';
import Link from 'next/link';
import { useUserContext } from '@/hooks/user-context';

export const dynamic = 'force-dynamic';

// Extended local form shape — a superset of UserProfile
interface LocalProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  address: string;
  bio: string;
  avatar_url: string;
  class_level: string;
  target_degree: string;
  interests: string[];
}

const EMPTY: LocalProfile = {
  first_name: '', last_name: '', email: '',
  phone: '', date_of_birth: '', gender: '',
  address: '', bio: '', avatar_url: '',
  class_level: '12', target_degree: 'btech', interests: [],
};

// ── Skeleton block ──────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200 ${className ?? ''}`}
    />
  );
}

function ProfileSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="w-40 h-6" />
          <Skeleton className="w-64 h-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="space-y-6">
          <div className="bg-white/60 rounded-3xl border border-white p-6 shadow-sm space-y-4">
            <Skeleton className="w-32 h-32 rounded-full mx-auto" />
            <Skeleton className="w-28 h-5 mx-auto" />
            <Skeleton className="w-20 h-6 mx-auto rounded-full" />
            <div className="space-y-3 pt-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4" />
            </div>
          </div>
          <Skeleton className="w-full h-40 rounded-3xl" />
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/60 rounded-3xl border border-white p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <Skeleton className="w-40 h-6" />
            </div>
            <div className="grid grid-cols-2 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`space-y-1.5 ${i >= 4 ? 'col-span-2' : ''}`}>
                  <Skeleton className="w-24 h-3" />
                  <Skeleton className="w-full h-10" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/60 rounded-3xl border border-white p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <Skeleton className="w-48 h-6" />
            </div>
            <div className="grid grid-cols-2 gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <Skeleton className="w-24 h-3" />
                  <Skeleton className="w-full h-10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── AddInterestInput ────────────────────────────────────────
function AddInterestInput({ onAdd }: { onAdd: (v: string) => void }) {
  const [isAdding, setIsAdding] = useState(false);
  const [value, setValue] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) { onAdd(value.trim()); setValue(''); setIsAdding(false); }
  };

  if (isAdding) {
    return (
      <form onSubmit={submit} className="flex items-center gap-2">
        <input
          autoFocus
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Enter interest..."
          className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
        <button type="submit" className="px-2 py-1.5 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700">
          <Plus className="w-3 h-3" />
        </button>
        <button type="button" onClick={() => { setIsAdding(false); setValue(''); }}
          className="px-2 py-1.5 bg-slate-300 text-slate-600 text-xs rounded-lg hover:bg-slate-400">
          <X className="w-3 h-3" />
        </button>
      </form>
    );
  }
  return (
    <button onClick={() => setIsAdding(true)}
      className="px-3 py-1.5 border border-dashed border-slate-300 text-slate-500 text-xs font-semibold rounded-lg hover:border-slate-400 hover:text-slate-600 transition-colors">
      + Add Interest
    </button>
  );
}

// ── Main component ──────────────────────────────────────────
export default function EditProfile() {
  const { user, isLoading, updateUser } = useUserContext();

  const [profile, setProfile] = useState<LocalProfile>(EMPTY);
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // ── Seed form from context ──
  useEffect(() => {
    if (!user) return;
    setProfile({
      first_name:     user.firstName ?? '',
      last_name:      user.lastName  ?? '',
      email:          user.email     ?? '',
      phone:          user.phoneNumber ?? '',
      avatar_url:     user.imageUrl  ?? '',            // ← imageUrl (not profileImageUrl)
      interests:      user.preferences?.interests ?? [],
      // preferences fields not yet in UserPreferences type — cast safely
      class_level:    (user.preferences as any)?.class_level   ?? '12',
      target_degree:  (user.preferences as any)?.target_degree ?? 'btech',
      date_of_birth:  (user.preferences as any)?.date_of_birth ?? '',
      gender:         (user.preferences as any)?.gender        ?? '',
      address:        (user.preferences as any)?.address       ?? '',
      bio:            (user.preferences as any)?.bio           ?? '',
    });
  }, [user]);

  const set = (field: keyof LocalProfile, value: string) =>
    setProfile(prev => ({ ...prev, [field]: value }));

  const addInterest = (v: string) => {
    if (!profile.interests.includes(v))
      setProfile(prev => ({ ...prev, interests: [...prev.interests, v] }));
  };

  const removeInterest = (v: string) =>
    setProfile(prev => ({ ...prev, interests: prev.interests.filter(i => i !== v) }));

  // ── Save: optimistic context update + background POST ──
  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    // 1. Optimistically update context right away
    updateUser({
      firstName:   profile.first_name,
      lastName:    profile.last_name,
      fullName:    `${profile.first_name} ${profile.last_name}`.trim(),
      email:       profile.email,
      phoneNumber: profile.phone,
      imageUrl:    profile.avatar_url,
      preferences: {
        ...(user?.preferences ?? {}),
        interests: profile.interests,
        // spread extra fields — cast because UserPreferences type is narrow
        ...({
          class_level:   profile.class_level,
          target_degree: profile.target_degree,
          date_of_birth: profile.date_of_birth,
          gender:        profile.gender,
          address:       profile.address,
          bio:           profile.bio,
        } as any),
      },
    });

    // 2. Persist in background
    try {
      const res = await fetch('/api/user', {
        method: 'POST',          // change to PATCH if your route uses PATCH
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName:   profile.first_name,
          lastName:    profile.last_name,
          email:       profile.email,
          phoneNumber: profile.phone,
          imageUrl:    profile.avatar_url,
          preferences: {
            interests:     profile.interests,
            class_level:   profile.class_level,
            target_degree: profile.target_degree,
            date_of_birth: profile.date_of_birth,
            gender:        profile.gender,
            address:       profile.address,
            bio:           profile.bio,
          },
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      setMessage({ type: 'success', text: 'Profile saved successfully!' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Save failed. Your changes are kept locally.' });
    } finally {
      setSaving(false);
    }
  };

  // ── Show skeleton while context is loading ──
  if (isLoading) return <ProfileSkeleton />;

  // ── Derive display values from the now-seeded profile ──
  const displayName = [profile.first_name, profile.last_name].filter(Boolean).join(' ') || 'Your Name';
  const classLabel: Record<string, string> = {
    '10': 'Class 10', '11': 'Class 11', '12': 'Class 12', college: 'College Student',
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-6 duration-700">

      {/* ── Header ── */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard"
          className="w-10 h-10 bg-white/60 backdrop-blur-md border border-white/60 rounded-xl flex items-center justify-center text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Edit Profile</h1>
          <p className="text-sm text-slate-500">Update your personal details and career preferences</p>
          <Link href="/edit-profile/save-changes"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium mt-2 transition-colors">
            <Save className="w-4 h-4" />
            Manage Saves &amp; Changes
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Left column ── */}
        <div className="space-y-6">
          <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div
                className="w-32 h-32 bg-slate-100 flex items-center justify-center relative rounded-full overflow-hidden ring-4 ring-white shadow-lg mb-6 cursor-pointer transform hover:scale-105 transition-all duration-300"
                onMouseEnter={() => setIsHoveringAvatar(true)}
                onMouseLeave={() => setIsHoveringAvatar(false)}
              >
                {profile.avatar_url
                  ? <img src={profile.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                  : <User className="w-14 h-14 text-slate-400" />
                }
                <div className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${isHoveringAvatar ? 'opacity-100' : 'opacity-0'}`}>
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>

              <h2 className="text-lg font-bold text-slate-800">{displayName}</h2>
              <p className="text-sm text-indigo-600 font-semibold mb-4 bg-indigo-50 px-3 py-1 rounded-full mt-2">
                {classLabel[profile.class_level] ?? 'Student'}
              </p>

              <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="truncate">{profile.email || '—'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Joined {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tip card */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 shadow-md shadow-indigo-200 text-white relative overflow-hidden">
            <Sparkles className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10" />
            <h3 className="font-bold text-lg mb-2">Want better matches?</h3>
            <p className="text-sm text-indigo-100 leading-relaxed mb-4">Complete your profile to get more accurate career and college recommendations.</p>
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
              <div className="bg-white h-full w-[70%] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
            <p className="text-xs text-indigo-100 mt-2 font-medium text-right">70% Complete</p>
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Personal Details */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">Personal Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { label: 'First Name', field: 'first_name' as const, type: 'text' },
                { label: 'Last Name',  field: 'last_name'  as const, type: 'text' },
                { label: 'Phone Number', field: 'phone' as const, type: 'tel', placeholder: '+91 XXXXX XXXXX' },
                { label: 'Date of Birth', field: 'date_of_birth' as const, type: 'date' },
              ].map(({ label, field, type, placeholder }) => (
                <div key={field} className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 ml-1">{label}</label>
                  <input
                    type={type}
                    value={profile[field] as string}
                    onChange={e => set(field, e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all font-medium text-slate-700"
                  />
                </div>
              ))}

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-slate-500 ml-1">Email Address</label>
                <input type="email" value={profile.email}
                  onChange={e => set('email', e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all font-medium text-slate-700"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-slate-500 ml-1">Address</label>
                <textarea value={profile.address} rows={3}
                  onChange={e => set('address', e.target.value)}
                  placeholder="Enter your full address"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all font-medium text-slate-700 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Academic & Interests */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">Academic &amp; Interests</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 ml-1">Current Grade/Class</label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select value={profile.class_level} onChange={e => set('class_level', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all font-medium text-slate-700 appearance-none">
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                    <option value="college">College Student</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 ml-1">Target Degree</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select value={profile.target_degree} onChange={e => set('target_degree', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all font-medium text-slate-700 appearance-none">
                    <option value="btech">B.Tech / B.E.</option>
                    <option value="mbbs">MBBS</option>
                    <option value="bba">BBA</option>
                    <option value="bcom">B.Com</option>
                    <option value="ba">B.A.</option>
                    <option value="bsc">B.Sc.</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 ml-1">Gender</label>
                <select value={profile.gender} onChange={e => set('gender', e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all font-medium text-slate-700 appearance-none">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-slate-500 ml-1">Bio</label>
                <textarea value={profile.bio} rows={3}
                  onChange={e => set('bio', e.target.value)}
                  placeholder="Tell us about yourself, your goals, and aspirations..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all font-medium text-slate-700 resize-none"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-slate-500 ml-1">Areas of Interest</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.interests.map((interest, i) => (
                    <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg border border-indigo-100 flex items-center gap-2">
                      {interest}
                      <button onClick={() => removeInterest(interest)}
                        className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-indigo-200 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <AddInterestInput onAdd={addInterest} />
                </div>
              </div>
            </div>
          </div>

          {/* Save action */}
          <div className="flex flex-col gap-4">
            {message && (
              <div className={`flex items-center gap-3 p-4 rounded-2xl ${
                message.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {message.type === 'success'
                  ? <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  : <AlertCircle className="w-5 h-5 flex-shrink-0" />
                }
                <span className="text-sm font-medium">{message.text}</span>
              </div>
            )}

            <div className="flex justify-end">
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg shadow-indigo-200 transform hover:-translate-y-0.5 disabled:hover:translate-y-0 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed">
                {saving
                  ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</>
                  : <><Save className="w-4 h-4" />Save Changes</>
                }
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}