// input field of the chatbox
export default function ChatInput() {
  function submitForm() {
    return console.log('submitting form')
  }
  return (
    <div>
      ~~ChatInput field
      <form onSubmit={function(this){return submitForm(this)}}>
        <div>
          <input type='text' placeholder='Enter message...'></input>
          <input type='submit' value='Send!'></input>
        </div>
      </form>
    </div>
  )
}