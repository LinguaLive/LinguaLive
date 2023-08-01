import RoomProvider from '@/context/RoomContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RoomProvider>
      <main>{children}</main>
    </RoomProvider>
  );
}
