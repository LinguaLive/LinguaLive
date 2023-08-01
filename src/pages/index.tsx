import { RoomContext } from '@/context/RoomContext';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Link from 'next/link';
import NewRoomForm from '@/components/NewRoomForm';
import { useRouter } from 'next/router';
import { useContext } from 'react';

type room = {
  id: string,
  name: string
}
type chatrooms = Array<room>
type HomeProps = {
  chatrooms:chatrooms
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/chatrooms`, {
    cache:'no-store'
  });
  const chatrooms = await res.json();
  return {
    props: {chatrooms}
  }
}

function Home({ chatrooms }:HomeProps) {
  const { ws } = useContext(RoomContext);
  const router = useRouter();

  const joinRoom = async (id: string) => {
    await ws.send(JSON.stringify({type: 'join-room', room: id}));
    router.push(`/chatroom/${id}`)
  };

  // Will need to fetch list of chatrooms from database here
  const chatroomList = chatrooms.map(room => {
    const { id, name } = room;
    return (
      <li key={id} className='m-2 text-white list-none'>
        <p className=' text-xl mb-1 font-semibold'>{name}</p>
        <p className=' text-xs'># of participants</p>
        <button onClick={() => joinRoom(id)} className='btn btn-secondary btn-sm rounded-full m-2 text-base-100'>Click to Join</button>
      </li>
    )
  })

  return (
    <div className='flex flex-col font-sans text-center items-center'>
      <h1 className='text-5xl font-bold tracking-wide m-2 mb-4'>Available Rooms</h1>
      <button onClick={handleOpen} className='btn btn-warning btn-md'>Create a New Room</button>
      <div className='relative'>
      <NewRoomForm
        modalOpen={modalOpen}
        onClose={handleClose}  
      />
      </div>
      {chatroomList}
    </div>
  )
}

export default Home;