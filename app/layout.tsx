import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Learnthru - Your Career Guidance Platform',
  description: 'Discover government colleges, scholarships, and career paths. Get personalized course recommendations through psychometric testing.',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <header className="absolute top-0 right-0 w-full flex justify-end items-center p-4 gap-4 h-16 z-[100] pointer-events-none">
            <div className="pointer-events-auto flex gap-4 items-center">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 px-5 cursor-pointer shadow-lg transition-all">
                    Sign Up
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
