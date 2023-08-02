'use client';
// here is where the chatroom page is gonna be served, start rendering video componenent and chat component here
import ChatBox from '@/components/chat/chatBox';
import VideoBox from '@/components/video/videoBox';
import { RoomContext } from '@/context/RoomContext';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

export default function Chatroom() {
  
  const router = useRouter();
  const id = router.query.id;
  const { ws } = useContext(RoomContext);

  useEffect(() => {
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({type: 'join-room', roomId: id}))
    })
  }, [id]);
  
  return (
    <div>
      <ChatBox></ChatBox>
      <VideoBox></VideoBox>
    </div>
  );
}
