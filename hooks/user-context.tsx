'use client';

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

export type UserPreferences = {
  interests?: string[];
  streams?: string[];
  careerGoals?: string[];
};

export type UserProfile = {
  clerkUserId: string;
  email: string;
  emailVerified?: boolean;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  imageUrl?: string;
  phoneNumber?: string;
  role?: 'student' | 'counselor' | 'admin' | 'guest';
  onboardingStatus?: 'pending' | 'completed' | 'in_progress';
  preferences?: UserPreferences;
};

export type UserContextValue = {
  user: UserProfile | null;
  isLoading: boolean;
  setUser: (value: UserProfile | null) => void;
  updateUser: (partial: Partial<UserProfile>) => void;
  clearUser: () => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({
  children,
  initialUser = null,
}: {
  children: ReactNode;
  initialUser?: UserProfile | null;
}) {
  const [user, setUser] = useState<UserProfile | null>(initialUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch('/api/user', { cache: 'no-store' });
        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = await response.json();
        setUser(data);
        console.log(data);
        
      } catch (error) {
        console.error('Failed to load user profile', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      setUser,
      updateUser: (partial: Partial<UserProfile>) => {
        setUser((current) => (current ? { ...current, ...partial } : null));
      },
      clearUser: () => setUser(null),
    }),
    [user, isLoading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext(): UserContextValue {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}
