'use client';

import { ReactNode, useState, useEffect } from "react";
import AgoraRTC, { AgoraRTCProvider, IAgoraRTCClient } from "agora-rtc-react";

export default function AgoraWrapper({ children }: { children: ReactNode }) {
  // Initialize client inside state to ensure it only happens on the client side
  const [client] = useState(() => 
    AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
  );

  return <AgoraRTCProvider client={client}>{children}</AgoraRTCProvider>;
}