'use client';

import {
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
  RemoteUser,
  LocalVideoTrack,
} from "agora-rtc-react";

interface VideoContainerProps {
  channelName: string;
  appId: string;
}

export default function VideoContainer({ channelName, appId }: VideoContainerProps) {
  // 1. Initialize tracks with built-in TS hooks
  const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  
  // 2. State management for remote participants
  const remoteUsers = useRemoteUsers();

  // 3. Join the channel (Token should ideally come from an API)
  useJoin({
    appid: appId,
    channel: channelName,
    token: null, 
  });

  // 4. Automatically publish local media when ready
  usePublish([localMicrophoneTrack, localCameraTrack]);

  if (isLoadingMic || isLoadingCam) {
    return <div className="flex items-center justify-center h-64">Accessing Media...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-900 rounded-xl">
      {/* My Local Video */}
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden border-2 border-blue-500">
        <LocalVideoTrack track={localCameraTrack} play={true} className="w-full h-full object-cover" />
        <p className="absolute bottom-2 left-2 text-xs bg-black/60 px-2 py-1 rounded text-white">You</p>
      </div>

      {/* Remote Participant Videos */}
      {remoteUsers.map((user) => (
        <div key={user.uid} className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <RemoteUser user={user} />
          <p className="absolute bottom-2 left-2 text-xs bg-black/60 px-2 py-1 rounded text-white">
            User ID: {user.uid}
          </p>
        </div>
      ))}
    </div>
  );
}