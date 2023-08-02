import { createContext } from 'react'
// import socketIOClient from 'socket.io-client'

export const RoomContext = createContext<{ ws: WebSocket } | any>(null);
// export const RoomContext = createContext<null | any>(null);

const ws = new WebSocket('ws://localhost:4000');
// const ws = socketIOClient('http://localhost:4000')

export default function RoomProvider({children}: {children: React.ReactNode}) {
  return (
    <RoomContext.Provider value={{ws}}>{children}</RoomContext.Provider>
  )
}
