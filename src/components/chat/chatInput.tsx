import React from "react"// input field of the chatbox
export default function ChatInput() {
  function submitForm(e: Event) {
    e.preventDefault();
    // e.target[0].value is the input field's value
    console.log(e.target[0].value);
    // e.target.reset() will reset the form after submission
    return e.target.reset();
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