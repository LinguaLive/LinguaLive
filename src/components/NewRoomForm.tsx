type NewRoomFormProps = {
  modalOpen:boolean
  onClose:() => void
}

const NewRoomForm = ({ modalOpen, onClose }: NewRoomFormProps) => {
  if (!modalOpen) return null;

  const handleClick = async () => {
    await fetch('/api/chatrooms', {
        method: 'POST'
    })
  }

  return (
    <dialog id="new_room" className="modal">
      <form method="dialog" className="modal-box" onSubmit={(e) => console.log(e)}>
        <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click on ✕ button to close</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        <button type="submit" className="btn btn-sm rounded-full btn-info">Submit</button>
      </form>
    </dialog>
  )
}

export default NewRoomForm;