import { useRouter } from 'next/router';
import { createContext, useEffect } from 'react'

export const RoomContext = createContext<{ ws: WebSocket } | any>(null);

const ws = new WebSocket('ws://localhost:4000');

export default function RoomProvider({children}: {children: React.ReactNode}) {
  const router = useRouter();

  ws.addEventListener('message', (event) => {
    const {type, room} = JSON.parse(event.data);
    switch (type) {
      case 'room-created':
        router.push(`/chatroom/${room}`)
        break;
      default:
        console.warn('Unknown message type:', type);
    }
  });
  return (
    <RoomContext.Provider value={{ws}}>{children}</RoomContext.Provider>
  )
}
