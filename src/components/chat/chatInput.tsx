// input field of the chatbox
import ChatSendButton from './chatSendButton';

export default function ChatInput() {
  function submitForm() {
    return console.log('submitting form')
  }
  return (
    <div>
      ~~ChatInput field
      <form onSubmit={submitForm}>
        <div>
          <input type='text' placeholder='Enter message...'></input>
          <input type='submit' value='Send!'></input>
        </div>
      </form>
    </div>
  )
}