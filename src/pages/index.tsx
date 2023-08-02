import { RoomContext } from '@/context/RoomContext';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Link from 'next/link';
import NewRoomForm from '@/components/NewRoomForm';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

declare global {
  interface Window {
    new_room: HTMLDialogElement
  }
}

type room = {
  id: string,
  name: string,
  language: string
}
type chatrooms = Array<room>
type HomeProps = {
  chatrooms:chatrooms
}

  // Will need to fetch list of chatrooms from database here
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
    await ws.send(JSON.stringify({type: 'create-room', room: id}));
  };

  const chatroomList = chatrooms.map(room => {
    const { id, name, language } = room;
    return (
      <li key={id} className='m-2 text-neutral list-none'>
        <p className=' text-xl mb-1 font-semibold'>{name}</p>
        <p className=' text-sm mb-1 font-semibold'>{language}</p>
        <p className=' text-xs'># of participants</p>
        <button onClick={() => joinRoom(id)} className='btn btn-secondary btn-sm rounded-full m-2 text-base-100'>Click to Join</button>
      </li>
    )
  })

  const handleOpen = () => window.new_room.showModal();
  const handleClose = () => window.new_room.close();

  return (
    <div className='flex flex-col font-sans text-center items-center'>
      <h1 className='text-5xl font-bold tracking-wide m-2 mb-5'>Available Rooms</h1>
      <button onClick={() => handleOpen()} className='btn btn-warning btn-md mb-3 mt-1'>Create a New Room</button>
      <div className='relative'>
        <NewRoomForm onClose={handleClose} />
      </div>
      {chatroomList}
    </div>
  )
}

export default Home;