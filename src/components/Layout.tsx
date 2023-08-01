import RoomProvider from "@/context/RoomContext";
import Nav from "./Nav";

export const metadata = {
  title: 'LinguaLive',
  description: 'Practice a language and connect with friends',
};

type LayoutProps = {
  children: React.ReactNode,
}

const Layout = ({children}: LayoutProps) => {
  return (
    <RoomProvider>
      <div className='main'>
        <div className='gradient'/>
      </div>

      <main className="app">
        <Nav />
        {children}
      </main>
    </RoomProvider>
  )
}

export default Layout;