import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Link from 'next/link';

type room = {
  id: string
}
type chatrooms = room[]
type HomeProps = {
  chatrooms:chatrooms
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/chatrooms`);
  const chatrooms = await res.json();
  return {
    props: {chatrooms}
  }
}

function Home({ chatrooms }:HomeProps) {
  // Will need to fetch list of chatrooms from database here
  const chatroomList = chatrooms.map(room => {
    const { id } = room;
    return (
      <li>
        <Link href={`/chatroom/${id}`} />
        <span># of participants</span>
      </li>
    )
  })

  return (
    <>
    <h1>hello world</h1>
      {chatroomList}
    </>
  )
}

export default Home;