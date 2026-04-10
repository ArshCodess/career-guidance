// // components/AgoraProvider.tsx
// 'use client';
// import dynamic from 'next/dynamic';
// import { useMemo } from 'react';
// import AgoraRTC from 'agora-rtc-sdk-ng'; // Import directly if needed for type

// // Wrap the Provider in dynamic to prevent SSR issues
// const AgoraRTCProvider = dynamic(
//   () => import('agora-rtc-react').then((mod) => mod.AgoraRTCProvider),
//   { ssr: false }
// );

// export default function Provider({ children }: { children: React.ReactNode }) {
//   const client = useMemo(() => AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' }), []);
//   return <AgoraRTCProvider client={client}>{children}</AgoraRTCProvider>;
// }
