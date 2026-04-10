'use client';

import dynamic from 'next/dynamic';

// Dynamically import the wrapper and container with SSR disabled
const AgoraWrapper = dynamic(() => import('@/components/VideoCall/AgoraWrapper'), { ssr: false });
const VideoContainer = dynamic(() => import('@/components/VideoCall/VideoContainer'), { ssr: false });

export default function CounsellingPage() {
  return (
    <main>
      <h1>Counselling Session</h1>
      <AgoraWrapper>
        {/* IMPORTANT: Use a REAL token from Agora Console here */}
        <VideoContainer 
            channelName="test-room" 
            appId={process.env.NEXT_PUBLIC_AGORA_APP_ID!} 
        />
      </AgoraWrapper>
    </main>
  );
}