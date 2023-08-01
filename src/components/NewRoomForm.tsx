import { useRouter } from "next/router";
import { useState } from "react";

const NewRoomForm = () => {
  const router = useRouter();
  const [emptyName, setEmptyName] = useState(false)

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form[1] as HTMLInputElement;
    if (input && input.value !== '') {
      const createRoom = await fetch('/api/chatrooms', {
        method: 'POST',
        body: JSON.stringify({ name: input.value })
      });
      const newRoom = await createRoom.json();
      router.push(`/chatroom/${newRoom.id}`);
    } else if (input.value === '') {
      setEmptyName(true);
    }
  }

  return (
    <dialog id="new_room" className="modal inset-0">
      <form method="dialog" className="modal-box flex flex-col items-center" onSubmit={(e) => handleSubmit(e)}>
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <p className="py-4 font-medium text-lg">Enter a name for your room</p>
        <input type="text" placeholder="Type here" className="input input-bordered input-md w-full max-w-xs" />
        {emptyName && (
          <div className="alert alert-error w-3/5 p-0 text-sm flex items-center justify-center mt-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Error! Please submit a room name</span>
        </div>
        )}
        <button type="submit" className="btn btn-sm rounded-full btn-info mt-4 w-32">Submit</button>
      </form>
    </dialog>
  )
}

export default NewRoomForm;